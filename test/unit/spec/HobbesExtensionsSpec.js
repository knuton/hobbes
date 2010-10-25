describe('Extensions', function () {

  it('should create a prototypal heir', function () {
    var a = {iHasIt : true};
    var b = Object.preate(a);
    expect(b.iHasIt).toBeTruthy();
  });

});
