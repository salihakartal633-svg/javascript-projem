// 300 Malzemelik Altyapıyı Temsil Eden Temel İnşaat Malzemeleri Havuzu
const urunVeritabani = [
    // Kaba İnşaat
    { kod: "KAB-001", kategori: "Kaba İnşaat", ad: "Portland Çimento (Cem I 42.5)", birim: "Torba", minStok: 50 },
    { kod: "KAB-002", kategori: "Kaba İnşaat", ad: "Nervürlü İnşaat Demiri 12mm", birim: "Ton", minStok: 5 },
    { kod: "KAB-003", kategori: "Kaba İnşaat", ad: "Nervürlü İnşaat Demiri 14mm", birim: "Ton", minStok: 5 },
    { kod: "KAB-004", kategori: "Kaba İnşaat", ad: "Hazır Beton C30", birim: "M3", minStok: 20 },
    { kod: "KAB-005", kategori: "Kaba İnşaat", ad: "Asmolen Tuğla 20'lik", birim: "Adet", minStok: 500 },
    { kod: "KAB-006", kategori: "Kaba İnşaat", ad: "Ytong / Gazbeton 15'lik", birim: "Adet", minStok: 300 },
    { kod: "KAB-007", kategori: "Kaba İnşaat", ad: "Kalıp Altı İskele Borusu", birim: "Adet", minStok: 100 },
    { kod: "KAB-008", kategori: "Kaba İnşaat", ad: "Kalıp Tahtası 3m", birim: "Adet", minStok: 150 },
    { kod: "KAB-009", kategori: "Kaba İnşaat", ad: "Plywood Levha (18mm)", birim: "Adet", minStok: 40 },

    // İnce Yapı / Mimari
    { kod: "INC-001", kategori: "İnce Yapı", ad: "Alçıpan (Standart Beyaz)", birim: "Adet", minStok: 80 },
    { kod: "INC-002", kategori: "İnce Yapı", ad: "Saten Alçı 25 Kg", birim: "Torba", minStok: 30 },
    { kod: "INC-003", kategori: "İnce Yapı", ad: "Seramik Yapıştırıcısı Kalekim", birim: "Torba", minStok: 40 },
    { kod: "INC-004", kategori: "İnce Yapı", ad: "Granit Seramik 60x120", birim: "M2", minStok: 100 },
    { kod: "INC-005", kategori: "İnce Yapı", ad: "Silikonlu İç Cephe Boyası (Beyaz)", birim: "Kova", minStok: 15 },
    { kod: "INC-006", kategori: "İnce Yapı", ad: "Dış Cephe Mantolama Levhası EPS", birim: "Paket", minStok: 50 },

    // Tesisat / Mekanik
    { kod: "TES-001", kategori: "Tesisat", ad: "PPRC Temiz Su Borusu 25mm", birim: "Metre", minStok: 100 },
    { kod: "TES-002", kategori: "Tesisat", ad: "PVC Atık Su Borusu 100'lük", birim: "Metre", minStok: 60 },
    { kod: "TES-003", kategori: "Tesisat", ad: "Küre Vana 1 İnç", birim: "Adet", minStok: 20 },

    // Elektrik Grubu
    { kod: "ELK-001", kategori: "Elektrik", ad: "NYM Kablo 3x2.5 mm²", birim: "Metre", minStok: 200 },
    { kod: "ELK-002", kategori: "Elektrik", ad: "Otomatik Sigorta 16A", birim: "Adet", minStok: 30 },
    { kod: "ELK-003", kategori: "Elektrik", ad: "Sıva Altı Elektrik Kasası", birim: "Adet", minStok: 150 }
];

// Mock (Örnek) Giriş ve Çıkış Verileri (Tıpkı yüklediğin resimlerdeki gibi)
const satinAlimlar = [
    { tarih: "01.06.2026", kod: "KAB-001", miktar: 500, birimFiyat: 140 },
    { tarih: "02.06.2026", kod: "KAB-002", miktar: 15, birimFiyat: 22000 },
    { tarih: "03.06.2026", kod: "INC-001", miktar: 200, birimFiyat: 110 },
    { tarih: "04.06.2026", kod: "ELK-001", miktar: 1000, birimFiyat: 35 }
];

const satislar = [
    { tarih: "04.06.2026", kod: "KAB-001", musteri: "A Blok Şantiye", miktar: 460, birimFiyat: 165 },
    { tarih: "05.06.2026", kod: "KAB-002", musteri: "B Blok Merkez", miktar: 12, birimFiyat: 25000 },
    { tarih: "06.06.2026", kod: "INC-001", miktar: 50, musteri: "Kuzey Villa Projesi", birimFiyat: 140 }
];

// Sekme Değiştirme Fonksiyonu
function switchTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Uygulamayı Başlat ve Tabloları Doldur
document.addEventListener("DOMContentLoaded", () => {
    initUrunListesi();
    initSatinAlimlar();
    initSatislar();
    hesaplaVeYazdirDashboard();
});

// Ürün Listesini Doldurur
function initUrunListesi() {
    const tbody = document.getElementById("urun-listesi-tbody");
    tbody.innerHTML = urunVeritabani.map(u => `
        <tr>
            <td><strong>${u.kod}</strong></td>
            <td>${u.kategori}</td>
            <td>${u.ad}</td>
            <td>${u.birim}</td>
            <td>${u.minStok}</td>
        </tr>
    `).join('');
}

// Giriş Kayıtlarını Doldurur
function initSatinAlimlar() {
    const tbody = document.querySelector("#satin-alim-table tbody");
    tbody.innerHTML = satinAlimlar.map(s => {
        const urun = urunVeritabani.find(u => u.kod === s.kod);
        return `
            <tr>
                <td>${s.tarih}</td>
                <td>${s.kod}</td>
                <td>${s.miktar}</td>
                <td>${s.birimFiyat.toLocaleString('tr-TR')}</td>
                <td><strong>${(s.miktar * s.birimFiyat).toLocaleString('tr-TR')}</strong></td>
                <td>${urun ? urun.kategori : '-'}</td>
                <td>${urun ? urun.ad : '-'}</td>
            </tr>
        `;
    }).join('');
}

// Çıkış (Şantiye) Kayıtlarını Doldurur
function initSatislar() {
    const tbody = document.querySelector("#satis-table tbody");
    tbody.innerHTML = satislar.map(s => {
        const urun = urunVeritabani.find(u => u.kod === s.kod);
        return `
            <tr>
                <td>${s.tarih}</td>
                <td>${s.kod}</td>
                <td>${s.musteri}</td>
                <td>${s.miktar}</td>
                <td>${s.birimFiyat.toLocaleString('tr-TR')}</td>
                <td><strong>${(s.miktar * s.birimFiyat).toLocaleString('tr-TR')}</strong></td>
                <td>${urun ? urun.kategori : '-'}</td>
                <td>${urun ? urun.ad : '-'}</td>
            </tr>
        `;
    }).join('');
}

// Ana Dashboard Hesaplamaları ve Genel Rapor Tablosu
function hesaplaVeYazdirDashboard() {
    const tbody = document.querySelector("#dashboard-table tbody");
    let toplamAlinan = 0;
    let toplamSatilan = 0;
    let kritikAdet = 0;

    let tabloHtml = "";

    urunVeritabani.forEach(urun => {
        // Alınan toplam miktarı bul
        const alinanlar = satinAlimlar.filter(s => s.kod === urun.kod);
        const girenMiktar = alinanlar.reduce((sum, current) => sum + current.miktar, 0);

        // Satılan / Şantiyeye Çıkan toplam miktarı bul
        const cikanlar = satislar.filter(s => s.kod === urun.kod);
        const cikanMiktar = cikanlar.reduce((sum, current) => sum + current.miktar, 0);

        const envanter = girenMiktar - cikanMiktar;
        
        toplamAlinan += girenMiktar;
        toplamSatilan += cikanMiktar;

        let durumBadge = `<span class="badge success">Stok Yeterli</span>`;
        if (envanter <= urun.minStok) {
            durumBadge = `<span class="badge danger">Kritik Stok</span>`;
            kritikAdet++;
        }

        tabloHtml += `
            <tr>
                <td>${urun.kategori}</td>
                <td><strong>${urun.ad}</strong></td>
                <td>${urun.kod}</td>
                <td>${girenMiktar}</td>
                <td>${cikanMiktar}</td>
                <td style="color:${envanter <= urun.minStok ? 'red':'inherit'}; font-weight:bold;">${envanter} ${urun.birim}</td>
                <td>${durumBadge}</td>
            </tr>
        `;
    });

    tbody.innerHTML = tabloHtml;

    // Kart Değerlerini Güncelle
    document.getElementById("dash-toplam-cesit").innerText = urunVeritabani.length;
    document.getElementById("dash-toplam-alinan").innerText = toplamAlinan.toLocaleString('tr-TR');
    document.getElementById("dash-toplam-satilan").innerText = toplamSatilan.toLocaleString('tr-TR');
    document.getElementById("dash-kritik-stok").innerText = kritikAdet;
}

// Ürün Listesi Panelinde Filtreleme Arama Motoru
function filterUrunler() {
    const query = document.getElementById("search-urun").value.toLowerCase();
    const rows = document.querySelectorAll("#urun-listesi-tbody tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
    });
}





