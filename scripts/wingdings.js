// const COLORS = [
//   ['#2408a1', '#2408a1'],
//   ['#4e42f9', '#2408a1'],
//   ['#cb355f', '#9e1655'],
//   ['#ffaea0', '#e57977'],
//   ['#faf0a3', '#faf0a3'],
//   ['#fff', '#fff'],
// ];

const COLORS = [
  ['#7B0198', '#001C7C'],
  ['#279ED7', '#4e42f9'],
  // ['#EA9B4A', '#3143C9'],
  ['#FF7FFC', '#ea7d5d'],
  ['#faf0a3', '#f58f8d'],
  ['#fff', '#fff'],
];

const wingdings = [];
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const createGrad = (y, height, colors) => {
  const grd = ctx.createLinearGradient(0,y-50,0,height/2 + y+50);
  grd.addColorStop(0,colors[0]);
  grd.addColorStop(1,colors[1]);
  return grd;
};

const initCanvas = (id, fitToParent) => {
  canvas = document.getElementById(id);
  ctx = canvas.getContext('2d');
  if(fitToParent) {
    canvasWidth = canvas.parentNode.offsetWidth;
    canvasHeight = canvas.parentNode.offsetHeight;
  } else {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

};

class Color {
  constructor(index, width, height, speed, x, y) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.yStart = y;
    this.ticks = this.index;
    this.tocks = this.index;
    this.color = COLORS[this.index];
  }
  draw() {
    const frames = Math.floor(canvasWidth/2);
    ctx.fillStyle = createGrad(this.y, this.height, this.color);
    ctx.beginPath();
    ctx.moveTo(this.x, this.yStart + this.height + 30);
    for(let i = 0; i < frames; i++) {
      const stop = i === frames;
      this.update(i, stop);
    }
    ctx.lineTo(this.x, this.y + this.height + 30);
    ctx.closePath();
    ctx.fill();
    this.x = 0;
    this.tocks++;
    this.ticks = this.index*1;
    this.y = this.yStart;
  }
  update(i, stop) {
    const phase = this.tocks/40;
    const waveFormA = Math.sin( this.ticks/30 + phase*2 );
    const waveFormB = Math.cos( this.ticks/20 + phase/2 );
    const amplitude = 40 + (20 * Math.cos(i/25));
    const y = this.y + (waveFormA + waveFormB) * amplitude;
    const x = i*2;
    this.x = x;
    this.height = this.height;
    this.y = stop ? y : this.yStart;
    ctx.lineTo(x, Math.round(y));
    this.ticks++;
  }
}

const buildColor = count => {
  const speed = 3;
  const width = 3;
  const height = Math.floor(canvasHeight/3);
  const x = -3;
  const y = Math.floor(count * (canvasHeight/7)) - 30;
  return new Color(count, width, height, speed, x, y);
};


const renderWingdings = (amt, int, type, animate) => {
  const AMOUNT = amt || 50;
  const INTERVAL = int || 20;
  wingdings.length = 0;

  for(let i = 0; i < AMOUNT; i++) {
    const wingding = type(i);
    wingdings.push(wingding);
  }

  const drawWingdings = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const remove = [];
    const len = wingdings.length;

    for (var i = 0; i < len; i++) {
      wingdings[i].draw();
    }

    remove.forEach(wingding => {
      wingdings.splice(wingding, 1);
    });

    if(wingdings.length > 0 && animate) {
      requestAnimationFrame(drawWingdings);
    }
  };

  drawWingdings();
};


export const dropColors = id => {
  initCanvas(id, true);
  renderWingdings(COLORS.length,1, buildColor, true);
};
