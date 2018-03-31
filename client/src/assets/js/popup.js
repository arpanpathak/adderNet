$(function(){
	$(document).click(function(e){
		var target=$(e.target);
	   if(!target.is(".popup") && !target.parents().is(".popup") && !target.is(".popup-trigger"))
	   {
	   	$('.popup').fadeOut();
	   	$('.popup').parent().hide();
	   }
	});
	$('.popup-trigger').on('click',function(){
		var data_show=$(this).attr('data-show');
		if(typeof data_show!= typeof undefined)
		{
			$(data_show).parent().show();
			$(data_show).show('glide');
		}
	});
	$('.close-btn').on('click',function(){
		$(this).parent().parent().fadeOut('slow');
		$(this).parent().parent().parent().hide();
	});
	$(".select").each(function (i) { $(this).attr('tabindex', 0); });
	$(".drop-btn").on('click',function(){
		$(this).find('.dropdown-content').toggle();
	});
	$(".select").on('click',function(){
		$(this).find('.options').slideToggle('slow');

	});
	$(".option").on('click',function(){
		var value=$(this).attr('value');
		$(this).parent().parent().attr('value',value);
		$(this).parent().parent().find('.selected').html($(this).html());
	});
	$(".select").on('blur',function(){
		$(this).find('.options').hide();
	});
	$('.collapse-btn').on('click',function(){
		$(this).parent().find('ul').slideToggle();
		if ($(this).is(':visible'))
        	$(this).parent().find('ul').css('display','inline-block');
	});
	$(window).resize(function(){
    	if($(window).width()>800)
    		$('.nav').each(function(i){
    			$(this).find('ul').css('display','inline-block');
    		});
    	else
    		$('.nav').each(function(i){
    			$(this).find('ul').css('display','none');
    		});
	});
	$(".friends-title-bar").click(function(){
		$(this).parent().toggleClass('shrinked');
		// $(this).parent().find('.friends').slideToggle();
	});
	$(".ip").on('focus',function(){
		$(this).parent().find('.icon-container').addClass('focused');
	});
	$(".ip").on('blur',function(){
		$(this).parent().find('.icon-container').removeClass('focused');
	});
	$(".select").on('focus',function(){
		$(this).parent().find('.icon-container').addClass('focused');
	});
	$(".select").on('blur',function(){
		$(this).parent().find('.icon-container').removeClass('focused');
	});
});
