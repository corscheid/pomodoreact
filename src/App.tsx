import React from 'react';

import { accurateInterval, BEEP_SOUND_URL } from './lib';
import TimeAdjuster from './components/TimeAdjuster';
import Clock from './components/Clock';
import Controls from './components/Controls';

interface AppProps { }

interface AppState {
  breakLength: number;
  sessionLength: number;
  isCounting: boolean;
  type: string;
  time: number;
  interval: any;
  color: { color: string };
}

class App extends React.Component<AppProps, AppState> {
  appTitle: string = 'PomodoReact';
  audioBeep!: HTMLAudioElement | null;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isCounting: false,
      type: "Session",
      time: 1500,
      interval: null,
      color: { color: "black" }
    };
    this.updateBreakLength = this.updateBreakLength.bind(this);
    this.updateSessionLength = this.updateSessionLength.bind(this);
    this.updateLength = this.updateLength.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.playAudioAlert = this.playAudioAlert.bind(this);
    this.switchType = this.switchType.bind(this);
    this.checkSwitch = this.checkSwitch.bind(this);
    this.countdown = this.countdown.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  updateBreakLength(e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
    this.updateLength(
      "breakLength",
      e.currentTarget.value,
      this.state.breakLength,
      "Break"
    );
  }

  updateSessionLength(e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void {
    this.updateLength(
      "sessionLength",
      e.currentTarget.value,
      this.state.sessionLength,
      "Session"
    );
  }

  updateLength(stateAttribute: string, operation: string, currentLength: number, type: string): void {
    if (this.state.isCounting) return;

    if (operation === "+" && currentLength !== 60) {
      if (this.state.type === type) {
        this.setState({
          ...this.state,
          [stateAttribute]: currentLength + 1,
          time: currentLength * 60 + 60
        });
      } else {
        this.setState({
          ...this.state,
          [stateAttribute]: currentLength + 1
        });
      }
    } else if (operation === "-" && currentLength !== 1) {
      if (this.state.type === type) {
        this.setState({
          ...this.state,
          [stateAttribute]: currentLength - 1,
          time: currentLength * 60 - 60
        });
      } else {
        this.setState({
          ...this.state,
          [stateAttribute]: currentLength - 1
        });
      }
    }
  }

  handlePlayPause(): void {
    if (!this.state.isCounting) {
      this.countdown();
      this.setState({ isCounting: true });
    } else {
      this.setState({ isCounting: false });
      if (this.state.interval) this.state.interval.cancel();
    }
  }

  decrementCount(): void {
    this.setState({ time: this.state.time - 1 });
  }

  changeColor(time: number): void {
    if (time < 61) {
      this.setState({ color: { color: "red" } });
    } else {
      this.setState({ color: { color: "black" } });
    }
  }

  playAudioAlert(time: number): void {
    if (this.audioBeep && time === 0) {
      this.audioBeep.play();
    }
  }

  switchType(newTime: number, newType: string): void {
    this.setState({
      time: newTime,
      type: newType,
      color: { color: "black" }
    });
  }

  checkSwitch(): void {
    let { time } = this.state;
    this.changeColor(time);
    this.playAudioAlert(time);
    if (time < 0) {
      if (this.state.interval) this.state.interval.cancel();
      if (this.state.type === "Session") {
        this.countdown();
        this.switchType(this.state.breakLength * 60, "Break");
      } else {
        this.countdown();
        this.switchType(this.state.sessionLength * 60, "Session");
      }
    }
  }

  countdown(): void {
    this.setState({
      interval: accurateInterval(() => {
        this.decrementCount();
        this.checkSwitch();
      }, 1000)
    });
  }

  handleReset(): void {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      isCounting: false,
      type: "Session",
      time: 1500,
      color: { color: "black" }
    });
    if (this.audioBeep) {
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    }
    if (this.state.interval) this.state.interval.cancel();
  }

  render(): JSX.Element {
    const { breakLength, sessionLength, type, time, isCounting } = this.state;

    return (
      <div className="App">
        <h1 className="App-title"><i className="fab fa-react"></i> {this.appTitle}</h1>

        <div className="settings">
          <TimeAdjuster
            type="Break"
            length={breakLength}
            onChange={this.updateBreakLength}
          />
          <TimeAdjuster
            type="Session"
            length={sessionLength}
            onChange={this.updateSessionLength}
          />
        </div>

        <div id="clock-container">
          <Clock type={type} time={time} />

          <Controls
            isCounting={isCounting}
            onPlayPause={this.handlePlayPause}
            onReset={this.handleReset}
          />
        </div>

        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src={BEEP_SOUND_URL}
        />
      </div>
    );
  }
}

export default App;