var loadState = {

    preload: function () {
        game.load.image('bg', '../img/bg.png');
        game.load.image('frog', '../img/frog.png');
        game.load.image('car1', '../img/car1.png');
        game.load.image('car2', '../img/car2.png');


    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('play');
    }

};