import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommunity } from '../api/communities.service';
import { CHALLENGES } from '../utils/constants';

const DEFAULT_COMMUNITY = CHALLENGES[0] as any;

interface Community {
  id: string | any;
  name: string;
  coinImageUrl: string;
  profileImageUrl: string;
  logoUrl: string;
  backgroundImage: string;
  backgroundImageDark: string;
  backgroundImageWhale: string;
  backgroundImageMobile: string;
  twitterUrl: string;
  discordUrl: string;
  marketplaceUrl: string;
  dfcUrl: string;
  slug: string;
  themes: string[];
  assets: JSX.Element | any;
  winStreakAssets: any;
}

interface CommunityContextValue {
  community: Community;
};

const CommunityContext = createContext<CommunityContextValue>({
  community: DEFAULT_COMMUNITY
});

const CommunityProvider = (props: any) => {
  const params = useParams();
  const [community, setCommunity] = useState(DEFAULT_COMMUNITY);

  useEffect(() => {
    const slug = params?.referral?.toLowerCase();
    if (slug?.length) fetchCommunity(slug);
  }, [params]);

  const fetchCommunity = async (slug: any) => {
    const c = await getCommunity(slug);
    console.log(c.slug);
    console.log(c);
    if (c && !!c.slug && c.slug !== DEFAULT_COMMUNITY.slug) setCommunity(c);
  }

  return (
    <div>
      <CommunityContext.Provider value={{ community }}>
        {props.children}
      </CommunityContext.Provider>
    </div>
  )
};

export { CommunityContext, CommunityProvider };