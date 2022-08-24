import { Toast, ToastContainer } from "react-bootstrap";
export const ToastDegenHours = ({ show, onClose, riskFreeFlips, onOpenModal }: any) => {
  return (
    <ToastContainer position="top-end" className="p-3 position-fixed z-index-10">
      <Toast onClose={onClose} show={show} delay={6000} autohide>
        <Toast.Body>
          <div className="d-flex flex-row px-2 py-1">
            {/* <div className="fa-lg d-flex">
              <img src="https://i.imgur.com/sz4iGhl.png" className="img-fluid mb-1" style={{ maxWidth: '32px', height: '100%' }} />
            </div> */}
            <div className="d-flex flex-column w-100">
              <h6 className="mb-0 d-flex">
                You've flipped over {riskFreeFlips?.data?.whale} SOL and earned {riskFreeFlips?.results?.length} x 1 sol risk free flips.
              </h6>
              <div className="text-gray">
                <a href="#!" onClick={ev => { ev.preventDefault(); onOpenModal(); }}>
                  Learn More.
                </a>
              </div>
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};