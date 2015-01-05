window.addEventListener("load", function() {
  console.log("Hello World!");
});

enchant(); // initialize

    var game = new Core(630, 360); // game stage
    game.preload('./content/chara1.png'); // preload image
    game.preload('./content/testBkg.png');
//alert(game.assets['chara1.png']);
    game.fps = 20;

    game.onload = function(){
        var background = new Sprite(630, 360);
        background.image = game.assets['./content/testBkg.png'];
    	
        var bear = new Sprite(32, 32);
        bear.image = game.assets['./content/chara1.png'];
        bear.x = 50;
        bear.y = 300;

        var skate = new Sprite(32, 32);
        skate.image = game.assets['./content/chara1.png'];
        skate.frame = 4;

        skate.addEventListener(Event.ENTER_FRAME, function() {
            this.x +=3;
        });

        var hello = new Label("Hello, Bear!");
        hello.x = 10;
        hello.y = 150;

        bear.frame = [6, 6, 7, 7];   // select sprite frame

        var date = new Date();

       // var d = new Label(date.getDate());
       // var m = new Label(date.getMonth() + 1);
       // m.y = 10;
       // var y = new Label(date.getFullYear());
       // y.y = 20;

        var h = new Label(date.getHours());
        var m = new Label(date.getMinutes());
        var lastUpdate = Date.now();
        m.y = 10;

        m.dt = function(){
            ///
        };
        
        m.addEventListener(Event.EVENT_FRAME, function(){
            console.log(m);
        });

        game.rootScene.addChild(background);
        game.rootScene.addChild(skate);
        game.rootScene.addChild(bear);
        game.rootScene.addChild(hello);
        game.rootScene.addChild(h);
        console.log(date.getHours() + ':' + date.getMinutes() );
        game.rootScene.addChild(m);
        //game.rootScene.addChild();
        
        //bear.moveTo(50, 300);
        /*bear.tl.moveBy(288, 0, 90)   // move right
            .scaleTo(-1, 1, 10)      // turn left
            .moveBy(-288, 0, 90)     // move left
            .scaleTo(1, 1, 10)       // turn right
            .loop();     */     
        
    };

    game.start(); // start your game!