import { DateTime } from "luxon";
import { Toast, ToastContainer } from "react-bootstrap";
const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const constants = {
  DEGEN_HOURS_START_1: DateTime.fromISO(`2022-07-07T17:00:00.000`, { zone: 'UTC' }).setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL),
  DEGEN_HOURS_START_2: DateTime.fromISO(`2022-07-08T07:00:00.000`, { zone: 'UTC' }).setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL),
  UNBOX_START_1: DateTime.fromISO(`2022-07-19T18:00:00.000`, { zone: 'UTC' }).setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL),
  UNBOX_START_2: DateTime.fromISO(`2022-07-08T09:00:00.000`, { zone: 'UTC' }).setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL),
}

const DFC_LOGO = "https://i.imgur.com/ktbTTvH.jpg";
export const ToastWhitelistKey = ({ show, onClose }: any) => {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   if (show) fetchCount();
  // }, [show]);

  // const fetchCount = async () => {
  //   const c = await getCoinFlipWLRewardCount(walletId);
  //   console.log(c);
  //   setCount(c?.count);
  // }
  return (
    <ToastContainer position="bottom-start" className="p-3 position-fixed">
      <Toast className="d-inline-block m-1" onClose={onClose} show={show} delay={13000} autohide>
        <Toast.Header>
          <strong className="me-auto d-inline-block"><i className="fas fa-treasure-chest"></i> CONGRATS, YOU EARNED A WL BOX</strong>
        </Toast.Header>
        <Toast.Body>
          <>
            <div className="d-flex flex-row">
              <img className='image-xs rounded-circle me-1'
                src={DFC_LOGO}
                alt={'dfc'} />
              <div className="d-flex flex-column ms-1 w-100">
                {/* <div className="d-inline-flex">
                  <small className="">EARNED {count}{count > 1 ? ' BOXES TOTAL' : ' BOX'}</small>
                </div> */}
                Open boxes during our unboxing events for chance to guarantee WL. <br /><br />Next unboxing event:<br />{constants.UNBOX_START_1}
                <br />
                <br />
                <span className="mb-0 d-flex">
                  <a href={`https://twitter.com/degenfatcats`} target="_blank" rel="noopener noreferrer">
                    More info at&nbsp;
                    <b className="">
                      @degenfatcats
                    </b><i className="fa-brands fa-sm fa-twitter ms-2"></i></a>
                </span>
              </div>
            </div>
          </>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};