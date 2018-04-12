function Game() { };

var socket = io();

var temp_id = "";
var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}});

findIP.then(ip => {
  temp_id = ip;
})

var Circle = class {
 constructor(initialX, initialY, id) {
   this.x = initialX;
   this.y = initialY;
   this.id = id;
 }
 update(newX, newY, socket) {
   this.x = newX;
   this.y = newY;
   socket.emit('update', JSON.stringify(this));
 }
 draw(pl_arr, ctx) {
   ctx.beginPath();
   ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, true);
   ctx.fillStyle = "#000000";
   ctx.fill();
   for (var i=0; i<pl_arr.length; i++) {
     ctx.beginPath();
     ctx.arc(pl_arr[i].x, pl_arr[i].y, 10, 0, 2 * Math.PI, true);
     ctx.fillStyle = "#000000";
     ctx.fill();
   }
 }
 get_id() {
   return(this.id);
 }
 change_id(new_id) {
   this.id = new_id;
   return(false);
 }
}

var player = new Circle(100, 100, temp_id);
var players = [];

Game.prototype.handleNetwork = function(socket) {

  function player_not_found(pl_arr, pl) {
    var ret = true;
    for (var i=0; i < pl_arr.length; i++) {
      if (pl_arr[i].id == pl.id) {
        ret = false;
      }
    }
    return(ret);
  }

  function replace_player(pl_arr, pl) {
    for (var i=0; i < pl_arr.length; i++) {
      if (pl_arr[i].id == pl.id) {
        pl_arr[i] = pl;
      }
    }
    return(pl_arr);
  }

  function remove_player(pl_arr, pl) {
    for (var i=0; i < pl_arr.length; i++) {
      if (pl_arr[i].id == pl.id) {
        pl_arr.splice(i, 1);
      }
    }
    return(pl_arr);
  }

  socket.on('init', function(new_player){
    console.log("Recieved init call from "+JSON.parse(new_player).id);
    if (JSON.parse(new_player).id != player.get_id() && player_not_found(players, JSON.parse(new_player))) {
      players.push(JSON.parse(new_player));
      console.log("Added player "+JSON.parse(new_player).id);
      socket.emit('init', JSON.stringify(player));
    }
  });
  socket.on('update', function(upd_player){
    if (JSON.parse(upd_player).id != player.get_id()) {
      players = replace_player(players, JSON.parse(upd_player));
    }
  });
  socket.on('disconnect', function(){
    socket.emit('remove_pl', JSON.stringify(player));
  });
  socket.on('remove_pl', function(old_pl){
    players = remove_player(players, JSON.parse(old_pl));
  });
}

Game.prototype.handleLogic = function(socket) {
  console.log('Game is running');
  player.update(mouseX, mouseY, socket);
}

Game.prototype.handleGraphics = function(gfx, width, height) {
  gfx.clearRect(0, 0, width, height);
  player.draw(players, gfx);
}
