describe("grid :",function(){
  var grid;
  before(function(){
    grid = new Grid();
  })
  describe("compute page coordinates",function(){
    it("without offset",function(){
      var options = {offset:{x:0,y:0},tile_size:200};
      var count = 5;
      var tests = [{x:0,y:0},{x:1,y:0}];
      var results = [{x:0,y:0},{x:100,y:50}];
      tests.forEach(function(test,index){
        var page = grid.getPageCoordinates(test.x,test.y,options);
        expect(page.x).to.equal(results[index].x);
        expect(page.y).to.equal(results[index].y);
      })
    })
    it("with offset",function(){
      var options = {offset:{x:100,y:100},tile_size:200};
      var count = 5;
      var tests = [{x:0,y:0}];
      var results = [{x:-100,y:-100}];
      tests.forEach(function(test,index){
        var page = grid.getPageCoordinates(test.x,test.y,options);
        expect(page.x).to.equal(results[index].x);
        expect(page.y).to.equal(results[index].y);
      })
    })
    it("with origin",function(){
      var options = {origin:{x:1000,y:500},tile_size:200};
      var count = 5;
      var tests = [{x:0,y:0}];
      var results = [{x:1000,y:500}];
      tests.forEach(function(test,index){
        var page = grid.getPageCoordinates(test.x,test.y,options);
        expect(page.x).to.equal(results[index].x);
        expect(page.y).to.equal(results[index].y);
      })
    })
  })
  describe("compute map coordinates",function(){
    it("without offset",function(){
      var options = {offset:{x:0,y:0},tile_size:200};
      var count = 5;
      var tests = [{x:0,y:0},{x:100,y:50}];
      var results = [{x:0,y:0},{x:1,y:0}];
      tests.forEach(function(test,index){
        var page = grid.getMapCoordinates(test.x,test.y,options);
        expect(page.x).to.equal(results[index].x);
        expect(page.y).to.equal(results[index].y);
      })
    })
    it("with offset",function(){
      var options = {offset:{x:100,y:50},tile_size:200};
      var count = 5;
      var tests = [{x:0,y:0},{x:100,y:50}];
      var results = [{x:1,y:0},{x:2,y:0}];
      tests.forEach(function(test,index){
        var page = grid.getMapCoordinates(test.x,test.y,options);
        expect(page.x).to.equal(results[index].x);
        expect(page.y).to.equal(results[index].y);
      })
    })
    it("with origin",function(){
      var options = {origin:{x:500,y:500},tile_size:200};
      var count = 5;
      var tests = [{x:500,y:500}];
      var results = [{x:0,y:0}];
      tests.forEach(function(test,index){
        var page = grid.getMapCoordinates(test.x,test.y,options);
        expect(page).to.deep.equal(results[index]);
      })
    })

  })
  it("coordinates conversion should be reversible", function(){
    var options = {offset:{x:0,y:0},tile_size:200};
    var count = 5;
    for(var i=-count;i<count;i++){
      for(var j = -count; j<count;j++){
        var page = grid.getPageCoordinates(i,j,options);
        var maps = grid.getMapCoordinates(page.x,page.y,options);
        expect(maps.x).to.equal(i);
        expect(maps.y).to.equal(j);
      }
    }
  })
  it("round map coordinates correctly when needed", function(){
    var options = {offset:{x:0,y:0},tile_size:200};
    var count = 5;
    for(var i=-count;i<count;i++){
      for(var j = -count; j<count;j++){
        var page = grid.getPageCoordinates(i,j,options);
        for(var k = -options.tile_size+1; k < options.tile_size;k+=(options.tile_size-1)/9){
          //For this given k offset, max admissible l offset is :
          var offset_local_max = ( (options.tile_size/2 - Math.abs(k)) / (options.tile_size/2) ) * ( options.tile_size/4 );
          for(var l = -offset_local_max+1; l < offset_local_max;l+=(options.tile_size-1)/9){
            var maps = grid.getMapCoordinates(page.x+k,page.y+l,options);
              expect(maps.x).to.equal(i);
              expect(maps.y).to.equal(j);
          }
        }
      }
    }
  })
})
