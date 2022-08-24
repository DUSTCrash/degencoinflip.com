import { useContext } from "react";
import { StyleThemeContext } from "../contexts/style-theme.context";

const WHALE_MODE_STYLE = "dark-black";
const DARK_MODE_STYLE = "dark";

const ThemeToggler = () => {
  const { style, toggleTheme } = useContext(StyleThemeContext);

  return (
    <button
      className={"ms-sm-2 ms-1 btn btn-outline-dark" + (style === WHALE_MODE_STYLE ? " d-none" : "")}
      onClick={toggleTheme as any}>
      {style?.toLocaleUpperCase()}
      <i className={"ms-1 fa-xs " + (style === DARK_MODE_STYLE ? "fas fa-moon" : "far fa-sun")}></i>
    </button>
  );
};

export default ThemeToggler;