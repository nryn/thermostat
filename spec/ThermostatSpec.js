"use strict";

describe("Thermostat", function() {
  var thermostat;
  var initial;
  var powerSave

  it("checks to see if it exists", function() {
    expect(Thermostat).not.toBeUndefined();
  });

  beforeEach(function() {
    thermostat = new Thermostat();
    initial = thermostat.temp
  });


  it("starts at the default temperature", function() {
    expect(thermostat.temp).toEqual(thermostat.DEFAULT_TEMP);
  });

  it("can increase the temperature", function() {
    expect(thermostat.up()).toEqual(initial + 1);
  });

  it("can decrease the temperature", function() {
    expect(thermostat.down()).toEqual(initial - 1);
  });

  it("can change the temperature", function() {
    expect(thermostat._changeTemp(-5)).toEqual(initial - 5)
  });

  it("cannot change the temperature below the minimum", function() {
    thermostat.temp = thermostat.MINIMUM_TEMP;
    expect(function() {thermostat._changeTemp(-1)}).toThrow();
  });

  it("cannot change the temperature above the maxmimum if power saving mode is on", function() {
    thermostat.temp = thermostat.POWER_SAVE_MAX;
    expect(function() {thermostat._changeTemp(1)}).toThrow();
  });

  it("cannot change the temperature above the maximum if power saving mode is off", function() {
    thermostat.powerSaver = false;
    thermostat.temp = thermostat.MAXIMUM_TEMP;
    expect(function() {thermostat._changeTemp(1)}).toThrow();
  });

  it("knows when the maximum temperature has been reached in powersave mode", function() {
    expect(thermostat._maxTempReached(thermostat.POWER_SAVE_MAX - thermostat.DEFAULT_TEMP + 1)).toBe(true);
  });

  it("knows when the maximum temperature has been reached outside powersave mode", function() {
    thermostat.powerSaver = false;
    expect(thermostat._maxTempReached(thermostat.POWER_SAVE_MAX - thermostat.DEFAULT_TEMP + 1)).toBe(false);
    expect(thermostat._maxTempReached(thermostat.MAXIMUM_TEMP - thermostat.DEFAULT_TEMP + 1)).toBe(true);
  });

  it("has a reset button which sets temperature to default temperature", function() {
    thermostat._changeTemp(5);
    expect(thermostat.resetTemp()).toEqual(initial);
  });

  it("can tell us our energy usage", function () {
    thermostat.temp = thermostat.MEDIUM_USAGE_THRESHOLD;
    expect(thermostat.checkUsage()).toEqual("medium");
    thermostat.temp = thermostat.LOW_USAGE_THRESHOLD;
    expect(thermostat.checkUsage()).toEqual("low");
    thermostat.powerSaver = false;
    thermostat.temp = thermostat.MEDIUM_USAGE_THRESHOLD + 1;
    expect(thermostat.checkUsage()).toEqual("high");
  });
});
