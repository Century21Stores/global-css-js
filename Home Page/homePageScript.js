// W47B Last day 12/20 for Next-Day Shipping!* - JuanMa 12.07.17

$(document).ready(function(){
    $('.jm-HomePage5 .jm-cloneIt, .jmrv-hp3 .jm-cloneIt').each(function(){
     var new_data = $(this).find('*').filter('.jm-toClone').clone();
//   var new_data= $('a', this).clone();
console.log(new_data);
       	new_data.attr("id", "jm_img_anchor");
       	new_data.removeAttr("class");
    	new_data.appendTo(this);
    });
});



// SPECIAL HEADER 1
$('.branded-card-header').after(
	'<section class="jm-home-page-header">'+
	'<p class="jm-mobile-HPheader-l1">Ship gifts in time for Christmas</p>'+
	'<h3><b>Last day 12/20</b> for <b>Next-Day Shipping!<span class="jm-asterisk">*</span></b></h3>'+
	'<p class="content-block-content__action content-block-content__action--dark-text"><a class="text jm-mobile-HPheader-cta" href="https://www.c21stores.com/pages/shipping-information">LEARN MORE</a></p>'+
  '<p class="jm-desktop jm-HPH-fine-print"><span class="jm-asterisk">*</span>Dates vary by location.</span></p>'+
  '</section>'
);


// VIDEO TO PLAY ON SCROLL

// API
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Holding All video players here
var players = {};
var playerCount = 0;

var iframes = $('.jm_video_OnScroll');

jQuery(document).ready(function($) {
    onYouTubeIframeAPIReady = function() {
        iframes.each(function( index ) {
            players[index] = new YT.Player( this, {
              events: {
                  'onReady': onPlayerReady
                }
            });
        });

    }
    function onPlayerReady(event) {
      playerCount++;
        if(playerCount == iframes.size()){
            assignWaypoints();
        }
    }
    function assignWaypoints() {
        iframes.each(function( index ) {
           $(this).waypoint(function(direction) {
                if(direction=="up"){
                    players[index].playVideo();
                } else {
                    players[index].stopVideo();
                }
            }, { offset: '-75%' });
            $(this).waypoint(function(direction) {
                if(direction=="up"){
                    players[index].stopVideo();;
                } else {
                    players[index].playVideo();
                }
            }, { offset: '75%' });

        });
    }
});
