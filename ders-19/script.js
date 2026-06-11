// ============== PWA (Progressive Web App) Kurulumu ==============

// 1. Service Worker'ı Kaydet
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log("Service Worker Kaydedildi."));
}

let deferredPrompt;
const yukleButonu = document.getElementById('YukleButonu');

// 2. Tarayıcının orijinal yükleme penceresini yakala ve beklet
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Tarayıcının kendi kendine sormasını engelle
    deferredPrompt = e; // İsteği hafızaya al
    
    // Yükleme butonunu görünür veya aktif yapabilirsin
    if(yukleButonu) {
        yukleButonu.style.display = 'block'; 
    }
});

// 3. Butona basıldığında otomatik yüklemeyi tetikle
if(yukleButonu) {
    yukleButonu.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Yükleme penceresini hemen aç!
            
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Kullanıcı seçimi: ${outcome}`);
            
            deferredPrompt = null; // Tekrar basılmasın diye sıfırla
        } else {
            alert("Uygulama zaten yüklü veya tarayıcınız şu an yüklemeyi desteklemiyor.");
        }
    });
}

// 4. Uygulama başarıyla yüklendiğinde butonu gizle
window.addEventListener('appinstalled', () => {
    console.log('Uygulama başarıyla masaüstüne kuruldu!');
    if(yukleButonu) {
        yukleButonu.style.display = 'none';
    }
});

// ============== Orijinal JavaScript Kodları ==============

const notInput = document.querySelector ("#notınput");
const Kaydetbtn = document.querySelector ("#kaydetbtn");
const silbtn = document.querySelector ("#silbtn");
const mesaj = document.querySelector ("#mesaj");
const notlarlistesi = document.querySelector ("#notlarlistesi");

window.addEventListener ("DOMContentLoaded", function (){
    notlarıGöster();
})

// notları  localden al

function notlarıGöster(){
    const notlarJSON = localStorage.getItem("notlar-listesi");
    if (notlarJSON){
        return JSON.parse(notlarJSON);
    }else{
        return [];
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

