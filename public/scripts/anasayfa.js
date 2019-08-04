$(document).ready(function() {

            const searchBar = document.forms['search-notes'].querySelector('input');
            const list = document.querySelector('.yerler');

        searchBar.addEventListener('keyup', function(e){

          const term = e.target.value.toLowerCase();
          const notes = list.getElementsByTagName('li');
          Array.from(notes).forEach(function(note){
            const title = note.textContent;
            if (title.toLowerCase().indexOf(term) != -1){
                note.style.display = 'block';
            } else {
                note.style.display = 'none';
            }
          });
        });

    var yerler = $.getJSON("/api/yerler");

    yerler
        .then(yerlerEkle);

    $('#bizimInput').keypress((e) => {
        if (e.which === 13) {
            if ($('#bizimInput').val() == '') {
                showAlert('Boş yazı girilmez', 'danger');
                return;
            }
            yeniSehirEkle();
            showAlert('Başarıyle eklendi', 'success');
        }
    })
    $('.yerler').on('click', '.fas', function() {
        var tiklanan = $(this).parent().parent();
        var silinenURL = '/api/yerler/' + tiklanan.data('id');

        $.ajax({
                method: "DELETE",
                url: silinenURL
            })
            .then((silinenData) => {
                console.log(silinenData);
                tiklanan.remove();
            })
    });

    $('.yerler').on('click', 'li', function() {
        ziyaretDurumuGuncelle($(this));
    })
});

function yerlerEkle(yerler) {
    yerler.forEach(function(yer) {
        yerEkle(yer);
    })
}

function yerEkle(yer) {

    var yeniYer = $('<li class="yerlerimiz">' + yer.isim + '<span><i id="mobil" class="fas fa-trash-alt float-right fa-xs"></i></span></li>');

    yeniYer.data('id', yer._id);
    yeniYer.data('ziyaretDurumu', yer.ziyaret);

    if (yer.ziyaret == true) {
        $(yeniYer).addClass('ziyaretEdilmis');
    }

    $('.yerler').append(yeniYer);

}
function yeniSehirEkle() {
    var yeniSehir = $('#bizimInput').val();
    if (yeniSehir == '') {
        return;
    }

    $.post('/api/yerler', { isim: yeniSehir })
        .then((yeniEklenenSehir) => {
            yerEkle(yeniEklenenSehir);
            $('#bizimInput').val('');
        });
}

function ziyaretDurumuGuncelle(yer) {
    var guncellemeURL = '/api/yerler/' + yer.data('id');
    var ziyaretDurumu = yer.data('ziyaretDurumu');
    var guncelle = { ziyaret: !ziyaretDurumu };

    $.ajax({
            method: "PUT",
            url: guncellemeURL,
            data: guncelle
        })
        .then((guncellenmisYer) => {
            console.log(guncellenmisYer);
            yer.toggleClass("ziyaretEdilmis");
            yer.data('ziyaretDurumu', !ziyaretDurumu);
        })
};


function showAlert(mesaj, className) {
    var alert = `
         <div class="alert alert-${className}">
            ${mesaj}
         </div>    
        `;

    const row = document.querySelector('.uyari');
    // beforeBegin , afterBegin , beforeEnd , afterEnd
    row.insertAdjacentHTML('afterEnd', alert);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1500);
}
