// Right Main Content ---> Top Name
let mainName = document.querySelector('#main-name');

// Right Main Content ---> Top Images
let leftImg = document.querySelector('#main-left-image');
let rightImg = document.querySelector('#main-right-image');
let pdfLink = document.querySelector('#main-pdf-link');

// Right Main Content ---> Aliases
let aliasesName = document.querySelector('#alias-info');

// Right Main Content ---> Description
let liName = document.querySelector('#li-name');
let liBirth = document.querySelector('#li-birth');
let liPlace = document.querySelector('#li-place');
let liHair = document.querySelector('#li-hair');
let liEyes = document.querySelector('#li-eyes');
let liSex = document.querySelector('#li-sex');
let liRace = document.querySelector('#li-race');

//Rigth Main Content ---> Details
let detailsInfo = document.querySelector('#details-info');

function CreateMainContent(data) {
    
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

    CreateForm(data);
}