import { Toast, ToastContainer } from "react-bootstrap";
export const ToastRiskFreeFlip = ({ riskFreeFlip, show, onClose }: any) => {
  return (
    <ToastContainer position="bottom-start" className="p-3 position-fixed">
      <Toast className="" onClose={onClose} show={show} delay={10000} autohide>
        <Toast.Body>
          <div className="d-flex flex-row px-2 py-1">
            <div className="fa-lg d-flex">
              <i className="fa-solid fa-handshake my-auto fa-animation-duration-3s fa-shake"></i>
            </div>
            <div className="d-flex flex-column ms-3 w-100">
              <h6 className="mb-0 d-flex">
                {
                  !!riskFreeFlip?.actualAmount &&
                  <>
                   Welcome {riskFreeFlip?.name} Member
                  </>
                }
                {
                  !riskFreeFlip?.actualAmount &&
                  <>
                    Welcome {riskFreeFlip?.name} Member
                  </>
                }
              </h6>
              <div className="text-gray">
                {
                  !!riskFreeFlip?.actualAmount &&
                  <>
                    Bummer you lost, but luckily {riskFreeFlip?.name} has your back. Check your wallet.
                  </>
                }
                {
                  !riskFreeFlip?.actualAmount &&
                  <>
                    Congrats on the win! You're on your own from here out.
                  </>
                }
              </div>
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};