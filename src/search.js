let searchBar = document.querySelector('#search-bar');

function Search(cards) {
    searchBar.addEventListener('keyup', () => {
        let filter = searchBar.value.toUpperCase();
        
        cards.forEach((instance) => {
            let name = instance.cardName.textContent.toUpperCase();
            if(name.indexOf(filter) > -1) {
                instance.card.style.display = "";
            } else {
                instance.card.style.display = "none";
            }
        });

    });
}