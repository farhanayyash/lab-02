'use strict';

let idcard = [];
$.ajax('data/page-1.json')
.then(data=>{
data.forEach((item)=>{
   
    let newCard = new card(item);
    newCard.render();
})
renderid();
})

function card (value){
    this.title=value.title;
    this.description=value.description;
    this.keyword=value.keyword;
    this.image_url=value.image_url;
}

card.prototype.render=function(){

    let cardClone = $('.photo-template').clone();
    cardClone.removeClass('photo-template');
    cardClone.addClass(this.keyword);
    cardClone.find('.h22').text(this.title);
    cardClone.find('img').attr("src",this.image_url);
     cardClone.find('img').attr("width","200px");
    cardClone.find('p').text(this.description);
    $('main').append(cardClone);
    if(!(idcard.includes(this.keyword))){
        idcard.push(this.keyword);}
}
// console.log(idcard);

function renderid(){
idcard.forEach(element => {
   
    $('select').append(`<option value="${element}">${element}</option>`);
});}


$('select').on('change',function(){
    // console.log($(this).val());
    for(let i = 0; i <idcard.length ; i++){
         $(`.${idcard[i]}`).css('display','');
         
    }
     for(let i = 0; i <idcard.length ; i++){
         if("default"== $(this).val()){
              $(`.${idcard[i]}`).toggle();}
         
    }
    for(let i = 0; i <idcard.length ; i++){
        if(idcard[i] !=$(this).val() ){
            $(`.${idcard[i]}`).toggle();
        }
    }
   
})