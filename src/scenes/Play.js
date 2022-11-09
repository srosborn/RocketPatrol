class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('car', './assets/car1.png');
        this.load.image('man', './assets/man.png');
        this.load.image('dead', './assets/Dead.png');
        this.load.image('car2', './assets/car2.png');
        this.load.image('car3', './assets/car3.png');
        this.load.image('car4', './assets/car4.png');
        this.load.image('car5', './assets/car5.png');
        this.load.image('car6', './assets/car6.png');
        this.load.image('car7', './assets/car7.png');
        this.load.image('car8', './assets/car8.png');
        this.load.image('car9', './assets/car9.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('highway', './assets/Street.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    
    create() {
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 25, 640, 480, 'highway').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, 0, game.config.width, borderUISize + 20, 0xFFFFFF).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize + 20, 0x4E4E4E).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize + 35, game.config.width, borderUISize - 50, 0x4E4E4E).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding + 5, 'man').setOrigin(0.5, 0);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.car1 = new FastCar(this, game.config.width - borderUISize*18, borderUISize*3.5, 'car4', 0, 0).setOrigin(0, 0);
        this.car2 = new FastCar(this, game.config.width - borderUISize*12, borderUISize*3.5, 'car4', 0, 0).setOrigin(0, 0);
        this.car3 = new FastCar(this, game.config.width - borderUISize*6, borderUISize*3.5, 'car4', 0, 0).setOrigin(0, 0);
        this.car4 = new FastCar(this, game.config.width - borderUISize, borderUISize*3.5, 'car4', 0, 0).setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width - borderUISize*21, borderUISize*6.3, 'car7', 0, 30).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width - borderUISize*14, borderUISize*6.3, 'car', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width - borderUISize*7, borderUISize*6.3, 'car2', 0, 20).setOrigin(0,0);
        this.ship08 = new Spaceship(this, game.config.width - borderUISize*18, borderUISize*9, 'car9', 0, 30).setOrigin(0, 0);
        this.ship07 = new Spaceship(this, game.config.width - borderUISize*12, borderUISize*9, 'car8', 0, 30).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width - borderUISize*6, borderUISize*9, 'car5', 0, 10).setOrigin(0,0);
        this.ship09 = new Spaceship(this, game.config.width - borderUISize, borderUISize*9, 'car3', 0, 10).setOrigin(0,0);
        this.ship05 = new Spaceship(this, game.config.width - borderUISize*10, borderUISize*12, 'car7', 0, 30).setOrigin(0, 0);
        this.ship06 = new Spaceship(this, game.config.width - borderUISize*1, borderUISize*12, 'car6', 0, 30).setOrigin(0, 0);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;
        this.combo = 0;
        this.comboActive = false;
          // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.scoreLeft = this.add.text(borderPadding, borderUISize - borderPadding*2.3, "Score: " + this.p1Score, scoreConfig);
        this.comboCount = this.add.text(game.config.width / 2.5, borderUISize - borderPadding*2.3, "Combo: " + this.combo, scoreConfig);

        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5); this.gameOver = true;
        }, null, this);
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (this.p1Rocket.y <= borderUISize) {
            this.isFiring = false;
            this.scorePoints();
            this.p1Rocket.reset();
        }

        this.starfield.tilePositionX -= 8;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
            this.ship06.update();
            this.ship07.update();
            this.ship08.update();
            this.ship09.update();
            this.car1.update();
            this.car2.update();
            this.car3.update();
            this.car4.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship05)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();  
        }
        if (this.checkCollision(this.p1Rocket, this.ship06)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset(); 
        }
        if (this.checkCollision(this.p1Rocket, this.ship07)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset(); 
        }
        if (this.checkCollision(this.p1Rocket, this.ship08)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset(); 
        }
        if (this.checkCollision(this.p1Rocket, this.ship09)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset(); 
        }
        if (this.checkCollision(this.p1Rocket, this.car1)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.car2)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.car3)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.car4)) {
            this.deathNoise();
            this.resetCombo();
            this.p1Rocket.reset();
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    scorePoints() {
        this.sound.play('point');
        if (!this.comboActive) {
            this.comboActive = true;
        }
        this.combo += 1;
        this.comboCount.text = "Combo: " + this.combo;
        if (this.combo > this.p1Score) {
            this.p1Score = this.combo;
            this.scoreLeft.text = "Score: " + this.p1Score;
        }
    }

    deathNoise() {
        let rando = Math.floor(Math.random() * 4);
        if (rando == 0) {
            this.sound.play('hurt1');
        } else if (rando == 1) {
            this.sound.play('hurt2');
        } else if (rando == 2) {
            this.sound.play('hurt3');
        } else {
            this.sound.play('hurt4');
        }
    }

    resetCombo() {
        this.comboActive = false;
        if(this.combo > this.p1Score) {
            this.p1Score = this.combo;
        }
        if (this.combo > 0) {
            this.comboCount.text = "Combo Broken";
        } else {
            this.comboCount.text = "Combo: " + this.combo;
        }
        this.combo = 0;
        
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        }); 
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
      }
}