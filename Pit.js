Pit = Class.create(Sprite,{     
	initialize:function(x,y){          
		//Call the Sprite class (super class) constructor          
		enchant.Sprite.call(this,48,48);          
		this.image = game.assets[’mogura.png’];          
		this.x = x;          
		this.y = y;          
		//Defines an event listener to run every frame          
		this.addEventListener(’enterframe’,this.tick);          
		//Defines an event listener for when the Droid gets whacked          
		this.addEventListener(’touchstart’,this.hit);          
		//Set the Droid mode to 2 (waiting) in the beginning.          
		this.mode = 2;          
		//Set the next mode as 0 (appearing)          
		this.nextMode = 0;          
		//wait for a random number (0-99) of frames          
		this.waitFor =  game.frame+rand(100);          
		//stores info on whether or not the Droid          
		//has already been whacked          
		this.currentlyWhacked = false;     
	},     
	tick:function(){          
		//only change the frame every other frame          
		//the return call ends the function          
		if(game.frame%2!=0)return;          
		switch(this.mode){               
		//Droid is appearing from the hole               
		case 0:                    
		this.frame++;                    
		if(this.frame>=4) {                    
		//switch to Mode 2 (waiting) after appearing                    
		this.mode=2;                    
		//the mode to go to after Mode 2 is Mode 1 (hide)                    
		this.nextMode=1;                    
		//Set a random waiting time for 0 ~ 99 frames                    
		this.waitFor = game.frame+rand(100);                         
		}                    
		break;               
		//Droid is going to hide in the hole               
		case 1:                    this.frame--;                    //if Droid is hidden...                    if(this.frame<=0){                         //Switch to Mode 2 (waiting)                         this.mode=2;                         //The next mode should be Mode 0 (appear)                         this.nextMode=0;
