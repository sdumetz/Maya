var events = require("events");

describe("test events synchronisation",function(){
  beforeEach(function(){
    this.socket = new events.EventEmitter();
    this.model = new Model();
    this.sync = new Sync(this.socket,this.model);
  })
  it("update",function(){
    this.socket.emit("update",[{x:1,y:0,content:"maison"},{x:2,y:1,content:"default"}])
    expect(this.model.tiles).to.have.property("length").above[1];
    expect(this.model.tiles[1][0]).to.have.property("name").that.equals("maison");
    expect(this.model.tiles[1][0]).to.have.property("src").that.equals(this.model.buildings["maison"].image);
    expect(this.model.tiles[2][1]).to.have.property("name").that.equal("default");
    expect(this.model.tiles[2][1]).to.have.property("src").that.equals(this.model.buildings["default"].image);
  })
})
