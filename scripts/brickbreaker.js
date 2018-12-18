/*jshint esversion: 6 */

const COLORS = [
  '#0D00FF',
  '#00E5E6',
  '#FD8C6C',
  '#F6E403',
  '#FD337D',
  '#ffffff'
];
const EMOJIS = ['👏', '👌 ', '🥇', '🎊', '🎉 ', '💯', '💵'];
const wingdings = [];

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d').scale(2,2);
let canvasX = 0;
let canvasY = 0;
let canvasWidth = window.innerWidth - canvasX*2;
let canvasHeight = window.innerHeight - canvasY*2;
let mouseX = 500;
let blockWidth = 500;
let blockHeight = canvasHeight/18;
let ballRadius = canvasHeight/36;
let ballSpeed = canvasHeight/80;
let paddleHeight = canvasHeight/18;
let paddleWidth = canvasWidth/8;

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const initCanvas = (id, fitToParent) => {
  canvas = document.getElementById(id);
  ctx = canvas.getContext('2d');
  if(fitToParent) {
    canvasWidth = canvas.parentNode.offsetWidth;
    canvasHeight = canvas.parentNode.offsetHeight;
  }
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
};

class Block {
  constructor(args) {
    this.height = args.height;
    this.width = args.width;
    this.x = args.x;
    this.y = args.y;
    this.color = args.color;
  }
}

function clearCircle(context,x,y,radius) {
	context.save();
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, true);
	context.clip();
	context.clearRect(x-radius,y-radius,radius*2,radius*2);
	context.restore();
}

class Ball {
  constructor(args) {
    this.radius = args.radius;
    this.x = args.x;
    this.y = args.y;
    this.color = args.color;
    this.direction = {
      x: args.speed,
      y: -args.speed
    };
    this.speed = args.speed;
    this.speedX = args.speed;
    this.speedY = -args.speed;
  }

  update() {
    const x = this.x;
    const y = this.y;

    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(x - this.speedX,y - this.speedY, this.radius+1,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.arc(x,y,this.radius,0,2*Math.PI);
    ctx.fill();
  }
}

class Paddle {
  constructor(args) {
    this.height = args.height;
    this.width = args.width;
    this.x = args.x;
    this.y = canvasHeight - args.height;
    this.color = args.color;
    this.speed = args.speed;
  }

  update() {
    const x = this.x;
    const y = this.y;
    const againstLeftWall = mouseX - this.width/2 < 0;
    const againstRightWall = mouseX >= canvasWidth - this.width/2;

    if(againstLeftWall) {
      // this.x = 0;
      mouseX = this.width/2;
    } else if (againstRightWall) {
      mouseX = canvasWidth - this.width/2;
    }
    this.x = this.x + (mouseX - this.x - this.width/2)/this.speed;

    ctx.clearRect(0, canvasHeight - this.height-2, canvasWidth, this.height+2);
    ctx.fillStyle = this.color;
    ctx.fillRect(
      x,
      y,
      this.width,
      this.height
    );
  }
}

const createPaddle = () => {
  return new Paddle({
    height: paddleHeight,
    width: paddleWidth,
    x: randomInt(0, canvasWidth),
    color: '#FD337D',
    speed: 10
  });
};

const createBlocks = (rows, columns) => {
  const blocks = [];
  const width = (canvasWidth - 200)/columns;
  const height = blockHeight;
  let yPos = 1;
  let xPos = 0;
  for(let i = 0; i < (columns * rows); i++) {
    xPos = i % columns;
    if(i % columns === 0) {
      yPos++;
    }
    blocks.push(new Block({
      height: height - 10,
      width: width - 10,
      x: xPos * width + 100,
      y: (yPos * height),
      color: COLORS[randomInt(0, COLORS.length - 1)]
    }));
  }
  return blocks;
};

const createBall = () => {
  return new Ball({
    radius: ballRadius,
    x: 300,
    y: 500,
    color: '#FD337D',
    speed: ballSpeed
  });
};

const ball = createBall();
const blocks = createBlocks(3, 8);
const paddle = createPaddle();

const renderBlocks = () => {
  for (var i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    ctx.fillStyle = b.color;
    ctx.fillRect(
      b.x,
      b.y,
      b.width,
      b.height
    );
  }
};


export const initBlockBreaker = () => {
  initCanvas('canvas');
  renderBlocks();
  bindMouseEvents();
  tick();
};

const isHittingBlock = block => {
  const ballX = ball.x;
  const ballY = ball.y;
  const distX = Math.abs(ballX - block.x-block.width/2);
  const distY = Math.abs(ballY - block.y-block.height/2);

  if (distX > (block.width/2 + ball.radius)) { return false; }
  if (distY > (block.height/2 + ball.radius)) { return false; }

  if (distX <= (block.width/2)) {
    if(ballY - ball.radius < block.y + block.height) {
      ball.speedY = -ball.speedY;
    } else {
      ball.speedY = ball.speedY;
    }
    return true;
  }
  if (distY <= (block.height/2)) {
    if(ballX + ball.radius < block.x) {
      ball.speedX = -ball.speedX;
    } else {
      ball.speedX = ball.speedX;
    }
    return true;
  }

  const dx=distX-block.width/2;
  const dy=distY-block.height/2;

  if((dx*dx+dy*dy<=(ball.radius*ball.radius))) {
    ball.speedX = -ball.speedX;
    ball.speedY = -ball.speedY;
  }

  return (dx*dx+dy*dy<=(ball.radius*ball.radius));
};

const checkForBlockHit = () => {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if(isHittingBlock(block)) {
      ctx.clearRect(block.x-1, block.y-1, block.width+2, block.height+2);
      blocks.splice(i, 1);
      return;
    }
  }
};

const bindMouseEvents = () => {
  canvas.onmousemove = ev => {
    mouseX = ev.pageX;
  };
};

const tick = () => {
  const missesPaddle = ball.y > canvasHeight;
  const hitsRightWall = ball.x + ball.radius > canvasWidth;
  const hitsLeftWall = ball.x - ball.radius < canvasX;
  const hitsCeiling = ball.y - ball.radius < canvasY;

  if(hitsLeftWall) {
    ball.speedX = -ball.speedX;
  }
  if(hitsRightWall) {
    ball.speedX = -ball.speedX;
  }

  if(hitsCeiling) {
    ball.speedY = -ball.speedY;
  }
  if(isHittingBlock(paddle)) {
    const coefficient = (ball.x - paddle.x)/(paddle.width + ball.radius);
    const newSpeedY = 1;
    const newSpeedX = (-1 + coefficient*2);
    const newSpeed = (Math.abs(newSpeedX) + 1) * ball.speed;
    ball.speedX = newSpeed * newSpeedX;
    ball.speedY = -newSpeed * newSpeedY;
  }
  if(missesPaddle) {
    ball.y = 300;
    ball.x = 500;
    // ball.speed = ballSpeed;
    ball.speedX = ballSpeed;
    ball.speedY = ballSpeed;
  }

  ball.direction.x = ball.speedX;
  ball.direction.y = ball.speedY;

  ball.x = ball.x + ball.direction.x;
  ball.y = ball.y + ball.direction.y;

  ball.update();
  paddle.update();

  checkForBlockHit();

  if(blocks.length > 0) {
    requestAnimationFrame(tick);
  } else {
    ctx.clearRect(canvasX, canvasY, canvasWidth, canvasHeight);
  }
};

export class Game {
  constructor() {

  }

  init() {
    initCanvas('canvas');
    renderBlocks();
    bindMouseEvents();
    tick();
  }

  kill() {
    blocks.length = 0;
  }
}
