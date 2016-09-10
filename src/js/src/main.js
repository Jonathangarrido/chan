'use strict';

(function () {

  ////////////////////////////////////

  active();




})();

function active(){
  slider();
  tab();
}

function slider(){
  $('#slides').superslides({
    animation: 'fade', // 'slide', 'fade''
    play: 4000, //
  });
  $('.bxslider').bxSlider({
    mode: 'fade', //'horizontal', 'vertical', 'fade'
    speed: 500, // speed animation
    pager: true, // icon pager
    auto: false,
    pause: 4000, // speed transition
    infiniteLoop: false,
    hideControlOnEnd: true,
    controls: true, // icon arrow
    nextText:'',
    prevText:'',
  });
}

function navLateral(){
  $('html').toggleClass( 'overflow');
  $( '.nav__lateral--menu' ).toggleClass( 'slideInLeft');
  $( '.nav__lateral--fondo' ).fadeToggle( 'fast');
  $( '.nav__icon' ).toggleClass( 'icon-close icon-navicon')
}

function tab(){
  var $tab = $('.tab a');
  $('.tabs .tab:first-child a').addClass('indicator');
  $('.tab__conte > div:first-of-type').show();

  $tab.click(function(e){
    e.preventDefault();
    var $ambito = $(this).parents(':eq(3)'),
    $tabGroup = $ambito.children('.tab__conte').children('div'),
    $target;
    $target = $(this).attr('href');
    $ambito.find('a').removeClass('indicator');
    $(this).addClass('indicator');
    $($tabGroup).hide();
    $($target).show();
  });
}

var modal = (function(){
  
 // cache
  var $modal= $('.modal');
  var $conte= $('.modal__article');
  var $modalmulti= $('.modal__multi');
  var $modalconte = $('.modal__conte');

  function base(modal){
    $('html').toggleClass( 'overflow'); 
    $(modal).fadeToggle();
    $conte.toggleClass('modal--in');
    $conte.scrollTop(0);
  }
  function multi(id){
    base('.modal__multi');
    $modalmulti.find('.modal'+id).fadeIn(); 
    if(!id){
      $modalmulti.find('.modal__article > div').fadeOut(); 
    }
  }
  function conte(event){ 
    base('.modal__conte');
    var $padre= $(event).parents(':eq(1)'),
        $color= $padre.css('background-color');
    $('.modal__conte > div').css('background-color',$color) ;
    $modalconte.find('.modal__article').css('background-color','transparent');
    var $txt = $padre.children('.conoce--iconos').html() + $padre.children('.conoce--txt').html() + $padre.children('.conoce--txt--full').html();
    $modalconte.find('.modal--contenido').html($txt);
  }
  function close(){
    $('html').toggleClass( 'overflow'); 
    $modal.fadeOut();
    $conte.toggleClass('modal--in');
    $conte.scrollTop(0);
  }

  return{
    normal: base,
    multi: multi,
    conte: conte,
    close: close
  }
})();

var form = (function(){

  var settings = {
        $document: $(document),
        $elements : 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea, select',
        $file     : 'input[type="file"]',
        $form    : $('.form'),
        $msjSuccess: $('.form').find('button').html(),
      },

      init = function(){
        var s = settings;

        s.$document.on('focus',s.$elements, focus);
        s.$document.on('blur',s.$elements, blur);
        s.$document.on('change',s.$file, file);
        s.$form.on('submit', submit);
      },
  
      focus = function(){
        var t = $(this);
        t.siblings('label').addClass('label--active');
      },

      blur = function(){
        var t = $(this);
        if(t.val().length === 0){
          t.siblings('label').removeClass('label--active');
          t.removeClass('input--success'); // se puede quitar
        }else{
          t.addClass('input--success'); // se puede quitar
        }
      },

      file = function(){
        var $fileInput = $('.file_input'),
            $files      = $(this)[0].files,
            $file_names = [];
            
        for (var i = 0; i < $files.length; i++) {
          $file_names.push($files[i].name);
        }
        $fileInput.val($file_names.join(' || '));
        $fileInput.trigger('change');
        if($fileInput.val()){
          $fileInput.addClass('input--success');
        }else{
          $fileInput.removeClass('input--success');
        }
      },

      submit = function(e){
        var $t = $(this);
        e.preventDefault();
        $.ajax({
          url: $t.attr('action'),
          type: 'POST',
          data: $t.serialize(),
          beforeSend: before($t),
          success: function(resp){
            if(resp === 'bien'){
              success($t);
            }else{
              error($t);
            }
          },
          error: function(jqXHR,estado,error){
            alert('Error! Problemas con la conexión.');
            console.log(jqXHR,estado,error);
          },
          complete: function(jqXHR,estado){
            console.log(jqXHR,estado);
          },
          timeout:10000
        });
      },

      before = function(element){
        element.find('input').prop('disabled',true);
        element.find('button').prop('disabled',true);
      },

      success = function(element){
        element.find('button').html('').addClass('form--success').prop('disabled',false);
        window.setTimeout(function(){close(element);}, 2000);
      },

      error = function(element){
        element.find('button').html('').addClass('form--error').prop('disabled',false);
        element.find('input').prop('disabled',false);
      },

      close = function(element){
        // modal.close();
        window.setTimeout(function(){reset(element);}, 500);
      },

      reset = function(element){
        element.each(function(){this.reset();});
        element.find('label').removeClass('label--active input--success');
        element.find('input').removeClass('input--success').prop('disabled',false);
        element.find('button').html(settings.$msjSuccess).removeClass('form--success');
      }

  ;return{
    init: init
  };
})();



 form.init();