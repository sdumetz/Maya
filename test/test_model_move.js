describe("Model : move",function(){
  beforeEach(function(){
    this.model = new Model();
    count = 2;
    for(var x = -count; x <= count; x++){
      for (var y = -count; y <= count; y++){
        this.model.updateTile({x:x,y:y,content:"default"});
      }
    }

  })

  it("tiles should be modified",function(){
    var x = this.model.get(0,0).x;
    var y = this.model.get(0,0).y;
    this.model.move(400,800);
    expect(x).to.not.equal(this.model.get(0,0).x);
    expect(y).to.not.equal(this.model.get(0,0).y);
  })
})
