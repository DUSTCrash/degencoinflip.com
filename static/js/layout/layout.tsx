import { useLocation } from "react-router-dom";

import { StyleThemeProvider } from "../contexts/style-theme.context";
import { AudioProvider } from "../contexts/audio.context";
import { AuthorizationProvider } from "../contexts/auth.context";
import { CommunityProvider } from "../contexts/community.context";
import { ProfileProvider } from "../contexts/profile.context";
import { WhaleModeProvider } from "../contexts/whale-mode.context";

import ClassicLayout from "./layouts/classic/classic";
import EmptyLayout from "./layouts/empty/empty";

const EMPTY_PAGES = [
    '/ukraine',
    '/bug-bounty',
    '/discord'
];

const LayoutContainer = () => {
    const location = useLocation();
    return (
        <CommunityProvider>
            <StyleThemeProvider>
                <AudioProvider>
                    <AuthorizationProvider>
                        <ProfileProvider>
                            <WhaleModeProvider>
                                {
                                    EMPTY_PAGES.includes(location?.pathname) &&
                                    <EmptyLayout />
                                }
                                {
                                    !EMPTY_PAGES.includes(location?.pathname) &&
                                    <ClassicLayout />
                                }
                            </WhaleModeProvider>
                        </ProfileProvider>
                    </AuthorizationProvider>
                </AudioProvider>
            </StyleThemeProvider>
        </CommunityProvider>
    )
};

export default LayoutContainer;