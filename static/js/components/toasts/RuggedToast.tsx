import { Toast, ToastContainer } from "react-bootstrap";

export const ToastRugged = ({ show, onClose }: any) => {
  return (
    <ToastContainer position="bottom-start" className="p-3 position-fixed">
      <Toast onClose={onClose} show={show} delay={5000} autohide className="w-100">
        <Toast.Header className="border-0 rounded-1" closeButton={false}>
          <img src="https://i.imgur.com/saZDerL.gif" className="img-fluid rounded-sm ms-1 my-1 me-2" alt="Juan Joya Borja" style={{ maxWidth: '18px' }} />
          <div className="text-gray my-1 me-1">
            Better luck next time fucker.
          </div>
        </Toast.Header>
        {/* <Toast.Body >
        </Toast.Body> */}
      </Toast>
    </ToastContainer>
  );
};