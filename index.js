//Left side List
const sideList = document.querySelector('.side-list');

//Right Main Content ---> Top Name
const mainName = document.querySelector('#main-name');

// Right Main Content ---> Top Images
const leftImg = document.querySelector('#main-left-image');
const rightImg = document.querySelector('#main-right-image');
const pdfLink = document.querySelector('#main-pdf-link');

//Right Main Content ---> Aliases
const aliasesName = document.querySelector('#alias-info');

//Right Main Content ---> Description
const liName = document.querySelector('#li-name');
const liBirth = document.querySelector('#li-birth');
const liPlace = document.querySelector('#li-place');
const liHair = document.querySelector('#li-hair');
const liEyes = document.querySelector('#li-eyes');
const liSex = document.querySelector('#li-sex');
const liRace = document.querySelector('#li-race');

//Rigth Main Content ---> Details
const detailsInfo = document.querySelector('#details-info');

//Right Main Content ---> Bottom Comment List
const commentList = document.querySelector('#comments-list');

//Sign In username
const submitUsername = document.querySelector('#submit-username-btn');

//Form
const formContainer = document.querySelector('.form-container');


let currentUsername;

fetch('http://localhost:3000/criminals')
.then(res => res.json())
.then(datas => {
    datas.forEach(renderSideList)
});

function renderSideList(data) {
    let card = document.createElement('div');
    card.className ='card-container';

    let cardImg = document.createElement('div');
    cardImg.className = 'card-image';
    cardImg.style.backgroundImage = `url(${data.image_url})`;

    let cardBody = document.createElement('div');
    cardBody.className = 'card-content';
    
    let cardName = document.createElement('span');
    cardName.className = 'card-name';
    cardName.innerText = data.name;

    cardBody.append(cardName)
    
    card.append(cardImg, cardBody)
    sideList.append(card);

    card.addEventListener('click', () => {
        formContainer.innerHTML = "";
        commentList.innerHTML = "";
        renderMainContent(data);
    });

}

function renderMainContent(data) {
    mainName.innerText = data.name;

    leftImg.src = data.image_url;
    rightImg.src = data.pdf_img;
    pdfLink.href = data.pdf_url;

    aliasesName.innerText = data.aliases;

    liName.innerText = data.name;
    liBirth.innerText = data.date_of_birth;
    liPlace.innerText = data.place_of_birth;
    liHair.innerText = data.hair;
    liEyes.innerText = data.eyes;
    liSex.innerText = data.sex;
    liRace.innerText = data.race;
    
    detailsInfo.innerText = data.details;

    let input = document.createElement('textarea');
    input.className = "form-control";
    input.placeholder = "Tell us what you know"
    input.rows = "10";

    let submitBtn = document.createElement('button');
    submitBtn.type="button";
    submitBtn.classList.add('btn', 'btn-primary');
    submitBtn.innerText = "COMMENT";
    
    formContainer.append(input, submitBtn);

    submitBtn.style.cursor = "not-allowed";
    submitBtn.disabled = true;

    input.addEventListener('keyup', (e) => {
        if(input.value !== "") {
            submitBtn.style.cursor = "pointer";
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
            submitBtn.style.cursor = "not-allowed";
        }
    });

    submitBtn.addEventListener('click', () => {
        // console.log(input.value)
        // console.log(currentUsername)
        if(!currentUsername) {
            // console.log('not signed in');
            $('#signInModal').modal('show');
        } else {
            // console.log('signed in')
            
        }
    });
    
    data.comments.forEach(renderCommentList);
}

function createNewComment(criminal) {
    
}

function renderCommentList(comment) {
    let commentDiv = document.createElement('div');
    commentDiv.className = "comment-container"

    let hTag = document.createElement('h6');
    hTag.className = 'username';
    hTag.innerText = comment.user.username;
    
    let commentContent = document.createElement('div');
    commentContent.className = 'comment-content';
    commentContent.innerText = comment.content;

    commentDiv.append(hTag, commentContent)
    
    commentList.append(commentDiv);
}


submitUsername.addEventListener('click', () => {
   let inputVal = document.querySelector('#input-username').value;
   let errorMessage = document.querySelector('#error-message');

    if(inputVal === '') {
        errorMessage.style.color = "red";
        errorMessage.innerText = "Please enter username"
    } else {
        let signInBtn = document.querySelector('#sign-in-btn');
        let signedInUsername = document.querySelector('#signed-in-username');

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: inputVal}), // data can be `string` or {object}!
        })
        .then(res => res.json())
        .then(newObj => console.log(newObj))

        // signInBtn.style.display = "none";

        // $('#signInModal').modal('hide');

        // currentUsername = inputVal;
        // signedInUsername.innerText = currentUsername;
    }
});


