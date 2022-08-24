import React from 'react';
import { Button } from './Button';
import { WalletIcon } from './WalletIcon';
export const WalletListItem = ({ handleClick, tabIndex, wallet }) => {
    return (React.createElement("li", null,
        React.createElement(Button, { onClick: handleClick, endIcon: React.createElement(WalletIcon, { wallet: wallet }), tabIndex: tabIndex }, wallet.name)));
};
//# sourceMappingURL=WalletListItem.js.map