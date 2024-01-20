const PLAYER_DATA_FORM = document.querySelector("#player-data-form");
const PLAYER_LIST = document.querySelector("#player-list");

let playerDataList = []; // An array of objects in which data about each player is stored

/************************************************************************ 

 renderPlayerStats function will show the sorted palyer list everytime a player score changes

*************************************************************************/

function renderPlayerStats(){

    playerDataList.sort((player1,player2) => player2.score - player1.score);

    PLAYER_LIST.innerHTML = "";

    playerDataList.forEach((player) => {
        let liEl = document.createElement("li");
        let nameSpan = document.createElement("span");
        let scoreSpan = document.createElement("span");
        let countrySpan = document.createElement("span");
        let deleteButton = document.createElement("button");
        let scoreChangeButtonsContainer = document.createElement("div");

        nameSpan.innerText = player.name;
        scoreSpan.innerText = player.score;
        countrySpan.innerText = player.country;

        deleteButton.innerHTML = `
            <img src="https://banner2.cleanpng.com/20190904/xty/transparent-can-icon-trash-icon-5d6f94fbec0c50.3523332615675937239669.jpg">
        `

        scoreChangeButtonsContainer.innerHTML = `
            <button class="increase">+5</button>
            <button class="decrease">-5</button>
        `

        liEl.append(nameSpan,scoreSpan,countrySpan,deleteButton,scoreChangeButtonsContainer);

        liEl.classList.add("player-data");

        PLAYER_LIST.appendChild(liEl);
    })
}

/**************************************************************************
 scoreChange function will update the score of the player according to the button that has been pressed by user

 @param {String} playerName - name of the player whose score is to be updated

 @param {String} changeType - should the score be increased or decreased. If value is increase corresponding players score will be increased by 5 , if value is decrease corresponding players score will be decreased by 5
 **************************************************************************/

function scoreChange(playerName,changeType){

    playerDataList.forEach((player) => {

        if(player.name === playerName){

            if(changeType === "increase"){
                player.score += 5;
            } else {
                player.score -= 5;
            }

        }

    })

}

/**************************************************************************
 isNameAvailabe checks if the name given in the input is already present in the playerDataList array 

 @param {String} playerName - the name that is given in the input 
***************************************************************************/

function isNameAvailable(playerName){

    let avialable = true;

    playerDataList.forEach((player) => {

        if(player.name === playerName){

            avialable = false;

        }

    })

    return avialable;
}

// event listener to get player data from form
PLAYER_DATA_FORM.addEventListener("submit",(event) => {

    event.preventDefault();

    const FIRST_NAME = document.querySelector("#first-name");
    const LAST_NAME = document.querySelector("#last-name");
    const COUNTRY= document.querySelector("#country");
    const SCORE = document.querySelector("#score");

    let player = {
        name : `${FIRST_NAME.value} ${LAST_NAME.value}`.trim(),
        country : COUNTRY.value,
        score : Number(SCORE.value)
    }

    if(!isNameAvailable(player.name)){

        alert("Player already exists in leader board");

    } else {

        playerDataList.push(player);

        renderPlayerStats();

    }

    FIRST_NAME.value = "";
    LAST_NAME.value = "";
    COUNTRY.value = "";
    SCORE.value = "0";
})

// event listener to delete and update score of player
PLAYER_LIST.addEventListener("click",(e)=>{

    if(e.target.className === "delete-btn-img"){

        let playerToBeDeleted = e.target.parentNode.parentNode.children[0].innerText;
        playerDataList = playerDataList.filter((player) => {
            if(player.name === playerToBeDeleted){
                return false;
            } else {
                return true;
            }
        })

        renderPlayerStats();

    } else if(e.target.className === "increase" || e.target.className === "decrease"){

        let playerName = e.target.parentNode.parentNode.children[0].innerText;
        
        scoreChange(playerName , e.target.className);
        renderPlayerStats();
    }
})
