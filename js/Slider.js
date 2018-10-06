// JavaScript Document

$(window).scroll(function() {
  var height = $(window).scrollTop();              // Текущая позиция  скрола
  $(".text").css("opacity", (150 - height) / 100);
  $(".text2").css("opacity", (150 - height) / 100);// Так как нужно указывать прозрачность вроде .50 и т.д., то делим на 100
});

$(document).ready(function () { // слайдер фотографий

var timeList = 700;
var TimeView = 5000;
var RadioBut = true;

var slideNum = 1;
var slideTime;
slideCount = $("#slider .slide").length;

var animSlide = function(arrow){
    clearTimeout(slideTime); 

    if(arrow == "next"){
	  if(slideNum == slideCount) { slideNum=1; }
	  else{slideNum++}
       translateWidth = -$('#active-slide').width() * (slideNum - 1);
       $('#slider').css({'transform': 'translate(' + translateWidth + 'px, 0)'});
    }
    else if(arrow == "prew")
    {	
       if(slideNum == 1) { slideNum=slideCount; }
	  else{slideNum-=1}
	  translateWidth = -$('#active-slide').width() * (slideNum - 1); 
       $('#slider').css({'transform': 'translate(' + translateWidth + 'px, 0)'});
    }else{
       slideNum = arrow;
	  translateWidth = -$('#active-slide').width() * (slideNum -1);
       $('#slider').css({'transform': 'translate(' + translateWidth + 'px, 0)'});
    }

    $(".ctrl-select.active").removeClass("active");
    $('.ctrl-select').eq(slideNum - 1).addClass('active');
}

    if(RadioBut){
    var $linkArrow = $('<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>')
        .prependTo('#active-slide');
        $('#nextbutton').click(function(){
           animSlide("next");
           return false;
           })
        $('#prewbutton').click(function(){
           animSlide("prew");
           return false;
           })
    }
        var adderSpan = '';
        $('.slide').each(function(index) {
               adderSpan += '<span class = "ctrl-select">' + index + '</span>';
           });
        $('<div class ="Radio-But">' + adderSpan +'</div>').appendTo('#slider-wrap');
        $(".ctrl-select:first").addClass("active");
        $('.ctrl-select').click(function(){
        var goToNum = parseFloat($(this).text());
        animSlide(goToNum + 1);
        });
        var pause = false;
        var rotator = function(){
               if(!pause){slideTime = setTimeout(function(){animSlide('next')}, TimeView);}
               }
        $('#slider-wrap').hover(
           function(){clearTimeout(slideTime); pause = true;},
           function(){pause = false; rotator();
           });
        
    var clicking = false;
    var prevX;
    $('.slide').mousedown(function(e){
        clicking = true;
        prevX = e.clientX;
    });

    $('.slide').mouseup(function() {
     clicking = false;
    });

    $(document).mouseup(function(){
        clicking = false;
    });

    $('.slide').mousemove(function(e){
        if(clicking == true)
         {
             if(e.clientX < prevX) { animSlide("next"); clearTimeout(slideTime); }
             if(e.clientX > prevX) { animSlide("prew"); clearTimeout(slideTime); }
           clicking = false;
        }
    });
    $('.slide').hover().css('cursor', 'pointer');
    rotator();  

});



$(document).ready(function($){
	var mainHeader = $('.first'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});
	
 function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}
	

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}
});