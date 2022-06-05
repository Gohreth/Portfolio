import { useCallback, useEffect, useState } from "react";
import "./typewritter.css";

const Typewritter = ({ roles }) => {
  const [index, setIndex] = useState(0);

  const tick = () => {
    setIndex((prevState) => (prevState + 1) % 2);
  };

  useEffect(() => {
    const intervalIdentifier = setInterval(tick, 5000);
    return () => {
      clearInterval(intervalIdentifier);
    };
  }, []);
  return (
    <div className="typewriter">
      <p>{roles[index]}</p>
    </div>
  );
};

export default Typewritter;
