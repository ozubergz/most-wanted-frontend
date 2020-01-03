function CreateEditDeleteBtn(list, content, comment) {
    let btnGroup = document.createElement('div');
    btnGroup.id = "btn-group";

    let editBtn = document.createElement("button");
    editBtn.className = "comment-btns";
    editBtn.innerText = "EDIT";

    let deleteBtn = document.createElement("button");
    deleteBtn.dataset.toggle = "modal";
    deleteBtn.dataset.target = "#deletePopUp";
    deleteBtn.className = "comment-btns";
    deleteBtn.innerText = "DELETE";

    btnGroup.append(editBtn, deleteBtn);
    
    list.append(btnGroup);

    editBtn.addEventListener('click', () => {
        btnGroup.style.display = "none";
        content.style.display = "none";
        CreateEditForm(list, content, btnGroup);
    });

    deleteBtn.addEventListener("click", () => {
        CreateModal(list, comment);
    });

}