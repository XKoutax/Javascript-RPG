define(['Class', 'ImageLoader', 'SpriteSheet', 'Animation'], function (Class, ImageLoader, SpriteSheet, Animation) {

    var DEFAULT_WIDTH = 32, DEFAULT_HEIGHT = 32;
    var assets = {};

    var Assets = Class.extend({
        init:function(_name, _path, _width, _height){
            assets[_name] = this;
            this.name = _name;
            this.path = _path;
            this.width = _width;
            this.height = _height;
            this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
            this.animations = {};
        },
        addAnimation:function(_name, _animation){
            this.animations[_name] = _animation;

        }

    });

    Assets.DEFAULT_WIDTH = DEFAULT_WIDTH;
    Assets.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
    Assets.getAssets = function( _name ){
        return assets[_name];
    };

    //Create Player Assets
    var player = new Assets("player", "res/textures/link.png",120,130);

    //Build Frames for Player animation
    var framespeed =  1;   //30 milliseconds        //weird. de la lag merge mai greu decat ar trebui
    var wrframes = [];
    var wlframes = [];
    var wuframes = [];
    var wdframes = [];
    var wrrow = 7;
    var wlrow = 5;
    var wurow = 6;
    var wdrow = 4;
    for(var i=0; i<10; i++){
        wrframes.push({
            frame:player.sheet.crop(player.width * i, player.height * wrrow, player.width, player.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        wlframes.push({
            frame:player.sheet.crop(player.width * i, player.height * wlrow, player.width, player.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        wuframes.push({
            frame:player.sheet.crop(player.width * i, player.height * wurow, player.width, player.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        wdframes.push({
            frame:player.sheet.crop(player.width * i, player.height * wdrow, player.width, player.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
    }

    var idleframes = [
        {frame:player.sheet.crop(0, 0, player.width, player.height), speed:framespeed * 800},
        {frame:player.sheet.crop(player.width, 0, player.width, player.height), speed:framespeed * 80},
        {frame:player.sheet.crop(player.width * 2, 0, player.width, player.height), speed:framespeed * 80},
    ];

    //Create Animations
    player.addAnimation("walk_right", new Animation(wrframes));
    player.addAnimation("walk_left", new Animation(wlframes));
    player.addAnimation("walk_up", new Animation(wuframes));
    player.addAnimation("walk_down", new Animation(wdframes));
    player.addAnimation("idle", new Animation(idleframes));

    //CREATE SKELETON
    var skeleton = new Assets("skeleton", "res/textures/skeleton.png",50,57);

    //Build Frames for Player animation

    var swrframes = [];
    var swlframes = [];
    var swuframes = [];
    var swdframes = [];
    var swrrow = 1;
    var swlrow = 3;
    var swurow = 0;
    var swdrow = 2;
    for(var i=0; i<3; i++){
        swrframes.push({
            frame:skeleton.sheet.crop(skeleton.width * i, skeleton.height * swrrow, skeleton.width, skeleton.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        swlframes.push({
            frame:skeleton.sheet.crop(skeleton.width * i, skeleton.height * swlrow, skeleton.width, skeleton.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        swuframes.push({
            frame:skeleton.sheet.crop(skeleton.width * i, skeleton.height * swurow, skeleton.width, skeleton.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        swdframes.push({
            frame:skeleton.sheet.crop(skeleton.width * i, skeleton.height * swdrow, skeleton.width, skeleton.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
    }

    var sidleframes = [

        {frame:skeleton.sheet.crop(skeleton.width * 1, skeleton.height * 2, skeleton.width, skeleton.height), speed:framespeed * 80},
    ];


    var deadsk = new Assets("deadsk", "res/textures/shit.png",60,60);

    var sdeadframes=[

        {frame:deadsk.sheet.crop(0, 0, 60, 60), speed:framespeed * 80},

    ];
    //Create Animations
    skeleton.addAnimation("walk_right", new Animation(swrframes));
    skeleton.addAnimation("walk_left", new Animation(swlframes));
    skeleton.addAnimation("walk_up", new Animation(swuframes));
    skeleton.addAnimation("walk_down", new Animation(swdframes));
    skeleton.addAnimation("idle", new Animation(sidleframes));
    skeleton.addAnimation("dead", new Animation(sdeadframes));

    // //Player assets
    // var player = new Assets("player", "res/textures/marioo.png", 28, 42);
    // player.idle = player.sheet.crop(3, 0, 28, 42);

    //Tree assets
    //var tree = new Assets("tree", "res/textures/tree_02.png",726, 798);
    var tree = new Assets("tree", "res/textures/tree_02.png",726, 798);
    tree.redwood = tree.sheet.crop(0,0,726,798);

    //Tile assets
    var tiles = new Assets("tiles", "res/textures/tiles.png", 30, 30);  //size of tile =30,30
    tiles.dirt = tiles.sheet.crop(0, tiles.height*10, tiles.width, tiles.height);
    tiles.grass = tiles.sheet.crop(0, tiles.height, tiles.width, tiles.height);
    tiles.stone = tiles.sheet.crop(0, tiles.height*7, tiles.width, tiles.height);

    //Fire assets
    var fire = new Assets("fire", "res/textures/fire.png", 64, 128);
    var fireframes=[];

    for(var i=0; i<8; i++){
        for(var j=0; j<4; j++){
            fireframes.push({
                frame:fire.sheet.crop(i * 64, j * 128, 64, 128), speed:framespeed * 80
            })
        }

    }

    fire.addAnimation("idle", new Animation(fireframes));

//Explosion Asset
    var explosion = new Assets("explosion", "res/textures/explosion.png", 64, 128);
    var explosionframes=[];
    for(var j=0; j<4; j++)

    {
        for(var i=0; i<5; i++)
        {
            explosionframes.push({frame:explosion.sheet.crop(i * 128, j * 128, 128, 128), speed:framespeed * 10})
        }

    }

    explosion.addAnimation("idle", new Animation(explosionframes));


    //Orb assets
    var orb = new Assets("Orb", "res/textures/Orb.png", 84.2, 84.2);
    var orbframes =[];

    for(var i=0; i<7; i++){
        for(var j=0; j<7; j++){
            orbframes.push({frame:orb.sheet.crop(i * 84.2, j * 84.2, 84.2, 84.2 ), speed:framespeed * 80})
        }
    }

    orb.addAnimation("idle", new Animation(orbframes));


    //Mana Potion assets
    var manap = new Assets("manapotion", "res/textures/manapot.png", 30, 35);
    manap.bluepotion = manap.sheet.crop(0, 0, 30, 35);


    //Bat assets
    var bat = new Assets("bat", "res/textures/bat.png", 40, 60);

    var batframes_up = [];
    var batframes_down = [];
    var batframes_left = [];
    var batframes_right = [];

    for(var i=0; i<3; i++){
        batframes_up.push({
            frame:bat.sheet.crop(40 * i, 60 * 3, 40, 60),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        batframes_down.push({
            frame:bat.sheet.crop(40 * i, 60 * 0, 40, 60),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        batframes_left.push({
            frame:bat.sheet.crop(40 * i, 60 * 1, 40, 60),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        batframes_right.push({
            frame:bat.sheet.crop(40 * i, 60 * 2, 40, 60),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
    }

    var batframes_idle =[

        {frame:bat.sheet.crop(0,    0, 40, 60), speed:framespeed * 80},
        {frame:bat.sheet.crop(40,   0, 40, 60), speed:framespeed * 80},
        {frame:bat.sheet.crop(40 *  2, 0, 40, 60), speed:framespeed * 80},

    ];

    var deatbat = new Assets("deadbat", "res/textures/shit.png",60,60);

    var deadbatframe=[

        {frame:deatbat.sheet.crop(0, 0, 60, 60), speed:framespeed * 80},

    ];



    bat.addAnimation("walk_right", new Animation(batframes_right));
    bat.addAnimation("walk_left", new Animation(batframes_left));
    bat.addAnimation("walk_up", new Animation(batframes_up));
    bat.addAnimation("walk_down", new Animation(batframes_down));
    bat.addAnimation("idle", new Animation(batframes_idle));
    bat.addAnimation("dead", new Animation(deadbatframe));



    var slash = new Assets("slash", "res/textures/slash.png",96,96);

    //Build Frames for Slash animation

    var sswrframes = [];
    var sswlframes = [];
    var sswuframes = [];
    var sswdframes = [];


    for(var i=0; i<5; i++){
        sswdframes.push({
            frame:slash.sheet.crop(slash.width * i, slash.height * 0, slash.width, slash.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        sswlframes.push({
            frame:slash.sheet.crop(slash.width * i, slash.height * 1, slash.width, slash.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        sswuframes.push({
            frame:slash.sheet.crop(slash.width * i, slash.height * 2, slash.width, slash.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
        sswrframes.push({
            frame:slash.sheet.crop(slash.width * i, slash.height * 3, slash.width, slash.height),   //pozitia din spriteSheet, col and row
            speed:framespeed
        });
    }



    //Create Animations
    slash.addAnimation("walk_right", new Animation(sswrframes));
    slash.addAnimation("walk_left", new Animation(sswlframes));
    slash.addAnimation("walk_up", new Animation(sswuframes));
    slash.addAnimation("walk_down", new Animation(sswdframes));



    //---------

    var autoattack = new Assets("autoattack", "res/textures/autoattack.png",16,15);


    var aframes = [];

    aframes.push({frame:autoattack.sheet.crop(0, 0, 16, 15), speed:framespeed});



    //Create Animations
    autoattack.addAnimation("idle", new Animation(aframes));




    return Assets;

});