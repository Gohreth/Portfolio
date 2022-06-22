import { useContext, useEffect, useRef } from "react";
import { UIContext } from "../App";
import { checkWithDelay } from "../helpers/scrollCheck";

const ScrollContainer = ({ children }) => {
  const containerRef = useRef(null);
  const { updateSection } = useContext(UIContext);
  useEffect(() => {
    containerRef.current.addEventListener("scroll", (event) =>
      checkWithDelay(event, "vertical", 100, updateSection)
    );

    return () => {
      containerRef.current.removeEventListener("scroll", (event) =>
        checkWithDelay(event, "vertical", 100, updateSection)
      );
    };
  }, []);
  return (
    <div className="container" ref={containerRef}>
      {children}
    </div>
  );
};

export default ScrollContainer;
