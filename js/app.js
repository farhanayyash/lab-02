'use strict';
let pagenum = 1;
let idcard = ["default"];
let xf = "";
$("#switch").on("click", function () {
    if (pagenum == 1) {
        pagenum = 2;
    } else {
        pagenum = 1;
    }
    $("main").text("");
    idcard = ["default"];
    if (xf == "sort") {
        all("sort");
    } else if (xf == "horns") {
        all("horns");
    } else {
        all();
    }
});
$("#sort").on("click", function () {
    $("main").text("");
    idcard = ["default"];
    xf = "sort";
    all("sort");
});
$("#horns").on("click", function () {
    xf = "horns";
    $("main").text("");
    idcard = ["default"];
    all("horns");
});
all();
function all(xf = "try") {
    $.ajax(`data/page-${pagenum}.json`)
        .then(data => {
            if (xf == "sort") {
                data.sort(function (a, b) {
                    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            }
            if (xf == "horns") {
                data.sort(function (a, b) {
                    return a.horns - b.horns;
                });
            }
            data.forEach((item) => {
                let newCard = new card(item);
                newCard.render();
            })
            renderid();
        })
    function card(value) {
        this.title = value.title;
        this.description = value.description;
        this.keyword = value.keyword;
        this.image_url = value.image_url;
    }
    card.prototype.render = function () {
        // let cardClone = $('.photo-template').clone();
        // cardClone.removeClass('photo-template');
        // cardClone.addClass(this.keyword);
        // cardClone.find('.h22').text(this.title);
        // cardClone.find('img').attr("src",this.image_url);
        //  cardClone.find('img').attr("width","200px");
        // cardClone.find('p').text(this.description);
        // $('main').append(cardClone);
        let template = $('#templateCard').html();
        // console.log(this);
        let newObj = Mustache.render(template, this);
        // console.log(newObj);
        if (!(idcard.includes(this.keyword))) {
            idcard.push(this.keyword);
        }
        $('main').append(newObj);
    }
    // console.log(idcard);
    $('select').on('change', function () {
        // console.log($(this).val());
        for (let i = 0; i < idcard.length; i++) {
            $(`.${idcard[i]}`).css('display', '');
        }
        for (let i = 0; i < idcard.length; i++) {
            if ("default" == $(this).val()) {
                $(`.${idcard[i]}`).toggle();
            }
        }
        for (let i = 0; i < idcard.length; i++) {
            if (idcard[i] != $(this).val()) {
                $(`.${idcard[i]}`).toggle();
            }
        }
    })
}
function renderid() {
    $('select').text("");
    idcard.forEach(element => {
        $('select').append(`<option value="${element}">${element}</option>`);
    });
}