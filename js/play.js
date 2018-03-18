var playState = {
    rows: [],
    baskets: [],
    tileSize: 32,
    leftPressed: false,
    rightPressed: false,
    upPressed: false,
    downPressed: false,
    carSpeed: 30,
    logSpeed: 30,
    onLog: true,

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


        // SAMOCHODY
        this.cars = game.add.group();
        this.cars.enableBody = true;
        game.add.sprite(0,this.rows[this.rows.length- 3],"car2",0,this.cars);
        game.add.sprite(150,this.rows[this.rows.length- 3],"carR2",0,this.cars);
        game.add.sprite(300,this.rows[this.rows.length- 3],"car2",0,this.cars);
        game.add.sprite(530,this.rows[this.rows.length- 3],"carG2",0,this.cars);
        game.add.sprite(20,this.rows[this.rows.length-5]+2,"car1",0,this.cars);
        game.add.sprite(300,this.rows[this.rows.length- 5]+2,"carR1",0,this.cars);
        game.add.sprite(400,this.rows[this.rows.length- 5]+2,"car1",0,this.cars);
        game.add.sprite(580,this.rows[this.rows.length- 5]+2,"carG1",0,this.cars);
        game.add.sprite(0,this.rows[this.rows.length-6]+1,"car1",0,this.cars);
        game.add.sprite(160,this.rows[this.rows.length-6]+1,"carR1",0,this.cars);
        game.add.sprite(320,this.rows[this.rows.length-6]+1,"car1",0,this.cars);
        game.add.sprite(480,this.rows[this.rows.length-7],"carG2",0,this.cars);

        for(var i = 0; i < this.cars.children.length; i++) {
            if((this.cars.children[i].y/32)%2 === 0 ){
                this.cars.children[i].body.velocity.x = -this.carSpeed;
            } else {
                this.cars.children[i].body.velocity.x = this.carSpeed;
            }
            this.cars.children[i].checkWorldBounds = true;
            this.cars.children[i].outOfBoundsKill = true;
        }

        game.physics.enable(this.cars, Phaser.Physics.ARCADE);


        //DRZEFFFKA
        this.logs = game.add.group();
        this.logs.enableBody = true;
        game.add.sprite(0,this.rows[this.rows.length-9]+1,"log",0,this.logs);
        game.add.sprite(380,this.rows[this.rows.length-9]+1,"log",0,this.logs);
        game.add.sprite(140,this.rows[this.rows.length-10]+2,"log",0,this.logs);
        game.add.sprite(520,this.rows[this.rows.length-10]+2,"log",0,this.logs);
        game.add.sprite(0,this.rows[this.rows.length-11]+1,"log",0,this.logs);
        game.add.sprite(240,this.rows[this.rows.length-12]+2,"log",0,this.logs);
        game.add.sprite(540,this.rows[this.rows.length-13]+1,"log",0,this.logs);

        for(var i = 0; i < this.logs.children.length; i++) {
            if(this.logs.children[i].y%2 === 0 ){
                this.logs.children[i].body.velocity.x = -this.logSpeed;
            } else {
                this.logs.children[i].body.velocity.x = this.logSpeed;
            }
            this.logs.children[i].checkWorldBounds = true;
            this.logs.children[i].outOfBoundsKill = true;
        }



        game.physics.enable(this.logs, Phaser.Physics.ARCADE);


        this.player = this.add.sprite(600,600,"frog");
        this.player.position.setTo(this.game.width * 0.5, this.game.height * 1);

        // this.player.x = 0+this.tileSize/2;
        // this.player.y = this.rows[this.rows.length-1] + this.tileSize/2;

        this.player.anchor.setTo(0.5);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.cursors = game.input.keyboard.createCursorKeys();
    },

    // shouldCollide: function () {
    //   return this.player.body.velocity.x > 150 || this.player.body.velocity.y > 150;
    // },

    checkCars: function(){
        var car = this.cars.getFirstDead();
        if(!car){
            return
        }
        var y = car.y
        var width = car.width
        if((y/32)%2 === 0 ){
            car.reset(game.world.width, y);
            car.body.velocity.x = -this.carSpeed;
        } else {
            car.reset(0-width, y);
            car.body.velocity.x = this.carSpeed;
        }
        car.checkWorldBounds = true;
        car.outOfBoundsKill = true;
    },

    checkLogs: function(){
        var log = this.logs.getFirstDead();
        if(!log){
            return
        }
        var y = log.y;
        var width = log.width;
        if(y%2 === 0 ){
            log.reset(game.world.width, y);
            log.body.velocity.x = -this.logSpeed;
        } else {
            log.reset(0-width, y);
            log.body.velocity.x = this.logSpeed;
        }
        log.checkWorldBounds = true;
        log.outOfBoundsKill = true;
    },
    checkIfOnLog: function(){
        this.onLog = true;
        for(var i = 0; i < this.logs.children.length; i++) {
            var log = this.logs.children[i];
            var boundsA = log.getBounds();
            var boundsB = this.player.getBounds();
            if(Phaser.Rectangle.intersects(boundsA, boundsB)){
                break;
            }
            if(i === this.logs.children.length-1) {
                this.onLog = false;
            }
        }
    },
    collideCallback : function (ob1,ob2) {
        ob1.kill();
        game.state.start('lose');
    },

    update: function () {
        this.checkIfOnLog();
        this.checkCars();
        this.checkLogs();
        // if(this.player.y < 2*this.tileSize+this.tileSize/2){
        //     this.player.y = 2*this.tileSize+this.tileSize/2;
        // }

        game.physics.arcade.collide(this.player, this.cars, this.collideCallback);
        if(this.player.y>this.rows[2]&&this.player.y<this.rows[7]&&!this.onLog){
            this.player.kill();
            game.state.start('lose');
        }


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

        if(this.player.y<2*this.tileSize+this.tileSize/2){
            game.state.start('win');
        }
    }

};