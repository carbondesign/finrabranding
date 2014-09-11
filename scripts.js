var j191 = jQuery.noConflict();

;(function (j191) {
    'use strict';
    j191(document).ready(function(){

            //I want to menu click action
            j191(document).on('click touchstart',  '.dropdown-toggle', function(){
                    j191('ul.dropdown-menu', this).toggle();
                    j191(this).parent().toggleClass('open');
            });

            j191(document).on('mouseenter touchstart','.dropdown-menu li',function(){
                if(!j191('body').hasClass('active'))
                    j191('ul.dropdown-menu', this).show();
            });

            //I want to menu mouseout action
            j191(document).on('mouseleave touchend', '.dropdown-toggle li', function(){
                   if(!j191('body').hasClass('active')){
                       j191('ul.dropdown-menu', this).hide();
                       j191(this).closest('div').removeClass('open');
                   }
            });

            //Click action to open menu on the offcanvas navigation
            j191(document).on('click touchstart', '.expanded span', function(event){
                    event.preventDefault();
                    if(j191('body').hasClass('active')){
                        j191(this).closest('li').toggleClass('open');
                    }
            });

            //click action on the pagealert close icon
            j191(document).on('click touchstart','.close', function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    j191(this).parent().parent().slideUp();
            });

            // Toggle for sidebar
            j191(document).on('click touchstart', '.navbar-toggle', function(event) {
                    event.preventDefault();
                    showSidebar();
            });

            var showSidebar = function() {
                    j191('body').toggleClass("active");
            };

            // add/remove classes every time the window resize event fires
            j191(window).resize(function(){
                var off_canvas_nav_display = j191('.navbar-offcanvas').css('display');

                if (off_canvas_nav_display === 'block') {
                    j191("body").removeClass("active");
                }


                j191('.main_menu_outer_ul').find('li').each(function(){
                    if(j191(this).hasClass('open')){
                        j191(this).removeClass('open');
                    }
                });

                j191('ul.dropdown-menu').hide();

                j191('.iwantto').find('.btn-group').each(function(){
                    if(j191(this).hasClass('open')){
                        j191(this).removeClass('open');
                    }
                });

            });

            function isTouchSupported() {
                var msTouchEnabled = window.navigator.msMaxTouchPoints;
                var generalTouchEnabled = "ontouchstart" in document.createElement("div");

                if (msTouchEnabled || generalTouchEnabled) {
                    return true;
                }
                return false;
            }

    });
    
})(jQuery);

;(function (j191) {
    'use strict';
    var timer2, delay = 5000;

    j191(document).ready(function(){

            //Adds open-dropdown class to main navigation li elements

            j191(document).on({
                mouseenter: function () {
                    //stuff to do on mouse enter
                    j191(this).find('.main_menu_inner_ul')
                        .addClass('open-dropdown')
                        .parent('li').addClass('activeAnchor');
                },
                mouseleave: function () {
                    //stuff to do on mouse leave
                    if(!j191(this).parent().hasClass('all-wide-open')){
                        j191(this).find('.main_menu_inner_ul')
                            .removeClass('open-dropdown');
                    }

                    j191(this).find('.main_menu_inner_ul')
                        .closest('li').removeClass('activeAnchor');
                }
            }, ".main_menu_outer_ul li");


            function thisHeight(){
                var tallest = 0;
                j191(this).find('li').each(function(){
                    var $this = j191(this);
                    tallest += $this.height();
                });
                return tallest;
            }

            //Adds all-wide-open class to main ul when user hovers around the main menu for 5 seconds
            j191(document).on({
                mouseenter: function () {
                    // on mouse in, start a timeout
                    var self = j191(this);
                    var maxHeight = new Array(), maxULHeight;

                    j191(".main_menu_inner_ul").each(function() {
                        var $this = j191(this);
                        var thisULMax = Math.max.apply(Math, $this.map(thisHeight));
                        maxHeight.push(thisULMax);
                    });

                    var maxULHeight = Math.max.apply(Math,maxHeight);

                    timer2 = setTimeout(function() {
                        if(!j191('body').hasClass('active')){
                            self.addClass('all-wide-open');
                            self.find('li').each(function(){
                                j191(this).find('.main_menu_inner_ul').addClass('open-dropdown')
                                    .css('opacity', 0)
                                    .stop()
                                    .height(maxULHeight)
                                    .animate({opacity: 1}, 900);
                            });
                        }
                    }, delay);
                },
                mouseleave: function () {
                    // on mouse out, cancel the timer
                    var self = j191(this);
                    self.removeClass('all-wide-open');
                    j191(".main_menu_inner_ul").css('height', 'auto');
                    self.find('li').each(function(){
                        j191(this).find('.main_menu_inner_ul').removeClass('open-dropdown').closest('li').removeClass('activeAnchor');

                    });

                    clearTimeout(timer2);
                }
            }, ".main_menu_outer_ul");


    });
    
})(jQuery);

