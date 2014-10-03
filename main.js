// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the game's assets  
        
        // change background color
        game.stage.backgroundColor = '#000099';
        
        // load the image
        game.load.image('ram','assets/ram.png');
    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // creating a variable that belongs to the game class, it's a simple name
        this.ram = this.game.add.sprite((game.width/2-4),(game.height/2-10),'ram');
        
        // phaser physics are applied to the ram
        game.physics.arcade.enable(this.ram);
        
        // pulls the ram down
        var gravLevel = 750;
        this.ram.body.gravity.y = gravLevel;
        
        // adds a function to space bar
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // add keys for left and right movement, as well as an alternate jump key
        var moveUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
        var moveRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        var moveLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        
        var speed = 100;

        // we'll need a jump method for this one
        spaceKey.onDown.add(this.jump(speed), this);
        moveUp.onDown.add(this.jump(speed), this);
        
        // call methods for left and right movement
        moveRight.onDown.add(this.right(speed), this);
        moveLeft.onDown.add(this.left(speed), this);
    },

    jump: function(speed) {
        // allows you to jump using the key indicated in the create method
        this.ram.body.velocity.y = -4*(speed);
    },
    
    right: function(speed){
        // method for moving right (+x direction)
        this.ram.body.velocity.x = 1*(speed);
    },
    
    left: function(speed){
        // method for moving left (-x direction)
        this.ram.body.velocity.x = -1*(speed);
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');
