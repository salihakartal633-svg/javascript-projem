const notInput = document.querySelector ("#notınput");
const Kaydetbtn =decument.querySelector ("#kaydetbtn");
const silbtn = decument.querySelector ("#silbtn");
const mesaj = document.querySelector ("#mesaj");
const notlarlistesi =  document.querySelector ("#notlarlistesi");

window.addEventListener ("DOMContentLoaded", function (){
    notlarıGöster();
})

// notları  localden al

function notlarıGöster(){
    const notlarJSON = localStorage.getItem("notlar-listesi");
    if (notlarJSON){
        returun JSON.parse(notlarımJSON)
    }else{
        return []
    }
}

function notlariAl(){
    
}

// Notları local'e kaydet
function notlariKaydet(){
    localStorage.setItem("notlar-listesi", JSON.stringify(notlar));
    console.log("Notlar kaydedildi");
}

// Mesaj göstermek için;
function metinGoster(metin,tip){
    mesaj.textContent = metin;
    mesaj.className = "mesaj " + tip;
}

