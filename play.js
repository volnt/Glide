var play_state = {
    preload: function() {
	game.stage.setBackgroundColor(0xffffff);
    },

    create: function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE)
	this.game.physics.arcade.gravity.y = 100;
	this.game.stage.smoothed = false;

	this.character = this.game.add.sprite(0, 0, 'character');
	this.character.animations.add('walk', [0, 1, 2, 3, 4], 15, true);
	this.character.animations.add('crouch', [5, 6, 7, 8, 9], 30, false);
	this.character.animations.add('stand', [10, 11, 12, 13, 14], 15, false);
	this.character.animations.play('walk');
		
	this.load_level(1);

	this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.right.onDown.add(function() {this.run=true;}, this);
	this.right.onUp.add(function() {this.run=false;}, this);
	this.down.onDown.add(function() {this.crouch=true;}, this);
	this.down.onUp.add(function() {this.crouch=false;}, this);
	this.up.onDown.add(function() {this.jump=true;}, this);
	this.up.onUp.add(function() {this.jump=false;}, this);
	
	this.run_button = this.game.add.button(500, 0, 'run_button', null, this, 1, 1, 1, 1);
	this.run_button.fixedToCamera = true;
	// this.run_button.events.onInputOver.add(function(){this.run=true;}, this);
	// this.run_button.events.onInputOut.add(function(){this.run=false;}, this);
	this.run_button.events.onInputDown.add(function(){this.run=true;}, this);
	this.run_button.events.onInputUp.add(function(){this.run=false;}, this);
	this.jump_button = this.game.add.button(0, 0, 'jump_button', null, this, 1, 1, 1, 1);
	// this.jump_button.events.onInputOver.add(function(){this.jump=true;}, this);
	// this.jump_button.events.onInputOut.add(function(){this.jump=false;}, this);
	this.jump_button.events.onInputDown.add(function(){this.jump=true;}, this);
	this.jump_button.events.onInputUp.add(function(){this.jump=false;}, this);
	this.jump_button.fixedToCamera = true;
	this.crouch_button = this.game.add.button(0, 250, 'crouch_button', null, this, 1, 1, 1, 1);
	// this.crouch_button.events.onInputOver.add(function(){this.crouch=true;}, this);
	// this.crouch_button.events.onInputOut.add(function(){this.crouch=false;}, this);
	this.crouch_button.events.onInputDown.add(function(){this.crouch=true;}, this);
	this.crouch_button.events.onInputUp.add(function(){this.crouch=false;}, this);
	this.crouch_button.fixedToCamera = true;
    },

    update: function() { 
	this.game.physics.arcade.collide(this.character, this.layer);
	this.game.physics.arcade.overlap(this.character, this.flag, 
					 function () {
					     this.load_level(this.level + 1);
					 }, null, this);
	this.game.physics.arcade.collide(this.character, this.top_stalactites, 
					 function() {
					     // this.die();
					     }, null, this);
	this.game.physics.arcade.overlap(this.character, this.bot_stalactites,
					function() {
					    if (this.crouched) return ;
					    this.die();
					}, null, this);

	if (this.jump && this.character.body.onFloor()) {
	    this.character.body.velocity.y = -500;
	}
	if (this.crouch) {
	    if (!this.crouched)
		this.character.animations.play('crouch');
	    this.crouched = true;
	} else {
	    this.character.animations.play('walk');
	    this.crouched = false;
	}

	if (this.run && !this.crouched) {
	    if (this.character.body.onFloor() && this.character.body.velocity.x > 300)
		this.character.body.velocity.x -= 2;
	    else if (this.character.body.onFloor())
		this.character.body.velocity.x = 300;
	    else if (this.character.body.velocity.x < 450)
		this.character.body.velocity.x += 5;
	} else if (this.character.body.onFloor() && !this.crouched) {
	    this.character.body.velocity.x *= 0.9;
	}

	if (this.crouched && this.character.body.onFloor()) {
	    this.character.body.velocity.x *= 0.99;
	}


	if (this.character.body.x < 0 || this.character.body.x >= this.game.world.width - 50 || 
	    this.character.body.y < 0 || this.character.body.y >= this.game.world.height - 50) {
	    this.die();
	    }

	// this.jump = false;
	// this.crouch = false;
	// this.run = false;
    },

    load_level: function(level) {
	if (this.layer) this.layer.destroy();
	if (this.flag) this.flag.destroy();
	if (this.top_stalactites) this.top_stalactites.destroy();
	if (this.bot_stalactites) this.bot_stalactites.destroy();
	if (this.infos) this.infos.destroy();

	if (level == 7) {
	    this.game.state.start("end");
	    return ;
	}

	if (level == 1)
	    text = "RIGHT to run";
	else if (level == 2)
	    text = "UP to jump";
	else if (level == 3)
	    text = "DOWN to crouch";
	if (1 <= level && level <= 3) {
	    this.infos = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 
					    text, {
						font: '60px Arial',
						fill: '#87E8D1',
						align: 'center',
					    });
	    this.infos.anchor.setTo(0.5, 0.5);
	}

	this.map = this.game.add.tilemap('level'+level);
	this.map.addTilesetImage('tilemap', 'map_tiles');
	this.map.setCollisionBetween(1, 3);
	this.map.setCollisionBetween(5, 8);	
	this.layer = this.map.createLayer('layer');	
	this.layer.resizeWorld();
	
	this.top_stalactites = this.game.add.group();
 	this.top_stalactites.enableBody = true;
	this.top_stalactites.physicsBodyType = Phaser.Physics.ARCADE;
	this.bot_stalactites = this.game.add.group();
 	this.bot_stalactites.enableBody = true;
	this.bot_stalactites.physicsBodyType = Phaser.Physics.ARCADE;

	this.map.createFromObjects('stalactites', 9, 'top_stalactite', 0, true, false, this.top_stalactites);
	this.map.createFromObjects('stalactites', 10, 'bot_stalactite', 0, true, false, this.bot_stalactites);
	this.top_stalactites.forEach(function(s) {
	    s.body.allowGravity = false;
	    s.body.immovable = true;
	    }, this);
	this.bot_stalactites.forEach(function(s) {
	    s.body.allowGravity = false;
	    s.body.immovable = true;
	    }, this);
	

	this.flag = this.game.add.group();
	this.flag.enableBody = true;
	this.flag.physicsBodyType = Phaser.Physics.ARCADE;
	this.map.createFromObjects('flag', 4, 'flag', 0, true, false, this.flag);
	this.flag.forEach(function(f) {
	    f.body.allowGravity = false;
	    f.body.immovable = true;
	}, this);

	this.game.physics.enable([this.character, this.layer]);

	this.character.body.velocity.x = 0;
	this.character.body.velocity.y = 0;
	this.character.position.setTo(25, this.game.world.height - 100);
	this.character.body.gravity.y = 800;

	this.game.camera.follow(this.character);

	this.level = level;
    },

    die : function() {
	this.character.anchor.setTo(0.5, 0.5);
	var t = this.game.add.tween(this.character).to({angle:360}, 300).start();
	this.character.body.gravity.y = 0;
	this.character.body.velocity.x = 0;
	this.character.body.velocity.y = 0;
	t.onComplete.add(function() {
	    this.load_level(this.level);
	}, this);
    },
};
