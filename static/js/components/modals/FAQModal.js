import { Modal } from "react-bootstrap";
import { enableMoreDegeneracy } from "../../api-smart-contracts/dcf";
import { faqs } from '../../utils/constants';

export function FAQModal({ styleCss, wallet, ...props }) {
    const { onHide } = props;

    const NewlineText = ({ text, i }) => (
        <p className="mb-0">
            {text}{i === 0 && <a href="#!" onClick={ev => { ev.preventDefault(); enableMoreDegeneracy(wallet, 50); }} >.</a>}
        </p>
    );

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
                    <div className="card-body p-4" style={{ maxHeight: '484px', overflow: 'scroll' }}>
                        <h2 className="card-title text-sm text-left">Frequently Asked Questions</h2>
                        <br />
                        {
                            faqs?.map((faq, i) =>
                                <div key={i}>
                                    <h5 className="mb-0">{faq.q}</h5>
                                    <hr className="my-1" />
                                    <NewlineText text={faq.a} i={i} />
                                    <br />
                                    <br />
                                </div>
                            )
                        }
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-block w-100 btn-lg my-2 rounded-0 btn-warning" onClick={onHide}>GOT IT</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
