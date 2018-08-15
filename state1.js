var demo = {};
demo.state1 = function(){
    
};

demo.state1.prototype = {
    preload: function(){},
    create: function(){
       game.stage.backgroundColor = '#DDDDDD';
       game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
       addChangeStateListener();
        
    },
    update: function(){}
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