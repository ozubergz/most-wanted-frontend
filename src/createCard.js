let sideList = document.querySelector('#side-list');
const formContainer = document.querySelector('.form-container');

class CreateCard {

    static all = [];

    constructor(data) {
        //'this' --> instance of CreateCard

        //ATTRIBUTES(props)
        this.id = data.id,
        this.name = data.name,
        this.aliases = data.aliases,
        this.date_of_birth = data.date_of_birth,
        this.place_of_birth = data.place_of_birth,
        this.hair = data.hair,
        this.eyes = data.eyes,
        this.sex = data.sex,
        this.race = data.race,
        this.image_url = data.image_url,
        this.pdf_img = data.pdf_img,
        this.pdf_url = data.pdf_url,
        this.details = data.details,
        this.comments = data.comments
        
        CreateCard.all.push(this);

        //STRUCTRUE HTML
        this.card = document.createElement('div');
        this.card.className ='card-container';

        this.cardImg = document.createElement('div');
        this.cardImg.className = 'card-image';
        this.cardImg.style.backgroundImage = `url(${data.image_url})`;

        this.cardContent = document.createElement('div');
        this.cardContent.className = 'card-content';
        
        this.cardName = document.createElement('span');
        this.cardName.className = 'card-name';
        this.cardName.innerText = data.name;

        this.cardContent.append(this.cardName);
        
        this.card.append(this.cardImg, this.cardContent);
        
        sideList.append(this.card);

        //EVENT LISTENERS
        this.card.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        formContainer.innerHTML = "";
        commentsDiv.innerHTML = "";
        CreateMainContent(this);

        this.comments.forEach((comment) => {
           CreateComment(comment);
        });
    }
}


