// Create our only scene called mainScene, in the game.js file.
class mainScene {

    preload(){
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds 
    
    // SPRITE
    // Parameters: name of the sprite, path of the image
    this.load.image('player', 'assets/player.png');
    this.load.image('coin', 'assets/coin.png');
    }

    create(){
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    
    // PHYSICS
    // Parameters: x position, y position, name of the sprite
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.coin = this.physics.add.sprite(300, 300, 'coin');

    // Store the score in a variable, initialized at 0
    this.score = 0;

    // The style of the text
    // A lot of options are available, these are the most important ones
    let style = { font: '20px Arial', fill: '#fff' };

    // Display the score in the top left corner
    // Parameters: x position, y position, text, style
    this.scoreText = this.add.text(20,-100, 'score: ' + this.score, style);

    // TO MOVE THE PLAYER
    this.arrow = this.input.keyboard.createCursorKeys();
    }

    update(){
    // This method is called 60 times per second after create() 
    // It will handle all the game's logic, like movements

    // If the player is overlapping with the coin
    if(this.physics.overlap(this.player, this.coin)){
        // Call the new hit() method
        this.hit();
        console.log("More 10 points!");

    }

    // Handle horizontal movements
    if(this.arrow.right.isDown){
        // If the right arrow is pressed, move to the right
        this.player.x += 3;
        console.log("Right key pressed");

    } else if (this.arrow.left.isDown){
        // If the left arrow is pressed, move to the left
        this.player.x -= 3;
        console.log("Left key pressed");

    }

    // Do the same for vertical movements
    if(this.arrow.down.isDown){
        // If the down arrow is pressed, move to the down
        this.player.y += 3;
        console.log("Down key pressed");

    } else if(this.arrow.up.isDown){
        // If the up arrow is pressed, move to the up
        this.player.y -= 3;
        console.log("Up key pressed");
        
    }

    }

    hit(){
        
        // Change the position x and y of the coin randomly 
        this.coin.x = Phaser.Math.Between(100,600);
        this.coin.y = Phaser.Math.Between(100, 300);

        // Increment the socre by 10
        this.score += 10;

        // Display the updated score on the screen
        this.scoreText.setText('score: ' + this.score);

        // Create a new tween
        this.tweens.add({
            targets: this.player, // on the player
            duration: 200, // for 200ms
            scaleX: 1.2, // That scale vertically by 20%
            scaleY: 1.2, // And scale horizontally by 20%
            yoyo: true, // At the end, go back to original scale
        });
    }
}

// Start the game

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: {default: 'arcade'}, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game">
});