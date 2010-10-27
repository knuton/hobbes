describe('Extensions', function () {

  it('should create a prototypal heir', function () {
    var a = {iHasIt : true};
    var b = Object.create(a);
    expect(b.iHasIt).toBeTruthy();
  });

});
