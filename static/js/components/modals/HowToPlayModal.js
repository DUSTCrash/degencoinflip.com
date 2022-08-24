import { Modal } from "react-bootstrap";

export function HowToPlayModal({ styleCss, ...props }) {
    const { onHide } = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName={styleCss + `-color`}
            centered
        >
            <Modal.Body className={"p-0"}>
                <div className="card card-user shadow-lg">
                    <div className="card-body px-5 pt-5">
                        <h2 className="card-title text-sm text-left">How To Play</h2>
                        {/* <h6 className="mt-0"><a href="https://demo.degencoinflip.com" target="_blank">TRY DEMO</a></h6> */}
                        <br />
                        <p>
                            1. Connect your Phantom Wallet. (Get Phantom @ <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">phantom.app</a>)
                            <br />
                            2. Pick either heads or tails.
                            <br />
                            3. Select your desired flip amount.
                            <br />
                            4. Click “Double or Nothing”.
                            <br />
                            5. Click approve and wait for coin to spin
                            <br />
                            6. Congrats, you’re now a degenerate.
                        </p>

                        <h5>What is a Phantom Wallet?</h5>
                        <p>
                            Phantom wallet is a browser extension to manage your digital assets on the Solana blockchain network. Visit <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">phantom.app</a>, add the wallet to chrome, and follow the instructions to create a wallet.
                        </p>
                        <h5>How Do I fund my Phantom Wallet?</h5>
                        <p>
                            Use a central exchange such as Coinbase, Binance, or FTX to fund your wallet. Purchase Solana using fiat currency. Then withdraw Solana to your Phantom wallet.
                        </p>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-block w-100 btn-lg my-2 rounded-0 btn-warning" onClick={onHide}>GOT IT</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
