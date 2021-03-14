interface ControlsProps {
  isCounting: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

export default function Controls(props: ControlsProps): JSX.Element {
  let { isCounting, onPlayPause, onReset } = props;
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