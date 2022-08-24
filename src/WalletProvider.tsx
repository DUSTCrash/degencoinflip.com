var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WalletNotConnectedError, WalletNotReadyError, } from '@solana/wallet-adapter-base';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WalletNotSelectedError } from './errors';
import { useLocalStorage } from './useLocalStorage';
import { WalletContext } from './useWallet';
const initialState = {
    wallet: null,
    adapter: null,
    ready: false,
    publicKey: null,
    connected: false,
};
export const WalletProvider = ({ children, wallets, autoConnect = false, onError: _onError = (error) => console.error(error), localStorageKey = 'walletName', }) => {
    const [name, setName] = useLocalStorage(localStorageKey, null);
    const [{ wallet, adapter, ready, publicKey, connected }, setState] = useState(initialState);
    const [connecting, setConnecting] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const isConnecting = useRef(false);
    const isDisconnecting = useRef(false);
    const isUnloading = useRef(false);
    // Map of wallet names to wallets
    const walletsByName = useMemo(() => wallets.reduce((walletsByName, wallet) => {
        walletsByName[wallet.name] = wallet;
        return walletsByName;
    }, {}), [wallets]);
    // When the selected wallet changes, initialize the state
    useEffect(() => {
        const wallet = (name && walletsByName[name]) || null;
        const adapter = wallet && wallet.adapter();
        if (adapter) {
            const { ready, publicKey, connected } = adapter;
            setState({ wallet, adapter, connected, publicKey, ready });
        }
        else {
            setState(initialState);
        }
    }, [name, walletsByName, setState]);
    // If autoConnect is enabled, try to connect when the adapter changes and is ready
    useEffect(() => {
        if (isConnecting.current || connecting || connected || !autoConnect || !adapter || !ready)
            return;
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                isConnecting.current = true;
                setConnecting(true);
                try {
                    yield adapter.connect();
                }
                catch (error) {
                    // Clear the selected wallet
                    setName(null);
                    // Don't throw error, but onError will still be called
                }
                finally {
                    setConnecting(false);
                    isConnecting.current = false;
                }
            });
        })();
    }, [isConnecting, connecting, connected, autoConnect, adapter, ready, setConnecting, setName]);
    // If the window is closing or reloading, ignore disconnect and error events from the adapter
    useEffect(() => {
        function listener() {
            isUnloading.current = true;
        }
        window.addEventListener('beforeunload', listener);
        return () => window.removeEventListener('beforeunload', listener);
    }, [isUnloading]);
    // Select a wallet by name
    const select = useCallback((newName) => __awaiter(void 0, void 0, void 0, function* () {
        if (name === newName)
            return;
        if (adapter)
            yield adapter.disconnect();
        setName(newName);
    }), [name, adapter, setName]);
    // Handle the adapter's ready event
    const onReady = useCallback(() => setState((state) => (Object.assign(Object.assign({}, state), { ready: true }))), [setState]);
    // Handle the adapter's connect event
    const onConnect = useCallback(() => {
        if (!adapter)
            return;
        const { connected, publicKey, ready } = adapter;
        setState((state) => (Object.assign(Object.assign({}, state), { connected,
            publicKey,
            ready })));
    }, [adapter, setState]);
    // Handle the adapter's disconnect event
    const onDisconnect = useCallback(() => {
        // Clear the selected wallet unless the window is unloading
        if (!isUnloading.current)
            setName(null);
    }, [isUnloading, setName]);
    // Handle the adapter's error event, and local errors
    const onError = useCallback((error) => {
        // Call the provided error handler unless the window is unloading
        if (!isUnloading.current)
            _onError(error);
        return error;
    }, [isUnloading, _onError]);
    // Connect the adapter to the wallet
    const connect = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (isConnecting.current || connecting || disconnecting || connected)
            return;
        if (!wallet || !adapter)
            throw onError(new WalletNotSelectedError());
        if (!ready) {
            // Clear the selected wallet
            setName(null);
            if (typeof window !== 'undefined') {
                window.open(wallet.url, '_blank');
            }
            throw onError(new WalletNotReadyError());
        }
        isConnecting.current = true;
        setConnecting(true);
        try {
            yield adapter.connect();
        }
        catch (error) {
            // Clear the selected wallet
            setName(null);
            // Rethrow the error, and onError will also be called
            throw error;
        }
        finally {
            setConnecting(false);
            isConnecting.current = false;
        }
    }), [isConnecting, connecting, disconnecting, connected, wallet, adapter, onError, ready, setConnecting, setName]);
    // Disconnect the adapter from the wallet
    const disconnect = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (isDisconnecting.current || disconnecting)
            return;
        if (!adapter)
            return setName(null);
        isDisconnecting.current = true;
        setDisconnecting(true);
        try {
            yield adapter.disconnect();
        }
        catch (error) {
            // Clear the selected wallet
            setName(null);
            // Rethrow the error, and onError will also be called
            throw error;
        }
        finally {
            setDisconnecting(false);
            isDisconnecting.current = false;
        }
    }), [isDisconnecting, disconnecting, adapter, setDisconnecting, setName]);
    // Send a transaction using the provided connection
    const sendTransaction = useCallback((transaction, connection, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!adapter)
            throw onError(new WalletNotSelectedError());
        if (!connected)
            throw onError(new WalletNotConnectedError());
        return yield adapter.sendTransaction(transaction, connection, options);
    }), [adapter, onError, connected]);
    // Sign a transaction if the wallet supports it
    const signTransaction = useMemo(() => adapter && 'signTransaction' in adapter
        ? (transaction) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected)
                throw onError(new WalletNotConnectedError());
            return yield adapter.signTransaction(transaction);
        })
        : undefined, [adapter, onError, connected]);
    // Sign multiple transactions if the wallet supports it
    const signAllTransactions = useMemo(() => adapter && 'signAllTransactions' in adapter
        ? (transactions) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected)
                throw onError(new WalletNotConnectedError());
            return yield adapter.signAllTransactions(transactions);
        })
        : undefined, [adapter, onError, connected]);
    // Sign an arbitrary message if the wallet supports it
    const signMessage = useMemo(() => adapter && 'signMessage' in adapter
        ? (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (!connected)
                throw onError(new WalletNotConnectedError());
            return yield adapter.signMessage(message);
        })
        : undefined, [adapter, onError, connected]);
    // Setup and teardown event listeners when the adapter changes
    useEffect(() => {
        if (adapter) {
            adapter.on('ready', onReady);
            adapter.on('connect', onConnect);
            adapter.on('disconnect', onDisconnect);
            adapter.on('error', onError);
            return () => {
                adapter.off('ready', onReady);
                adapter.off('connect', onConnect);
                adapter.off('disconnect', onDisconnect);
                adapter.off('error', onError);
            };
        }
    }, [adapter, onReady, onConnect, onDisconnect, onError]);
    return (React.createElement(WalletContext.Provider, { value: {
            wallets,
            autoConnect,
            wallet,
            adapter,
            publicKey,
            ready,
            connected,
            connecting,
            disconnecting,
            select,
            connect,
            disconnect,
            sendTransaction,
            signTransaction,
            signAllTransactions,
            signMessage,
        } }, children));
};
//# sourceMappingURL=WalletProvider.js.map