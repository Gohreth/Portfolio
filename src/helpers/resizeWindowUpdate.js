var timer;
export const resizeWithDelay = (delay, newValue, func) => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    func({
      type: "distance",
      payload: newValue, //TO-DO: Fix hardcoded value
    });
  }, delay);
};
