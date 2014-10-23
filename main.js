// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the game's assets
        
        //change the background color
        game.stage.backgroundColor = '#222222';
        
        //add an image
        game.load.image('ram', 'assets/ram.png');
		game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.

		game.physics.startSystem(Phaser.Physics.ARCADE);
		
        //draw the ram image on the screen
        this.ram = this.game.add.sprite(100,100, 'ram');
		
		game.physics.arcade.enable(this.ram);
		
		this.ram.body.gravity.y = 1000;
		
		this.pipes = game.add.group();
		this.pipes.enableBody = true;
		this.pipes.createMultiple(20, 'pipe');
		
		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
		
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		spaceKey.onDown.add(this.jump, this);
		
		//this.score = 0;
		
		//this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
		
		
    },
	
	addOnePipe: function(x,y){
		var pipe= this.pipes.getFirstDead();
		
		pipe.reset(x,y);
		
		pipe.body.velocity.x = -200;
		
		pipe.checkWorldBounds = true;
		pipe.checkWorldBounds = true;
	},
	
	addRowofPipes: function(){
		var hole = math.floor(math.random()*5) +1;
		
		for(var i=0;i<8;i++){
			if(i != hole && i != hole +1)
				this.addOnePipe(400, i*60+10);
		}
		
		//this.score += 1;
		//this.labelScore.text = this.score;
	},

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
		//game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
    },
	
	jump: function() {
		this.ram.body.velocity.y = -300;
	}
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');
