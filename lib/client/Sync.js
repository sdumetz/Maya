/**
 * Synchronises the model with server side ressources
 * @param {Model} model client model
 */
function Sync (socket,model){
  this.socket = socket;
  this.model = model;
  this.model.onRequest = this.request.bind(this);
  this.socket.on("import",this.import.bind(this))
  this.socket.on("update",this.update.bind(this));
}

/**
 * Get called on "import" event.
 * It's systematically emitted by the server on load
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Sync.prototype.import = function(data){

}

/**
 * main method to request tiles informations from server
 * @param  {Object} data tiles informations transmitted by server
 */
Sync.prototype.request = function(data){

}
/**
 * update requested by server-side model
 * @param  {[type]} data [description]
 */
Sync.prototype.update = function(data){
  this.model.update(data);
}

module.exports = Sync;
