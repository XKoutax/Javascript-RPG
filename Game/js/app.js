
/*functia config din requirejs va configura
* baseUrl = specificam de unde sa caute / load-uite clasele/modules.
* */
requirejs.config({
    "baseUrl":"js",

    "paths":{
        //Libs
        "Class": "libs/class",      /*RequireJS assumes by default that all dependencies are scripts, so it does not expect to see a ".js" suffix on module IDs.*/
        "Jquery":"libs/jquery",

        //Classes
        "Assets" : "app/classes/gfx/Assets",
        "Display" : "app/classes/display/Display",
        "Game" : "app/classes/Game",
        "ImageLoader" : "app/classes/gfx/ImageLoader",
        "Launcher" : "app/classes/Launcher",
        "SpriteSheet" : "app/classes/gfx/Spritesheet",
        "State" : "app/classes/States/State",
        "GameState" : "app/classes/States/GameState",
        "KeyManager" : "app/classes/input/KeyManager",
        "Handler" : "app/classes/Handler",
        "Helper":"app/classes/entities/helpers/Helper",
        "HealthBar":"app/classes/entities/helpers/HealthBar",
        "Entity":"app/classes/entities/Entity",
        "Creature":"app/classes/entities/creatures/Creature",
        "Player" : "app/classes/entities/creatures/Player",
        "Tile" : "app/classes/tiles/Tile",
        "TileLoader" : "app/classes/tiles/TileLoader",
        "DirtTile" : "app/classes/tiles/DirtTile",
        "GrassTile" : "app/classes/tiles/GrassTile",
        "StoneTile" : "app/classes/tiles/StoneTile",
        "World" : "app/classes/worlds/World",
        "Utils" : "app/classes/utils/Utils",
        "GameCamera" : "app/classes/gfx/GameCamera",
        "Rectangle" : "app/classes/gfx/shapes/rectangle",
        "Animation" : "app/classes/gfx/Animation",
        "StaticEntity" : "app/classes/entities/statics/StaticEntity",
        "Tree" : "app/classes/entities/statics/Tree",
        "EntityManager" : "app/classes/entities/EntityManager",
        "Fire" : "app/classes/entities/statics/Fire",
        "Explosion" : "app/classes/entities/creatures/Explosion",
        "Skeleton": "app/classes/entities/creatures/Skeleton",
        "SkeletBun": "app/classes/entities/creatures/SkeletBun",
        "ManaBar":"app/classes/entities/helpers/ManaBar",
        "Orb" : "app/classes/entities/creatures/Orb",
        "ManaPotion" : "app/classes/entities/statics/ManaPotion",
        "Bat": "app/classes/entities/creatures/Bat",
        "Slash": "app/classes/entities/creatures/Slash",
        "Autoattack": "app/classes/entities/creatures/Autoattack"



    }
});

require(['app/main']);          /*the main js file for application*/

