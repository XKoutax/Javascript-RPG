
define(['Creature','Assets','HealthBar'],function(Creature,Assets,HealthBar){


    var Bat = Creature.extend({
        init:function(_handler, _x, _y){
            this._super(_handler, _x, _y,Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT);
            this.assets = Assets.getAssets("bat");
            this.bounds.x = 16;
            this.bounds.y = 31;
            this.rand_dir=0;
            this.dir_time=0;
            this.bounds.width = 28;
            this.bounds.height = 28;
            this.damage=0.5;
            this.Bun=0;
            var hb_prop={
                color:"red",
                yoffset:20,
                nodes:6,
                split:2,
                width:60,
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


        },
        tick:function(_dt){
            this.getInputs(_dt);
            this.move();


            this.assets.animations.walk_right.tick();
            this.assets.animations.walk_left.tick();
            this.assets.animations.walk_up.tick();
            this.assets.animations.walk_down.tick();
            this.assets.animations.idle.tick();
        },

        render:function(_g){

            _g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);

            if(this.alive==1){this.healthbar.render(_g);}
            if(this.alive==0)
            {
                this.time_dead_body--;
                if(this.time_dead_body==0)
                    this.delete();

            }

        },
        getInputs:function(_dt){


            this.xMove = 0;
            this.yMove = 0;
            this.dir_time+=1;

            if(this.dir_time>100)
                this.dir_time=0;
            if(this.dir_time%10==0||this.dir_time==1) //pune %1 pt herezie
            { this.rand_dir=Math.ceil(Math.random()*100);}


            if(this.alive==1){ //ifu asta nu merge pus mai sus. nush dc
                if(this.rand_dir%4==0){
                    this.yMove -= this.speed * _dt;
                }
                if(this.rand_dir%4==1){
                    this.yMove += this.speed * _dt;
                }
                if(this.rand_dir%4==2){
                    this.xMove -= this.speed * _dt;
                }
                if(this.rand_dir%4==3){
                    this.xMove += this.speed * _dt;
                }}

        },
        getCurrentAnimationFrame:function () {
            if(this.alive==1)
            {
                if(this.xMove < 0)
                    return this.assets.animations.walk_left.getCurrentFrame();
                else if(this.xMove > 0)
                    return this.assets.animations.walk_right.getCurrentFrame();

                else if(this.yMove < 0)
                    return this.assets.animations.walk_up.getCurrentFrame();
                else if(this.yMove > 0)
                    return this.assets.animations.walk_down.getCurrentFrame();
                else
                    return this.assets.animations.idle.getCurrentFrame();
            }
            else
            if(this.alive==0)
                return this.assets.animations.dead.getCurrentFrame();
        }



    });

    return Bat;

});