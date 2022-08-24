import { Modal } from "react-bootstrap";

export function AcceptTermsModal({ styleCss, ...props }) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName={styleCss + `-color`}
            centered
        >
            <Modal.Body className={"p-0"}>
                <div className="card card-user shadow-lg">
                    <div className={"card-body p-4" + (styleCss === 'dark' ? ' pb-0' : '')}>
                        <h4 className="">DISCLAIMER</h4>
                        I confirm flipping isn't forbidden in my jurisdiction and I'm at least 18 years old.
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn btn-block w-100 btn-lg my-2 rounded-0 btn-warning"
                            onClick={() => { localStorage.setItem('terms', true); props.onClose() }}>
                            CONFIRM
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}