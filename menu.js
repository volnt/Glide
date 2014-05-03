var menu_state = {

    preload: function() {
	game.stage.backgroundColor = '#f0f0f0';
    },

    create: function() {
	this.infos = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 
					"GLIDE\nUP to Start\nDOWN to Continue", {
					    font: '60px Arial',
					    fill: '#87E8D1',
					    align: 'center',
					});
	this.infos.anchor.setTo(0.5, 0.5);
	
	game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function() {
	    this.level = 1;
	    this.game.state.start("play");
	}, this);
	game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function() {
	    this.game.state.start("play");
	}, this);
    },

    update: function() {
	
	var p1 = game.input.pointer1;
	var p2 = game.input.pointer2;
	
	if (p1.isDown || p2.isDown)
	    this.game.state.start("play");
    },
};
