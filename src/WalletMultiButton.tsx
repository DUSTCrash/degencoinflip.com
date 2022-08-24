var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './Button';
import { useWalletModal } from './useWalletModal';
import { WalletConnectButton } from './WalletConnectButton';
import { WalletIcon } from './WalletIcon';
import { WalletModalButton } from './WalletModalButton';
export const WalletMultiButton = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { publicKey, wallet, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef(null);
    const base58 = useMemo(() => publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58(), [publicKey]);
    const content = useMemo(() => {
        if (children)
            return children;
        if (!wallet || !base58)
            return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [children, wallet, base58]);
    const copyAddress = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (base58) {
            yield navigator.clipboard.writeText(base58);
            setCopied(true);
            setTimeout(() => setCopied(false), 400);
        }
    }), [base58]);
    const openDropdown = useCallback(() => setActive(true), [setActive]);
    const closeDropdown = useCallback(() => setActive(false), [setActive]);
    const openModal = useCallback(() => {
        setVisible(true);
        closeDropdown();
    }, [setVisible, closeDropdown]);
    useEffect(() => {
        const listener = (event) => {
            const node = ref.current;
            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target))
                return;
            closeDropdown();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, closeDropdown]);
    if (!wallet)
        return React.createElement(WalletModalButton, Object.assign({}, props), children);
    if (!base58)
        return React.createElement(WalletConnectButton, Object.assign({}, props), children);
    return (React.createElement("div", { className: "wallet-adapter-dropdown" },
        React.createElement(Button, Object.assign({ "aria-expanded": active, className: "wallet-adapter-button-trigger", style: Object.assign({ pointerEvents: active ? 'none' : 'auto' }, props.style), onClick: openDropdown, startIcon: React.createElement(WalletIcon, { wallet: wallet }) }, props), content),
        React.createElement("ul", { "aria-label": "dropdown-list", className: `wallet-adapter-dropdown-list ${active && 'wallet-adapter-dropdown-list-active'}`, ref: ref, role: "menu" },
            React.createElement("li", { onClick: copyAddress, className: "wallet-adapter-dropdown-list-item", role: "menuitem" }, copied ? 'Copied' : 'Copy address'),
            React.createElement("li", { onClick: openModal, className: "wallet-adapter-dropdown-list-item", role: "menuitem" }, "Connect a different wallet"),
            React.createElement("li", { onClick: disconnect, className: "wallet-adapter-dropdown-list-item", role: "menuitem" }, "Disconnect"))));
};
//# sourceMappingURL=WalletMultiButton.js.map