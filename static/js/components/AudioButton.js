const AudioButton = ({ muted, toggleMute }) => {
    return (
        <button className="btn btn-outline-dark d-block d-sm-flex" onClick={toggleMute}>
            <i className={"fas my-auto " + (muted ? "fa-volume-mute" : "fa-volume-up")}></i>
        </button>
    );
}

export default AudioButton;
