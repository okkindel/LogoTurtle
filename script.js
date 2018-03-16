window.onload = function()
{
	placediv();
	document.getElementById("command").onchange = function() {
		execute();
		placediv();
		clean();
	};
};

execute = function()
{ 
	let command = document.getElementById("command").value;
	draw(command);
	addelement(command);
	return;
}

addelement = function(command) {
	var list = document.getElementById("element");
	var element = document.createElement("li");
	element.innerHTML = command;
	list.appendChild(element);
	list.insertBefore(element, list.childNodes[0]);
	element.scrollIntoView();   
}

clean = function() { 
	document.getElementById("command").value = "";
}

commandcolor = function(command, color) {
	addelement("<span style=\"color:".concat(color).concat(";\">").concat(command).concat("</span>"));
}

state = function(command) {
	commandcolor(command, "#0C0");
}

error = function(command) {
	commandcolor(command, "#C20");
}

placediv = function() {
	var turtle = document.getElementById('turtle');
	turtle.style.position = "absolute";
	if ((posx > 0 && posx < 1540) && (posy > 0 && posy < 800)) {
		turtle.style.left = posx - 21 + 'px';
		turtle.style.top = posy - 22 + 'px';
		turtle.style.transform = 'rotate(' + angle + 'deg)';
	} else {
		turtle.style = 'none';
	}
}

// -------------------------------------------------------

var posx = 770;
var posy = 390;
var pen_on = true;
var angle = 0;

// -------------------------------------------------------

draw = function(command)
{ 
	var parser = command.split(" ");

	//procedures
	if (typeof window[parser[0]] === 'function') {
		if (eval(parser[0])(parser[1], parser[2], parser[3]))
			state("done");
	} 
	else if (parser[0] == "on") {
		pen_on = true;
		state("done");
	}
	else if (parser[0] == "off") {
		pen_on = false;
		state("done");
	}
	else {
		error("no such function exist.");
	}
}

// -------------------------------------------------------

clear = function() {
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.clearRect(0, 0, 1540, 780);
	ctx.stroke();
}

reset = function() {
	color("000000");
	pen_on = true;
	posx = 770;
	posy = 390;
	angle = 0;
	rotate(0);
	width(1);
	clear();
}

move = mv = function(step) {
	step = parseInt(step);
	if (isNaN(step)) {
		error("bad number enterd.");
		return false;
	} 
	else {
		let yangle=Math.sin((angle+270) * Math.PI/180);
		let xangle=Math.cos((angle+270) * Math.PI/180);
		let newx = posx + (xangle*step);
		let newy = posy + (yangle*step);

		// when stop on edge
		// if(newx > 1350) {newx = 1350;}
		// if(newy > 780) {newy = 780;}
		// if(newx < 0) {newx = 0;}
		// if(newy < 0) {newy = 0;}

		if(pen_on) {
			let canvas = document.getElementById("canvas");
			let ctx = canvas.getContext("2d");
			ctx.beginPath();
			ctx.moveTo(posx, posy);
			ctx.lineTo(newx, newy);
			ctx.stroke();
		}

		//new position
		posx = newx;
		posy = newy;

		return true;
	}
}

rotate = rt = function(value) {
	value = parseInt(value);
	if(isNaN(value)) {
		error("bad angle entered.");
		return false;
	} 
	else {
		angle += value;
		angle %= 360;
		if(angle < 0) {
			angle = 360 + angle;
		}
		document.getElementById("angle").textContent = (angle + '°');
		return true;
	}
}

color = function(color) {
	let expression = /^(?:[0-9a-f]{3}){1,2}$/i;
	if(!expression.test(color)) {
		error("bad color entered.");
		return false;
	} 
	else {
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.strokeStyle = '#' + color;
		ctx.stroke();
		document.getElementById("color").textContent = ('#' + color);
		return true;
	}
}

width = function(width) {
	width = parseInt(width);
	if(isNaN(width)) {
		error("bad width entered.");
		return false;
	}
	else {
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.stroke();
		document.getElementById("width").textContent = (width + 'px');
		return true;
	}
}

goto = function(newx, newy) {
	newx = parseInt(newx);
	newy = parseInt(newy);
	if (isNaN(newx) || isNaN(newy)) {
		error("bad width entered.");
		return false;
	}
	else {
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		ctx.beginPath();
		if (pen_on) {
			ctx.moveTo(posx, posy);
		}
		ctx.lineTo(newx, newy);
		ctx.stroke();
		posx = newx;
		posy = newy;
		return true;
	}
}