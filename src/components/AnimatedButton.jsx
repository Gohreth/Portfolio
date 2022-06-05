import "./animatedButton.css";

const AnimatedButton = ({ children, onEvent }) => {
  return (
    <button className="button--animated" onClick={onEvent}>
      {children}
    </button>
  );
};

export default AnimatedButton;
