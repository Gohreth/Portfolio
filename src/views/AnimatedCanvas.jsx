import { useEffect, useRef } from "react";
import "./animatedCanvas.css";

let ctx, characterImage, widthOffset, heightOffset;

const drawCharacterIdle = (context, image, offsetX, offsetY, width, height) => {
  context.drawImage(
    image,
    offsetX,
    offsetY,
    width,
    height,
    0,
    4,
    width,
    height
  );
};

const standUpAnimation = async (
  context,
  image,
  offsetXFactor,
  offsetY,
  width,
  height
) => {
  for (let i = 2; i >= 0; i--) {
    context.drawImage(
      image,
      offsetXFactor * i,
      offsetY,
      width,
      height,
      0,
      4,
      width,
      height
    );
    await new Promise((r) => setTimeout(r, 1000 * 0.25));
    context.clearRect(0, 0, 48, 48);
  }
  context.drawImage(image, 0, 0, width, height, 0, 4, width, height);
};

const runningAnimation = async (
  context,
  image,
  offsetXFactor,
  offsetY,
  width,
  height
) => {
  const iterations = 3;
  await new Promise((r) => setTimeout(r, 1000 * 0.25));
  context.clearRect(0, 0, 48, 48);
  for (let i = 0; i <= 5 * iterations; i++) {
    context.drawImage(
      image,
      offsetXFactor * (i % 6),
      offsetY,
      width,
      height,
      0,
      4,
      width,
      height
    );
    await new Promise((r) => setTimeout(r, 1000 * 0.25));
    context.clearRect(0, 0, 48, 48);
  }
  drawCharacterIdle(
    context,
    characterImage,
    offsetXFactor * 2,
    offsetY * 4,
    width,
    height
  );
};

const AnimatedCanvas = ({ animationTrigger, onAnimationEnd }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    widthOffset = 48;
    heightOffset = 48;
    ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = 48;
    canvasRef.current.height = 48;
    characterImage = new Image();
    characterImage.src = "./sprites/player.png";
    characterImage.onload = () => {
      drawCharacterIdle(
        ctx,
        characterImage,
        widthOffset * 2,
        heightOffset * 4,
        widthOffset,
        heightOffset
      );
    };
  }, []);

  useEffect(() => {
    //console.log(ctx);
    const animation = async () => {
      await standUpAnimation(
        ctx,
        characterImage,
        widthOffset,
        heightOffset * 4,
        widthOffset,
        heightOffset
      );

      await runningAnimation(
        ctx,
        characterImage,
        widthOffset,
        heightOffset * 1,
        widthOffset,
        heightOffset
      );
    };

    if (animationTrigger) {
      animation();
      onAnimationEnd();
    }
  }, [animationTrigger]);

  return <canvas ref={canvasRef}></canvas>;
};

export default AnimatedCanvas;
