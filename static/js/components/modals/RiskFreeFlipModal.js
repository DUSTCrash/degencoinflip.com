import { Modal } from "react-bootstrap";

export function RiskFreeFlipModal({ styleCss, riskFreeFlips, ...props }) {
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
                        <h4 className="">Welcome { riskFreeFlips[0].name } Member!</h4>
                        Thanks to our partnership with your community, you earned a <b><u>risk free flip</u></b>! 
                        <br />
                        <br />
                        This is provided by the following communities:
                        <ul className="font-weight-bold">
                           { riskFreeFlips?.map(c => (
                               <li>
                                {c.name} for a {c.refund_amount} sol flip
                               </li>
                           )) }
                        </ul>
                        Flip and we'll provide you a refund if you lose.
                        {/* Detailed thread on what's happening  <a href="https://twitter.com/degencoinflip/status/1511143328829657088?s=20&t=KhEp_J7hrtrAGXhSM86uGQ" target="_blank">here</a>. */}
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn btn-block w-100 btn-lg my-2 rounded-0 btn-warning"
                            onClick={props.onHide}>
                            PROCEED
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}