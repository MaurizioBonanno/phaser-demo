demo.state2 = function(){};
var cursor;
var vel = 200;
var rocks;
var grass;
var bullets;
var firerate = 200;
nextfire = 0;
demo.state2.prototype = {
    preload: function(){
    game.load.tilemap('field', 'assets/map/field.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('grassTiles', 'assets/map/grassTiles.png');
    game.load.image('rockTiles', 'assets/map/rockTiles.png');
        
        
        
    game.load.spritesheet('player', 'assets/sprites/player.png', 32, 32);
        
        //carico i proiettili
    game.load.spritesheet('bullet','assets/sprites/bullets_sprite.png', 40 ,30,41);
        

    },
    create: function(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
       // game.stage.backgroundColor = '#DDFFDD';
        addChangeStateListener();
        
    var map = game.add.tilemap('field');
    map.addTilesetImage('grassTiles');
    map.addTilesetImage('rockTiles');

    grass = map.createLayer('grass');
    rocks = map.createLayer('rocks');
        
    //creo le collisioni con le rocce
    map.setCollisionBetween(1,9,true,'rocks');//nel file json i tile tra 1 e 9 sono rocce
    map.setCollision(11,true,'grass') ; // collisioni con i cespugli
        
    player = game.add.sprite(centerX,centerY,'player');
    game.physics.enable(player);
    
    //creo il gruppo dei bullets 
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1000,'bullet');//creo 50 proiettili
    //confuguro i proiettili
    bullets.setAll('checkWorldBounds',true);
    bullets.setAll('outOfBoundsKill',true);
        
    cursor = game.input.keyboard.createCursorKeys();
        
    },
    update: function(){
        
        //gestiamo le collisioni
        game.physics.arcade.collide(player, rocks, function(){ console.log('colpite le rocce')});
        game.physics.arcade.collide(player,grass,function(){ console.log('colpita erba')});
        if(cursor.up.isDown){
         player.body.velocity.y = -vel;
        }
        else if(cursor.down.isDown){
            player.body.velocity.y = vel;
        }
        else if(cursor.left.isDown){
            player.body.velocity.x = -vel;
        }
        else if(cursor.right.isDown){
            player.body.velocity.x = vel;
        }
        else{
            player.body.velocity.y = 0;
            player.body.velocity.x=0;
        }
        
        if(game.input.activePointer.isDown){
            this.fire();
        }
    },
    fire: function(){
        console.log('firing');
        if(game.time.now > nextfire){
        nextfire = game.time.now + firerate;
        var bullet = bullets.getFirstDead();//prendo il primo utile
        bullet.reset(player.x,player.y);//lo creo nel giocatore
        
        game.physics.arcade.moveToPointer(bullet,vel);//lo sparo nella direzzione del mouse
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);//lo oriento secondo il mouse
           }

    }
}