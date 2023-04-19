$(function() {

        /* BURGER */
        let burgBtn = $("#burger-btn");
        let nav = $("#nav");
        let body = $("body");
        let wrapper = $("#wrapper");
        let headerW = $("#header__wrap");
        
        $(burgBtn).on("click", function(event) {
             event.preventDefault();
             event.stopPropagation();
       
             burger_move();
        });
    
        $(nav).on("click", function(event) {
              event.stopPropagation();
        }); 
    
        $(wrapper).on("click", function() {
            if (wrapper.hasClass('wrapper-show') && (nav.hasClass('nav_burger_unlocked'))) {
                burger_move();               
            } 
        }); 
    
        function burger_move(){
            if (nav.hasClass('nav-show')) {
                burgBtn.removeClass("burger__btn-rotate");
                setTimeout(function() {  
                    burgBtn.removeClass("burger__btn-close");
                }, 500)
    
                nav.removeClass('nav-transform');  
                headerW.removeClass('header__wrap-show'); 
                nav.one('transitionend', function() { 
                    nav.removeClass('nav-show');
                    wrapper.removeClass("wrapper-show");
                });  
    
                setTimeout(function() {
                    nav.removeClass('nav_burger_unlocked')
                }, 5);
    
            } else {
                burgBtn.addClass("burger__btn-close");
              
                setTimeout(function() {  
                    burgBtn.addClass("burger__btn-rotate");
                }, 400);

                wrapper.addClass("wrapper-show"); 
                nav.addClass('nav-show');
                headerW.addClass('header__wrap-show');

                setTimeout(function() {  
                    nav.addClass('nav-transform');
                }, 1);
                
                nav.addClass('nav_burger_unlocked');
            }
          }


    /* Smooth scroll */

    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();
  
          let elementId = $(this).data('scroll');
          let elementOffset = $(elementId).offset().top;
  
          $("html, body").animate({
              scrollTop: elementOffset - 40
          }, 700);
  
      });


    /* SLIDER https://kenwheeler.github.io/slick/ 
    ==============================*/
    
    $('#slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        // slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        pauseOnHover: true
     
    
      });


    /* MODAL - модальные окна при отправке сообщения*/

    /* проверка заполненности полей и вывод модального окна */
    const openCall = $("#form__btn");
    
    openCall.on("click", function(event) {
       event.preventDefault();
    
       let button_value = openCall.val();
       let formInput = document.querySelectorAll('.field-red');
       let $allField = 1;              /*считаем, что все поля запонены */
    
        formInput.forEach(function(input) {
    
           let notFilledId = $(input).attr('id') + "-notfil";  /*получаем id от дива not-filled*/
    
           if ( $(input).attr('id') == 'email')
            {
             if (input.value === '')
              {
               $(input).addClass('input__red');
               $("#" + notFilledId).addClass('active');
               $("#" + notFilledId).html('Укажите ваш Email');
              }
             else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(input.value)) 
              {
                $(input).addClass('input__red');
                $("#" + notFilledId).addClass('active');
                $("#" + notFilledId).html('Неверный формат Email');
                $allField = 0;         /* найдено не заполненое поле */
              }
             else
              {
               $(input).removeClass('input__red'); 
               $("#" + notFilledId).removeClass('active');
              }      
            }
           else if ( $(input).attr('id') == 'tel')
            {
             if (input.value === '')
              { 
               $(input).addClass('input__red');
               $("#" + notFilledId).addClass('active');
               $("#" + notFilledId).html('Укажите ваш номер телефона');
              }
             else if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/g.test(input.value)) 
              { 
               $(input).addClass('input__red');
               $("#" + notFilledId).addClass('active');
               $("#" + notFilledId).html('Неверный формат номера телефона');
               $allField = 0;         /* найдено не заполненое поле */
              }
             else
              {
               $(input).removeClass('input__red'); 
               $("#" + notFilledId).removeClass('active');
              }      
            }
           else if (input.value === '') 
            {
             $(input).addClass('input__red');
             $("#" + notFilledId).addClass('active');
             $allField = 0;         /* найдено не заполненое поле */
            }
           else
            {
             $(input).removeClass('input__red'); 
             $("#" + notFilledId).removeClass('active');
            }     
        });
    
        if ($allField === 1) /* если все поля заполены */
         {               
           formSend(event, button_value); 
         }
    });
    
    /* закрытие модального окна */
    const modalDialog = $('#modal_dialog');
    const modalSend = $("#modal_send");
    const modalClose = $("[data-close]");
    
    modalClose.on("click", function(event) {
        event.preventDefault();
    
        modalSend.removeClass('show');
        modalDialog.removeClass('show');
        $("body").removeClass('no-scroll');
    }); 
    
    /* закрытие модального окна по клику вне окна, т.е. по клику по маске */
    
    modalSend.on("click", function(event) {
        event.preventDefault();
        
        modalDialog.removeClass('show');
        modalSend.removeClass('show');
        $("body").removeClass('no-scroll');
    }); 
    
    /* чтобы модальное окно не закрывалось при нажатии на самомо модальном окне */
    
    modalDialog.on("click", function(event) {
        event.stopPropagation();
    }); 


    /* Отправка ЗАЯВКИ на бронирование */
    
    let loadImg = $('#load');
    let modal = $('.modal');
 
    async function formSend(e, button_val) {

        let form;
         let php_script;
  
        if (button_val === 'btn2')
        { 
            form = document.getElementById('form_reserve');
            php_script = 'php/mailreserve.php';
        }
        else
        {
            form = document.getElementById('form');
            php_script = 'php/mailskyx.php';
        }
 
        e.preventDefault();
        
        let formData = new FormData(form);
        
        $("body").addClass('no-scroll');
        $(modal).addClass('show');
        $(loadImg).addClass('show');
        
        const responce = await fetch(php_script, {method: 'POST', body: formData});
        
        $(loadImg).removeClass('show');
        
        if (responce.ok) {
        const result = await responce.text();
        
        if (result === '!OK!') // Здесь надо показать окно, что все ОК и спрятать гифку
        {
        $('.modal__title').html($('#modal_title_ok').html());
        $('.modal__text').html($('#modal_text_ok').html());
        form.reset();
        }
        else // Здесь показать окно с ошибкой самой почты
        {
        $('.modal__title').html($('#modal_title_error').html());
        $('.modal__text').html($('#modal_text_error').html() + result);
        }
        }
        else // Здесь надо показать окно с ошибкой сервера, и спрятать гифку
        {
            $('.modal__title').html($('#modal_title_error').html());
            $('.modal__text').html($('#modal_text_error').html() + responce.status + '<br>' + responce.statusText);
        }
        
        setTimeout(function(){$(modalDialog).addClass('show')}, 10);
        }

    });