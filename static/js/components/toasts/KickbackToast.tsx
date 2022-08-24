import { Toast, ToastContainer } from "react-bootstrap";
export const ToastKickback = ({ show, onClose }: any) => {
  return (
    <ToastContainer position="bottom-start" className="p-3 position-fixed">
      <Toast className="" onClose={onClose} show={show} delay={10000} autohide>
        <Toast.Body>
          <div className="d-flex flex-row px-2 py-1">
            <div className="fa-lg d-flex">
              <i className="fa-solid fa-credit-card my-auto fa-animation-duration-3s fa-flip"></i>
            </div>
            <div className="d-flex flex-column ms-3 w-100">
              <h6 className="mb-0 d-flex">
                You earned a Fee Free Flip!
              </h6>
              <div className="text-gray">
                You're welcome, and thanks for being a loyal Degen here at DCF.
              </div>
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};