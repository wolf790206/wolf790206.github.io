// window fade in
$(document).ready(function(){
    console.log("ok")
$("body").css("display","none")
$("body").fadeIn(1000)
// setTimeout(function(){$('.masthead h1').css('transform', 'translate(50px,100px)');},2000)
// $(".masthead h1").animate({ "left": "0px" }, slow);
$(".masthead h1").css({"left":"2000px"}).animate({"left":"0px"}, 1500);
$(".masthead .slogan").css({"left":"2000px"}).animate({"left":"0px"}, 2500);
$(".masthead .btn").css({"left":"2000px"}).animate({"left":"0px"}, 3500);


$(window).scroll(function(){
    const scrolledPx = $(this).scrollTop();
    console.log(scrolledPx)
    if(scrolledPx>= 200){
        $(".navbar-shrink").css("opacity","0.5");
    }else{
        $(".navbar-shrink").css("opacity","1");
    }
    if(scrolledPx>= 640){
        $("section.about").addClass("active")
    }else{
        $("section.about").removeClass("active")
    }
})

// backToTop button & print
$(document).scroll(function(){
    $(".backToTop").css("z-index","999")
    if ($(document).scrollTop()>300) {
        $('.backToTop').fadeIn();
        // console.log($(this).scrollTop())
        // $(".masthead h1").css('transform', 'translateY(1000%)');
        // $(".masthead h1").animate({width:'+=1000%',})
    } else {
        $('.backToTop').fadeOut();
    }
})

$(".backToTop").click(function() {
    $("html, body").animate({scrollTop: 0}, 700);
    $('backToTop').fadeOut()
    });


// change cursor
$('html, body').css('cursor','crosshair')


// print mouse path
$("html, body").mousemove(function(e){
    var parentOffset = $(this).parent().offset(); 
    //or $(this).offset(); if you really just want the current element's offset
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    console.log(relX)
    console.log(relY)
 });

// show Bonus information
// $("#readMore").on('click',function(event){
//     event.preventDefault();
    // console.log("read")
    // var readMoreText = () =>
    // console.log("more")
    // $(".contact p").css('max-height','200px')
    // $(".contact a ").css('display','none')

    // readMoreText()
// })

// toggle Bonus infomation
$("#readMore").on('click',function(e){
    e.preventDefault();
    // console.log("more")
    $(".contact p").toggleClass("active")
})

$(".services").on('mouseover',function(){
    console.log("over")
    $(this).css('transform','translate')
})




})

function showAlert(e){
    console.log("show")
    e.preventDefault();
    $("#myAlert").addClass("in")
    console.log("end")
  }