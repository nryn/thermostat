describe("Thermostat", function() {
  it("checks to see if it exists", function() {
    expect(Thermostat).not.toBeUndefined();
  });

  it("starts at 20 degrees", function() {
    var thermostat = new Thermostat();
    expect(thermostat.temp).toEqual(20);
  });
});
