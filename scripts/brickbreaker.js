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
let canvasWidth = window.innerWidth - canvasX;
let canvasHeight = window.innerHeight - canvasY;
let mouseX = 500;

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

class Ball {
  constructor(args) {
    this.height = args.height;
    this.width = args.width;
    this.x = args.x;
    this.y = args.y;
    this.color = args.color;
    this.direction = {
      x: args.speed,
      y: -args.speed
    };
    this.speed = args.speed;
  }

  update() {
    const x = this.x;
    const y = this.y;

    ctx.clearRect(x - this.width/2 - this.speed, y - this.width/2 - this.speed, this.width + this.speed*2, this.height + this.speed*2);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x,y,this.width/2,0,2*Math.PI);
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

    ctx.clearRect(0, canvasHeight - this.height, canvasWidth, 50);
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
    height: 50,
    width: 200,
    x: randomInt(0, canvasWidth),
    color: '#FD337D',
    speed: 10
  });
};

const createBlocks = (rows, columns) => {
  const blocks = [];
  const width = (canvasWidth/columns);
  const height = 50;
  let yPos = 0;
  let xPos = 0;
  for(let i = 0; i < (columns * rows); i++) {
    xPos = i % columns;
    if(i % columns === 0) {
      yPos++;
    }
    blocks.push(new Block({
      height: height - 10,
      width: width - 10,
      x: xPos * width,
      y: (yPos * height),
      color: '#0D00FF'
    }));
  }
  return blocks;
};

const createBall = () => {
  return new Ball({
    height: 50,
    width: 50,
    x: randomInt(0, canvasWidth),
    y: randomInt(300, canvasHeight),
    color: '#FD337D',
    speed: 8
  });
};

const ball = createBall();
const blocks = createBlocks(3, 8);
const paddle = createPaddle();

const renderBlocks = () => {
  ctx.clearRect(0, 0, canvasWidth, 4 * 50 + 15);
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

const checkForBlockHit = () => {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const hitY = ball.y - ball.height/2 - 2 <= block.y + block.height;
    const hitX = ball.x >= block.x && ball.x + ball.width/2 <= block.x + block.width;
    if(hitY && hitX) {
      blocks.splice(i, 1);
      ball.direction.y = ball.speed;
      renderBlocks();
      return;
    }
  }
};

const bindMouseEvents = () => {
  window.onmousemove = ev => {
    mouseX = ev.pageX;
  };
};

const tick = () => {
  const hitsPaddleY = ball.y + ball.height/2 >= canvasHeight - paddle.height;
  const hitsPaddleX = ball.x >= paddle.x && ball.x < paddle.x + paddle.width;
  const missesPaddle = ball.y + ball.height/2 > canvasHeight;
  const hitsRightWall = ball.x + ball.width/2 >= canvasWidth;
  const hitsLeftWall = ball.x < canvasX;
  const hitsCeiling = ball.y - ball.height/2 < canvasY;

  if(hitsLeftWall) {
    ball.direction.x = ball.speed;
  }
  if(hitsRightWall) {
    ball.direction.x = -ball.speed;
  }

  if(hitsCeiling) {
    ball.direction.y = ball.speed;
  }
  if(hitsPaddleY && hitsPaddleX) {
    // ball.speed = paddle.width/(ball.x + ball.width/2 - paddle.x) * 2;
    ball.direction.y = -ball.speed;
  }
  if(missesPaddle) {
    ball.y = 300;
    ball.x = 500;
    ball.direction.x = ball.speed;
    ball.direction.y = ball.speed;
  }

  ball.x = ball.x + ball.direction.x;
  ball.y = ball.y + ball.direction.y;

  paddle.x = paddle.x + (mouseX - paddle.x - paddle.width/2)/paddle.speed;

  ball.update();
  paddle.update();

  checkForBlockHit();

  if(blocks.length > 0) {
    requestAnimationFrame(tick);
  }
};
