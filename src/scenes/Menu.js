class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('run', './assets/Run.wav');
        this.load.audio('pico', './assets/pico.wav');
        this.load.audio('hurt1', './assets/hurt1.mp3');
        this.load.audio('hurt2', './assets/hurt2.mp3');
        this.load.audio('hurt3', './assets/hurt3.mp3');
        this.load.audio('hurt4', './assets/hurt4.mp3');
        this.load.audio('point', './assets/scofe.wav');
        this.load.audio('music', './assets/music.mp3');
      }
    
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Speedway Survivor', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to Run', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);    
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 2,
              carSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('pico');
            this.scene.start('playScene');   
            this.sound.play('music'); 
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 3,
              carSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('pico');
            this.scene.start('playScene');    
            this.sound.play('music');
          }
    }
}