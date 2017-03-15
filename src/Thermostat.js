function Thermostat() {
  this.temp = 20;
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
  return this.temp += number;
};
