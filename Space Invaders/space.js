let gameDisplay = (function() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    let Rectangle = function(x,y,width,height,id) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    };

    let enemyID = [];
    return {
        constructor: function(lines) {
        for (let i=0;i < lines;i++) {
            for (let j=0; j < (window.innerWidth / 100); j++) {
                let newRect = new Rectangle((j*100)+60,(i*50)+30,30,30,(i*10)+j);
                ctx.fillStyle = "blue";
                ctx.fillRect(newRect.x,newRect.y,newRect.width,newRect.height);
                enemyID.push(newRect.id);
            }
        };
        },
        eID: enemyID,


    };


})();

let gameLogic = (function() {


})();


let masterController = (function(gDisplay,gLogic) {

    let start = function() {
        gDisplay.constructor(4);
        console.log(gDisplay.eID);
    };
    start();


})(gameDisplay,gameLogic);