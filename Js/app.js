enchant();

var game = new Core(630, 360); // game stage
    game.preload('./content/chara1.png', './content/testBkg.png', './content/test.png', './content/Block.png'); // preload image
    
    game.onload = function(){
        game.keybind(66, 'b');

        var lastWidth = 0;
        var lastX = 0;
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

        plyr.addEventListener(Event.ENTER_FRAME, function(){
            if (plyr.y > 400)
                alert('failed at ' + ticksToFail);
        });

        var floors = [4];
        var fNum = 0;

        Floor = Class.create(Sprite, {
            initialize: function(x,y){
                if (x == 0 || y == 0)
                {
                    enchant.Sprite.call(this, 1500, 198);
                    this.x = 30;
                    this.y = 300;
                    nextBlock = 50;
                }
                else
                {
                    //enchant.Sprite.call(this, x, y);
                    enchant.Sprite.call(this, Math.floor( (Math.random() * 500) + 100) , 
                    Math.floor( (Math.random() * 300) + 150) );
                    //console.log(floors[fNum - 1].x);
                    
                    this.x = (floors[fNum].x + floors[fNum].width) + 100;//(Math.sqrt( Math.pow( floors[fNum].x, 2) + Math.pow( ,2) ));//Math.floor( Math.random() * 100 );// + lastX;

                    this.y = 360 - (this.height / 2);//Math.floor( Math.random() * 360 ) ;
                    nextBlock = (this.width / 3.75);
                    //alert(nextBlock);
                    //console.log("X Pos: " + this.x);
                    //console.log("Height: " + this.height);
                    //console.log("Y pos: " + this.y);
                }
                this.id = -1;
                lastWidth = this.width;
                lastX = this.x;

                this.image = game.assets['./content/Block.png'];
                this.addEventListener(Event.ENTER_FRAME, this.die);
                this.addEventListener(Event.ENTER_FRAME, this.move);
            },
            die: function(){
                if (this.x <= (0 - this.width))
                {
                    lastDead = this;
                    game.rootScene.removeChild(this);
                    console.log(this.id + ' is dead');
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
            idkfloor.id = fNum;
            //
            floors[fNum] = idkfloor;
            //console.log(idkfloor);
                //console.log('frame');
        }
        
        var ticksToFail = 0;
        var lastDead = Floor.call(0,0);
        var checkNew;
        //makeFloor(0, 0);
        var floor1 = new Floor(0, 0);
        /*var floor2 = new Floor(0, 0);
        var floor3 = new Floor(0, 0);
        var floor4 = new Floor(0, 0);
        var floor5 = new Floor(0, 0);*/
        lastDead.id = floor1.id;
        addFloors(floor1);
        game.rootScene.addChild(floors[fNum]);
        //console.log(addFloor.width);
        //console.log(addFloor instanceof floor);
        //console.log(addFloor instanceof Sprite);

        

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
        game.rootScene.addEventListener(Event.B_BUTTON_DOWN, function(){
            alert();//floors[fNum].die();
        });

        
        //Player Gravity Updates
        plyr.addEventListener(Event.ENTER_FRAME, function(){
            plyr.velocityY += gravity;
            plyr.y += plyr.velocityY;
            ticksToFail++;
                grounded(floors);
                if(plyr.onGround == true)
                {
                    //console.log('Event: ' + plyr.onGround);
                    for(var i = 0; i <= 4; i++)
                    {
                        if (plyr.intersect(floors[i]))
                        {
                            plyr.y = floors[i].y - plyr.height;
                            plyr.velocityY = 0.0;
                            plyr.onGround = true;
                        }
                    }
                }

            });

        game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
            //
            /*
                Countdown time until next block created. Calculate if 
            */
            //
            nextBlockCounter++;
            if (nextBlockCounter >= nextBlock)
                {
                    //makeFloor();

                   
                    {
                        
                        checkNew = fNum >= 2 ? fNum - 2 : fNum + 3;
                       if (lastDead.id > -1)
                        {


                        }
                       // if (checkNew < 0)
                         //   checkNew = 4;
                        console.log("Check var " + checkNew);
                        console.log("lastDead.id " + lastDead.id);
                        if ( fNum != checkNew)
                        {
                            //if (lastDead.id != checkNew)
                            {
                            console.log("Floor #" + fNum + " added!");
                        var addedFloor = new Floor(1, 1);
                      
                        //console.log(fNum);
                        addFloors(addedFloor);   
                        nextBlockCounter = 0;
                        game.rootScene.addChild(floors[fNum]);//floors[fNum]);
                            }
                        }
                        else
                            nextBlockCounter -= 2; 
                    }
                }


        });
    };

    game.start();