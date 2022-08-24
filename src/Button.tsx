import React from 'react';
export const Button = (props) => {
    const justifyContent = props.endIcon || props.startIcon ? 'space-between' : 'center';
    return (React.createElement("button", { className: `wallet-adapter-button ${props.className || ''}`, disabled: props.disabled, onClick: props.onClick, style: Object.assign({ justifyContent }, props.style), tabIndex: props.tabIndex || 0 },
        props.startIcon && React.createElement("i", { className: "wallet-adapter-button-start-icon" }, props.startIcon),
        props.children,
        props.endIcon && React.createElement("i", { className: "wallet-adapter-button-end-icon" }, props.endIcon)));
};
//# sourceMappingURL=Button.js.map