function Game() {
  this.totScore = 0;
  this.maxFrames = 10;
  this.frames = [];
  this.framesCounter();
}

Game.prototype.newFrame = function () {
  this.frame = new Frame();
};

Game.prototype.framesCounter = function () {
  if (this.maxFrames-- > 0) {
    this.newFrame();
    console.log("New frame");
  }
  else {
    console.log("Well Played! This is your Final Score: " + this.totScore);
    throw new Error("Game Over");
  }
};

Game.prototype.pinsKnockedDown = function(number) {
  this.frame.countPins(number);
  this.totScore += number;
  console.log(this.totScore);
  if (this.frame.isSpare()) {
    console.log("Spare!");
    this.addBonuses();
    this.frames.push(this.frame);
    this.framesCounter();
  }
  else if (this.frame.isStrike()) {
    console.log("Strike!");
    this.addBonuses();
    this.frames.push(this.frame);
    this.framesCounter();
  }
  else if (this.frame.rollsNum == 0) {
    this.addBonuses();
    this.frames.push(this.frame);
    this.framesCounter();
  }
  // else if (this.isTenthFrame()) {
  //   this.frame.tenthFrame();
  // }
};

Game.prototype.addBonuses = function() {
  if (this.frames[this.frames.length -1] && this.frames[this.frames.length -1].isSpare()) {
    this._bonusSpare();
  }
  else if (this.frames[this.frames.length -1] && this.frames[this.frames.length -1].isStrike()) {
    this._bonusStrike();
  }
};

Game.prototype._bonusSpare = function() {
    this.totScore += this.frame.rolls[0].score;
    console.log("+ " + this.frame.rolls[0].score + " Bonus Spare!");
};

Game.prototype._bonusStrike = function() {
    this.totScore += this.frame.score;
    console.log("+ " + this.frame.score + " Bonus Strike!");
};

Game.prototype.isTenthFrame = function() {
  return this.maxFrames == 0;
};
