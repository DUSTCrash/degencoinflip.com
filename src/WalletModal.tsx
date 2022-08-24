import { useWallet } from '@solana/wallet-adapter-react';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { Collapse } from './Collapse';
import { useWalletModal } from './useWalletModal';
import { WalletListItem } from './WalletListItem';
export const WalletModal = ({ className = '', logo, featuredWallets = 3, container = 'body', }) => {
    const ref = useRef(null);
    const { wallets, select } = useWallet();
    const { setVisible } = useWalletModal();
    const [expanded, setExpanded] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [portal, setPortal] = useState(null);
    const [featured, more] = useMemo(() => [wallets.slice(0, featuredWallets), wallets.slice(featuredWallets)], [wallets, featuredWallets]);
    const hideModal = useCallback(() => {
        setFadeIn(false);
        setTimeout(() => setVisible(false), 150);
    }, [setFadeIn, setVisible]);
    const handleClose = useCallback((event) => {
        event.preventDefault();
        hideModal();
    }, [hideModal]);
    const handleWalletClick = useCallback((event, walletName) => {
        select(walletName);
        handleClose(event);
    }, [select, handleClose]);
    const handleCollapseClick = useCallback(() => setExpanded(!expanded), [setExpanded, expanded]);
    const handleTabKey = useCallback((event) => {
        const node = ref.current;
        if (!node)
            return;
        // here we query all focusable elements
        const focusableElements = node.querySelectorAll('button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey) {
            // if going backward by pressing tab and firstElement is active, shift focus to last focusable element
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        }
        else {
            // if going forward by pressing tab and lastElement is active, shift focus to first focusable element
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }, [ref]);
    useLayoutEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                hideModal();
            }
            else if (event.key === 'Tab') {
                handleTabKey(event);
            }
        };
        // Get original overflow
        const { overflow } = window.getComputedStyle(document.body);
        // Hack to enable fade in animation after mount
        setTimeout(() => setFadeIn(true), 0);
        // Prevent scrolling on mount
        document.body.style.overflow = 'hidden';
        // Listen for keydown events
        window.addEventListener('keydown', handleKeyDown, false);
        return () => {
            // Re-enable scrolling when component unmounts
            document.body.style.overflow = overflow;
            window.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [hideModal, handleTabKey]);
    useLayoutEffect(() => setPortal(document.querySelector(container)), [setPortal, container]);
    return (portal &&
        createPortal(React.createElement("div", { "aria-labelledby": "wallet-adapter-modal-title", "aria-modal": "true", className: `wallet-adapter-modal ${fadeIn && 'wallet-adapter-modal-fade-in'} ${className}`, ref: ref, role: "dialog" },
            React.createElement("div", { className: "wallet-adapter-modal-container" },
                React.createElement("div", { className: `wallet-adapter-modal-wrapper ${!logo && 'wallet-adapter-modal-wrapper-no-logo'}` },
                    logo && (React.createElement("div", { className: "wallet-adapter-modal-logo-wrapper" }, typeof logo === 'string' ? (React.createElement("img", { alt: "logo", className: "wallet-adapter-modal-logo", src: logo })) : (logo))),
                    React.createElement("h1", { className: "wallet-adapter-modal-title", id: "wallet-adapter-modal-title" }, "Connect Wallet"),
                    React.createElement("button", { onClick: handleClose, className: "wallet-adapter-modal-button-close" },
                        React.createElement("svg", { width: "14", height: "14" },
                            React.createElement("path", { d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" }))),
                    React.createElement("ul", { className: "wallet-adapter-modal-list" }, featured.map((wallet) => (React.createElement(WalletListItem, { key: wallet.name, handleClick: (event) => handleWalletClick(event, wallet.name), wallet: wallet })))),
                    more.length ? (React.createElement(React.Fragment, null,
                        React.createElement(Collapse, { expanded: expanded, id: "wallet-adapter-modal-collapse" },
                            React.createElement("ul", { className: "wallet-adapter-modal-list" }, more.map((wallet) => (React.createElement(WalletListItem, { key: wallet.name, handleClick: (event) => handleWalletClick(event, wallet.name), tabIndex: expanded ? 0 : -1, wallet: wallet }))))),
                        React.createElement(Button, { "aria-controls": "wallet-adapter-modal-collapse", "aria-expanded": expanded, className: `wallet-adapter-modal-collapse-button ${expanded && 'wallet-adapter-modal-collapse-button-active'}`, endIcon: React.createElement("svg", { width: "11", height: "6", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { d: "m5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z" })), onClick: handleCollapseClick },
                            expanded ? 'Less' : 'More',
                            " options"))) : null)),
            React.createElement("div", { className: "wallet-adapter-modal-overlay", onMouseDown: handleClose })), portal));
};
//# sourceMappingURL=WalletModal.js.map