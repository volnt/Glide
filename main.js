var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game_div');

var main_state = {

    preload: function() {
	this.game.stage.backgroundColor = '#0C0C0C';
    },

    create: function() {
    },

    update: function() {
    },
}

game.state.add('main', main_state);
game.state.start('main');
