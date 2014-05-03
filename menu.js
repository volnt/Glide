var menu_state = {
    preload: function() {
	game.stage.backgroundColor = '#f0f0f0';
	this.infos = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 
					"RIGHT to run\n UP and DOWN to Jump and Crouch.", {
					    font: '30px Arial',
					    fill: '#87E8D1',
					    align: 'center',
					});
	this.infos.anchor.setTo(0.5, 0.5);
    },

    create: function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE)
	this.game.physics.arcade.gravity.y = 100;
	this.game.stage.smoothed = false;

	this.map = this.game.add.tilemap('level1');
	this.map.addTilesetImage('tilemap', 'map_tiles');
	
	this.map.setCollisionBetween(0, 3);
	
	this.layer = this.map.createLayer('layer');

	this.character = this.game.add.sprite(50, 350, 'character');
	this.character.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
	this.character.animations.add('crouch', [5, 6, 7, 8, 9], 30, false);
	this.character.animations.add('stand', [10, 11, 12, 13, 14], 15, false);
	this.character.animations.play('walk');
	this.character.scale.setTo(10);

	this.game.physics.enable([this.character, this.layer]);
	// this.game.physics.arcade.gravity = 800;

	this.character.body.gravity.y = 800;

	this.game.camera.follow(this.character);
    },

    update: function() {
	this.game.physics.arcade.collide(this.character, this.layer);
 
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.character.body.onFloor()) {
	    this.character.body.velocity.y = -500;
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	    if (!this.crouched)
		this.character.animations.play('crouch');
	    this.crouched = true;
	} else {
	    this.character.animations.play('walk');
	    this.crouched = false;
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && 
	    this.character.body.onFloor() && !this.crouched) {
	    this.character.body.velocity.x = 300;
	} else if (this.character.body.onFloor() && !this.crouched) {
	    this.character.body.velocity.x *= 0.9;
	}


	if (this.character.body.x < 0 || this.character.body.x >= this.game.world.width - 50 || 
	    this.character.body.y < 0 || this.character.body.y >= this.game.world.width - 50) {
	    this.game.state.start('menu');
	    }
    },
};
