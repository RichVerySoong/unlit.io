function Game() {};


var Circle = class {
    constructor(initialX, initialY, id) {
        this.x = initialX;
        this.y = initialY;
        this.id = id;
    }
    update(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    draw(pl_arr, ctx, width, height, canvX, canvY) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 10, 0, 2 * Math.PI, true);
        ctx.fillStyle = "#fff";
        ctx.fill();
        for (var i = 0; i < pl_arr.length; i++) {
            ctx.beginPath();
            ctx.arc(canvX + pl_arr[i].x, canvY + pl_arr[i].y, 10, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#fff";
            ctx.fill();
        }
    }
    get_id() {
        return (this.id);
    }
    change_id(new_id) {
        this.id = new_id;
        return (false);
    }
}

var player = new Circle(100, 100, "");
var players = [];

Game.prototype.handleNetwork = function(socket) {

    function player_not_found(pl_arr, pl) {
        var ret = true;
        for (var i = 0; i < pl_arr.length; i++) {
            if (pl_arr[i].id == pl.id) {
                ret = false;
            }
        }
        return (ret);
    }

    function replace_player(pl_arr, pl) {
        for (var i = 0; i < pl_arr.length; i++) {
            if (pl_arr[i].id == pl.id) {
                pl_arr[i] = pl;
            }
        }
        return (pl_arr);
    }

    function remove_player(pl_arr, pl) {
        for (var i = 0; i < pl_arr.length; i++) {
            if (pl_arr[i].id == pl) {
                pl_arr.splice(i, 1);
            }
        }
        return (pl_arr);
    }
    socket.on('init', function(new_player) {
        if (JSON.parse(new_player).id != player.get_id() && player_not_found(players, JSON.parse(new_player))) {
            players.push(JSON.parse(new_player));
            socket.emit('init', JSON.stringify(player));
        }
    });
    socket.on('update', function(upd_player) {
        if (JSON.parse(upd_player).id != player.get_id()) {
            players = replace_player(players, JSON.parse(upd_player));
        }
    });
    socket.on('remove_pl', function(old_pl_id) {
        players = remove_player(players, old_pl_id);
    });
    socket.on('id', function(id) {
        player.change_id(id);
        socket.emit('init', JSON.stringify(player));
    });
}

var speedX = 0;
var speedY = 0;
var canvX = 0;
var canvY = 0;
var plX = 10000;
var plY = 10000;

Game.prototype.handleLogic = function(socket, width, height) {
    speedX = -(mouseX - (width / 2)) / 85;
    speedY = -(mouseY - (height / 2)) / 85;

    plX = (plX == 10000) ? width / 2 : plX;
    plY = (plY == 10000) ? height / 2 : plY;

    // if speed > some_constant
    if (speedX > 3) {
        speedX = 3;
    } else if (speedX < -3) {
        speedX = -3;
    }

    if (speedY > 3) {
        speedY = 3;
    } else if (speedY < -3) {
        speedY = -3;
    }

    if (!(canvX + speedX > width / 2) && !(canvX + speedX < (-1 * width / 2))) {
        canvX += speedX;
        plX -= speedX;
    }
    if (!(canvY + speedY > height / 2) && !(canvY + speedY < (-1 * height / 2))) {
        canvY += speedY;
        plY -= speedY;
    }

    console.log("player location: " + plX, plY);
    player.update(plX, plY);
    socket.emit('update', JSON.stringify(player));
}

Game.prototype.handleGraphics = function(gfx, width, height) {
    gfx.clearRect(0, 0, width, height);

    gfx.beginPath();
    gfx.fillStyle = "black";
    gfx.fillRect(0, 0, width, height);

    gfx.beginPath();
    gfx.lineWidth = "2";
    gfx.strokeStyle = "white";
    gfx.rect(canvX, canvY, width, height);
    gfx.stroke();

    player.draw(players, gfx, width, height, canvX, canvY);
}
