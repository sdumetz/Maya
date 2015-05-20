describe("Sync.fetch",function(){
  beforeEach(function(){
    this.sync = new Sync({chunk:10});
    this.sync.request = function(){
      return new Promise(function(resolve,reject){
      });
    }
  })
  it("accept coordinates and return a Promise",function(){
    expect(this.sync.fetch(0,0)).to.be.instanceof(Promise);
  })
  it("return the same promise while chain called",function(){
    var p1 = this.sync.fetch(0,0);
    var p2 = this.sync.fetch(0,0);
    expect(p1).to.deep.equal(p2);
  })
  it("doesn't fire Sync.request twice",function(done){
    this.sync.request = function(x,y){
      done();
      return true;
    }
    var p1 = this.sync.fetch(0,0);
    var p2 = this.sync.fetch(0,0);
  })
})
