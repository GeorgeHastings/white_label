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
let coin;
let quote;
let blueQuote;
let goldQuote;
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

const loadImages = () => {
  coin = new Image();
  coin.onload = function() {
    ctx.drawImage(coin, -3000, -3000);
  };
  coin.src = 'assets/images/coin.png';

  quote = new Image();
  quote.onload = function() {
    ctx.drawImage(quote, -3000, -3000);
  };
  quote.src = 'assets/images/quote_1.png';

  blueQuote = new Image();
  blueQuote.onload = function() {
    ctx.drawImage(blueQuote, -3000, -3000);
  };
  blueQuote.src = 'assets/images/quote_2.png';

  goldQuote = new Image();
  goldQuote.onload = function() {
    ctx.drawImage(goldQuote, -3000, -3000);
  };
  goldQuote.src = 'assets/images/quote_3.png';
};

const initCanvas = (id, fitToParent) => {
  canvas = document.getElementById(id);
  ctx = canvas.getContext('2d');
  // loadImages();
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

class Confetti {
  constructor(index, width, height, speed, x, y, rotation) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.color = COLORS[randomInt(0, COLORS.length)];
    this.seed = randomInt(0, 10);
    this.ticks = 0;
  }
  update() {
    const y = this.y += this.speed;
    const x = this.x + Math.sin(this.y/50 + this.seed) * 2;
    this.x = x > canvasWidth ? 0 : x;
    this.y = y;
    ctx.fillStyle = this.color;
    ctx.save();
    if(this.ticks <= 16) {
      ctx.globalAlpha = this.ticks/16;
    }
    ctx.translate(x + (this.width/2), y*2 + (this.height/2) );
    ctx.rotate( (this.rotation*this.speed * 1.5) * (Math.PI/180) );
    ctx.scale(Math.cos(y/10), 1);
    ctx.fillRect(
      -this.width/2,
      -this.height/2,
      this.width,
      this.height
    );
    ctx.restore();
    this.rotation++;
    this.ticks++;
  }
}

class Coin {
  constructor(index, width, height, speed, x, y, rotation, image) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.image = image;
  }
  update() {
    const acc = this.speed;
    const y = this.y < canvasHeight + this.height ? this.y + acc : -this.height;
    const x = this.x;
    this.x = x;
    this.y = y;
    this.rotation++;
    ctx.save();
    ctx.translate(x + (this.width/2), y*2 + (this.height/2) );
    ctx.rotate(y/2 * Math.PI/180);
    ctx.drawImage(
      this.image,
      -(this.width/2),
      -(this.height/2),
      this.width,
      this.height
    );
    ctx.restore();
  }
}

class Quote {
  constructor(index, width, height, speed, x, y, image, points) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.image = image;
    this.dirX = Math.random() > 0.5 ? this.speed : -this.speed;
    this.dirY = Math.random() > 0.5 ? this.speed : -this.speed;
    this.ticks = 0;
    this.exit = 1;
    this.points = points;
    this.clicked = false;
  }
  update() {
    if(this.x + this.width > canvasWidth) {
      this.dirX = -this.speed;
    }
    if(this.x <= 0) {
      this.dirX = this.speed;
    }
    if(this.y > canvasHeight) {
      this.dirY = -this.speed;
    }
    if(this.y <= 0) {
      this.dirY = this.speed;
    }
    const y = this.y += this.dirY;
    const x = this.x += this.dirX;
    this.x = x;
    this.y = y;
    ctx.save();
    if(this.ticks <= 16) {
      ctx.globalAlpha = this.ticks/16;
    }
    if(this.clicked) {
      this.y = this.y - (4 * (1 + this.exit/250));
      ctx.globalAlpha = (2/this.exit);
      this.exit++;
    }
    ctx.translate(x, y);
    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height
    );
    ctx.restore();
    this.ticks++;
  }
}

const buildCoin = count => {
  const x = random(0, canvasWidth);
  const speed = 1;
  const width = 30;
  const height = 30;
  const y = -height;
  return new Coin(count, width, height, speed, x, y, random(0, 360), coin);
};

const buildQuote = count => {
  const x = random(0, canvasWidth);
  const speed = 1;
  const width = 45;
  const height = 60;
  const y = random(0, canvasHeight);
  const roll = Math.random()*10;
  let image;
  let points = 100;
  if(roll < 0.05) {
    image = goldQuote;
    points = 5000;
  } else if (roll < 1) {
    image = blueQuote;
    points = 250;
  } else {
    image = quote;
  }

  return new Quote(count, width, height, speed, x, y, image, points);
};

const buildEmoji = count => {
  const x = random(0, canvasWidth);
  const speed = random(2.2, 2.8);
  const width = 60;
  const height = 60;
  return new Emoji(count, width, height, speed, x, -height, random(0, 360));
};

const buildConfetti = count => {
  const x = random(0, canvasWidth);
  const speed = random(2.4, 3.2);
  const width = 40 / speed;
  const height = 70 / speed;
  return new Confetti(count, width, height, speed, x, random(-200, canvasHeight/2), random(0, 360));
};

const renderWingdings = (amt, int, type, loop) => {
  const AMOUNT = amt || 50;
  const INTERVAL = int || 20;
  let count = 0;
  let start;
  let wingdings = [];
  let stagger = setInterval(() => {
    if(count < AMOUNT) {
      const wingding = type(count);
      wingdings.push(wingding);
    }
    else {
      clearInterval(stagger);
    }
    count++;
  }, INTERVAL);

  const drawWingdings = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const remove = [];
    let len = wingdings.length;

    for (var i = 0; i < len; i++) {
      const shouldRemove = wingdings[i].y > canvasHeight + wingdings[i].height && !loop || wingdings[i].exit > 16;
      if(shouldRemove) {
        remove.push(i);
      }
      else {
        wingdings[i].update();
      }
    }

    remove.forEach(wingding => {
      wingdings.splice(wingding, 1);
    });

    if(wingdings.length > 0) {
      requestAnimationFrame(drawWingdings);
    }
  };

  setTimeout(() => {
    drawWingdings();
  }, INTERVAL);
};

const killWingdings = () => {
  wingdings.length = 0;
};

export const dropConfetti = id => {
  initCanvas(id, false);
  renderWingdings(300,10, buildConfetti, false);
};

const dropCoins = id => {
  initCanvas(id, true);
  renderWingdings(50,75, buildCoin, false);
};

const dropQuotes = id => {
  let score = 0;
  initCanvas(id, true);
  renderWingdings(20,10, buildQuote, true);

  document.getElementById(id).onmousedown = e => {
    wingdings.forEach((quote, index) => {
      const hits =
        e.pageX > quote.x &&
        e.pageX < quote.x + quote.width &&
        e.pageY > quote.y &&
        e.pageY < quote.y + quote.height;
      if(hits) {
        quotesCollected++;
        quote.clicked = true;
        document.getElementById('quotesCollected').innerHTML = `${score += quote.points}`;
        wingdings.push(buildQuote());
      }
    });
  };
};
