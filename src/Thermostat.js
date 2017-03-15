function Thermostat() {
  this.temp = 20;
  this.powerSaver = true;
};

Thermostat.prototype.up = function() {
  return this._changeTemp(+1);
};

Thermostat.prototype.down = function() {
  return this._changeTemp(-1);
};

Thermostat.prototype._changeTemp = function(number) {
  if (this.temp + number < 10)
    throw "minimum temparature reached";
  if (this._maxTempReached(number))
    throw "maximum temperature reached"
  return this.temp += number;
};

Thermostat.prototype._maxTempReached = function(number) {
  return (this.temp + number > 25 && this.powerSaver === true) || (this.temp + number > 32 && this.powerSaver === false);
};
