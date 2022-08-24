import { useState } from "react";
import { Modal } from "react-bootstrap";

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export const onClickUrl = (url) => () => openInNewTab(url)

export function PostModal({ styleCss, amount, onDonate, wallet, tx, profileImageUrl, nickname, ...props }) {
    const [message, setMessage] = useState('');
    const [twitter, setTwitter] = useState('');
    const [hideAmount, setHideAmount] = useState(false);
    const handleChangeNickname = (e) => {
        e.preventDefault(); // prevent the default action
        setMessage(e.target.value); // set name to e.target.value (event)
    }
    const handleChangeTwitter = (e) => {
        e.preventDefault(); // prevent the default action
        setTwitter(e.target.value); // set name to e.target.value (event)
    }
    // const postDonation = async () => {
    //     const nonceResponse = await getNonce(wallet?.publicKey?.toString());
    //     const nonce = nonceResponse?.nonce;
    //     const signedMessage = await signMessage(nonce);
    //     const response = await donate(wallet?.publicKey?.toString(), amount, tx, message, signedMessage);
    //     console.log(response);
    //     props.onClose();
    // }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName={styleCss + `-color`}
            centered
        >
            <Modal.Body className={"p-0"}>
                <div className="card">
                    <div className="card-body px-4 pt-4 pb-1">
                        <h2 className="card-title text-sm text-left">THANKS FOR YOUR DONATION!</h2>
                        <p className="mb-2">
                            Add a message to your post.
                        </p>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                value={message}
                                onChange={handleChangeNickname}
                                className="form-control"
                                placeholder="Thank you coin gods for my next winning flip."
                                aria-label="message"
                                aria-describedby="message" />
                        </div>
                        <p className="mb-2">
                            Twitter (ex. @degencoinflip)
                        </p>
                        <div className="input-group">
                            <input
                                type="text"
                                value={twitter}
                                onChange={handleChangeTwitter}
                                className="form-control"
                                placeholder="degencoinflip"
                                aria-label="twitter"
                                aria-describedby="twitter" />
                        </div>
                        <h4 className="mt-4">Post Preview</h4>
                        <div className="card card-cover h-100 overflow-hidden rounded-5 shadow-lg border">
                            <div className="d-flex flex-column p-4 text-shadow-1">
                                <ul className="d-flex list-unstyled mt-auto mb-0">
                                    <li className="">
                                        <img src={profileImageUrl} alt="pfp" width="32" height="32" className="rounded-circle border border-white" />
                                    </li>
                                    <li className="d-flex align-items-center me-auto">
                                        {
                                            !hideAmount &&
                                            <small className="ms-2">{nickname} donated {amount} ◎.</small>
                                        }
                                        {
                                            hideAmount &&
                                            <small className="ms-2">{nickname} donated.</small>
                                        }
                                        {
                                            twitter?.length > 0 &&
                                            <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" ><i className="fa-brands fa-sm fa-twitter ms-2"></i></a>
                                        }
                                    </li>
                                </ul>
                                <h6 className="pt-2 mt-2 mb-2 lh-1 fw-bold">"{message?.length ? message : "Thank you coin gods for my next winning flip."}"</h6>
                            </div>
                        </div>
                        <p className="mb-0 mt-3 d-flex">
                            {
                                !hideAmount &&
                                <small className="ms-auto">Hide amount? click <a href="#!" onClick={ev => { ev.preventDefault(); setHideAmount(true) }}>here</a>.</small>
                            }
                            {
                                hideAmount &&
                                <small className="ms-auto">Show amount? click <a href="#!" onClick={ev => { ev.preventDefault(); setHideAmount(false) }}>here</a>.</small>
                            }
                        </p>
                    </div>
                </div>
                <div className="d-flex flex-row p-2">
                    <button className="btn w-100 btn-lg rounded-0 btn-warning" onClick={() => message?.length <= 140 && onDonate({ twitter, message: message?.length ? message : "Thank you coin gods for my next winning flip.", hideAmount })}>POST</button>
                </div>
            </Modal.Body>
        </Modal >
    );
}