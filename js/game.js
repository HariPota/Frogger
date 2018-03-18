var game = new Phaser.Game(640,480, Phaser.AUTO, '');

game.state.add('play', playState);
game.state.add('load', loadState);
game.state.add('win', winState);
game.state.add('menu', menuState);

game.state.start('load');