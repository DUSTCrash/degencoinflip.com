import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectDiscordProfile } from "../../api/profiles.service";
import { AuthorizationContext } from "../../contexts/auth.context";
import { ProfileContext } from "../../contexts/profile.context";

export const DiscordCallback = () => {
  const wallet = useWallet();
  const navigate = useNavigate();
  const { auth } = useContext(AuthorizationContext);
  const { fetchProfile } = useContext(ProfileContext);

  const [walletCache, setWalletCache] = useState('');

  const execDiscordCallback = async (code) => {
    await connectDiscordProfile(code, auth?.idToken);
    fetchProfile(wallet.publicKey.toString());
    navigate("../../", { replace: true });
  }

  useEffect(() => {
    const exec = (code) => {
      execDiscordCallback(code);
    }

    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.connected ||
      wallet.publicKey.toString() === walletCache
    ) {
      return;
    }

    if (wallet.publicKey.toString() !== auth.username) {
      return;
    }

    setWalletCache(wallet.publicKey.toString());
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      exec(code);
    }
    // eslint-disable-next-line
  }, [wallet, auth, walletCache]);

  return (<></>);
};