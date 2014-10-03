// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the game's assets 

		// Change the background Color
		game.stage.backgroundColor = '#71c5cf';
		
		// Add an image
		game.load.image('ram','assets/ram.png');
		
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Draw the ram image on the screen
		this.ram = this.game.add.sprite(100,100,'ram');
		
		// Tell Phaser we want the ram to have gravity
		game.physics.arcade.enable(this.ram);
		
		// Add gravity to the ram so it falls
		this.ram.body.gravity.y = 1000;
		
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		spaceKey.onDown.add(this.jump, this);
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
    }, 
	
	jump: function() {
		this.ram.body.velocity.y = -300;
	}
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');
