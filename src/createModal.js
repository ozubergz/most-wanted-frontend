function CreateModal(list, comment) {
    let modal = document.createElement('div');
    modal.className = "modal";
    modal.id="deletePopUp";
    modal.setAttribute('role', 'dialog');

    let modalDialog = document.createElement('div');
    modalDialog.className = "modal-dialog";
    modalDialog.setAttribute('role', 'document');
    
    modal.append(modalDialog);

    let modalContent = document.createElement('div');
    modalContent.className = "modal-content";

    modalDialog.append(modalContent);

    let modalHeader = document.createElement('div');
    modalHeader.className = "modal-header";

    let modalHeaderBtn = document.createElement('button');
    modalHeaderBtn.type="button";
    modalHeaderBtn.className="close";
    modalHeaderBtn.dataset.dismiss="modal";

    let span = document.createElement('span');
    span.style.color = "white";
    span.innerHTML = "&times;";

    modalHeaderBtn.append(span);
    
    modalHeader.append(modalHeaderBtn);

    let modalBody = document.createElement('div');
    modalBody.className = "modal-body";

    let modalpTag = document.createElement('p');
    modalpTag.className = 'text-center';
    modalpTag.innerText = "Do you want to delete?";
    modalpTag.style.color = 'white';

    modalBody.append(modalpTag);

    let modalFooter = document.createElement('div');
    modalFooter.className = "modal-footer";
    
    let noBtn = document.createElement('button');
    noBtn.dataset.dismiss = "modal";
    noBtn.type = "button";
    noBtn.classList.add('btn', 'btn-secondary', 'modal-btns');
    noBtn.innerText = 'NO';

    let yesBtn = document.createElement('button');
    yesBtn.dataset.dismiss = "modal";
    yesBtn.type = "button";
    yesBtn.classList.add('btn', 'btn-danger', 'modal-btns');
    yesBtn.innerText = "YES";
    
    modalFooter.append(noBtn, yesBtn);
    
    modalContent.append(modalHeader, modalBody, modalFooter);
    
    list.append(modal);

    yesBtn.addEventListener('click', () => {
        Adaptor.removeComment(comment.id)
        .then(res => {
            list.remove();
            let found = CreateCard.all.find(card => card.id === res.criminal_id);
            let modifiedArr = found.comments.filter(comment => comment.id !== res.id);
            found.comments = modifiedArr;
        });
    });

    modal.addEventListener('click', () => {
       modal.remove();
       $('#deletePopUp').modal('hide');
        
    });

    
    
}