'use strict';

(function () {

  ////////////////////////////////////

  active();




})();

function active(){
  
} 

var nav =  (function(){

  var settings = {

      },

      full = function(){
        $('html').toggleClass( 'overflow'); 
        $( '.nav__full--barra' ).toggleClass( 'fadeInright');
        $( '.nav__icon' ).toggleClass( 'icon-close icon-navicon');
      }

  ;return{
    full : full,
  };

})();
