describe("Thermostat", function() {
  var thermostat;
  var initial;

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
    expect(function() {thermostat._changeTemp(-11)}).toThrow()
  });
});
