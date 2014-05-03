var load_state = {
    preload: function() {
	this.game.stage.backgroundColor = '#fff';

	text = this.game.add.text(250, 250, "loading..", {
	    font: '30px Arial',
	    fill: '#87E8D1'
	});

	this.game.load.image('scene', 'assets/big_loading.png');
	this.game.load.image('loading', 'assets/full_loading.png');
	this.game.load.image('flag', 'assets/flag.png');
	this.game.load.spritesheet('character', 'assets/character.png', 5, 5);

	this.game.load.tilemap('level1', 'level/1.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.image('map_tiles', 'assets/tilemap.png');

    },

    create: function() {
	game.state.start('menu');
    },
};
