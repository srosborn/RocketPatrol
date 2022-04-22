class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        //left & right movement
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
        

        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !(this.isFiring)) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        //if fired, move up
        if (this.isFiring && this.y >= borderUISize) {
            this.y -= this.moveSpeed;
            console.log(this.y);
        }

    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
  }