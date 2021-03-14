export default function Clock({ type, time }) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor((time / 60 - minutes) * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = "" + seconds;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = "" + minutes;
  }

  return (
    <div className="Clock">
      <h2 id="timer-label">{type}</h2>
      <div id="time-left">{`${minutes}:${seconds}`}</div>
    </div>
  );
}