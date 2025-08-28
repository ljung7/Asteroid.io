var Asteroidio = Asteroidio || {};

Asteroidio.Game = function() {
    this.createInput();
    this.createWorld();
    this.createPlayer();
    this.createRenderer();

    this.socket = new Asteroidio.Socket(this.enemy);
};

Asteroidio.Game.prototype.act = function() {
    this.player.takeCommands(this.keyboard);
    this.player.act();
}

Asteroidio.Game.prototype.replicateState = function() {
    this.socket.replicate(game.getState());
}

Asteroidio.Game.prototype.render = function() {
    this.renderer.render( this.scene, this.camera );
}

Asteroidio.Game.prototype.getState = function() {
    return { position: this.player.mesh.position,
             rotation: this.player.mesh.rotation };
}

Asteroidio.Game.prototype.createInput = function() {
   this.keyboard = new THREEx.KeyboardState();
}

Asteroidio.Game.prototype.createWorld = function() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;
    this.scene = new THREE.Scene();
}

Asteroidio.Game.prototype.createPlayer = function() {
    this.player = new Asteroidio.Ship();
    this.player.setControls('W','A','S','D');
    this.scene.add( this.player.mesh );

    this.enemy = new Asteroidio.Ship();
    this.scene.add(this.enemy.mesh);
}

Asteroidio.Game.prototype.createRenderer = function() {
    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
}

Asteroidio.Game.prototype.animate = function() {
    requestAnimationFrame( this.animate.bind(this) );
    this.act();
    this.replicateState();
    this.render();
}


