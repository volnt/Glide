var load_state = {
    preload: function() {
	game.stage.setBackgroundColor(0xffffff);

	text = this.game.add.text(250, 250, "loading..", {
	    font: '30px Arial',
	    fill: '#87E8D1'
	});

	this.game.load.image('scene', 'assets/big_loading.png');
	this.game.load.image('loading', 'assets/full_loading.png');
	this.game.load.image('flag', 'assets/flag.png');
	this.game.load.spritesheet('character', 'assets/character.png', 50, 50);
	this.game.load.image('top_stalactite', 'assets/top_stalactite.png');
	this.game.load.image('bot_stalactite', 'assets/bot_stalactite.png');
	this.game.load.image('background', 'assets/background.png');
	this.game.load.spritesheet('jump_button', 'assets/jump_button.png', 500, 250);
	this.game.load.spritesheet('crouch_button', 'assets/crouch_button.png', 500, 250);
	this.game.load.spritesheet('run_button', 'assets/run_button.png', 500, 500);

	this.game.load.tilemap('level1', 'level/1.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.tilemap('level2', 'level/2.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.tilemap('level3', 'level/3.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.tilemap('level4', 'level/4.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.tilemap('level5', 'level/5.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.tilemap('level6', 'level/6.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.image('map_tiles', 'assets/tilemap.png');

    },

    create: function() {
	game.state.start('menu');
    },
};
