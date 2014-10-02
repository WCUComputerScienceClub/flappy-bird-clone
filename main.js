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
        
        // creating a variable that belongs to the game class, it's a simple name
        this.ram = this.game.add.sprite((game.length/2-4),(game.height/2-10),'ram');
        
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');
