import { Modal } from "react-bootstrap";

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export const onClickUrl = (url) => () => openInNewTab(url)

export function EntryCheckerModal({ styleCss, wallet, entries, ...props }) {
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
                    <div className="pt-4 d-flex">
                        <img src="https://i.imgur.com/NSU0AQo.png" className="img-fluid mx-auto" style={{ height: '86px' }} alt="..." />
                    </div>
                    <div className="card-body text-center">
                        <h2 className="card-title text-sm text-left">Wallet ({wallet?.publicKey?.toString()?.slice(0, 4)})</h2>
                        {
                            wallet.connected === true && wallet?.publicKey?.toString() !== null &&
                            <>
                                <h4>{entries[wallet?.publicKey?.toString()]?.normal} <img src="https://i.imgur.com/NSU0AQo.png" className="img-fluid mb-1" style={{ maxWidth: '32px' }} alt="..." /> raffles</h4>
                                <h4>{entries[wallet?.publicKey?.toString()]?.whale} 🐳 raffles</h4>
                            </>
                        }
                        <button className="btn btn-warning" onClick={props.onClose}>CLOSE</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    );
}