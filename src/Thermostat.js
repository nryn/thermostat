"use strict";

function Thermostat() {
  this.DEFAULT_TEMP = 20;
  this.temp = this.DEFAULT_TEMP;
  this.powerSaver = true;
  this.MINIMUM_TEMP = 10;
  this.MAXIMUM_TEMP = 32;
  this.POWER_SAVE_MAX = 25;
  this.LOW_USAGE_THRESHOLD = 17; // 18 to 24 = medium usage, 25+ is high
  this.MEDIUM_USAGE_THRESHOLD = 24;
};

Thermostat.prototype.up = function() {
  return this._changeTemp(+1);
};

Thermostat.prototype.down = function() {
  return this._changeTemp(-1);
};

Thermostat.prototype._changeTemp = function(number) {
  if (this.temp + number < this.MINIMUM_TEMP)
    throw "minimum temparature reached";
  if (this._maxTempReached(number))
    throw "maximum temperature reached"
  return this.temp += number;
};

Thermostat.prototype._maxTempReached = function(number) {
  return (this.temp + number > this.POWER_SAVE_MAX && this.powerSaver === true) || (this.temp + number > this.MAXIMUM_TEMP && this.powerSaver === false);
};

Thermostat.prototype.resetTemp = function() {
  return this.temp = this.DEFAULT_TEMP;
};

Thermostat.prototype.checkUsage = function() {
  if (this.temp <= this.LOW_USAGE_THRESHOLD)
    return "low";
  if (this.temp <= this.MEDIUM_USAGE_THRESHOLD)
    return "medium";
  return "high";
};
