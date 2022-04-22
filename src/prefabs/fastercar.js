class FastCar extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.carSpeed;
        this.upDown = true;
    }

    update() {
        this.x -= this.moveSpeed;
        console.log(this.y);
        console.log(this.upDown);

        if(!this.upDown && this.y <= 132){
            this.y += 0.5;
        }

        if(this.upDown && this.y >= 80) {
            this.y -= 0.5;
        }

        if(this.y <= 80) {
            this.upDown = false;
        }

        if(this.y >= 132) {
            this.upDown = true;
        }

        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}