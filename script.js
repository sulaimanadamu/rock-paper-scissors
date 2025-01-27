const options = [{"SCISSORS": './images/scissors.png'}, {"ROCK":'./images/rock.png'}, {"PAPER":'./images/paper.png'}]
const computerChoiceImg = document.querySelector('#computerChoiceimg')
const dialogBox = document.querySelector('#dialog-box')
const btns = document.querySelector('#btns')
const play = document.querySelector('#play')
let havePlayedGame = false
let humanChoice = ''
let humanScore = 0
let computerScore = 0
let [computerChoice, imageSrc] = Object.entries(options[getRandomInt(options.length)])[0]

//set random image for computer before the spin.
computerChoiceImg.src = imageSrc

//generate Dom using js
function populate(){
    for (myObject of options){
        const button = document.createElement('button')
        const image = document.createElement('img')
        let [id, link] = Object.entries(myObject)[0]
        image.src = link
        image.alt = id
        image.setAttribute("data-represent", id)
        image.setAttribute("height", 100)
        image.setAttribute("width", 100)
        button.setAttribute("id", id)
        button.appendChild(image)
        btns.appendChild(button)
    }
    btns.addEventListener('click', getHumanChoice)
}

populate()

function getHumanChoice(e){
    humanChoice = e.target.getAttribute('data-represent')
    btns.removeEventListener('click', getHumanChoice)
    removeUnselectedSigns(e.target.parentNode, this)
    spin()
    havePlayedGame = true
}

function removeUnselectedSigns(selected, element){
    element.textContent = null
    element.appendChild(selected)
}

function spin(){
    const intervalId = setInterval(getComputerChoice, 500)
    setTimeout(() => {
    clearInterval(intervalId); 
    playRound(humanChoice, computerChoice,dialogBox)
    }, 3000);
}

function getComputerChoice(){
        const entries = Object.entries(options[getRandomInt(options.length)])
        const [computerChoiceimg, src] = entries[0]
        computerChoiceImg.src = src
        computerChoice = computerChoiceimg
}

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

//computation logic
function playRound(humanChoice, computerChoice, displayDomElement){
    let comments = document.createElement('h1')
    let scoreBoard = document.createElement('h1')

    if(humanChoice === computerChoice){
       comments.textContent = "Wow, its a tie"
    }

    else if(humanChoice === "ROCK" && computerChoice === "SCISSORS"){
        humanScore =+ 1
        comments.textContent = "You win, Rock beats scissors anyday anytime."
    }

    else if(computerChoice === "SCISSORS" && humanChoice ==="PAPER"){
        computerScore += 1
       comments.textContent = "Scissors beats Paper anyday anytime, computer win!"
    }

    else if(computerChoice === "PAPER" && humanChoice ==="ROCK"){
        computerScore += 1
       comments.textContent = "You win, Paper beats Rock anyday anytime"
    }

    else if( computerChoice === "ROCK" && humanChoice === "SCISSORS"){
         computerScore += 1
         comments.textContent = "Computer Won!"
    }

    else if(humanChoice === "SCISSORS" &&  computerChoice ==="PAPER"){
         humanScore += 1
       comments.textContent = "you did it!"
    }

    else if(humanChoice === "PAPER" && computerChoice ==="ROCK"){
        humanScore += 1
        comments.textContent = "You Won!"
    }

    scoreBoard.textContent = `${computerScore} === ${humanScore}`

    displayDomElement.appendChild(comments)
    displayDomElement.appendChild(scoreBoard)
    const displayStyle = displayDomElement.style
    displayStyle.textAlign = 'center'
    displayStyle.fontSize = '0.8rem'
    displayStyle.fontFamily
}


play.addEventListener('click', repopulate)

function repopulate(){
    if(havePlayedGame){
    btns.textContent = null
    populate()
    dialogBox.textContent = null
    console.log(btns)
    havePlayedGame = false
    }
}