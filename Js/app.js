enchant();

var game = new Core(630, 360); // game stage
    game.preload('./content/chara1.png', './content/testBkg.png', './content/test.png', './content/Block.png'); // preload image
    
    game.onload = function(){

        // Define movement constants
        var gravity = 0.5;
        var nextBlock = 50;
        var nextBlockCounter = 0;

        //Create Background
    	var background = new Sprite(630, 360);
        background.image = game.assets['./content/testBkg.png'];
        game.rootScene.addChild(background);
        var sizeX = 0;
        var sizeY = 0;

        //Create Player
        var plyr = new Sprite(50, 100);
        plyr.image = game.assets['./content/test.png'];
        plyr.frame = 10;
        plyr.x = 75;
        plyr.y = 200;
        plyr.velocityY = 0.0;
        plyr.onGround = false;

        var grounded = function(floorObj){
          
            for(var i = 0; i <= 4; i++)
            {
                if (plyr.intersect(floors[i]))
                {
                    if (plyr.onGround == false)
                        plyr.onGround = true;
                }
                else
                    if (plyr.onGround == false)
                        plyr.onGround = false;  
            }
            //console.log('grounded: ' + plyr.onGround);
        };

        game.rootScene.addChild(plyr);

        var floors = [4];
        var fNum = 0;
        
        //var newFloor;
        //Create Ground + new
        var floor = enchant.Class.create(enchant.Sprite, function(sizeX, sizeY){
            if (sizeX == 0 || sizeY == 0)
            {
                //this = new Sprite(480, 198);
                enchant.Sprite.call(this, 480, 198);
                this.x = 30;
                this.y = 300;
                this.image = game.assets['./content/Block.png'];
            }
            else
            {
                enchant.Sprite.call(this, Math.floor( (Math.random() * 400) + 100) , 
                    Math.floor( (Math.random() * 200) + 20) );
                this.image = game.assets['./content/Block.png'];
                this.x = 500;// Math.floor( Math.random() * 100 ) + 50;
                this.y = game.height - this.height;
            }

            this.id = fNum;
            this.image = game.assets['./content/Block.png'];
                console.log(this.log);
            this.top = this.y - this.height;

            nextBlock = this.width / 10;
            //this.addEventListener(Event.ENTER_FRAME, addFloors(this));
            //console.log(nextBlock);
//            this.addEventListener(Event.ENTER_FRAME, function(){});
        }); 

        Floor = Class.create(Sprite, {
            initialize: function(x,y){
                if (x == 0 || y == 0)
                {
                    enchant.Sprite.call(this, 480, 198);
                }
                else
                {
                    enchant.Sprite.call(this, x, y);
                }
                this.image = game.assets['./content/Block.png'];
                this.x = 30;
                this.y = 300;
                this.addEventListener(Event.ENTER_FRAME, this.die);
                this.addEventListener(Event.ENTER_FRAME, this.move);
            },
            die: function(){
                if (this.x <= (0 - floors[fNum].width))
                {
                    game.rootScene.removeChild(this);
                }
            },
            move: function(){
                this.x -= 5;
            }
        });

        var addFloors = function(idkfloor) {
            fNum++;
            if (fNum > 4)
                fNum = 0;
            floors[fNum] = idkfloor;
            console.log(idkfloor);
                //console.log('frame');
                if (floors[fNum].x <= (0)) // - floors[fNum].width))
                {
                    game.rootScene.removeChild(floors[fNum]);
                }
        }

        /*
        floor.prototype.addEventListener(Event.ENTER_FRAME, function(){
            this.x -= 5;
            if (this.x <= (0 - this.width))
            {
                game.rootScene.removeChild(this);
            }
        });
*/
/*
for (fNum = 0; fNum <= 4; fNum++)
        {
            floors[fNum].addEventListener(Event.ENTER_FRAME, function() {
                floors[fNum].x -= 5;
                if (floors[fNum].x <= (0 - floors[fNum].width) )
                    {
                        floors[fNum].removeEventListener(Event.ENTER_FRAME);
                        game.rootScene.removeChild(floors[fNum]);
                        //console.log(fNum + ' removed');
                        //newFloor.remove();
                    }
            });
        }
        */

        var makeFloor = function(sizeX, sizeY) {
            if (sizeX == 0 || sizeY == 0)
            {
                var newFloor = new Sprite(480, 198);
                newFloor.x = 30;
                newFloor.y = 300;
            }
            else
            {
                var newFloor = new Sprite( Math.floor( (Math.random() * 400) + 100) , 
                    Math.floor( (Math.random() * 200) + 20) );
                newFloor.x = 500;// Math.floor( Math.random() * 100 ) + 50;
                newFloor.y = game.height - newFloor.height;
            }
            
            newFloor.id = fNum;
            newFloor.image = game.assets['./content/Block.png'];
            newFloor.top = newFloor.y - newFloor.height;

            nextBlock = newFloor.width / 10;
            //console.log(nextBlock);

            fNum++;
            if (fNum > 4)
                fNum = 0;
            floors[fNum] = newFloor;
            console.log(fNum);
            floors[fNum].addEventListener(Event.ENTER_FRAME, function() {
                //console.log('frame');
                
            });
            //alert(newFloor.top);
            //console.log(floors[fNum].top);

        };
        
        //makeFloor(0, 0);
        var addFloor = new Floor(0, 0);
        //addFloor.image = game.assets['./content/Block.png'];
        //addFloor.x = 5;
        //addFloor.y = 100;
        console.log(addFloor.image);
        addFloors(addFloor);

        console.log(addFloor instanceof floor);
        console.log(addFloor instanceof Sprite);

        game.rootScene.addChild(floors[fNum]);

        //Game Inputs
		game.rootScene.addEventListener(Event.TOUCH_START, function(){

            if(plyr.onGround == true)
            {
                plyr.velocityY = -15.0;
                plyr.onGround = false;
            }
        });

        game.rootScene.addEventListener(Event.TOUCH_END, function(){
            if (plyr.velocityY < -7.0)
                plyr.velocityY = -7.0;
        });


        
        //Player Gravity Updates
        plyr.addEventListener(Event.ENTER_FRAME, function(){
            plyr.velocityY += gravity;
            plyr.y += plyr.velocityY;

                grounded(floors);
                if(plyr.onGround == true)
                {
                    //console.log('Event: ' + plyr.onGround);
                    //alert(floor.y);
                    for(var i = 0; i <= 4; i++)
                    {
                        if (plyr.intersect(floors[i]))
                        {
                            plyr.y = floors[i].y - plyr.height;
                            plyr.velocityY = 0.0;
                            plyr.onGround = true;
                        }
                    }
                    /*
                    
                    plyr.y = newFloor.y - plyr.height;
                    plyr.velocityY = 0.0;
                    plyr.onGround = true;
                    */
                }

            //if(positionX < 10 || positionX > 190)
              //  velocityX *= -1;
            });
        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {

            nextBlockCounter++;
            //console.log(game.fps);
            if (nextBlockCounter >= nextBlock)
                {
                    //makeFloor();

                    var addedFloor = new Floor();
                  //  addedFloor.x = 5;
                  //  addedFloor.y = 105;
                  //  addedFloor.image = game.assets['./content/Block.png'];
                    addFloors(addedFloor);

                    console.log(addedFloor.image);
                    game.rootScene.addChild(floors[fNum]);//floors[fNum]);
                    //console.log(nextBlockCounter);
                    nextBlockCounter = 0;
                }


        });
    };

    game.start();