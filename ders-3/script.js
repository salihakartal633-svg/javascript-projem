 //veri kaydetmek için ;

localStorage.setItem("isim","ali");

 //veri almak için;

 let verial = localStorage.getItem("isim");
 console.log(verial);

// elimdeki veri objeyse ;

let kişibilgisi = {
    isim : "furkan",
    soyisim :"ilaslan",
    yas : 28
}

// string türünde olmayan veriler kaydetmek için;

localStorage.setItem("bilgi", JSON.stringify(kişibilgisi));


// string türünde olmayan verileri almak için;
let objeAL = JSON.parse(localStorage.getItem("bilgi"));
console.log(objeAL);












