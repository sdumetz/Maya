describe("Model.getTile",function(){
  var model
    , count
    , data;
  before(function(){
    model = new Model();
    count = 2;
    data = "sampleTile"
    for(var x = -count;x <= count;x++){
      for(var y = -count;y <= count;y++){
        model.setTile(x,y,data+x+y);
      }
    }

  })
  it("accept coordinates and return a tile",function(){
    model.getTile(0,0).then(function(tile){
      expect(tile).to.equal(data+"00");
    });
  })
  it("accept a center Object and a radius and return an array of tiles",function(){
    model.getTile({x:0,y:0},count).then(function(tile){
      for(var x = -count;x <= count;x++){
        for(var y = -count;y <= count;y++){
          expect(tile).to.contain.a.thing.that.equal(data+x+y);
        }
      }

    });
  })
})
