$(document).ready(function(){

    // Metro Slider Starts
    var metroSlider = 0;
    $('.metro-slider .col').each(function(){
        metroSlider = metroSlider + 670;
    });
    $('.metro-slider').css('width',metroSlider+'px');

    $('.metro-wrapper').tinyscrollbar({
        axis: 'x',
        size: 'auto'
    });
    // Metro Slider Ends


});


$(window).load(function(){

    // OUR PARTNERS Carousel Starts
   
    // OUR PARTNERS Carousel Ends

    widthCalc();

    // Isotope Options & Controls
    var $container = $('.gallery');

    $container.isotope({
        // options
        itemSelector : '.columns',
        layoutMode : 'fitRows'
    });


    // filter items when filter link is clicked
  

});

$(window).resize(function(){

    widthCalc();

    // Metro Slider Responsiveness Fix Starts
    $('.metro-wrapper').tinyscrollbar({
        axis: 'x',
        size: 'auto'
    });
    // Metro Slider Responsiveness Fix Ends

});
function widthCalc(){
    $('.metro-misc').css('width', '100%').css('width','-=69px');
}



// Back to top Ends