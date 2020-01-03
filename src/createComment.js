const commentsDiv = document.querySelector('#comments');

function CreateComment(comment) {
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
    
    userContainer.append(username, updatedAt);

    let commentContent = document.createElement('p');
    commentContent.id = 'comment-content';
    commentContent.innerText = comment.content;

    commentLi.append(userContainer, commentContent);

    commentsDiv.insertBefore(commentLi, commentsDiv.firstChild);
    
    // if(CURR_USER && username.innerText === CURR_USER.username) {
        // CreateEditDeleteBtn(commentLi, commentContent);
        // CreateEditForm(commentLi, comment.content);
        // CreateModal(commentLi, comment);
    // }

    // CreateModal(commentLi, comment);
    
    CreateEditDeleteBtn(commentLi, commentContent, comment);

}