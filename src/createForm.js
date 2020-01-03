
function CreateForm(data) {
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
    btnDiv.append(submitBtn);
    
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
        let commentVal =  commentInput.value;

        if(!CURR_USER) {
            $('#signInModal').modal('show');
        } else {
            submitBtn.disabled = "true";
            submitBtn.style.cursor = "not-allowed";

            Adaptor.createComment(data, commentVal)
            .then(res => {
                commentInput.value = "";
                CreateComment(res);
                let foundCard = CreateCard.all.find(card => card.id === data.id);
                foundCard.comments.push(res);
            });
        }
    });
}