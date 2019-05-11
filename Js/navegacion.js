$('.link').on('click', function(){

	var link = $(this).attr('href');

	switch(link){

		case "#home": 
			$('.carrito').css('display', 'none');
			$('.categorias').css('display', 'none');
			$('.admin').css('display', 'none');
			$('.login').css('display', 'none');
			$('.home').css('display', 'block');
			getProductMasVendidos();
		break;

		case "#admin": 
			$('.carrito').css('display', 'none');
			$('.categorias').css('display', 'none');
			$('.home').css('display', 'none');
			$('.login').css('display', 'none');
			$('.admin').css('display', 'block');
			loadUltimosPedidos();
		break;

		case "#carrito": 
			$('.admin').css('display', 'none');
			$('.categorias').css('display', 'none');
			$('.home').css('display', 'none');
			$('.login').css('display', 'none');
			$('.carrito').css('display', 'block');
		break;

	}

});

$('.categList').on('click', '.link', function(){

	var link = $(this).attr('href');
	var nombCateg = $(this).attr('nombCateg');

	if(link == "#categorias"){
		
		$('.carrito').css('display', 'none');
		$('.admin').css('display', 'none');
		$('.login').css('display', 'none');
		$('.home').css('display', 'none');
		$('.categorias').css('display', 'block');

		$('.categTitle').empty();
		$('.categTitle').append('<b>'+nombCateg+'</b>');

		getProductCateg(nombCateg);
	}

});