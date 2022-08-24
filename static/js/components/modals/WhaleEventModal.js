import { DateTime } from "luxon";
import { Modal } from "react-bootstrap";

const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const SNAPSHOT_DATE_1 = DateTime.fromISO(`2022-08-12T18:00:00.000`, { zone: 'UTC' });
const SNAPSHOT_DATE_2 = DateTime.fromISO(`2022-08-14T18:00:00.000`, { zone: 'UTC' });
const SNAPSHOT_DATE_3 = DateTime.fromISO(`2022-08-15T18:00:00.000`, { zone: 'UTC' });
const SNAPSHOT_DATE_4 = DateTime.fromISO(`2022-08-16T18:00:00.000`, { zone: 'UTC' });
const END_DATE = DateTime.fromISO(`2022-08-19T19:00:00.000`, { zone: 'UTC' });

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
};

export function WhaleEventModal({ walletId, styleCss, ...props }) {

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
          <div className={"card-body p-4" + (styleCss === 'dark' ? ' pb-0' : '')} style={{ maxHeight: '484px', overflow: 'scroll' }}>
            <img src="https://i.imgur.com/anfy7rN.png" alt="banner" className="img-fluid mb-3 rounded-3"></img>
            <h4>Whalemode & Welcome Back Event!</h4>
            As a way to reward new whale flippers and welcome back our old whale flippers, we're giving back potentially THOUSANDS of sol this week in risk free flips.
            <br /><br />
            Every whale mode flip also has a 5% chance of earning treasure chests with sol and NFT prizes.
            <hr />
            <u>Qualifcations & Prizes</u>: <br />
            Player has 300 SOL or more = 3 risk free 1 sol flips
            <br />
            Player has 500 SOL or more = 5 risk free 1 sol flips (2 additional)
            <br />
            Player has 700 SOL or more = 7 risk free 1 sol flips (2 additional)
            <br />
            Player has 1000 SOL or more = 10 risk free 1 sol flips (3 additional)
            <br />
            <br />
            <u>Snapshot Date</u>: <br />
            300 SOL = {SNAPSHOT_DATE_1.setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL)}
            <br />
            500 SOL = {SNAPSHOT_DATE_2.setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL)}
            <br />
            700 SOL = {SNAPSHOT_DATE_3.setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL)}
            <br />
            1000 SOL = {SNAPSHOT_DATE_4.setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL)}
            <br />
            <br />
            Risk Free Flips will be activated one hour after snapshots. If you qualified, you will have a popup notification when you login.<br /><br />This event ends on {END_DATE.setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL)}. Any unused risk free flips will expire.
            <br/>
            <br/>
            Risk free flip refunds your flip up to 1 SOL. If you win the flip, you use up your risk free flip. Would not recommend using for smaller flips.
          </div>
          <div className="card-footer">
            <button
              className="btn btn-block w-100 btn-lg my-2 rounded-0 btn-warning"
              onClick={() => { localStorage.setItem('whale_event_aug', true); props.onHide() }}>
              OKAY
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
