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
  if (this.temp + number > 25 && this.powerSaver === true) 
    throw "maximum temperature reached"
  return this.temp += number;
};
