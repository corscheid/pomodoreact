interface ClockProps {
  type: string;
  time: number;
  style: { color: string }
}

export default function Clock(props: ClockProps): JSX.Element {
  let { type, time, style } = props;
  let minutes: number = Math.floor(time / 60);
  let seconds: number = Math.floor((time / 60 - minutes) * 60);
  let minutesStr: string;
  let secondsStr: string;

  if (seconds < 10) {
    secondsStr = "0" + seconds.toString();
  } else {
    secondsStr = "" + seconds.toString();
  }

  if (minutes < 10) {
    minutesStr = "0" + minutes.toString();
  } else {
    minutesStr = "" + minutes.toString();
  }

  return (
    <div className="Clock">
      <h2 id="timer-label">{type}</h2>
      <div id="time-left" style={style}>{`${minutesStr}:${secondsStr}`}</div>
    </div>
  );
}