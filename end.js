var end_state = {

    preload: function() {
	game.stage.setBackgroundColor(0xffffff);
    },

    create: function() {
	this.infos = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 
					"Game Over\nWell played :)\n(UP to Continue)", {
					    font: '60px Arial',
					    fill: '#87E8D1',
					    align: 'center',
					});
	this.infos.anchor.setTo(0.5, 0.5);
	
	game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function() {
	    this.level = 1;
	    this.game.state.start("menu");
	}, this);
    },

    update: function() {
	var p1 = game.input.pointer1;
	var p2 = game.input.pointer2;

	if (p1.isDown || p2.isDown) {
	    this.level = 1;
	    this.game.state.start("menu");
	}
    },
};
