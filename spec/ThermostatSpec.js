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


  it("starts at 20 degrees", function() {
    expect(thermostat.temp).toEqual(20);
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
    expect(function() {thermostat._changeTemp(-11)}).toThrow();
  });

  it("cannot change the temperature above 25 if power saving mode is on", function() {
    expect(function() {thermostat._changeTemp(6)}).toThrow();
  });

  it("cannot change the temperature above 32 if power saving mode is off", function() {
    thermostat.powerSaver = false;
    expect(function() {thermostat._changeTemp(6)}).not.toThrow();
    expect(function() {thermostat._changeTemp(13)}).toThrow();
  });

  it("knows when the maximum temperature has been reached in powersave mode", function() {
    expect(thermostat._maxTempReached(6)).toBe(true);
  });

  it("knows when the maximum temperature has been reached outside powersave mode", function() {
    thermostat.powerSaver = false;
    expect(thermostat._maxTempReached(6)).toBe(false);
    expect(thermostat._maxTempReached(13)).toBe(true);
  });
});
