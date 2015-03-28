describe("Model : getIn",function(){
  beforeEach(function(){
    this.model = new Model();
  })

  it("return an array centered on a point of a given length",function(){
    var count = 2;
    for(var sx = -count; sx <= count; sx++){
      for (var sy = -count; sy <=count;sy++){
        for(var size = 1;size<=count*2;size++){
          var start = {x:sx,y:sy};
            expect(this.model.getIn(start,size)).to.have.property("length",(size+1)*(size+1));
        }
      }
    }
  })
  it("works without parameters",function(){
    var count = 2;
    for(var sx = -count; sx <= count; sx++){
      for (var sy = -count; sy <=count;sy++){
        for(var size = 1;size<=count*2;size++){
            this.model.offset ={x:sx*100,y:sy*100};
            this.model.grid_size = size;
            expect(this.model.getIn()).to.have.property("length",(size+1)*(size+1));
        }
      }
    }
  })
  it("always return valid tiles objects",function(){
    var tiles = this.model.getIn({x:0,y:0},2)
    expect(typeof tiles[0]).to.equal("object");
  })
})
