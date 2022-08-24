import { timeAgo } from "../utils/dates";

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

export const onClickUrl = (url) => () => openInNewTab(url)

export function FlipRow({ flip, type, defaultProfilePicture }) {
    let user = flip.nickname ?? `Wallet (${flip?.walletId?.slice(0, 4)})`;
    let color = 'inherit';
    let text = '';
    if (type === "winStreak") {
        text = ` is on a ${flip.winStreak} win streak.`
    } else {
        text = ` flipped ${flip?.amount} and got rugged.`;
        if (flip.won) {
            text = ` flipped ${flip?.amount} and`;
            color = flip.amount < 1 ? 'MediumSeaGreen' : '#f4a200';
        }
    }

    return (
        <li key={flip.createdAt} className="list-group-item d-flex p-2">
            <div className="d-flex">
                <div className="profile-picture">
                    <img className='image rounded-circle'
                        src={flip.profileImageUrl ?? defaultProfilePicture}
                        alt={flip.nickname?.charAt(0) ?? ''}
                        onError={(e) => {
                            if (e.target.src !== defaultProfilePicture) { e.target.onerror = null; e.target.src = defaultProfilePicture; }
                        }} />

                </div>
                {
                    type === 'winStreak' &&
                    <div className="title mb-auto ms-2">{user}{text}</div>
                }
                {
                    type !== 'winStreak' && flip.amount < 1 &&
                    <div className="title mb-auto ms-2">{user}{text} {flip.won && <span style={{ color }}> doubled{flip.winStreak > 1 ? ` ${flip.winStreak} times.` : '.'}</span>}</div>
                }
                {
                    type !== 'winStreak' && flip.amount >= 1 &&
                    <div className={"title mb-auto ms-2" + (flip?.amount >= 3 ? " whale-text" : "")} style={{ color, fontWeight: 900 }}>{user}{text} {flip.won && <span> doubled{flip.winStreak > 1 ? ` ${flip.winStreak} times.` : '.'}</span>}</div>
                }
                <small className="ms-auto mt-auto time-in-row">{timeAgo(flip.createdAt)}</small>
            </div>
        </li>
    )
}