import { Modal } from "react-bootstrap";


export function ResponsibleModal({ styleCss, ...props }) {
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
          <div className="card-body">
            <h4 className="">FLIP RESPONSIBLY</h4>
            DCF is a fun game on Solana and we want all of our players to play responsibly.
            Please only play with Sol you are comfortable parting with that won’t impact your well-being.
            <br /><br />
            <h5 className="">RESOURCES</h5>
            Call <a href="tel:18005224700">1-800-522-4700</a><br />
            Chat <a href="https://ncpgambling.org/chat">ncpgambling.org/chat</a><br />
            Text 1-800-522-4700
            <br /><br />
            <h5 className="">DO I HAVE A FLIPPING PROBLEM?</h5>
            Flipping problem includes all behavior patterns that compromise, disrupt, or damage any personal,
            family, or vocational pursuits. Symptoms include increasing preoccupation with flipping, a need
            to flip more and more frequently, restlessness or irritability when attempting to stop, “chasing”
            losses, and loss of control manifested by continuation of the flipping behavior in spite of mounting,
            serious, and/or negative consequence.
          </div>
          <div className="card-footer">
            <button className="btn btn-block w-100 btn-lg my-2 rounded-0 btn-warning" onClick={props.onHide}>GOT IT</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}