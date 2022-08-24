import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { StyleThemeContext } from "../../../contexts/style-theme.context";
import { CommunityContext } from "../../../contexts/community.context";
import { RecentCoinFlipsProvider } from "../../../contexts/recent-coin-flips.context";
import { ToolBar } from "../../components";
import MenuBar from "../../components/menu-bar";
import { TopCoinFlipsProvider } from "../../../contexts/top-coin-flips.context";
import InfoBar from "../../components/info-bar";

const getBgImageUrl = (bgImageUrl: string, style: string, community: any) => {
    switch (style) {
        case 'light':
            return bgImageUrl;
        case 'dark':
            return community?.backgroundImageDark ?? bgImageUrl
        case 'dark-black':
            return community?.backgroundImageWhale ?? bgImageUrl
    }
}

const ClassicLayout = () => {
    const { style } = useContext(StyleThemeContext);
    const { community } = useContext(CommunityContext);

    const bgImageUrl = isMobile ? community?.backgroundImageMobile ?? community?.backgroundImage : community?.backgroundImage;
    const bgUrl = getBgImageUrl(bgImageUrl, style, community);
    return (
        <div className={style}>
            <div className={"classic-container h-sm-100" + (bgUrl?.length ? ' bg-image' : '')}
                style={{
                    backgroundImage: `url(${bgUrl}`
                }}>
                <RecentCoinFlipsProvider>
                    <TopCoinFlipsProvider>
                        <MenuBar></MenuBar>
                        <Outlet></Outlet>
                        <ToolBar></ToolBar>
                        <InfoBar social={community}></InfoBar>
                    </TopCoinFlipsProvider>
                </RecentCoinFlipsProvider>
            </div>
        </div>
    );
};
export default ClassicLayout;