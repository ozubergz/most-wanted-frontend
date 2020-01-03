const submitUsername = document.querySelector('#submit-username-btn');
let inputName = document.querySelector('#input-username');
let errorMessage = document.querySelector('#error-message');

let signInBtn = document.querySelector('#sign-in-btn');
let signedInUsername = document.querySelector('#signed-in-username');

let CURR_USER;

Adaptor.fetchAllData()
.then(allData => {

    allData.forEach(data => {
        new CreateCard(data)
    });

    Search(CreateCard.all);
    CreateMainContent(allData[0]);

    allData[0].comments.forEach((comment) => {
        CreateComment(comment);
     });
});


submitUsername.addEventListener('click', () => {
    if(inputName.value === '') {
        errorMessage.innerText = "Please enter username"
    } else {
        Adaptor.createUser(inputName.value)
        .then(newUser => {
            if (newUser.error) {
                errorMessage.innerText = newUser.error[0]
            } else {
                $('#signInModal').modal('hide');
                CURR_USER = newUser;
                signInBtn.style.display = "none";
                signedInUsername.innerText = newUser.username;
            }
        });
    }
});



//////////////////////////////////////////////////////// OLD CODE ////////////////////////////////////////////////////////////

//Left side List
// const sideList = document.getElementById('side-list');

//Right Main Content ---> Top Name
// const mainName = document.querySelector('#main-name');

// Right Main Content ---> Top Images
// const leftImg = document.querySelector('#main-left-image');
// const rightImg = document.querySelector('#main-right-image');
// const pdfLink = document.querySelector('#main-pdf-link');

//Right Main Content ---> Aliases
// const aliasesName = document.querySelector('#alias-info');

//Right Main Content ---> Description
// const liName = document.querySelector('#li-name');
// const liBirth = document.querySelector('#li-birth');
// const liPlace = document.querySelector('#li-place');
// const liHair = document.querySelector('#li-hair');
// const liEyes = document.querySelector('#li-eyes');
// const liSex = document.querySelector('#li-sex');
// const liRace = document.querySelector('#li-race');

//Rigth Main Content ---> Details
// const detailsInfo = document.querySelector('#details-info');

//Right Main Content ---> Bottom Comment List
// const commentsDiv = document.querySelector('#comments');

//Sign In username
// const submitUsername = document.querySelector('#submit-username-btn');

//Form
// const formContainer = document.querySelector('.form-container');

// const searchBar = document.querySelector('#search-bar');

// let currentUser;

// fetchAllData();

// function fetchAllData() {
//     fetch('http://localhost:3000/criminals')
//     .then(res => res.json())
//     .then(res => { 
//         res.forEach(renderSideList);
//         renderMainContent(res[0]);
//     });
// }

// function fetchSingleData(id) {
//     fetch(`http://localhost:3000/criminals/${id}`)
//     .then(res => res.json())
//     .then(res => {
//         renderMainContent(res.data);
//     });
// }

// function renderSideList(data) {
//     let card = document.createElement('div');
//     card.className ='card-container';

//     let cardImg = document.createElement('div');
//     cardImg.className = 'card-image';
//     cardImg.style.backgroundImage = `url(${data.image_url})`;

//     let cardBody = document.createElement('div');
//     cardBody.className = 'card-content';
    
//     let cardName = document.createElement('span');
//     cardName.className = 'card-name';
//     cardName.innerText = data.name;

//     cardBody.append(cardName);
    
//     card.append(cardImg, cardBody);
    
//     sideList.append(card);

//     card.addEventListener('click', () => {
//         formContainer.innerHTML = "";
//         commentsDiv.innerHTML = "";

//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });

//         $('.side-list').children().removeClass('card-focus');
//         card.classList.add('card-focus');
                
//         fetchSingleData(data.id);
//     });

//     // filter out names by search keywords
//     searchBar.addEventListener('keyup', () => {
//         let filter = searchBar.value.toUpperCase();
//         let name = cardName.textContent.toUpperCase();
//         if(name.indexOf(filter) > -1) {
//             card.style.display = "";
//         } else {
//             card.style.display = "none";
//         }
//     });

//     sideList.children[1].classList.add('card-focus')
// }

// function renderMainContent(data) {
//     mainName.innerText = data.name;

//     leftImg.src = data.image_url;
//     rightImg.src = data.pdf_img;
//     pdfLink.href = data.pdf_url;

//     aliasesName.innerText = data.aliases;

//     liName.innerText = data.name;
//     liBirth.innerText = data.date_of_birth;
//     liPlace.innerText = data.place_of_birth;
//     liHair.innerText = data.hair;
//     liEyes.innerText = data.eyes;
//     liSex.innerText = data.sex;
//     liRace.innerText = data.race;
    
//     detailsInfo.innerText = data.details;
    
//     data.comments.forEach(renderCommentList);

//     renderForm(data);
// }

// function renderForm(data) {
//     let commentInput = document.createElement('textarea');
//     commentInput.rows = '5';
//     commentInput.classList.add("form-control", "textarea-comment")
//     commentInput.placeholder = "Tell us what you know";

//     let btnDiv = document.createElement('div');
//     btnDiv.className = "form-btn-group";

//     let submitBtn = document.createElement('button');
//     submitBtn.type = "button";
//     submitBtn.classList.add('btn', 'btn-light', 'form-btn');
//     submitBtn.innerText = "COMMENT";
//     btnDiv.append(submitBtn);
    
//     formContainer.append(commentInput, btnDiv);

//     submitBtn.style.cursor = "not-allowed";
//     submitBtn.disabled = true;

//     commentInput.addEventListener('keyup', (e) => {
//         if(commentInput.value !== "") {
//             submitBtn.style.cursor = "pointer";
//             submitBtn.disabled = false;
//         } else {
//             submitBtn.disabled = true;
//             submitBtn.style.cursor = "not-allowed";
//         }
//     });

//     submitBtn.addEventListener('click', () => {
//         if(!currentUser) {
//             $('#signInModal').modal('show');
//         } else {
//             submitBtn.disabled = "true";
//             submitBtn.style.cursor = "not-allowed";
//             createNewComment(data, commentInput)
//         }
//     });
// }

// function renderCommentList(comment) {
    
//     //////////////////////////start of comment list////////////////////////

//     let commentLi  = document.createElement('div');
//     commentLi.id = "comment-list";

//     let userContainer = document.createElement('div');
//     userContainer.className = "user-container";

//     let username = document.createElement('h6');
//     username.id = 'comment-username';
//     username.innerText = comment.user.username;

//     let updatedAt = document.createElement('h6');
//     updatedAt.id = 'updated-at';
//     updatedAt.innerText = comment.updated_at;
    
//     userContainer.append(username, updatedAt);

//     let commentContent = document.createElement('p');
//     commentContent.id = 'comment-content';
//     commentContent.innerText = comment.content;

//     let btnGroup = document.createElement('div');
//     btnGroup.id = "btn-group";

//     let editBtn = document.createElement("button");
//     editBtn.className = "comment-btns";
//     editBtn.innerText = "EDIT";

//     let deleteBtn = document.createElement("button");
//     deleteBtn.dataset.toggle = "modal";
//     deleteBtn.dataset.target = "#deletePopUp";
//     deleteBtn.className = "comment-btns";
//     deleteBtn.innerText = "DELETE";

//     btnGroup.append(editBtn, deleteBtn);

//     commentLi.append(userContainer, commentContent);

//     /////////////////////////end of comment list////////////////////

//     ///////////////////////edit form//////////////////////////////

//     let editComentFormGroup = document.createElement('div');
//     editComentFormGroup.id = "comment-form-group";

//     let commentInput = document.createElement('textarea');
//     commentInput.className = "form-control";
//     commentInput.rows = "4";
//     commentInput.innerText = comment.content;

//     let cancelBtn = document.createElement('button');
//     cancelBtn.className = "comment-btns";
//     cancelBtn.innerText = "CANCEL";
    
//     let updateBtn = document.createElement('button');
//     updateBtn.className = "comment-btns";
//     updateBtn.innerText = "UPDATE";

//     editComentFormGroup.append(commentInput, cancelBtn, updateBtn);
//     editComentFormGroup.style.display = "none";
    
//     ////////////////////////end of edit form/////////////////////////
    
//     commentsDiv.insertBefore(commentLi, commentsDiv.firstChild);

//     ///////////////////////////start modal////////////////////////////

//     let modal = document.createElement('div');
//     modal.className = "modal";
//     modal.id="deletePopUp";
//     modal.setAttribute('role', 'dialog');

//     let modalDialog = document.createElement('div');
//     modalDialog.className = "modal-dialog";
//     modalDialog.setAttribute('role', 'document');
    
//     modal.append(modalDialog);

//     let modalContent = document.createElement('div');
//     modalContent.className = "modal-content";

//     modalDialog.append(modalContent);

//     let modalHeader = document.createElement('div');
//     modalHeader.className = "modal-header";

//     let modalHeaderBtn = document.createElement('button');
//     modalHeaderBtn.type="button";
//     modalHeaderBtn.className="close";
//     modalHeaderBtn.dataset.dismiss="modal";

//     let span = document.createElement('span');
//     span.style.color = "white";
//     span.innerHTML = "&times;";

//     modalHeaderBtn.append(span);
    
//     modalHeader.append(modalHeaderBtn);

//     let modalBody = document.createElement('div');
//     modalBody.className = "modal-body";

//     let modalpTag = document.createElement('p');
//     modalpTag.className = 'text-center';
//     modalpTag.innerText = "Do you want to delete?";
//     modalpTag.style.color = 'white';

//     modalBody.append(modalpTag);

//     let modalFooter = document.createElement('div');
//     modalFooter.className = "modal-footer";
    
//     let modalBtnNo = document.createElement('button');
//     modalBtnNo.dataset.dismiss = "modal";
//     modalBtnNo.type = "button";
//     modalBtnNo.classList.add('btn', 'btn-secondary', 'modal-btns');
//     modalBtnNo.innerText = 'NO';

//     let modalBtnYes = document.createElement('button');
//     modalBtnYes.type = "button";
//     modalBtnYes.classList.add('btn', 'btn-danger', 'modal-btns');
//     modalBtnYes.innerText = "YES";
    
//     modalFooter.append(modalBtnNo, modalBtnYes);
    
//     modalContent.append(modalHeader, modalBody, modalFooter);

//     ///////////////////////////end of modal//////////////////////////////
    
//     if (currentUser) {

//         if(username.innerText === currentUser.username) commentLi.append(btnGroup, editComentFormGroup, modal)

//         editBtn.addEventListener('click', () => {
//             btnGroup.style.display = "none";
//             commentContent.style.display = "none";
//             editComentFormGroup.style.display = "";
//         });
        
//         cancelBtn.addEventListener('click', () => {
//            editComentFormGroup.style.display = "none";
//            btnGroup.style.display = "";
//            commentContent.style.display = "";
//         });

//         modalBtnYes.addEventListener('click', () => {
//             $('#deletePopUp').modal('hide');
//             handleRemove(commentLi, comment.id);
//         });

//         updateBtn.addEventListener('click', () => {
//             updateComment(btnGroup, editComentFormGroup, commentContent, comment.id)
//         });
        
//     }
// }

// function updateComment(btns, form, commentDiv, id) {
//     let content = form.querySelector('.form-control').value;
//     if(content !== "") {
//         fetch(`http://localhost:3000/comments/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ content })
//         })
//         .then(res => res.json())
//         .then(newComment => {
//             form.style.display = "none";
//             btns.style.display = "";
//             commentDiv.style.display = "";
//             commentDiv.innerText = newComment.content;
//         })
//     }
    
// }

// function createNewComment(criminal, commentInput) {
//     fetch('http://localhost:3000/comments', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             user_id: currentUser.id,
//             criminal_id: criminal.id,
//             content: commentInput.value
//         })
//     })
//     .then(res => res.json())
//     .then(newComment => {
//         commentInput.value = "";
//         renderCommentList(newComment);
//     });
// }



// function handleRemove(comment, id) {
//     fetch(`http://localhost:3000/comments/${id}`, {
//         method: 'DELETE'
//     })
//     .then(res => res.json())
//     .then(() => comment.remove());
// }

// submitUsername.addEventListener('click', () => {
//    let inputVal = document.querySelector('#input-username').value;
//    let errorMessage = document.querySelector('#error-message');

//     if(inputVal === '') {
//         errorMessage.innerText = "Please enter username"
//     } else {
//         createNewUser(inputVal);
//     }
// });

// function createNewUser(username) {
//     let signInBtn = document.querySelector('#sign-in-btn');
//     let signedInUsername = document.querySelector('#signed-in-username');
//     let errorMessage = document.querySelector('#error-message');
    
//     fetch('http://localhost:3000/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username })
//     })
//     .then(res => res.json())
//     .then(newUser => {
//         if (newUser.error) {
//             errorMessage.innerText = newUser.error[0]
//         } else {
//             $('#signInModal').modal('hide');
//             signInBtn.style.display = "none";
//             currentUser = newUser;
//             signedInUsername.innerText = newUser.username;
//         }
//     });
// }


