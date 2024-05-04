    let userpaddle = document.getElementById("userpaddle");
    let aipaddle = document.getElementById("aipaddle");
    let ball = document.getElementById("ball");
    let gamebox = document.getElementById("gamebox");
    let zpressed = false;
    let xpressed = false;
    let mm=document.getElementById("main");
    let j=document.getElementsByClassName("dashedlineverticle");
    
    // 
    let userscore = document.getElementById("userscore");
    let aiscore = document.getElementById("aiscore");
    
    console.log("tansoqj")
    flag=true;

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    function keyDownHandler(e) {
        if (e.key == 'z') {
            zpressed = true;
        }
        else if (e.key == 'x') {
            xpressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == 'z') {
            zpressed = false;
        }
        else if (e.key == 'x') {
            xpressed = false;
        }
    }
    let Vx = 15;
    let Vy = 15;
    let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));


    function reset() {
        ball.style.left = "50%";
        ball.style.top = "50%";
        Vx = 0;
        Vy = 0;
        V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
    }


    function checkcollision(activepaddle) {
        let balltop = ball.offsetTop;
        let ballbottom = ball.offsetTop + ball.offsetHeight;
        let ballleft = ball.offsetLeft;
        let ballright = ball.offsetLeft + ball.offsetWidth;

        let paddletop = activepaddle.offsetTop;
        let paddlebottom = activepaddle.offsetTop + activepaddle.offsetHeight;
        let paddleleft = activepaddle.offsetLeft;
        let paddleright = activepaddle.offsetLeft + activepaddle.offsetWidth;
        if (
            ballbottom > paddletop && balltop < paddlebottom &&
            ballright > paddleleft &&
            ballleft < paddleright 
        ) {
            console.log("Ball Top:", balltop, "Ball Bottom:", ballbottom);
            console.log("Paddle Top:", paddletop, "Paddle Bottom:", paddlebottom);

            console.log(balltop)
            console.log(paddletop)
            console.log("collision detected",balltop,paddletop);
            return true;
        }

        else {
            return false;
        }
    }

    function gameloop() {
        if (ball.offsetLeft < 0) {
            aiscore.innerHTML = parseInt(aiscore.innerHTML) + 1;
            if( parseInt(aiscore.innerHTML)>=2){
                let audio = document.getElementById("audio");
                audio.play();
                mm.innerHTML="computer wins"

                
                reset();
            }
            Vx = -Vx;
        }
        if (ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth) {
            userscore.innerHTML = parseInt(userscore.innerHTML) + 1;
            if( parseInt(userscore.innerHTML)>=2){
                let audio = document.getElementById("audio");
                audio.play();
                reset();
            }
            Vx = -Vx;
        }
        if (ball.offsetTop < 0) {
            Vy = -Vy;
        }
        if (ball.offsetTop > gamebox.offsetHeight - ball.offsetHeight) {
            Vy = -Vy;
        }
        let paddle = ball.offsetLeft < gamebox.offsetWidth / 2 ? userpaddle : aipaddle;

        let ballcenterY = ball.offsetTop + ball.offsetHeight / 2;
        let paddlecenterY = paddle.offsetTop + paddle.offsetHeight / 2;

        let angle = 0;

        if (checkcollision(paddle)) {
            if (paddle == userpaddle) {
                if (ballcenterY < paddlecenterY) {
                    angle = -Math.PI / 4;
                }
                else if (ballcenterY > paddlecenterY) {
                    angle = Math.PI / 4;
                }
                else {
                    angle = 0;
                }
            }
            else if (paddle == aipaddle) {
                if (ballcenterY < paddlecenterY) {
                    angle = -3 * Math.PI / 4;
                }
                else if (ballcenterY > paddlecenterY) {
                    angle = 3 * Math.PI / 4;
                }
                else {
                    angle = 0;
                }
            }
            V = V + 0.2;
            Vx = V * Math.cos(angle);
            Vy = V * Math.sin(angle);
        }

        let aidelay = 0.3;
        aipaddle.style.top =
            aipaddle.offsetTop + (ball.offsetTop - aipaddle.offsetTop - aipaddle.offsetHeight / 2) * aidelay + "px";

        ball.style.left = ball.offsetLeft + Vx + "px";
        ball.style.top = ball.offsetTop + Vy + "px";
        a=5;
        if(flag){
            a=10
        }
        else{
            a=5
        }

        if (zpressed && userpaddle.offsetTop > 55) {
            userpaddle.style.top = (userpaddle.offsetTop - a) + "px";
        }
        if (xpressed && userpaddle.offsetTop < gamebox.offsetHeight
            - userpaddle.offsetHeight + 45
        ) {
            userpaddle.style.top = (userpaddle.offsetTop + a) + "px";
        }
        requestAnimationFrame(gameloop);
    }

        gameloop();



