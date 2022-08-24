import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { signMessage } from "../../api-smart-contracts/dcf";
import { getNonce } from "../../api/degen.service";
import { editProfile } from "../../api/profiles.service";
import { NftCard } from "../NftCard";
import { DateTime } from "luxon";
import { AuthorizationContext } from "../../contexts/auth.context";

const discordUrl = "https://discord.com/api/oauth2/authorize?client_id=958201393087381524&redirect_uri=https%3A%2F%2Fdegencoinflip.com%2Fdiscord%2Foauth&response_type=code&scope=identify%20guilds.members.read";

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_self', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

const URL = process.env.REACT_APP_RPC_URL ?? clusterApiUrl("devnet");

export function ProfileModal({ defaultProfilePicture, setProfile, styleCss, wallet, profile, ...props }) {
    const { auth, signIn } = useContext(AuthorizationContext);
    const PAGE_SIZE = 6;
    const [nickname, setNickname] = useState(profile?.nickname ?? '');
    const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImageUrl ?? defaultProfilePicture);
    const [showCollection, setShowCollection] = useState(false);
    const [currentInventoryIndex, setCurrentInventoryIndex] = useState(PAGE_SIZE);
    let { nfts: nftEyes } = useWalletNfts({
        publicAddress: wallet?.publicKey?.toString(),
        connection: new Connection(URL, "processed"),
    });

    const handleChangeNickname = (e) => {
        e.preventDefault(); // prevent the default action
        setNickname(e.target.value); // set name to e.target.value (event)
    }
    const selectPfp = async (token) => {
        const { image } = token?.data?.metadata;
        setProfileImageUrl(image);
        setShowCollection(false);
    }

    const saveProfile = async () => {
        const nonceResponse = await getNonce(wallet?.publicKey?.toString());
        const nonce = nonceResponse?.nonce;
        const signedMessage = await signMessage(nonce);
        const updatedProfile = await editProfile(
            wallet?.publicKey?.toString(),
            profileImageUrl,
            nickname,
            signedMessage.signature,
            auth?.idToken
        );
        setProfile(updatedProfile);
        props.onHide();
    }

    const onLinkDiscord = async () => {
        await signIn(wallet?.publicKey?.toString());
        openInNewTab(discordUrl);
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName={styleCss + `-color`}
        >
            <Modal.Body className={"p-0"}>
                <div className="card card-user shadow-lg">
                    {
                        !showCollection &&
                        <>
                            <div className="card-body text-center">
                                <h4 className="">USER PROFILE</h4>
                                <div className="profile-picture d-flex w-100 mb-3">
                                    <div className='imageWrapper ms-auto me-auto'
                                        onClick={() => setShowCollection(true)}>
                                        <img
                                            className={`rounded-circle cursor-pointer image-large`}
                                            src={profileImageUrl ?? defaultProfilePicture}
                                            alt={'pfp'} />
                                        <a href="#!" onClick={ev => ev.preventDefault()} className="cornerLink"><small>CHANGE AVATAR</small></a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <button className="btn btn-sm btn-dark mb-3 button-fx" onClick={() => setShowCollection(true)}>CHANGE AVATAR</button>
                                    <button className="btn btn-sm bg-discord mb-3 button-fx" onClick={() => onLinkDiscord()}>
                                        LINK DISCORD <i className="fab fa-discord fa-xs"></i>
                                    </button>
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={handleChangeNickname}
                                        className="form-control"
                                        placeholder="Nickname"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1" />
                                </div>
                                <h6 className="mt-3 mb-0"><small>Degen since {profile?.createdAt ? DateTime.fromISO(profile?.createdAt).toFormat('MMM yyyy') : 'inception'}.</small></h6>
                            </div>
                            <div className="card-footer">
                                <button
                                    className="btn btn-block w-100 btn-sm my-1 rounded-0 btn-warning"
                                    onClick={saveProfile}>
                                    SAVE
                                </button>
                            </div>
                        </>
                    }
                    {
                        showCollection &&
                        <div className="card-body text-center">
                            <h4 className="">SELECT NFT PFP</h4>
                            <div className="row">
                                {
                                    nftEyes?.slice(currentInventoryIndex - PAGE_SIZE, currentInventoryIndex)?.map((nft) => (
                                        <NftCard key={nft.mint} details={nft} onSelect={selectPfp} />
                                    ))
                                }
                                {
                                    nftEyes?.length === 0 &&
                                    <><h6>NO NFT PICTURES FOUND!</h6></>
                                }
                            </div>
                            <div className="d-flex">
                                <span
                                    onClick={() => currentInventoryIndex === PAGE_SIZE ? null : setCurrentInventoryIndex(currentInventoryIndex - PAGE_SIZE)}
                                    className={currentInventoryIndex === PAGE_SIZE ? "fas fa-chevron-left me-auto text-secondary d-none" : "fas fa-chevron-left me-auto cursor-pointer"}>
                                </span>
                                <span
                                    onClick={() => currentInventoryIndex >= nftEyes?.length ? null : setCurrentInventoryIndex(currentInventoryIndex + PAGE_SIZE)}
                                    className={currentInventoryIndex >= nftEyes?.length ? "fas fa-chevron-right ms-auto text-secondary d-none" : "fas fa-chevron-right ms-auto cursor-pointer"}>
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
}
