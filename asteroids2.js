//pool.js ...........................................................

var Pool = (function()
{
	//exposed methods:

	var create = function(type, size)
	{
		var obj = Object.create(def);
		obj.init(type, size);

		return obj;
	};

	//Ship definition:

	var def =
	{
		_type: null,
		_size: null,
		_pointer: null,
		_elements:null,

		init: function(type, size)
		{
			this._type = type;
			this._size = size;
			this._pointer = size;
			this._elements = [];

			var i = 0;
			var length = this._size;

			for(i; i < length; ++i)
			{
				this._elements[i] = this._type.create();
			}
		},

		getElement: function()
		{
			if(this._pointer > 0) return this._elements[--this._pointer];

			return null;
		},

		disposeElement: function(obj)
		{
			this._elements[this._pointer++] = obj;
		}
	};

	return {create:create};
}());

//vec2d.js ...........................................................

var Vec2D = (function()
{
	//exposed methods:

	var create = function(x, y)
	{
		var obj = Object.create(def);
		obj.setXY(x, y);

		return obj;
	};

	//Vec2D definition:

	var def =
	{
		_x: 1,
		_y: 0,

		getX: function()
		{
			return this._x;
		},

		setX: function(value)
		{
			this._x = value;
		},

		getY: function()
		{
			return this._y;
		},

		setY: function(value)
		{
			this._y = value;
		},

		setXY: function(x, y)
		{
			this._x = x;
			this._y = y;
		},

		getLength: function()
		{
			return Math.sqrt(this._x * this._x + this._y * this._y);
		},

		setLength: function(length)
		{
			var angle = this.getAngle();
			this._x = Math.cos(angle) * length;
			this._y = Math.sin(angle) * length;
		},

		getAngle: function()
		{
			return Math.atan2(this._y, this._x);
		},

		setAngle: function(angle)
		{
			var length = this.getLength();
			this._x = Math.cos(angle) * length;
			this._y = Math.sin(angle) * length;
		},

		add: function(vector)
		{
			this._x += vector.getX();
			this._y += vector.getY();
		},

		sub: function(vector)
		{
			this._x -= vector.getX();
			this._y -= vector.getY();
		},

		mul: function(value)
		{
			this._x *= value;
			this._y *= value;
		},

		div: function(value)
		{
			this._x /= value;
			this._y /= value;
		}
	};

	return {create:create};
}());

//particle.js ...........................................................

var Particle = (function()
{
	//exposed methods:

	var create = function()
	{
		var obj = Object.create(def);
		obj.radius = 2;
		obj.color = '#FFF';
		obj.lifeSpan = 0;
		obj.fric = 0.98;
		obj.pos = Vec2D.create(0, 0);
		obj.vel = Vec2D.create(0, 0);
		obj.blacklisted = false;

		return obj;
	};

	//Ship definition:

	var def =
	{
		radius: null,
		color: null,
		lifeSpan: null,
		fric: null,
		pos: null,
		vel: null,
		blacklisted: null,

		update: function()
		{
			this.pos.add(this.vel);
			this.vel.mul(this.fric);
			this.radius -= 0.1;

			if(this.radius < 0.1) this.radius = 0.1;

			if(this.lifeSpan-- < 0)
			{
				this.blacklisted = true;
			}
		},

		reset: function()
		{
			this.blacklisted = false;
		}
	};

	return {create:create};
}());

//bullet.js ...........................................................

var Bullet = (function()
{
	//exposed methods:

	var create = function()
	{
		var obj = Object.create(def);
		obj.radius = 4;
		obj.color = '#FFF';
		obj.pos = Vec2D.create(0, 0);
		obj.vel = Vec2D.create(0, 0);
		obj.blacklisted = false;

		return obj;
	};

	//Bullet definition:

	var def =
	{
		radius: null,
		color: null,
		pos: null,
		vel: null,
		blacklisted: null,

		update: function()
		{
			this.pos.add(this.vel);
		},

		reset: function()
		{
			this.blacklisted = false;
		}
	};

	return {create:create};
}());

//asteroid.js ...........................................................

var Asteroid = (function()
{
	//exposed methods:

	var create = function()
	{
		var obj = Object.create(def);
		obj.radius = 40;
		obj.color = '#FF5900';
		obj.pos = Vec2D.create(0, 0);
		obj.vel = Vec2D.create(0, 0);
		obj.blacklisted = false;
		obj.type = 'b';
		obj.sides = (Math.random() * 2 + 7) >> 0;
		obj.angle = 0;
		obj.angleVel = (1 - Math.random() * 2) * 0.01;

		return obj;
	};

	//Ship definition:

	var def =
	{
		radius: null,
		color: null,
		pos: null,
		vel: null,
		blacklisted: null,
		type: null,
		sides: null,
		angle: null,
		angleVel: null,

		update: function()
		{
			this.pos.add(this.vel);
			this.angle += this.angleVel;
		},

		reset: function()
		{
			this.blacklisted = false;
		}
	};

	return {create:create};
}());


class Contactor 
{
	//exposed methods:
	constructor(imgID, title, modalID) {
    	this.radius = 40;
		this.color = '#01ffae';
		this.pos = Vec2D.create(0, 0);
		this.sides = (Math.random() * 2 + 10) >> 0;
		this.angle = 0;
		this.modalID = modalID;
		this.imgID = imgID;
		this.title = title;
		this.rectW = 250;
		this.rectH = 250;
		this.rectOffsetY = 0;
		this.rectOffsetX = 0;
		this.collided = false;
  	}
	
}

class Rectangle 
{
	//exposed methods:
	constructor(x, y, w, h, angle) {
    	this.radius = 40;
		this.color = '#dc143c';
		this.pos = Vec2D.create(x, y);
		this.sides = (Math.random() * 2 + 10) >> 0;
		this.angle = angle;
		this.rectW = w;
		this.rectH = h;
		this.collided = false;
  	}
}

class Checkpoint 
{
	//exposed methods:
	constructor(x, y) {
    	this.radius = 40;
		this.color = '#01ffae';
		this.pos = Vec2D.create(x, y);
		this.sides = (Math.random() * 2 + 10) >> 0;
		this.angle = 0;
		this.collided = false;
		this.angleVel = (1 - Math.random() * 2) * 0.01;
  	}

  	update()
	{
		this.angle += this.angleVel;
	}
	
}

//ship.js ...........................................................

var Ship = (function()
{
	//exposed methods:

	var create = function(x, y, ref)
	{
		var obj = Object.create(def);
		obj.ref = ref;
		obj.angle = 0;
		obj.pos = Vec2D.create(x, y);
		obj.vel = Vec2D.create(0, 0);
		obj.thrust = Vec2D.create(0, 0);
		obj.idle = false;
		obj.radius = 8;
		obj.idleDelay = 0;

		return obj;
	};

	//Ship definition:

	var def =
	{
		angle: null,
		pos: null,
		vel: null,
		thrust: null,
		ref: null,
		bulletDelay: null,
		idle: null,
		radius: null,

		update: function()
		{
			this.vel.add(this.thrust);
			this.pos.add(this.vel);

			if(this.vel.getLength() > 5) this.vel.setLength(5);

			++this.bulletDelay;

			if(this.idle)
			{
				this.vel.setXY(0,0);
				if(++this.idleDelay > 40)
				{
					this.idleDelay = 0;
					this.idle = false;

					this.ref.resetGame();
				}
			}
		},

		shoot: function()
		{
			if(this.bulletDelay > 8)
			{
				this.ref.generateShot();
				this.bulletDelay = 0;
			}
		}
	};

	return {create:create};
}());

function HideWindowStart(){
	pause = false;
	document.getElementById("Text").style.display = "none";
	document.getElementById("Header").style.display = "block";
	document.getElementById("tooltip").style.display = "block";
}
//common vars

var canvas;
var context;
var screenWidth;
var screenHeight;
var doublePI = Math.PI * 2;

//game vars

var ship;

var particlePool;
var particles;

var bulletPool;
var bullets;

var asteroidPool;
var asteroids;

var contactors;
var rectangles;
var checkpoints;


var hScan;
var asteroidVelFactor = 0;

var pause = true;
var lastCheckpoint;

//keyboard vars

var keySpace = false;

window.getAnimationFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback)
{
	window.setTimeout(callback, 16.6);
};

window.onload = function()
{

	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');


	window.onresize();
	keyboardInit();
	particleInit();
	bulletInit();
	asteroidInit();
	lastCheckpoint = Vec2D.create(screenWidth >> 1, 480);
	shipInit();


	contactors = [];
	rectangles = [];
	checkpoints = [];


	var about = generateContactor(screenWidth /2 , 2000, "mai", "Section under development", "WIP");
	about.rectH = 100;
	about.rectW = 500;

	createRect(screenWidth /2 -1100, 0, 1000, 400, 0);
	createRect(screenWidth /2 +100, 0, 1000, 400, 0);

	createRect(screenWidth /2 -900, 500, 500, 1000, 0);
	createRect(screenWidth /2 -800, 600, 500, 800, 0);
	createRect(screenWidth /2 -700, 700, 500, 600, 0);

	createRect(screenWidth /2 + 400, 500, 500, 1000, 0);
	createRect(screenWidth /2 + 300, 600, 500, 800, 0);
	createRect(screenWidth /2 + 200, 700, 500, 600, 0);
	// generateContactor(200, 1200, "malitaIMG", "Malita SoW", "Malita");
	createCheckpoint(screenWidth/2, 1500);

	loop();
};

window.onresize = function()
{
	if(!canvas) return;

	screenWidth = canvas.clientWidth;
	screenHeight = canvas.clientHeight;

	canvas.width = screenWidth;
	canvas.height = screenHeight;

	hScan = (screenHeight / 4) >> 0;
};

function keyboardInit()
{
	window.onkeydown = function(e)
	{
		switch(e.keyCode)
		{
			//key Space
			case 32:
       		case 75:

			keySpace = true;

			break;
		}
    
    e.preventDefault();
	};

	window.onkeyup = function(e)
	{
		switch(e.keyCode)
		{
			//key Space
       		case 75:
			case 32:

			keySpace = false;

			break;
		}
    
    e.preventDefault();
	};
}

function particleInit()
{
	particlePool = Pool.create(Particle, 100);
	particles = [];
}

function bulletInit()
{
	bulletPool = Pool.create(Bullet, 40);
	bullets = [];
}

function asteroidInit()
{
	asteroidPool = Pool.create(Asteroid, 30);
	asteroids = [];
}

function shipInit()
{
	ship = Ship.create(lastCheckpoint.getX(), lastCheckpoint.getY(), this);
}

function loop()
{
	updateShip();
	updateParticles();
	updateBullets();
	//updateAsteroids();
	updateCheckpoints();

	checkCollisions();

	render();

	getAnimationFrame(loop);
}

var mouseX = 0;
var mouseY = 0;
var mousedown = false;
var focus = false;

window.addEventListener("mousemove", function(e){
    var rect = canvas.getBoundingClientRect();

	mouseX = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	mouseY =  (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
});

window.addEventListener('scroll', function(e) {
    var rect = canvas.getBoundingClientRect();

	mouseX = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	mouseY =  (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
});

window.addEventListener('mousedown', function(e) {
 	mousedown = true;

 	var rect = canvas.getBoundingClientRect();

	mouseX = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	mouseY =  (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
});

window.addEventListener('mouseup', function(e) {
 	mousedown = false;
});


function OnFocus(f){
	focus = f;
}

function updateShip()
{
	if (focus) {
		ship.vel.setXY(0,0);
		return;
	}

	ship.update();

	if(ship.idle) return;


	var angleRadians = Math.atan2((mouseY) - ship.pos.getY() , mouseX - ship.pos.getX());
	ship.angle = angleRadians;

	if(keySpace) ship.shoot();


	if(mousedown && !pause)
	{
		ship.thrust.setLength(0.1);
		ship.thrust.setAngle(ship.angle);

		generateThrustParticle();
	}
	else
	{
		ship.vel.mul(0.94);
		ship.thrust.setLength(0);
	}

	if(ship.pos.getX() > screenWidth) ship.pos.setX(0);
	else if(ship.pos.getX() < 0) ship.pos.setX(screenWidth);

	if(ship.pos.getY() > screenHeight) ship.pos.setY(0);
	else if(ship.pos.getY() < 0) ship.pos.setY(screenHeight);

	var yPos = lerp(window.scrollY, ship.pos.getY(), 1);
	window.scrollTo(0, yPos - (window.innerHeight/2));

}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

function generateThrustParticle()
{
	var p = particlePool.getElement();

	//if the particle pool doesn't have more elements, will return 'null'.

	if(!p) return;

	p.radius = Math.random() * 3 + 2;
	p.color = '#FFF';
	p.lifeSpan = 80;
	p.pos.setXY(ship.pos.getX() + Math.cos(ship.angle) * -14, ship.pos.getY() + Math.sin(ship.angle) * -14);
	p.vel.setLength(8 / p.radius);
	p.vel.setAngle(ship.angle + (1 - Math.random() * 2) * (Math.PI / 18));
	p.vel.mul(-1);

	//particles[particles.length] = p; same as: particles.push(p);

	particles[particles.length] = p;
}

function updateParticles()
{
	var i = particles.length - 1;

	for(i; i > -1; --i)
	{
		var p = particles[i];

		if(p.blacklisted)
		{
			p.reset();

			particles.splice(particles.indexOf(p), 1);
			particlePool.disposeElement(p);

			continue;
		}

		p.update();
	}
}

function updateBullets()
{
	var i = bullets.length - 1;

	for(i; i > -1; --i)
	{
		var b = bullets[i];

		if(b.blacklisted)
		{
			b.reset();

			bullets.splice(bullets.indexOf(b), 1);
			bulletPool.disposeElement(b);

			continue;
		}

		b.update();

		if(b.pos.getX() > screenWidth) b.blacklisted = true;
		else if(b.pos.getX() < 0) b.blacklisted = true;

		if(b.pos.getY() > screenHeight) b.blacklisted = true;
		else if(b.pos.getY() < 0) b.blacklisted = true;
	}
}

function updateAsteroids()
{
	var i = asteroids.length - 1;

	for(i; i > -1; --i)
	{
		var a = asteroids[i];

		if(a.blacklisted)
		{
			a.reset();

			asteroids.splice(asteroids.indexOf(a), 1);
			asteroidPool.disposeElement(a);

			continue;
		}

		a.update();

		if(a.pos.getX() > screenWidth + a.radius) a.pos.setX(-a.radius);
		else if(a.pos.getX() < -a.radius) a.pos.setX(screenWidth + a.radius);

		if(a.pos.getY() > screenHeight + a.radius) a.pos.setY(-a.radius);
		else if(a.pos.getY() < -a.radius) a.pos.setY(screenHeight + a.radius);
	}

	if(asteroids.length < 5)
	{
		var factor = (Math.random() * 2) >> 0;

		generateAsteroid(screenWidth * factor, screenHeight * factor, 60 , 'b');
	}
}

function updateCheckpoints()
{
	var i = checkpoints.length - 1;

	for(i; i > -1; --i)
	{
		var a = checkpoints[i];
		a.update();

	}


}

function generateAsteroid(x, y, radius, type)
{
	var a = asteroidPool.getElement();

	//if the bullet pool doesn't have more elements, will return 'null'.

	if(!a) return;

	a.radius = radius;
	a.type = type;
	a.pos.setXY(x, y);
	a.vel.setLength(1 + asteroidVelFactor);
	a.vel.setAngle(Math.random() * (Math.PI * 2));

	//bullets[bullets.length] = b; same as: bullets.push(b);

	asteroids[asteroids.length] = a;
	asteroidVelFactor += 0.025;
}


function generateContactor(x, y, imgID, title, modalID)
{
	a = new Contactor(imgID, title, modalID);

	a.radius = 40;
	a.pos.setXY(x,y);

	contactors.push(a);

	return a;
}

function createRect(x,y,h,w, angle){
	a = new Rectangle(x, y, h, w, angle);

	rectangles.push(a);

	return a;
}

function createCheckpoint(x,y){
	a = new Checkpoint(x, y);

	checkpoints.push(a);

	return a;
}

function checkCollisions()
{
	checkBulletAsteroidCollisions();
	checkShipAsteroidCollisions();
	checkShipContactorCollisions();
	checkShipRectsCollisions();
	checkCheckpointsCollisions();
}

function checkBulletAsteroidCollisions()
{
	var i = bullets.length - 1;
	var j;

	for(i; i > -1; --i)
	{
		j = asteroids.length - 1;

		for(j; j > -1; --j)
		{
			var b = bullets[i];
			var a = asteroids[j];

			if(checkDistanceCollision(b, a))
			{
				b.blacklisted = true;

				destroyAsteroid(a);
			}
		}
	}
}

function checkShipAsteroidCollisions()
{
	var i = asteroids.length - 1;

	for(i; i > -1; --i)
	{
		var a = asteroids[i];
		var s = ship;

		if(checkDistanceCollision(a, s))
		{
			if(s.idle) return;

			s.idle = true;

			generateShipExplosion();
			destroyAsteroid(a);
		}
	}
}

function checkShipContactorCollisions()
{
	var i = contactors.length - 1;

	for(i; i > -1; --i)
	{
		var a = contactors[i];
		var s = ship;

		if(checkDistanceCollision(a, s))
		{
			generateAsteroidExplosion(a);
		}

		var x = a.pos.getX() - (a.rectW / 2) - a.rectOffsetX;
		var y = a.pos.getY() - (a.rectH/2) - a.rectOffsetY;

		if (checkSquareCollision(x, y, a.rectW, a.rectH, s.pos.getX(), s.pos.getY())){

			if(s.idle) return;

			s.idle = true;
			s.vel.setXY(0, 0);

			a.collided = true;

			generateShipExplosion();
			SetContent(a.modalID);
			ShowModal();
		}

	}
}

function checkShipRectsCollisions()
{
	var i = rectangles.length - 1;

	for(i; i > -1; --i)
	{
		var a = rectangles[i];
		var s = ship;


		if (checkSquareCollision(a.pos.getX(), a.pos.getY(), a.rectW, a.rectH, s.pos.getX(), s.pos.getY())){

			if(s.idle) return;

			s.idle = true;
			s.vel.setXY(0, 0);

			a.collided = true;

			generateShipExplosion();
		}

	}
}

function checkCheckpointsCollisions()
{
	var i = checkpoints.length - 1;

	for(i; i > -1; --i)
	{
		var a = checkpoints[i];
		var s = ship;

		if(checkDistanceCollision(a, s))
		{

			lastCheckpoint.setXY(a.pos.getX(), a.pos.getY());
			generateAsteroidExplosion(a, a.color);
		}
	}
}


function generateShipExplosion()
{
	var i = 18;

	for(i; i > -1; --i)
	{
		var p = particlePool.getElement();

		//if the particle pool doesn't have more elements, will return 'null'.

		if(!p) return;

		p.radius = Math.random() * 6 + 2;
		p.lifeSpan = 80;
		p.color = '#FFF';
		p.vel.setLength(20 / p.radius);
		p.vel.setAngle(ship.angle + (1 - Math.random() * 2) * doublePI);
		p.pos.setXY(ship.pos.getX() + Math.cos(p.vel.getAngle()) * (ship.radius * 0.8), ship.pos.getY() + Math.sin(p.vel.getAngle()) * (ship.radius * 0.8));


		//particles[particles.length] = p; same as: particles.push(p);

		particles[particles.length] = p;
	}
}

function checkDistanceCollision(obj1, obj2)
{
	var vx = obj1.pos.getX() - obj2.pos.getX();
	var vy = obj1.pos.getY() - obj2.pos.getY();
	var vec = Vec2D.create(vx, vy);

	if(vec.getLength() < obj1.radius + obj2.radius)
	{
		return true;
	}

	return false;
}

function checkSquareCollision(x, y, w, h, pointX, pointY){
	if (pointX > x && pointX < (x+w) && pointY > y && pointY < (y+h) ) return true;

	return false;
}

function destroyAsteroid(asteroid)
{
	asteroid.blacklisted = true;

	generateAsteroidExplosion(asteroid);
	resolveAsteroidType(asteroid);
}

function generateAsteroidExplosion(asteroid, color = '#FF5900')
{
	var i = 18;

	for(i; i > -1; --i)
	{
		var p = particlePool.getElement();

		//if the particle pool doesn't have more elements, will return 'null'.

		if(!p) return;

		p.radius = Math.random() * (asteroid.radius >> 2) + 2;
		p.lifeSpan = 80;
		p.color = color;
		p.vel.setLength(20 / p.radius);
		p.vel.setAngle(ship.angle + (1 - Math.random() * 2) * doublePI);
		p.pos.setXY(asteroid.pos.getX() + Math.cos(p.vel.getAngle()) * (asteroid.radius * 0.8), asteroid.pos.getY() + Math.sin(p.vel.getAngle()) * (asteroid.radius * 0.8));

		//particles[particles.length] = p; same as: particles.push(p);

		particles[particles.length] = p;
	}
}

function resolveAsteroidType(asteroid)
{
	switch(asteroid.type)
	{
		case 'b':

		generateAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 40, 'm');
		generateAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 40, 'm');

		break;

		case 'm':

		generateAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 20, 's');
		generateAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 20, 's');

		break;
	}
}

function render()
{
	context.fillStyle = '#262626';
	context.globalAlpha = 0.4;
	context.fillRect(0, 0, screenWidth, screenHeight);
	context.globalAlpha = 1;

	renderShip();
	renderParticles();
	renderBullets();
	renderAsteroids();
	renderContactors();
	renderRects();
	renderCheckpoints();
	renderScanlines();

}

function renderShip()
{
	if(ship.idle) return;

	context.save();
	context.translate(ship.pos.getX() >> 0, ship.pos.getY() >> 0);
	context.rotate(ship.angle);

	context.strokeStyle = '#FFF';
	context.lineWidth = (Math.random() > 0.9) ? 2 : 1;
	context.beginPath();
	context.moveTo(10, 0);
	context.lineTo(-10, -10);
	context.lineTo(-10, 10);
	context.lineTo(10, 0);
	context.stroke();
	context.closePath();

	context.restore();
}

function renderParticles()
{
	//inverse for loop = more performance.

	var i = particles.length - 1;

	for(i; i > -1; --i)
	{
		var p = particles[i];

		context.beginPath();
		context.strokeStyle = p.color;
		context.arc(p.pos.getX() >> 0, p.pos.getY() >> 0, p.radius, 0, doublePI);
		if(Math.random() > 0.4) context.stroke();
		context.closePath();
	}
}

function renderBullets()
{
	//inverse for loop = more performance.

	var i = bullets.length - 1;

	for(i; i > -1; --i)
	{
		var b = bullets[i];

		context.beginPath();
		context.strokeStyle = b.color;
		context.arc(b.pos.getX() >> 0, b.pos.getY() >> 0, b.radius, 0, doublePI);
		if(Math.random() > 0.2) context.stroke();
		context.closePath();
	}
}

function renderAsteroids()
{
	//inverse for loop = more performance.

	var i = asteroids.length - 1;

	for(i; i > -1; --i)
	{
		var a = asteroids[i];

		context.beginPath();
		context.lineWidth = (Math.random() > 0.2) ? 4 : 3;
		context.strokeStyle = a.color;

		var j = a.sides;

		context.moveTo((a.pos.getX() + Math.cos(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0, (a.pos.getY() + Math.sin(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0);

		for(j; j > -1; --j)
		{
			context.lineTo((a.pos.getX() + Math.cos(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0, (a.pos.getY() + Math.sin(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0);
			
		}

		if(Math.random() > 0.2) context.stroke();
		
		context.closePath();
	}
}

function renderContactors()
{
	//inverse for loop = more performance.

	var i = contactors.length - 1;

	for(i; i > -1; --i)
	{
		var a = contactors[i];

		var color;
		if (a.collided) color = a.color; 
		else color = '#FF5900';

		drawRectangle(a.pos.getX() - a.rectOffsetX, a.pos.getY() - a.rectOffsetY, a.rectW, a.rectH, a.imgID, color);

		context.font = "30px monospace";
		context.fillStyle = "white";
		context.textAlign = "center";

		if (document.getElementById(a.imgID))
			context.fillText(a.title,a.pos.getX() - (a.rectOffsetX/2), a.pos.getY() - (a.rectOffsetY/2));
		else 
			context.fillText(a.title,a.pos.getX() - a.rectOffsetX, a.pos.getY() - a.rectOffsetY);
	}
}

function renderRects()
{
	//inverse for loop = more performance.

	var i = rectangles.length - 1;

	for(i; i > -1; --i)
	{
		var a = rectangles[i];

		drawRectangle2(a.pos.getX(), a.pos.getY(), a.rectW, a.rectH, a.color, a.angle);

	}
}

function renderCheckpoints(){
	var i = checkpoints.length - 1;

	for(i; i > -1; --i)
	{
		var a = checkpoints[i];

		context.beginPath();
		context.lineWidth = (Math.random() > 0.2) ? 4 : 3;
		context.strokeStyle = a.color;


		var j = a.sides;

		context.moveTo((a.pos.getX() + Math.cos(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0, (a.pos.getY() + Math.sin(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0);

		for(j; j > -1; --j)
		{
			context.lineTo((a.pos.getX() + Math.cos(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0, (a.pos.getY() + Math.sin(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0);
			
		}

		if(Math.random() > 0.2) context.stroke();
		
		context.closePath();
	}
}

function drawRectangle(x, y, w, h, imgID, color)
{

	context.strokeStyle = color;
	//context.strokeRect(x - (w/2), y - (h/2), w, h);

	context.lineWidth = (Math.random() > 0.2) ? 4 : 3;

	//context.fillRect(x - (w/2), y - (h/2), w, h);
	drawRecnagleRounded(x - (w/2), y - (h/2), w, h, 10);
	var img = document.getElementById(imgID);

	if (img) context.drawImage(img, x - (w/2), y - (h/2), w , h);			


	context.closePath();
}

function drawRectangle2(x,y,w,h, color, angle){


	context.fillStyle = "#000";
	context.lineWidth = 0;
	context.globalAlpha = 0.1;

    context.fillRect(x,y,w,h);
    context.globalAlpha = 1.0;


	context.strokeStyle = color;
	context.lineWidth = (Math.random() > 0.2) ? 3 : 2;
	context.beginPath();
	context.rect(x,y,w,h);
	context.stroke();



}

function drawRecnagleRounded (x, y, w, h, r) {

	w -= r/2;
	h -= r/2;

	context.fillStyle = "rgba(0, 0, 0, 0.5)";

  	context.beginPath();
  	context.moveTo(x+r, y - r);
  	context.lineTo(x+w-r, y - r);
  	context.lineTo(x+w+r, y + r);
  	context.lineTo(x+w+r, y + h - r );
  	context.lineTo(x+w-r, y +h + r);
  	context.lineTo(x+r, y + h + r);
  	context.lineTo(x-r, y + h - r);
  	context.lineTo(x-r, y + r);
  	context.lineTo(x + r, y - r);

  	context.fill();
	if(Math.random() > 0.05) context.stroke();
  	context.closePath();

}

function renderScanlines()
{
	//inverse for loop = more performance.

	var i = hScan;

	context.globalAlpha = 0.05;
	context.lineWidth = 1;

	for(i; i > -1; --i)
	{
		context.beginPath();
		context.moveTo(0, i * 4);
		context.lineTo(screenWidth, i * 4);
		context.strokeStyle = (Math.random() > 0.0001) ? '#FFF' : '#222';
		context.stroke();
	}

	context.globalAlpha = 1;
}

function generateShot()
{
	var b = bulletPool.getElement();

	//if the bullet pool doesn't have more elements, will return 'null'.

	if(!b) return;

	b.radius = 1;
	b.pos.setXY(ship.pos.getX() + Math.cos(ship.angle) * 14, ship.pos.getY() + Math.sin(ship.angle) * 14);
	b.vel.setLength(10);
	b.vel.setAngle(ship.angle);

	//bullets[bullets.length] = b; same as: bullets.push(b);

	bullets[bullets.length] = b;
}

function resetGame()
{
	asteroidVelFactor = 0;
	console.log(lastCheckpoint);
	ship.pos.setXY(lastCheckpoint.getX(), lastCheckpoint.getY());
	ship.vel.setXY(0, 0);

	resetAsteroids();
}

function resetAsteroids()
{
	var i = asteroids.length - 1;

	for(i; i > -1; --i)
	{
		var a = asteroids[i];
		a.blacklisted = true;
	}
}