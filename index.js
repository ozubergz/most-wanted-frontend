//Left side List
const sideList = document.getElementById('side-list');

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
const commentsDiv = document.querySelector('#comments');

//Sign In username
const submitUsername = document.querySelector('#submit-username-btn');

//Form
const formContainer = document.querySelector('.form-container');

const searchBar = document.querySelector('#search-bar');

let currentUser;

fetchAllData();

function fetchAllData() {
    fetch('http://localhost:3000/criminals')
    .then(res => res.json())
    .then(res => { 
        res.forEach(renderSideList);
        renderMainContent(res[0]);
    });
}

function fetchSingleData(id, card) {
    fetch(`http://localhost:3000/criminals/${id}`)
    .then(res => res.json())
    .then(res => {
        card.classList.add('card-focus');
        renderMainContent(res.data);
    });
}


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

    cardBody.append(cardName);
    
    card.append(cardImg, cardBody)
    sideList.append(card);

    card.addEventListener('click', () => {
        formContainer.innerHTML = "";
        commentsDiv.innerHTML = "";

        $('.side-list').children().removeClass('card-focus');
        
        fetchSingleData(data.id, card);
    });

    // filter out names by search keywords
    searchBar.addEventListener('keyup', () => {
        let filter = searchBar.value.toUpperCase();
        let name = cardName.textContent.toUpperCase();
        if(name.indexOf(filter) > -1) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }       
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
    
    data.comments.forEach(renderCommentList);

    renderForm(data);
}

function renderForm(data) {
    let commentInput = document.createElement('textarea');
    commentInput.rows = '5';
    commentInput.classList.add("form-control", "textarea-comment")
    commentInput.placeholder = "Tell us what you know";

    let btnDiv = document.createElement('div');
    btnDiv.className = "form-btn-group";

    let submitBtn = document.createElement('button');
    submitBtn.type = "button";
    submitBtn.classList.add('btn', 'btn-light', 'form-btn');
    submitBtn.innerText = "COMMENT";
    btnDiv.append(submitBtn)
    
    formContainer.append(commentInput, btnDiv);

    submitBtn.style.cursor = "not-allowed";
    submitBtn.disabled = true;

    commentInput.addEventListener('keyup', (e) => {
        if(commentInput.value !== "") {
            submitBtn.style.cursor = "pointer";
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
            submitBtn.style.cursor = "not-allowed";
        }
    });

    submitBtn.addEventListener('click', () => {
        if(!currentUser) {
            $('#signInModal').modal('show');
        } else {
            submitBtn.disabled = "true";
            submitBtn.style.cursor = "not-allowed";
            createNewComment(data, commentInput)
        }
    });
}

function renderCommentList(comment) {
  
    let commentLi  = document.createElement('div');
    commentLi.id = "comment-list";

    let userContainer = document.createElement('div');
    userContainer.className = "user-container";

    let username = document.createElement('h6');
    username.id = 'comment-username';
    username.innerText = comment.user.username;

    let updatedAt = document.createElement('h6');
    updatedAt.id = 'updated-at';
    updatedAt.innerText = comment.updated_at;
    
    userContainer.append(username, updatedAt)

    let commentContent = document.createElement('p');
    commentContent.id = 'comment-content';
    commentContent.innerText = comment.content;

    let btnGroup = document.createElement('div');
    btnGroup.id = "btn-group"

    let editBtn = document.createElement("button");
    editBtn.className = "comment-btns";
    editBtn.innerText = "EDIT";

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "comment-btns";
    deleteBtn.innerText = "DELETE";

    btnGroup.append(editBtn, deleteBtn);

    commentLi.append(userContainer, commentContent);

    ///edit comment form
    let editComentFormGroup = document.createElement('div');
    editComentFormGroup.id = "comment-form-group";

    let commentInput = document.createElement('textarea');
    commentInput.className = "form-control";
    commentInput.rows = "4";
    commentInput.innerText = comment.content;

    let cancelBtn = document.createElement('button');
    cancelBtn.className = "comment-btns";
    cancelBtn.innerText = "CANCEL";
    
    let updateBtn = document.createElement('button');
    updateBtn.className = "comment-btns";
    updateBtn.innerText = "UPDATE";

    editComentFormGroup.append(commentInput, cancelBtn, updateBtn);
    editComentFormGroup.style.display = "none";

    commentsDiv.insertBefore(commentLi, commentsDiv.firstChild);
    
    if (currentUser) {

        if(username.innerText === currentUser.username) commentLi.append(btnGroup, editComentFormGroup)

        editBtn.addEventListener('click', () => {
            btnGroup.style.display = "none";
            commentContent.style.display = "none";
            editComentFormGroup.style.display = "";
        });
        
        cancelBtn.addEventListener('click', () => {
           editComentFormGroup.style.display = "none";
           btnGroup.style.display = "";
           commentContent.style.display = "";
        });

        deleteBtn.addEventListener('click', () => {
           handleRemove(commentLi, comment.id) 
        });

        updateBtn.addEventListener('click', () => {
            updateComment(btnGroup, editComentFormGroup, commentContent, comment.id)
        });
        
    }
}

function updateComment(btns, form, commentDiv, id) {
    let content = form.querySelector('.form-control').value;
    if(content !== "") {
        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        .then(res => res.json())
        .then(newComment => {
            form.style.display = "none";
            btns.style.display = "";
            commentDiv.style.display = "";
            commentDiv.innerText = newComment.content;
        })
    }
    
}

function createNewComment(criminal, commentInput) {
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: currentUser.id,
            criminal_id: criminal.id,
            content: commentInput.value
        })
    })
    .then(res => res.json())
    .then(newComment => {
        commentInput.value = "";
        renderCommentList(newComment);
    });
}



function handleRemove(comment, id) {
    fetch(`http://localhost:3000/comments/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => comment.remove());
}

submitUsername.addEventListener('click', () => {
   let inputVal = document.querySelector('#input-username').value;
   let errorMessage = document.querySelector('#error-message');

    if(inputVal === '') {
        errorMessage.innerText = "Please enter username"
    } else {
        createNewUser(inputVal);
    }
});

function createNewUser(username) {
    let signInBtn = document.querySelector('#sign-in-btn');
    let signedInUsername = document.querySelector('#signed-in-username');
    let errorMessage = document.querySelector('#error-message');
    
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
    .then(res => res.json())
    .then(newUser => {
        if (newUser.error) {
            errorMessage.innerText = newUser.error[0]
        } else {
            $('#signInModal').modal('hide');
            signInBtn.style.display = "none";
            currentUser = newUser;
            signedInUsername.innerText = newUser.username;
        }
    });
}


