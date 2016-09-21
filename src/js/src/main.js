'use strict';

var modal = (function(){

  var settings = {
        $modal: $('.modal'),
        $conte: $('.modal__article'),
        $modalmulti: $('.modal__multi'),
        $modalconte: $('.modal__conte'),
      },
      
      base = function (modal){
        $('html').toggleClass( 'overflow'); 
        $(modal).fadeToggle();
        settings.$conte.toggleClass('modal--in');
        settings.$conte.scrollTop(0);
      },

      close = function(){
        $('html').toggleClass( 'overflow'); 
        settings.$modal.fadeOut();
        settings.$conte.toggleClass('modal--in');
        settings.$conte.scrollTop(0);
      },

      multi = function(){
        
        base('.modal__multi');
        settings.$modalmulti.find('.modal'+id).fadeIn(); 
        if(!id){
          settings.$modalmulti.find('.modal__article > div').fadeOut(); 
        }
      },

      conte = function(event){
        base('.modal__conte');
        var $padre= $(event).parents(':eq(1)'),
            $color= $padre.css('background-color');
        $('.modal__conte > div').css('background-color','#009de0') ;
        settings.$modalconte.find('.modal__article').css('background-color','transparent');
        
        var $txt = $padre.html();
        settings.$modalconte.find('.modal--contenido').html($txt);
      }

  ;return{
    base: base, 
    multi: multi,
    conte: conte,
    close: close, 
  }
})();
