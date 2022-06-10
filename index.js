let player = "X";
let gameOver = false;
let playerX = 0;
let tie = 0;
let playerO = 0;
let turns = 0;
let timerXId = 0;
let timerOId = 0;


const changePlayer = ()=>{
    return (player === "X")?player = "O":player = "X";
}


const timerX = ()=>{
    let time = document.getElementsByClassName("X_timer")[0].innerHTML;
    
    let min = parseInt(time.split(":")[0]);
    let sec = parseInt(time.split(":")[1]);
    
    time = min * 60 + sec;
    time++;
    min = Math.floor(time/60);
    sec = time%60;

    time = min.toString().padStart(2, "0").concat(":").concat(sec.toString().padStart(2, "0"));
    document.getElementsByClassName("X_timer")[0].innerHTML = time;
    
    timerXId = setTimeout(timerX, 1000);
}

const timerStopX = ()=>{
    clearTimeout(timerXId);
}


const timerO = ()=>{
    let time = document.getElementsByClassName("O_timer")[0].innerHTML;
    
    let min = parseInt(time.split(":")[0]);
    let sec = parseInt(time.split(":")[1]);
    
    time = min * 60 + sec;
    time++;
    min = Math.floor(time/60);
    sec = time%60;

    time = min.toString().padStart(2, "0").concat(":").concat(sec.toString().padStart(2, "0"));
    document.getElementsByClassName("O_timer")[0].innerHTML = time;
    
    timerOId = setTimeout(timerO, 1000);
}

const timerStopO = ()=>{
    clearTimeout(timerOId);
}


let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(box =>{
    let boxContent = box.querySelector(".boxContent");
    box.addEventListener("click", ()=>{ 
        if(boxContent.innerText === "" && !gameOver){
            boxContent.innerText = player;
            if(player === "X"){
                document.getElementsByClassName("playerO")[0].style.backgroundColor = "#4CAF50";
                document.getElementsByClassName("playerX")[0].style.backgroundColor = "transparent";
                timerStopO();
                timerO();
                timerStopX();
            }
            else if(player === "O"){
                document.getElementsByClassName("playerX")[0].style.backgroundColor = "#4CAF50";
                document.getElementsByClassName("playerO")[0].style.backgroundColor = "transparent";
                timerStopX();
                timerX();
                timerStopO();
            }
            checkWon();
            player = changePlayer();
            turns++;
        }
        
        if(turns === 9 && !gameOver){
            tie++;
            document.getElementsByClassName("tieScore")[0].innerText = tie;
            document.getElementsByClassName("playerO")[0].style.backgroundColor = "transparent";
            document.getElementsByClassName("playerX")[0].style.backgroundColor = "transparent";        
            timerStopX();
            timerStopO();
            tieModal();
        }
    })
})


const tieModal = ()=>{
    document.getElementsByClassName("winMessage")[0].innerText = "IT's A TIE!!";
    document.getElementsByClassName("modal")[0].classList.add("show");

    document.getElementsByClassName("closeModal")[0].addEventListener("click", ()=>{
        document.getElementsByClassName("modal")[0].classList.remove("show");
    }) 
}


const modal = (player)=>{
    document.getElementsByClassName("winMessage")[0].innerText = document.getElementsByClassName("winMessage")[0].innerText + " " + player + " YOU WON!!";
    document.getElementsByClassName("modal")[0].classList.add("show");

    document.getElementsByClassName("closeModal")[0].addEventListener("click", ()=>{
        document.getElementsByClassName("modal")[0].classList.remove("show");
    }) 
}


const checkWon = ()=>{
    let boxContent = document.getElementsByClassName("boxContent");
    winPos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    winPos.forEach(element => {
        if(boxContent[element[0]].innerText === boxContent[element[1]].innerText && boxContent[element[1]].innerText === boxContent[element[2]].innerText && boxContent[element[0]] !== "" && !gameOver) {
            if(boxContent[element[0]].innerText === 'X'){
                gameOver = true;
                playerX++;
                document.getElementsByClassName("xScore")[0].innerText = playerX;
                timerStopX();
                timerStopO();
                document.getElementsByClassName("playerO")[0].style.backgroundColor = "transparent";
                document.getElementsByClassName("playerX")[0].style.backgroundColor = "transparent";
                modal(player);
            }
            else if(boxContent[element[0]].innerText === 'O'){
                gameOver = true;
                playerO++;
                document.getElementsByClassName("oScore")[0].innerText = playerO;
                timerStopO();
                timerStopX();
                document.getElementsByClassName("playerO")[0].style.backgroundColor = "transparent";
                document.getElementsByClassName("playerX")[0].style.backgroundColor = "transparent";            
                modal(player);
            }
        }
    });
}


let restart = document.getElementsByClassName("restart")[0];

restart.addEventListener("click", () => {
    let boxContent = document.querySelectorAll(".boxContent");
    boxContent.forEach(boxContent =>{
        boxContent.innerText = "";
    })
    timerStopX();
    timerStopO();
    document.getElementsByClassName("X_timer")[0].innerHTML = "00:00";
    document.getElementsByClassName("O_timer")[0].innerHTML = "00:00";
    document.getElementsByClassName("playerO")[0].style.backgroundColor = "yellow";
    document.getElementsByClassName("playerX")[0].style.backgroundColor = "yellow";
    document.getElementsByClassName("winMessage")[0].innerText = "CONGRATS PLAYER";
    player = "X";
    gameOver = false;
    turns = 0;
})



