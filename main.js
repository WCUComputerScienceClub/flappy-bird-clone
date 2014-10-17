// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the game's assets 

		// Change the background Color
		game.stage.backgroundColor = '#71c5cf';
		
		// Add ram and pipe images
		game.load.image('ram','assets/ram.png');
		game.load.image('pipe', 'assets/pipe.png');
		
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


		this.pipes = game.add.group(); //create a group
		this.pipes.enableBody = true; // add physics
		this.pipes.createMultiple(20, 'pipe'); //create 20 pipes


		//add a timer
		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
		
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		spaceKey.onDown.add(this.jump, this);
    },

    addOnePipe: function(x,y){
    	//Get the first dead pipe of the group
    	var pipe = this.pipes.getFirstDead();
    	//Set the position of the pipe
    	pipe.reset(x,y);
    	//add velocity to the pipe, making it move left
    	pipe.body.velocity.x = -200;
    	//remove the pipe when it's not visible
    	pipe.checkWorldBounds = true;
    	pipe.outOfBoundsKill = true;
	},

	addRowOfPipes: function(){
		var hole = Math.floor(Math.random()*5) + 1;

		//add the 6 pipes
		for(var i=0;i<8;i++){
			if(i != hole && i != hole + 1)
				this.addOnePipe(400,i*60+10);
		}
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
