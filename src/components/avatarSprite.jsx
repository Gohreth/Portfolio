import { useEffect, useRef } from "react";
import "./avatarSprite.css";

class Player {
  constructor(gameWidth, gameHeight, image) {
    this.image = image;
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.width = 24;
    this.height = 24;
    this.frameX = 43; // player.png has only one row so frameY isn't needed
    this.maxFrame = 4; // frames quantity for each particular movement
    this.x = this.gameWidth / 2 - this.width / 2;
    this.y = this.gameHeight - this.height;
    this.framesPerSecond = 5;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.framesPerSecond; // 1000: 1000 ms = 1 s
  }

  draw(context, deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < 40) {
        this.frameX = 43;
      } else {
        this.frameX--;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * 0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

const AvatarSprite = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef) {
      canvasRef.current.width = 24;
      canvasRef.current.height = 24;
      const ctx = canvasRef.current.getContext("2d");
      const playerImage = new Image();
      playerImage.src = "./sprites/Girl-Sheet.png";

      playerImage.onload = () => {
        const player = new Player(24, 24, playerImage);
        let lastTime = 0;
        const animate = (timeStamp) => {
          //console.log(timeStamp);
          ctx.clearRect(0, 0, 24, 24);
          const deltaTime = timeStamp - lastTime;
          player.draw(ctx, deltaTime);
          lastTime = timeStamp;
          requestAnimationFrame(animate);
        };
        animate(0);
      };
    }
  }, []);
  return <canvas className="avatar-canvas" ref={canvasRef}></canvas>;
};

export default AvatarSprite;
