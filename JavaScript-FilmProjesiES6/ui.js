class UI{
    
    static addFilmToUI(newFilm){
        const filmList = document.getElementById("films");
        filmList.innerHTML += 
        `
         <tr>
            <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>                                           
            <td>${newFilm.title}</td>
            <td>${newFilm.director}</td>
            <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
         </tr>
        
        `
    }
    
    static clearInput(element1,element2, element3){
        element1.value="";
        element2.value="";
        element3.value="";
    }
    
    static displayMessage(message,type){
        const cardBody = document.querySelectorAll(".card-body")[0];
        //Alert divini olusturma
    
        const div = document.createElement("div");
    
        div.className = `alart alert-${type}`;
        div.textContent = message;
        cardBody.appendChild(div);
    
        setTimeout(function(){
            div.remove();
        },2000)
    }
    
    staticloadAllFilms(films){
        const filmList = document.getElementById("films");
        films.forEach(function(film){
            filmList.innerHTML += 
            `
            <tr>
            <td><img src="${film.url}" class="img-fluid img-thumbnail"></td>                                           
            <td>${film.title}</td>
            <td>${film.director}</td>
            <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
            </tr>
            `
        });
    }
    static deleteFilmFromUI(element){
        element.parentElement.parentElement.remove();
    }
    
    static clearAllFilmsFromUI(){
        const filmList = document.getElementById("films");
    
        while(filmList.firstElementChild !== null){ //Child oldugu surece
            filmList.firstElementChild.remove();
        }
    }


}

