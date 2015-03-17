//Make 2 minute days to reset
//Add in bonuses and hazards
//Before GDC

enchant();

var game = new Core(630, 360); // game stage
    game.preload('./content/chara1.png', './content/testBkg.png', './content/kiTest6.png', './content/Block.png', './content/redStar.png', './content/yellowStar.png', './content/greenStar.png', './content/blackStar.png' ); // preload image
    game.fps = 30;
    game.onload = function(){
        game.keybind(66, 'b');

        var lastWidth = 0;
        var lastX = 0;
        var endWidth = 631;
        var currentF = 0;
        //var cp = 0;

        var floors = [4];
        var fNum = 0;

        // Define movement variables
        var gravity = 0.5;
        var nextBlock = 50;
        var nextBlockCounter = 0;

        //Create Background
        var background = new Sprite(630, 360);
        background.image = game.assets['./content/testBkg.png'];
        game.rootScene.addChild(background);
        var sizeX = 0;
        var sizeY = 0;
/*
        var redStar = new Sprite(50, 50);
        redStar.image = game.assets['./content/redStar.png']; 
        redStar.x = redStar.y = 0;
        game.rootScene.addChild(redStar);

        var yellowStar = new Sprite(50, 50);
        yellowStar.image = game.assets['./content/yellowStar.png']; 
        yellowStar.x = yellowStar.y = 0;
        game.rootScene.addChild(yellowStar);

        var greenStar = new Sprite(50, 50);
        greenStar.image = game.assets['./content/greenStar.png']; 
        greenStar.x = greenStar.y = 0;
        game.rootScene.addChild(greenStar);

        var blackStar = new Sprite(50, 50);
        blackStar.image = game.assets['./content/blackStar.png']; 
        blackStar.x = blackStar.y = 0;
        game.rootScene.addChild(blackStar);
        bonuses[0] = redStar;
        bonuses[1] = yellowStar;
        bonuses[2] = greenStar;
        bonuses[3] = blackStar;
*/
        var bonuses = [4];
        //alert('bonus ' + bonuses.length);

        //Create Player
        var plyr = new Sprite(74, 99);
        plyr.image = game.assets['./content/kiTest6.png'];
        plyr.frame = [1, 1 , 0, 0, 0, 0, 1, 1];
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

        plyr.addEventListener(Event.ENTER_FRAME, function(){
            if (plyr.y > 400)
                alert('failed at ' + ticksToFail);
        });
        
        game.rootScene.addChild(plyr);

        Floor = Class.create(Sprite, {
            initialize: function(x,y){
                if (x == 0 || y == 0)
                {
                    enchant.Sprite.call(this, 1500, 198);
                    if (lastDead.id == -1)
                    {
                        this.x = 30;
                        nextBlock = 50;
                    }
                    else
                    {
                        this.x = (floors[fNum].x + floors[fNum].width) + 100;//+ Math.floor(Math.random() * 150);
                        if ((floors[fNum].x + floors[fNum].width) + 100 < 630)
                            this.x = 630;
                        nextBlock = (this.width / 3.75);
                    }
                    this.y = 300;
                }
                else
                {
                    //enchant.Sprite.call(this, x, y);
                    enchant.Sprite.call(this, Math.floor( (Math.random() * 600) + 150) , 
                    Math.floor( (Math.random() * 300) + 150) );
                    //console.log(floors[fNum - 1].x);
                    this.x = (floors[fNum].x + floors[fNum].width) + 100;//+ Math.floor(Math.random() * 150);
                    if ((floors[fNum].x + floors[fNum].width) + 100 < 630)
                        this.x = 630;
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
                /*this.bonus = new Bonus(Math.floor(Math.random() * 4));
                this.bonus.x = this.x + ' ' + (this.width / 2);
                this.bonus.y = this.y - 50;
                alert('at ' + this.bonus.x + this.bonus.y);*/
            },
            die: function(){
                if (this.x <= (0 - this.width))
                {
                    lastDead = this;
                    game.rootScene.removeChild(this);
                    floors[this.id] = {id: -1};

                    console.log(this.id + ' is dead');
                    console.log(floors[this.id]);
                    
                    if (this.id < 4)
                        currentF = this.id + 1;
                    else
                        currentF = 0;
                    //cp = currentF + 1;
                    //if (cp > 4)
                        //cp = 0;
                }
            },
            move: function(){
                this.x -= 5;
                //this.bonus.x -= 5;

            }
        });

        //Bonus/Obstacles
        Bonus = Class.create(Sprite, {
            initialize: function(parentFloor, type){
                enchant.Sprite.call(this, 50, 50);
                this.x = parentFloor.x + parentFloor.width * .75;
                this.y = parentFloor.y - 75;
                this.baseY = this.y;
                this.Up = true;
                this.bottom
                switch (type)
                {
                    case 0:
                        this.image = game.assets['./content/redStar.png'];
                    break;
                    case 1:
                        this.image = game.assets['./content/yellowStar.png']; 
                    break;
                    case 2:
                        this.image = game.assets['./content/greenStar.png']; 
                    break;
                    case 3:
                        this.image = game.assets['./content/blackStar.png']; 
                    break;
                    case 4:
                        this.image = game.assets[''];
                    break;
                    default:
                    break;
                }

                this.addEventListener(Event.ENTER_FRAME, this.move);
            },
            move: function(direction){
                this.x -= 5;
                switch (direction)
                {
                    case 0:
                        if (this.y < this.baseY - 50)
                            this.Up = !this.Up;
                        if (this.Up)
                            this.y--;
                        else
                            this.y++;
                    break;
                    default:
                    break;
                }

            }
        });

        var addFloors = function(idkfloor) {
            fNum++;
            if (fNum > 4)
                fNum = 0;
            idkfloor.id = fNum;
            //
            var bonus = new Bonus(idkfloor, ((Math.floor(Math.random() * 5))));
            bonuses[fNum] = bonus;
            floors[fNum] = idkfloor;
            nextBlockCounter = 0;
            lastBlock = 0;
            //endWidth = floors[fNum].x + floors[fNum].width;
            //console.log(idkfloor);
                //console.log('frame');
        }
        
        var levelStart = function() {
            console.log("LONG floor #" + fNum + " added!");
            var floor1 = new Floor(0, 0);
            
            //catchBad(floor1, )
            addFloors(floor1);
            game.rootScene.addChild(floors[fNum]);
            game.rootScene.addChild(bonuses[fNum]);
            console.log(floor1.bonus);

            console.log(floors[fNum]);
        }

        var floorTrain = function() {
            console.log("Floor #" + fNum + " added!");
            var addedFloor = new Floor(1, 1);
            //console.log(fNum);
            addFloors(addedFloor);   
            game.rootScene.addChild(floors[fNum]);
            game.rootScene.addChild(bonuses[fNum]);
            console.log(floors[fNum]);
        }

        var catchBad = function (fixit, sender) {
            
        }

        var ticksToFail = 0;
        var lastBlock = 0;
        var lastDead = Floor.call(0,0);
        var checkNew;

        var floor1 = new Floor(0, 0);

        addFloors(floor1);
        game.rootScene.addChild(floors[fNum]);
        lastDead.id = floor1.id;
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
            alert(ticksToFail);//floors[fNum].die();
        });

        
        //Player Gravity Updates
        plyr.addEventListener(Event.ENTER_FRAME, function(){
            plyr.velocityY += gravity;
            plyr.y += plyr.velocityY;
            ticksToFail++;
            lastBlock++;
                grounded(floors);
                if(plyr.onGround == true)
                {
                    //console.log('Event: ' + plyr.onGround);
                    for(var i = 0; i <= 4; i++)
                    {
                        if (floors[i] != undefined)
                        if (floors[i].id >= 0)
                        {
                            if (plyr.intersect(floors[i]))
                            {
                                //console.log(i);
                                plyr.y = floors[i].y - plyr.height;
                                plyr.velocityY = 0.0;
                                plyr.onGround = true;
                            }
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
            
            //if (floors[cp].id >= 0)
                //endWidth = floors[currentF].x + floors[currentF].width;

            nextBlockCounter++;

            checkNew = fNum >= 2 ? fNum - 2 : fNum + 3;
            if (nextBlockCounter >= nextBlock)
                {    
                    //if (lastDead.id > -1)
                    // if (checkNew < 0)
                    //   checkNew = 4;

                   /* console.log("Check var " + checkNew);
                    console.log("lastDead.id " + lastDead.id);
                    console.log("Current var " + currentF); */
                    //console.log(floors[lastDead.id]);


                    {
                        console.log("Alt Check var " + checkNew);
                        console.log("Alt lastDead.id " + lastDead.id);
                        console.log("Alt Current var " + currentF);
                
                        //if (currentF != fNum)
                            floorTrain();

                    }
                    
                }
               /* else if (endWidth < 630)
                    {
                        if (floors[currentF] )
                        {
                            if ( (checkNew == (fNum - 2)) || (checkNew == (fNum + 3) ))
                                if (currentF != fNum)
                                    floorTrain();
                        }
                    }
*/
            else if (ticksToFail >= 3600)
            {
                levelStart();
                ticksToFail = 0;
            }
            else if (lastBlock > 299)
            {
                alert(lastBlock);
                floorTrain();
            }

        });

    };

    game.start();