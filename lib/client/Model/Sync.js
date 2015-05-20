function Sync(options){
  options = options || {};
  this.size = options.chunk || 10;
  this.waited = [];
}
Sync.prototype.fetch = function(x,y){
  if(typeof this.waited[x] != "object" ){
    this.waited[x] =  [];
  }
  if(!this.waited[x][y]){
    this.waited[x][y] = this.request(x,y);
  }
  return this.waited[x][y];
};

Sync.prototype.request = function(x,y){
  x=x;
  y=y;
  return new Promise(function(resolve) {
      resolve({content:"default"});
    });
};
