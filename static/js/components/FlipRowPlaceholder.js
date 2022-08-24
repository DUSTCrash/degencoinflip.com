export function FlipRowPlaceholder({ key }) {
    return (
        <li key={key} className="list-group-item d-flex p-2">
            <div className="w-100">
                <div className="placeholder-glow">
                    <span className="placeholder col-8 h-1per"></span>
                </div>
                <p className="placeholder-glow">
                    <small className="ms-auto mt-auto time-in-row placeholder col-2 time-placeholder">1</small>
                </p>
            </div>
        </li>
    )
}