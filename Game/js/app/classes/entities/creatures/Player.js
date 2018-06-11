
define(['Creature','Assets','HealthBar','SkeletBun','Explosion','ManaBar','Slash','Autoattack'],function(Creature,Assets,HealthBar,SkeletBun,Explosion,ManaBar,Slash,Autoattack){

    var Player = Creature.extend({
        init:function(_handler, _x, _y){
            this._super(_handler, _x, _y,Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT);
            this.assets = Assets.getAssets("player");
            this.bounds.x = 16;
            this.bounds.y = 31;
            this.bounds.width = 28;
            this.bounds.height = 28;
            //this.damage=0.2;
            this.spellCooldown1=0;
            this.spellCooldown2=0;
            this.autoattackCooldown=0;
            this.mana=300;
            this.maxmana=300;
            this.dir=0;
            this.name="jucator";


            var hb_prop={
                color:"yellow",
                yoffset:20,
                nodes:100,
                split:0,
                width:100,
                height:8,
                //fadetime:.95,
                renderOnFull:"on",//on = se rendeaza
                border:{
                    show:true,
                    color:"black",
                    width:2
                }


            }
            this.healthbar= new HealthBar(_handler, this, hb_prop);


            var mb_prop={
                color:"blue",
                yoffset:9,
                nodes:50,
                split:0,
                width:100,
                height:6,
                //fadetime:.95,
                renderOnFull:"on",//on = se rendeaza
                border:{
                    show:true,
                    color:"black",
                    width:2
                }


            }
            this.manabar= new ManaBar(_handler, this, mb_prop);

this.Bun=1;
        },
        tick:function(_dt){
            this.getInputs(_dt);
            this.move();
            this.handler.getGameCamera().centerOnEntity(this);
            this.assets.animations.walk_right.tick();
            this.assets.animations.walk_left.tick();
            this.assets.animations.walk_up.tick();
            this.assets.animations.walk_down.tick();
            this.assets.animations.idle.tick();
            if(this.spellCooldown1!=0)
                this.spellCooldown1--;
            if(this.spellCooldown2!=0)
                this.spellCooldown2--;
            if(this.autoattackCooldown!=0)
                this.autoattackCooldown--;


        },
        render:function(_g){
            /*
            //OLD 1 FRAME + TEST COLLISION

            //_g.myDrawImage(this.assets.idle, this.x, this.y, this.assets.width, this.assets.height);
            _g.myDrawImage(this.assets.idle, this.x-this.handler.getGameCamera().getxOffset(), this.y-this.handler.getGameCamera().getyOffset(), this.assets.width, this.assets.height);
            //_g.myDrawImage(Assets.getAssets("mario").idle, x, y, Assets.getAssets('mario').width, Assets.getAssets('mario').height);


            //this will make a black rectangle ON player, so I know when collision starts
            _g.fillRect(this.x + this.bounds.x - this.handler.getGameCamera().getxOffset(), this.y + this.bounds.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
                        //^this.x so it's relative to our character position
            */

            _g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);
            this.healthbar.render(_g);
            this.manabar.render(_g);
        },
        getInputs:function(_dt){
            this.xMove = 0;
            this.yMove = 0;
            if(this.handler.getKeyManager().up){
                this.yMove -= this.speed * _dt;
                this.dir=0;
            }
            if(this.handler.getKeyManager().down){
                this.yMove += this.speed * _dt;
                this.dir=1;
            }
            if(this.handler.getKeyManager().left){
                this.xMove -= this.speed * _dt;
                this.dir=2;
            }
            if(this.handler.getKeyManager().right){
                this.xMove += this.speed * _dt;
                this.dir=3;
            }
            if(this.handler.getKeyManager().one)
            {

                if(this.spellCooldown1==0)
                {if(this.mana>0)
                {
                    this.handler.getWorld().getEntityManager().addEntity(new Explosion(this.handler,this.x-this.bounds.x,this.y-this.bounds.y,1));

                    this.spellCooldown1=20;
                    this.useMana(10);

                    }
                }
            }
            if(this.handler.getKeyManager().two)
            {

                if(this.spellCooldown2==0)
                {if(this.mana>0)
                {
                    this.handler.getWorld().getEntityManager().addEntity(new Slash(this.handler,this.x-this.bounds.x+15,this.y-this.bounds.y+24,1,this.dir));

                    this.spellCooldown2=10;
                    this.useMana(10);

                }
                }
            }
            if(this.handler.getKeyManager().space)
            {

                if(this.autoattackCooldown==0)

                {
                    this.handler.getWorld().getEntityManager().addEntity(new Autoattack(this.handler,this.x+20,this.y+30,1,this.dir));

                    this.autoattackCooldown=10;


                }
            }




        },

        getCurrentAnimationFrame:function () {

            if(this.xMove < 0){
                return this.assets.animations.walk_left.getCurrentFrame();
            }
            else if(this.xMove > 0){
                return this.assets.animations.walk_right.getCurrentFrame();
            }
            else if(this.yMove < 0){
                return this.assets.animations.walk_up.getCurrentFrame();
            }else if(this.yMove > 0){
                return this.assets.animations.walk_down.getCurrentFrame();
            }else
                return this.assets.animations.idle.getCurrentFrame();

        }

    });

    return Player;

});