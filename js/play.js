var playState = {

    rows: [],
    baskets: [],
    tileSize: 40.5,
    leftPressed: false,
    rightPressed: false,
    upPressed: false,
    downPressed: false,
    carSpeed: 70,
    create: function () {

        this.baskets = [32,128,224,320];
        this.rows = [];
        rowNum = game.height/this.tileSize;
        for(var i = 0;i<rowNum;i++){
            this.rows.push(this.tileSize*i);
        };
        game.add.tileSprite(0,0,650,600,"bg");

        //this.player.x = 0+this.tileSize/2;
        //this.player = this.add.sprite(0+this.tileSize/2,this.rows[this.rows.length-1]+this.tileSize/2, "frog");
        this.player = this.add.sprite(100,100,"frog");
        this.player.position.setTo(this.game.width * 0.5, this.game.height * 1);

        // this.player.x = 0+this.tileSize/2;
        // this.player.y = this.rows[this.rows.length-1] + this.tileSize/2;

        this.player.anchor.setTo(0.5);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;


        this.cars = game.add.group();
        this.cars.enableBody = true;
        game.add.sprite(220,this.rows[this.rows.length- 3],"car2",0,this.cars);
        game.add.sprite(120,this.rows[this.rows.length-5],"car1",0,this.cars);
        for(var i = 0; i < this.cars.children.length; i++) {
            if((this.cars.children[i].y/32)%2 === 0 ){
                this.cars.children[i].body.velocity.x = -this.carSpeed;
            } else {
                this.cars.children[i].body.velocity.x = this.carSpeed;
            }
            this.cars.children[i].checkWorldBounds = true;
            this.cars.children[i].outOfBoundsKill = true;
        }



        this.cursors = game.input.keyboard.createCursorKeys();
    },

    // shouldCollide: function () {
    //   return this.player.body.velocity.x > 150 || this.player.body.velocity.y > 150;
    // },


    update: function () {

        // if(this.player.y < 2*this.tileSize+this.tileSize/2){
        //     this.player.y = 2*this.tileSize+this.tileSize/2;
        // }

        if(this.cursors.left.isDown && !this.leftPressed){
            this.leftPressed = true;
            this.player.x -= this.tileSize;
            this.player.angle = -90;
        }

        if(this.cursors.right.isDown && !this.rightPressed){
            this.rightPressed = true;
            this.player.x += this.tileSize;
            this.player.angle = 90;

        }

        if(this.cursors.up.isDown && !this.upPressed){
            this.upPressed = true;
            this.player.y -= this.tileSize;
            this.player.angle = 0;
        }

        if(this.cursors.down.isDown && !this.downPressed){
            this.downPressed = true;
            this.player.y += this.tileSize;
            this.player.angle = 180;
        }

        if(!this.cursors.left.isDown) {
            this.leftPressed = false;
        }
        if(!this.cursors.right.isDown) {
            this.rightPressed = false;
        }
        if(!this.cursors.up.isDown) {
            this.upPressed = false;
        }
        if(!this.cursors.down.isDown) {
            this.downPressed = false;
        }

        if(this.colideCounter >= 5){
            game.state.start('win');
        }
    }

};