var demo = {};
var centerX =1500/2;
var centerY = 1000/2;
var player;
var speed = 4;
demo.state1 = function(){
    
};

demo.state1.prototype = {
    preload: function(){
        game.load.image('player','assets/sprites/player.png');
    },
    create: function(){
       game.stage.backgroundColor = '#DDDDDD';
       game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
       player = game.add.sprite(centerX,centerY,'player');//aggiungo un'immagine allo state
       player.anchor.setTo(0.5,0.5);//il centro dell'immagine
       addChangeStateListener();
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            player.x += speed;
        };
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            player.x -= speed;
        };
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            player.y -= speed;
        };
        if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            player.y += speed;
        };
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