function CreateEditForm(list, comment, btns) {
    let editComentFormGroup = document.createElement('div');
    editComentFormGroup.id = "comment-form-group";

    let commentInput = document.createElement('textarea');
    commentInput.className = "form-control";
    commentInput.rows = "4";
    commentInput.innerText = comment.innerText;

    let cancelBtn = document.createElement('button');
    cancelBtn.className = "comment-btns";
    cancelBtn.innerText = "CANCEL";
    
    let updateBtn = document.createElement('button');
    updateBtn.className = "comment-btns";
    updateBtn.innerText = "UPDATE";

    editComentFormGroup.append(commentInput, cancelBtn, updateBtn);

    list.append(editComentFormGroup);

    cancelBtn.addEventListener('click', () => {
        editComentFormGroup.remove();
        btns.style.display = "";
        comment.style.display = ""; 
    });

    
}