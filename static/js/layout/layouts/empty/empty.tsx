import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { StyleThemeContext } from "../../../contexts/style-theme.context";
import { CommunityContext } from "../../../contexts/community.context";

const EmptyLayout = () => {
    const { style } = useContext(StyleThemeContext);
    const { community } = useContext(CommunityContext);
    return (
        <div className={style}>
            <div className={"classic-container h-100vh-desktop " + (community?.backgroundImage?.length ? ' bg-image' : '')} style={{ backgroundImage: `url(${style === 'light' ? community?.backgroundImage : (community?.backgroundImageDark ?? community?.backgroundImage)}` }}>
                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default EmptyLayout;