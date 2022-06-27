import "./animatedButton.css";

const AnimatedButton = ({ children, btnText, onEvent }) => {
  return (
    <button className="button--animated" btn-text={btnText} onClick={onEvent}>
      {children}
    </button>
  );
};

export default AnimatedButton;
