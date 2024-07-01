/*=========================================

Template Name: Alo - Personal Portfolio Template
Author: ThemeFusionBD
Version: 1.0
Design and Developed by: ThemeFusionBD

NOTE: This is the custom jQuery file for the template

=========================================*/

var scripts = document.getElementsByTagName('script');
var myScript = scripts[scripts.length - 1];

var queryString = myScript.src.replace(/^[^\?]+\??/, '');

var params = parseQuery(queryString);

function parseQuery(query) {
    var Params = {};
    if (!query) return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) continue;
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}

function showPubs(id) {
  if (id == 0) {
    document.getElementById('pubs').innerHTML = document.getElementById('pubs_selected').innerHTML;
    document.getElementById('select0').style = 'text-decoration:underline;color:#000000';
    document.getElementById('select1').style = '';
    document.getElementById('select2').style = '';
  } else if (id == 1) {
    document.getElementById('pubs').innerHTML = document.getElementById('pubs_by_date').innerHTML;
    document.getElementById('select1').style = 'text-decoration:underline;color:#000000';
    document.getElementById('select0').style = '';
    document.getElementById('select2').style = '';
  } else {
    document.getElementById('pubs').innerHTML = document.getElementById('pubs_by_topic').innerHTML;
    document.getElementById('select2').style = 'text-decoration:underline;color:#000000';
    document.getElementById('select0').style = '';
    document.getElementById('select1').style = '';
  }
}


(function ($) {
	"use strict";
    
    var $window = $(window),
            $body = $('body');
    
    
        
    
    /*=======================================
            DEMO PANLE JS
    =======================================*/
        $("span.red_color").on("click", function(){
            $("body").addClass("red_color_theme").removeClass("green_color_theme yellow_color_theme blue_color_theme pink_color_theme purple_color_theme");
        });
        $("span.green_color").on("click", function(){
            $("body").addClass("green_color_theme").removeClass("red_color_theme yellow_color_theme blue_color_theme pink_color_theme purple_color_theme");
        });
    $("span.yellow_color").on("click", function(){
            $("body").addClass("yellow_color_theme").removeClass("green_color_theme red_color_theme blue_color_theme pink_color_theme purple_color_theme");
        });
    $("span.blue_color").on("click", function(){
            $("body").addClass("blue_color_theme").removeClass("yellow_color_theme green_color_theme red_color_theme pink_color_theme purple_color_theme");
        });
    $("span.pink_color").on("click", function(){
            $("body").addClass("pink_color_theme").removeClass("green_color_theme red_color_theme yellow_color_theme purple_color_theme blue_color_theme");
        });
    $("span.purple_color").on("click", function(){
            $("body").addClass("purple_color_theme").removeClass("green_color_theme red_color_theme yellow_color_theme blue_color_theme pink_color_theme");
        });
    
    	$(".spiner_button").on("click", function(event){
            event.preventDefault();
            if ( $(this).hasClass("slide_in_out") ) {
            $(".demo_panel_box").stop().animate({left:"-180px"}, 500);
            } else {
            $(".demo_panel_box").stop().animate({left:"0px"}, 500);
            }
            $(this).toggleClass("slide_in_out");
            return false;
        });

    
    
    
    
    
    /*=============================
                Sticky header
        ==============================*/
        $('.navbar-collapse a').on('click',function(){
          $(".navbar-collapse").collapse('hide');
        });

        $window.on('scroll', function() {
          if ($(".navbar").offset().top > 100) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
              } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
              }
        });
    
     /*=============================
                Smoothscroll js
        ==============================*/
        $(function() {
          $('.custom-navbar a, a.scroll-btn').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1000);
            event.preventDefault();
          });
        });  
            
        
        
        
    /*======================================
        jquery scroll spy
    ========================================*/
        $body.scrollspy({
        
            target : ".navbar-collapse",
            offset : 95
        
        });
        
        
     /*=================================
            Bootstrap menu fix
     ==================================*/
        $(".navbar-toggle").on("click", function(){
        
            $body.addClass("mobile-menu-activated");
        
        });
        
        $("ul.nav.navbar-nav li a").on("click", function(){
        
            $(".navbar-collapse").removeClass("in");
        
        });
        
        
        /*====================================================
            background-image flickering solution for mobile
            =======================================================*/
             var bg = jQuery("#intro-bg");
            function resizeBackground() {
                bg.height(jQuery(window).height() + 60);
          }
          resizeBackground();
        
    
    
    
        
         /*=============================
                Parallax
        ==============================*/
        $window.stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });
        
       
      
    /*=============================
            WOW js
    ==============================*/
        new WOW({ mobile: false }).init();
        
        
    
    
    
    /*=============================
            Contact Form
    ==============================*/
     $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            //formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
     });


    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#msg_subject").val();
        var message = $("#message").val();


        $.ajax({
            type: "POST",
            url: "php/form-process.php",
            data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
            success : function(text){
                if (text === "success"){
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false,text);
                }
            }
        });
    }

    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!");
    }

    function formError(){
        $("#contactForm").removeClass().addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    
    
    $window.load(function(){
          /*=============================
                Preloder
        ==============================*/
         $('.spinner').fadeOut(); 
        $('.preloader').delay(350).fadeOut(500);
        $body.delay(350).css({'overflow':'visible'});
            
        });


    

})(jQuery);
