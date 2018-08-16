var demo = {};
var centerX =1500/2;
var centerY = 1000/2;
var player;
var speed = 2;
demo.state1 = function(){
    
};

demo.state1.prototype = {
    preload: function(){
        game.load.spritesheet('player', 'assets/sprites/player.png', 32, 32);
        game.load.image('sfondo','assets/background/sfondo.jpg');
    },
    create: function(){
        
        //inizializzo la fisica
       game.physics.startSystem(Phaser.Physics.ARCADE);
       game.stage.backgroundColor = '#DDDDDD';
       game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
       var sfondo = game.add.sprite(0,0,'sfondo');
        sfondo.scale.setTo(1.5,1.5);
        
       player = game.add.sprite(centerX,centerY,'player');//aggiungo un'immagine allo state
       player.anchor.setTo(0.5,0.5);//il centro dell'immagine
        
        player.animations.add('walk',[6,7,8]);
        player.animations.add('walkUP',[0,1,2]);
        player.animations.add('walkDOWN',[9,10,11]);
        
        //aggiungo la fisica allo sprite
        
        game.physics.enable(player);
        player.body.collideWorldBounds= true;//collide con i bordi del mondo
        
        //imposto i bounds
        game.world.setBounds(0,0,1700,1500);
        
        //aggiungo la camera
        
       game.camera.follow(player);
        
        //ggiungo la deadzone
        game.camera.deadzone= new Phaser.Rectangle(centerX - 300, 0,600,1000);
       
       
       addChangeStateListener();
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            player.x += speed;
            player.scale.setTo(1,1);
            player.animations.play('walk',14,false);
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            player.x -= speed;
            player.scale.setTo(-1,1);
            player.animations.play('walk',14,false);
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            player.y -= speed;
            player.animations.play('walkDOWN',false);
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            player.y += speed;
            player.animations.play('walkUP',false);
        }
        
    }
};

function changeState(i,num){
    game.state.start('state'+num);
}

function addKeyCallback(key , fn , arg){
    game.input.keyboard.addKey(key).onDown.add(fn,null,null,arg);
}

function addChangeStateListener(){
    addKeyCallback(Phaser.Keyboard.TWO,changeState,2);
    addKeyCallback(Phaser.Keyboard.ONE,changeState,1);
}