const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");






//Tum eventleri yukleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    //Sayfa yenilendiginde tum filmlerin local storage den gelmesini saglar
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAll);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;


    if (title ==="" || director ==="" || url ==="") {
       UI.displayMessage("Tum alanlari doldurun","danger");
    }

    else{
        //Yeni film
        const newFilm = new Film(title,director, url);
        UI.addFilmToUI(newFilm);//Arayuze film ekleme
        Storage.addFilmToStorage(newFilm);// storage film ekleme
        UI.displayMessage(`"${title}" filmi basariyla eklendi`,"success")

    }
    UI.clearInput(titleElement,urlElement,directorElement);


    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id ==="delete-film") {
        UI.deleteFilmFromUI(e.target);

        const filmName = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        Storage.deleteFilmFromStorage(filmName);

        UI.displayMessage(`"${filmName}"  adli filmin silme islemi basarili...`,"success")
        
        
    } 
}
function clearAll(){


    if (confirm("Emin misiniz?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    } 
    
}