import { DateTime } from 'luxon';
import { createContext, useState } from 'react';
import { signMessage } from '../api-smart-contracts/dcf';
import { authorize, authorizeViaTx, getNonce } from '../api/degen.service';
import { authTransfer } from '../services/auth-transfer.service';
import { loadState, saveState } from '../utils/localStorage';

interface Authorization {
  username: string | any;
  idToken: string;
  exp: number;
}

interface AuthorizationContextValue {
  auth: Authorization | any,
  signIn(walletId: string, referral: string): void;
  signInViaLedger(wallet: any): void;
  signOut(): void;
  signNonce(): any;
}

const AuthorizationContext = createContext<AuthorizationContextValue>({
  auth: null,
  signIn() { },
  signInViaLedger() { },
  signOut() { },
  signNonce() { }
});

const AuthorizationProvider = (props: any) => {
  const [auth, setAuth] = useState<Authorization | any>(loadState());

  const handleSaveAuth = (data: Authorization | any) => {
    saveState(data);
    setAuth(data);
  };

  const signIn = async (walletId: string, referral: string) => {
    const expired = DateTime.fromSeconds(auth?.exp ?? 0) < DateTime.utc().plus({ minutes: 150 });
    if (!auth || expired || auth?.username !== walletId) {
      const deviceId = (window as any).deviceID;
      const { nonce } = await getNonce(walletId, referral, deviceId);
      const { signature } = await signMessage(nonce);
      const authorization = await authorize(walletId, signature);
      handleSaveAuth(authorization)
      return authorization;
    }

    return auth;
  };

  const signInViaLedger = async (wallet: any) => {
    const expired = DateTime.fromSeconds(auth?.exp ?? 0) < DateTime.utc().plus({ minutes: 150 });
    if (!auth || expired || auth?.username !== wallet?.publicKey?.toString()) {
      const tx = await authTransfer(wallet);
      const authorization = await authorizeViaTx(wallet?.publicKey?.toString(), tx);
      handleSaveAuth(authorization)
      return authorization;
    }

    return auth;
  };

  const signOut = () => handleSaveAuth(null);
  const signNonce = async () => {
    const walletId = auth?.username;
    const { nonce } = await getNonce(walletId, '');
    const { signature } = await signMessage(nonce);
    return signature;
  }
  return (
    <div>
      <AuthorizationContext.Provider value={{ auth, signIn, signInViaLedger, signOut, signNonce }}>
        {props.children}
      </AuthorizationContext.Provider>
    </div>
  )
};

export { AuthorizationContext, AuthorizationProvider };