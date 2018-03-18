var menuState = {

    create: function () {
        game.add.text(100,100, 'Menu - click space to start', {fill: '#fff'});

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.startGame, this)
    },


    startGame: function () {
        game.state.start('play');
        this.music = this.add.audio("Music",1,true,true);

        this.music.play("",0,1,true,true);
        this.music.volume = 0.3;
        this.music.loop = true;
    }
};