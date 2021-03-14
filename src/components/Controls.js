export default function Controls({ isCounting, onPlayPause, onReset }) {
  return (
    <div className="controls">
      <button id="start_stop" className="btn" onClick={onPlayPause}>
        {isCounting ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}
      </button>
      <button id="reset" className="btn" onClick={onReset}>
        <i className="fas fa-redo"></i>
      </button>
    </div>
  );
}