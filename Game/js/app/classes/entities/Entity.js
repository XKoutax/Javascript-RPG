

define(['Class','Rectangle'],function(Class,Rectangle){

    var Entity = Class.extend({
        init:function(_handler, _x, _y, _width, _height){
            this.x = _x;
            this.y = _y;
            this.width = _width;
            this.height = _height;
            this.handler = _handler;
            this.bounds = new Rectangle(0, 0, _width, _height);
            this.damage=0;
            this.health=10;
            this.collideable=1;
            this.mana=100;
            this.name="";

        },
        tick:function( _dt ){

        },
        render:function( _g ){

        },
        //Getters
        getX:function(){
            return this.x;
        },
        getY:function(){
            return this.y;
        },
        getWidth:function(){
            return this.width;
        },
        getHeight:function(){
            return this.height;
        },getBun:function()
        {return this.Bun;},

        //used to verify if player will collide in next tick
        getCollisionBounds:function(xOffset,yOffset){
            //return a new Rectangle in the pos. wherever we want the collision bounds to be on screen
            return new Rectangle(parseInt(this.x+this.bounds.x + xOffset),
                                parseInt(this.y+this.bounds.y + yOffset),
                                this.bounds.width, this.bounds.height);
        },
        checkEntityCollision:function(xOffset, yOffset){
            var candidates = this.handler.getWorld().getEntityManager().getEntities();
            for(var i =0; i <candidates.length; i++){
                var e = candidates[i];
                //so it doesn't check collision with itself
                if(e!=this){

                    if(e.getCollisionBounds(0,0).intersects(this.getCollisionBounds(xOffset,yOffset))){
                        if(this.name=="AAttack"&&e.getBun()==0&&e.alive==1)
                        {   e.takeDamage(this.getDamage());
                            this.delete();
                        }else
                        {if(e.getDamage()>=0&&(typeof this.healthbar != "undefined")&&this.getBun()!=e.getBun())
                       {
                           this.takeDamage(e.getDamage());
                          // e.takeDamage(this.getDamage());


                       }
                        if(this.getDamage()>=0&&(typeof this.healthbar != "undefined")&&this.getBun()!=e.getBun())
                        {
                            //this.takeDamage(e.getDamage());
                             e.takeDamage(this.getDamage());


                        }

                        if(this.name=="jucator"&&e.name=="potiunemana")
                        {console.log(10);
                            this.useMana(-e.refilledMana);
                            e.delete();


                    }}

                       if(e.collideable==1&&this.collideable==1)
                        return true;
                    }

                }

            }
            return false;


        },
        die:function()
        {
            this.alive=0;
            this.time_dead_body=100;


        },
        delete:function()
        {
            this.handler.getWorld().getEntityManager().removeEntity(this);
        },
        takeDamage:function(_damage){
            this.health-=_damage;
            if(typeof this.healthbar != "undefined")
                this.healthbar.update();
            if(this.health<=0)
                this.die();
        },
        getDamage:function()
        {
            return this.damage;
        },

        //Setters
        setX:function(_x){
            this.x = _x;
        },
        setY:function(_y){
            this.y = _y;
        },
        setWidth:function(_width){
            this.width=_width;
        },
        setHeight:function(_height){
            this.height=_height;
        },

    });

    return Entity;

});