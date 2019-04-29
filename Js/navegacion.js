$('.link').on('click', function(){

	var link = $(this).attr('href');

	switch(link){

		case "#home": 
			$('.carrito').css('display', 'none');
			$('.admin').css('display', 'none');
			$('.login').css('display', 'none');
			$('.home').css('display', 'block');
		break;

		case "#admin": 
			$('.carrito').css('display', 'none');
			$('.home').css('display', 'none');
			$('.login').css('display', 'none');
			$('.admin').css('display', 'block');
		break;

		case "#carrito": 
			$('.admin').css('display', 'none');
			$('.home').css('display', 'none');
			$('.login').css('display', 'none');
			$('.carrito').css('display', 'block');
		break;

	}

});