var menu_state = {

    preload: function() {
	game.stage.setBackgroundColor(0xffffff);
    },

    restart: function() {
	this.level = 1;
	this.game.state.start("play");
    },
    
    continue_game: function() {
	this.game.state.start("play");	
    },

    create: function() {
	this.background = this.game.add.image(0, 0, 'background');
	this.run_button = this.game.add.button(500, 0, 'run_button');
	this.run_button.fixedToCamera = true;
	this.jump_button = this.game.add.button(0, 0, 'jump_button');
	// this.jump_button.events.onInputOver.add(this.continue_game, this);
	this.jump_button.events.onInputDown.add(this.continue_game, this);
	this.jump_button.fixedToCamera = true;
	this.crouch_button = this.game.add.button(0, 250, 'crouch_button');
	// this.crouch_button.events.onInputOver.add(this.restart, this);
	this.crouch_button.events.onInputDown.add(this.restart, this);
	this.crouch_button.fixedToCamera = true;
	
	game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.restart, this);
	game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.continue_game, this);
    },

    update: function() {	
    },
};
