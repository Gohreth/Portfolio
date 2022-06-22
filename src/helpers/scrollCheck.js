var timer;
var currentSection = "about";

const checkDirectionalScroll = (event, scrollDirection, func) => {
  let newSection;
  switch (scrollDirection) {
    case "horizontal":
      console.log(
        event.target.offsetWidth,
        event.target.scrollWidth,
        event.target.scrollLeft
      );
      if (event.target.scrollLeft >= event.target.scrollWidth * 0.5) {
        newSection = "skills";
      } else {
        newSection = "about";
      }
      break;
    case "vertical":
      console.log(
        event.target.offsetHeight,
        event.target.scrollHeight,
        event.target.scrollTop
      );
      if (event.target.scrollTop < event.target.offsetHeight * 1) {
        newSection = "about";
      } else if (
        event.target.scrollTop >= event.target.offsetHeight * 1 &&
        event.target.scrollTop < event.target.offsetHeight * 2
      ) {
        newSection = "projects";
      } else {
        newSection = "contact";
      }
      break;
    default:
      break;
  }
  if (newSection !== currentSection) {
    currentSection = newSection;
    func(newSection);
  }
};
export const checkWithDelay = (event, scrollDirection, delay, func) => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(
    () => checkDirectionalScroll(event, scrollDirection, func),
    delay
  );
};
