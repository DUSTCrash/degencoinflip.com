import { createContext, useState } from 'react';
import { getProfile } from '../api/profiles.service';

interface Profile {
  walletId: string | any;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
}

interface ProfileContextValue {
  profile: Profile | any,
  fetchProfile(walletId: string): void;
  updateProfile(profile: Profile): void;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: null,
  fetchProfile() { },
  updateProfile() { }
});

const ProfileProvider = (props: any) => {
  const [profile, setProfile] = useState<Profile>();

  const setDiscordPfp = (profileImageUrl: string) => {
    const wd: any = window ?? {};
    const crate = wd['crate'] ?? null;
    if (crate) {
      wd['crate'].setOptions({
        avatar: profileImageUrl ?? `https://i.imgur.com/5a4cL6K.png`
      });
    }
  }

  const fetchProfile = async (walletId: string) => {
    const profile = await getProfile(walletId);
    setProfile(profile);
    setTimeout(() => setDiscordPfp(profile?.profileImageUrl), 3000);
  };
  const updateProfile = (p: Profile) => setProfile(p);

  return (
    <div>
      <ProfileContext.Provider value={{ profile, fetchProfile, updateProfile }}>
        {props.children}
      </ProfileContext.Provider>
    </div>
  )
};

export { ProfileContext, ProfileProvider };