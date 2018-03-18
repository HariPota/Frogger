var loadState = {

    preload: function () {
        game.load.image('bg', '../img/bg.png');
        game.load.image('frog', '../img/frog.png');
        game.load.image('car1', '../img/car1.png');
        game.load.image('car2', '../img/car2.png');
        game.load.image('carR1', '../img/carR1.png');
        game.load.image('carR2', '../img/carR2.png');
        game.load.image('carG1', '../img/carG1.png');
        game.load.image('carG2', '../img/carG2.png');
        game.load.image('log', '../img/log.png');


    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('play');
    }

};