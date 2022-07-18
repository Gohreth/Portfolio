import { useState } from "react";
import "./animatedButton.css";

const AnimatedButton = ({ children, btnText, onEvent }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    setIsDisabled(true);
    onEvent();
    const timeoutId = setTimeout(() => {
      setIsDisabled(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  };

  const buttonContent = (
    <>
      <p style={{ visibility: isDisabled ? "hidden" : "" }}>{children}</p>
      <div
        className="button--disabled__content"
        style={{ display: isDisabled ? "" : "none" }}
      >
        <p> &bull; </p>
        <p> &bull; </p>
        <p> &bull; </p>
      </div>
    </>
  );

  return (
    <button
      className={
        isDisabled ? "button--disabled button--animated" : "button--animated"
      }
      btn-text={btnText}
      onClick={handleClick}
    >
      {buttonContent}
    </button>
  );
};

export default AnimatedButton;
