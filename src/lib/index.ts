// https://gist.github.com/AlexJWayne/1d99b3cd81d610ac7351
export const accurateInterval = function (fn: () => void, time: number): { cancel: () => void } {
  let cancel: () => void;
  let nextAt: number;
  let timeout: NodeJS.Timeout;
  let wrapper: () => void;
  nextAt = new Date().getTime() + time;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};

export const BEEP_SOUND_URL = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

export const colors = {
  RED: "#ff5252",
  WHITE: "#ffffff"
}