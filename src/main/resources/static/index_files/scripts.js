(function($) {

    $(document).ready(function(){

    if($("#form-ajax").is('*')) {
        $('#form-ajax')[0].reset();
    }
    
    $("html").niceScroll({styler:"fb",cursorcolor:"#000"});
    
    $('a[href*="http://"]:not([href*="http://www.elektronikasales.com/"])').attr('rel', 'nofollow');
    $('a[href*="https://"]:not([href*="http://www.elektronikasales.com/"])').attr('rel', 'nofollow');
    // $('a[href*="/"]:not([href*="http://www.elektronikasales.com/"])').attr('rel', 'nofollow');
    
    
   /*****Back to Top for Global*****/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#backtop').css("opacity",1);
        } else {
            $('#backtop').css("opacity",0);
        }
    });


    $('#backtop').click(function () {
        $('body,html').animate({
            scrollTop: 0
            }, 800);
            return false;
        });

        
    /*****Slider for Homepage*****/
    $('#da-slider').cslider({
        autoplay    : true,
        bgincrement : 200
    });


    /*****Auto Height for linecard & Contactus*****/
    $(".manufactures").eqHeight(".cat-manufacture");
    $(".contact-form-left").eqHeight(".off-contact");
    
    
    
    /*****Menu for Global*****/
    $('header nav').meanmenu();


    /*****Tab for Solutions*****/
   // $('#verticalTab').easyResponsiveTabs({
   //     type: 'vertical',
   //     width: 'auto',
   ///     fit: true
   // });


    /*****Margin for Global*****/
    $(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 50) {
        $("#header").addClass("smaller")
        $(".mean-bar").addClass("smaller-header")
        $(".margin100").addClass("margin60")
    } else {
        $("#header").removeClass("smaller")
        $(".mean-bar").removeClass("smaller-header")
        $(".margin100").removeClass("margin60")
    }
    });

        var userAgent = navigator.userAgent.toLowerCase(); 
     if (userAgent .indexOf('safari')!=-1){ 
       if(userAgent .indexOf('chrome')  > -1){
        $(".process").addClass("chrome");
       }
       else{
        $(".process").addClass("safari");
       }
      }



    $('#datetimepicker_mask1').datetimepicker({
          timepicker:false,
          format: 'd/m/Y',
          minDate:0,
      });
      
        $('#datetimepicker_mask2').datetimepicker({
          timepicker:false,
          format: 'd/m/Y',
          minDate:0,
      });


 $('.count').eq(0).each(anim);

function anim() {
  $(this).prop('Counter', 0).animate({
    Counter: $(this).text()
  }, {
    duration: 2000,
    easing: 'swing',
    step: function(now) {
      $(this).text(Math.ceil(now));
    },
    complete: function() {
      if($(this).parent().next().prop("tagName") == "LI"){
        $(this).parent().next().find(".count").each(anim);
      }
      else{
        $('.count').eq(0).each(anim);
      }
    }
  });
}
    
    $('#add-row').on('click', function(e){
    e.preventDefault();
    var tableBody = $('.table > tbody'), 
      lastRowClone = $('tr:last-child', tableBody).clone();
    $('input[type=text]', lastRowClone).val('');  
    tableBody.append(lastRowClone);
	});
	
	$('.table').on('click', '.remove-row', function(e){
	  e.preventDefault();
	  var row = $(this).parent().parent();
	  row.remove();
	})

    /*****Hexa append*****/
    var $windowSize = $('.six-hexa li');

    function navResize(){
      
      var winW = window.innerWidth;
      var appended = false;
      if(winW < 768 && !appended ){
        appended = true;
        $windowSize.appendTo('.seven-hexa ul');
        $('.hexa').addClass('common-hexa');
      }else{
        appended = false;
        $windowSize.appendTo('.six-hexa ul');
        $('.hexa').removeClass('common-hexa');
      } 
    }


    jQuery("#upName").validate({
        expression: "if (VAL.match(/^[a-zA-Z ]*$/) && VAL) return true; else return false;",
        message: "Please Enter a Name"
    });
    jQuery("#upload").validate({
        expression: "if (VAL.match(/\.(xls[mx]?)$/) && VAL) return true; else return false;",
        message: "Please upload valid excel file"
    });
    jQuery("#cusName").validate({
        expression: "if (VAL.match(/^[a-zA-Z ]*$/) && VAL) return true; else return false;",
        message: "Please Enter Customer Name"
    });
    jQuery("#proName").validate({
        expression: "if (VAL.match(/^([a-zA-Z0-9 _-]+)$/) && VAL) return true; else return false;",
        message: "Please Enter Project Title"
    });
    jQuery("#endApp").validate({
        expression: "if (VAL.match(/^([a-zA-Z0-9 _-]+)$/) && VAL) return true; else return false;",
        message: "Please Enter a End Application"
    });
    jQuery("#datetimepicker_mask1").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Please Select Start date"
    });
    jQuery("#datetimepicker_mask2").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Please Select Pilot start date"
    });
    jQuery("#contactName").validate({
        expression: "if (VAL.match(/^[a-zA-Z ]*$/) && VAL) return true; else return false;",
        message: "Please Enter a Name"
    });
    jQuery("#contactEmail").validate({
        expression: "if (VAL.match(/^[^\\W][a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9\\_\\-\\.]+)*\\@[a-zA-Z0-9_]+(\\.[a-zA-Z0-9_]+)*\\.[a-zA-Z]{2,4}$/)) return true; else return false;",
        message: "Please Enter a Valid Email id"
    });
jQuery("#contactMobile").validate({
        expression: "if (VAL.match(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/) && VAL) return true; else return false;",
        message: "Please Enter a Valid Mobile no"
 });
    jQuery("#contactMessage").validate({
        expression: "if (VAL) return true; else return false;",
        message: "Please write your message"
    });
    jQuery("#subname").validate({
        expression: "if (VAL.match(/^[a-zA-Z ]*$/) && VAL) return true; else return false;",
        message: "Please Enter a Name"
    });
    jQuery("#subcomanyname").validate({
        expression: "if (VAL.match(/^[a-zA-Z ]*$/) && VAL) return true; else return false;",
        message: "Please Enter Company Name"
    });
	jQuery("#subemail").validate({
        expression: "if (VAL.match(/^[^\\W][a-zA-Z0-9\\_\\-\\.]+([a-zA-Z0-9\\_\\-\\.]+)*\\@[a-zA-Z0-9_]+(\\.[a-zA-Z0-9_]+)*\\.[a-zA-Z]{2,4}$/)) return true; else return false;",
        message: "Please Enter a Valid Email id"
    });
	jQuery("#subphone").validate({
        expression: "if (VAL.match(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/) && VAL) return true; else return false;",
        message: "Please Enter a Valid Mobile no"
    });
    
    navResize();

    $(window).resize(function(){
      navResize();
    });
    

    
    
    $('.sol').owlCarousel({
    loop:true,
    margin:18,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        400:{
            items:2,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:4,
            nav:true,
            loop:false
        }
    }
    });
    
    $(".newsfeed").owlCarousel({
        items:1,
        loop:true,
        animateOut: 'bounceOutRight',
        animateIn: 'bounceInDown',
        smartSpeed:1000,
        nav:false,
        autoplay:true,
        autoplayTimeout:2500,
        autoplayHoverPause:true,
    });

    /*****Client Carousel for Homepage*****/
    $('.owl-carousel1').owlCarousel({
        items:5,
        loop:true,
        margin:10,
        nav:true,
        autoplay:true,
        autoplayTimeout:500,
        autoplayHoverPause:true,
        responsiveClass:true,
    responsive:{
        0:{
            items:2,
            nav:true
        },
        400:{
            items:2,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
    });
    $('.play').on('click',function(){
        owl.trigger('autoplay.play.owl',[1000])
    });
    $('.stop').on('click',function(){
        owl.trigger('autoplay.stop.owl')
    });

    // $('.gallery').fancybox();



    

});
})(jQuery);


//      $(document).ready(function() {
//         $('.pops').hide();
//     if(localStorage.getItem('popState') != 'shown'){
//     	 $('.pops').click();
//         $("#popup").delay(1000).fadeIn();
//         localStorage.setItem('popState','shown')
//     }

//     $('#popup-close').click(function(e) // You are clicking the close button
//     {
//     $('#popup').fadeOut(); // Now the pop up is hiden.
//     });
//     $('#popup').click(function(e) 
//     {
//     $('#popup').fadeOut(); 
//     });
// });

