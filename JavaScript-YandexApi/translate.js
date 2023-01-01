

function Translate(word, language) {
    this.apikey = "trnsl.1.1.20221227T113507Z.a2b695a16ab97158.5fc0b5b918f23b7954dab78fc202045010beb6db";
    this.word = word;
    this.language = language;


    //XHR object

    this.xhr = new XMLHttpRequest();


}


Translate.prototype.translateWord = function (callback) {
    // ajax islemler
    const endpoint = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apikey}&text=${this.word}&lang=${this.language}`;

    this.xhr.open("GET", endpoint);

    this.xhr.onload = () => {

        if (this.xhr.status === 200) {

            const json = JSON.parse(this.xhr.responseText);
            const text = json.text[0];

            callback(null, text)
        } else {
            callback("Bir hata olustu", null)
        }
    }

    this.xhr.send();
};

Translate.prototype.changeParameters = function(newWord, newLanguage){
    
    this.word = newWord;
    this.language = newLanguage;
}