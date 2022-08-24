import { Toast, ToastContainer } from "react-bootstrap";
export const ToastCongrats = ({ show, onClose, showShare, onShareClose, onOpenModal }: any) => {
  return (
    <ToastContainer position="bottom-start" className="p-3 position-fixed">
      {/* <Toast className="" onClose={onShareClose} show={showShare} delay={10000} autohide>
        <Toast.Body>
          <div className="d-flex flex-row px-2 py-1">
            <div className="fa-lg d-flex">
              <i className="fas fa-camera-retro my-auto"></i>
            </div>
            <div className="d-flex flex-column ms-3 w-100">
              <a href="javascript:;" onClick={onOpenModal} className="mb-0 d-flex">
                Click Here
              </a>
              <div className="text-gray">
                Share your win.
              </div>
            </div>
          </div>
        </Toast.Body>
      </Toast> */}
      <Toast className="" onClose={onClose} show={show} delay={10000} autohide>
        <Toast.Body>
          <div className="d-flex flex-row px-2 py-1">
            <div className="fa-lg d-flex">
              <i className="fas fa-circle-notch fa-spin my-auto"></i>
            </div>
            <div className="d-flex flex-column ms-3 w-100">
              <h6 className="mb-0 d-flex">
                CONGRATS DEGEN
              </h6>
              <div className="text-gray">
                You doubled your money.
              </div>
              {/* <button className="btn btn-sm btn-dark" onClick={onOpenModal}>COLLECT CLOUT <i className="fas fa-camera-retro"></i></button> */}
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};