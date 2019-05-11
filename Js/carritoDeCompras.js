$(".refreshBtn").click(function(){
	location.reload();
});

/*
VER LA CESTA DEL CARRITO DE COMPRAS
*/
if(localStorage.getItem("cantidadCesta") != null){

	$(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
	$(".sumaCesta").html(Number(localStorage.getItem("sumaCesta")).toFixed(2));
	
} else {

	$(".cantidadCesta").html("0");
	$(".sumaCesta").html("0.00");

}

/*
VER LOS PRODUCTOS EN EL CARRITO DE COMPRAS
*/
if(localStorage.getItem("listaProductos") != null){

	var listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));

	listaCarrito.forEach(funcionForEach);

	function funcionForEach(item, index){

		$(".cuerpoCarrito").append(
			
			'<tr>' +
				'<td>' + (index+1) + '</td>' +
				'<td class="tituloCarritoCompra">' + item.nombre + '</td>' +
				'<td class="precioCarritoCompra">$<span>' + parseFloat(item.precio).toFixed(2) + '</span></td>' +
				'<td class="cantidadCarritoCompra">' +
					'<input type="number" class="cantidadItem browser-default" min="1" max="'+item.stock+'" value="'+item.cantidad+'" precio="'+item.precio+'" idProducto="'+ item.idProducto +'" validate>' +
				'</td>' +
				'<td class="subtotales'+item.idProducto+' subTotal">$<span>'+ parseFloat(item.precio).toFixed(2) + '</span></td>' +
				'<td><span><a href="#" class="quitarItemCarrito" idProducto="' + item.idProducto + '" stockProducto="'+ item.stock +'"><i class="material-icons red-text">cancel</i></a></span></td>' +
			'</tr>'
			
		);

	$(".hacerPedidoBtn").removeClass('disabled');

	}

} else {

	$(".cuerpoCarrito").parent().parent().html(
		
		'<h4 class="black-text center">No hay productos en el carrito.</h4>'+
		'<p class="grey-text center">Si agregaste productos dale al botón "<b>Actualizar</b>".</p>'
	);

}

/*
AGREGAR AL CARRITO
*/

$(".listProductos").on('click','.addProduct', function(){


	var idProducto = $(this).attr("codProducto");
	var cantidad = $(this).attr("cantProducto");
	var nombre = $(this).attr("nombreProducto");
	var model = $(this).attr("modelProducto");
	var precio = $(this).attr("precioProducto");
	var stock = $(this).attr("stockProducto");

	var agregarAlCarrito = true;

	/*ALMACENAR EN EL LOCAL STORAGE*/

	if(agregarAlCarrito){

		if (localStorage.getItem("listaProductos") == null) {

			listaCarrito = [];

		}else{

			listaCarrito.concat(localStorage.getItem("listaProductos"));

		}

		listaCarrito.push({
			"idProducto":idProducto,
			"cantidad":cantidad,
			"nombre":nombre + ' ' + model,
			"precio":precio,
			"stock":stock
		});

		localStorage.setItem("listaProductos",JSON.stringify(listaCarrito));

	/*
	ACTUALIZAR CESTA
	*/

	var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
	var sumaCesta = Number($(".sumaCesta").html()) + Number(precio);

	$(".cantidadCesta").html(cantidadCesta);
	$(".sumaCesta").html(sumaCesta);

	localStorage.setItem("cantidadCesta", cantidadCesta);
	localStorage.setItem("sumaCesta", sumaCesta);

	M.toast({html: 'Se a añadido ' + nombre + ' ' + model + ' al carrito!', classes: 'rounded'});

	}



});

/*
QUITAR ITEMS DEL CARRITO
*/


$(".cuerpoCarrito").on('click', '.quitarItemCarrito', function(){

	$(this).parent().parent().parent().remove();

	var idProducto = $('.cuerpoCarrito a');
	var nombre = $('.cuerpoCarrito .tituloCarritoCompra');
	var precio = $('.cuerpoCarrito .precioCarritoCompra span');
	var cantidad = $('.cuerpoCarrito .cantidadItem');

	listaCarrito = [];

	if(idProducto.length != 0){

		for(var i = 0; i < idProducto.length; i++){

			var idProductoArray = $(idProducto[i]).attr("idProducto");
			var stockProductoArray = $(idProducto[i]).attr("stockProducto");
			var nombreArray = $(nombre[i]).html();
			var precioArray = $(precio[i]).html();
			var cantidadArray = $(cantidad[i]).val();

			listaCarrito.push({
				"idProducto":idProductoArray,
				"cantidad":cantidadArray,
				"nombre":nombreArray,
				"precio":precioArray,
				"stock":stockProductoArray
			});

		}

		localStorage.setItem("listaProductos",JSON.stringify(listaCarrito));

		sumaSubtotales();
		cestaCarrito(listaCarrito.length);

	} else{

		/*
		SI YA NO QUEDAN PRODUCTOS HAY QUE REMOVER TODO
		*/

		localStorage.removeItem("listaProductos");

		localStorage.setItem("cantidadCesta", "0");

		localStorage.setItem("sumaCesta", "0");

		$(".cantidadCesta").html("0");
		$(".sumaCesta").html("0.00");
		$(".hacerPedidoBtn").addClass('disabled');

		$(".cuerpoCarrito").parent().parent().html(
		
			'<h4 class="black-text center">No hay productos en el carrito.</h4>'+
			'<p class="grey-text center">Si agregaste productos dale al botón "<b>Actualizar</b>".</p>'

		);

	}

});

/*
GENERAR SUBTOTAL DESPUES DE CAMBIAR CANTIDAD
*/

$('.cantidadItem').change(function(){

	var cantidad = $(this).val();
	var precio = $(this).attr("precio");
	var idProducto = $(this).attr("idProducto");

	$(".subtotales"+idProducto).html('$<span>'+parseFloat(precio*cantidad).toFixed(2)+'</span>');

	/*
	ACTUALIZAR CANTIDAD EN LOCALSTORAGE
	*/

	var idProducto = $('.cuerpoCarrito a');
	var nombre = $('.cuerpoCarrito .tituloCarritoCompra');
	var precio = $('.cuerpoCarrito .precioCarritoCompra span');
	var cantidad = $('.cuerpoCarrito .cantidadItem');

	listaCarrito = [];

	for(var i = 0; i < idProducto.length; i++){

		var idProductoArray = $(idProducto[i]).attr("idProducto");
		var nombreArray = $(nombre[i]).html();
		var precioArray = $(precio[i]).html();
		var cantidadArray = $(cantidad[i]).val();

		listaCarrito.push({
			"idProducto":idProductoArray,
			"cantidad":cantidadArray,
			"nombre":nombreArray,
			"precio":precioArray
		});

	}

	localStorage.setItem("listaProductos",JSON.stringify(listaCarrito));

	sumaSubtotales();

	cestaCarrito(listaCarrito.length);

});

/*
ACTUALIZAR SUBTOTALES
*/
var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");
var cantidadItem = $(".cuerpoCarrito .cantidadItem");

for(var i=0; i < precioCarritoCompra.length; i++){

	var precioCarritoCompraArray = $(precioCarritoCompra[i]).html();
	var cantidadItemArray = $(cantidadItem[i]).val();
	var idProductoArray = $(cantidadItem[i]).attr("idProducto");

	$(".subtotales"+idProductoArray).html('$<span>'+parseFloat(precioCarritoCompraArray*cantidadItemArray).toFixed(2)+'</span>');

	sumaSubtotales();
	cestaCarrito(precioCarritoCompra.length);

}

/*
SUMA DE TODOS LOS SUBTOTALES
*/

function sumaSubtotales(){

	var subtotales = $(".subTotal span");
	var arraySumaSubtotales = [];
	
	for (var i = 0; i < subtotales.length; i++){
		
		var subtotalesArray = $(subtotales[i]).html();
		
		arraySumaSubtotales.push(Number(subtotalesArray));

	}

	function sumaArraySubtotales(total, numero){

		return total + numero;

	}

	var sumaTotal = arraySumaSubtotales.reduce(sumaArraySubtotales);

	$(".sumaCesta").html(Number(sumaTotal).toFixed(2));

	localStorage.setItem("sumaCesta", Number(sumaTotal).toFixed(2));

}

/*
ACTUALIZAR CESTA AL CAMBIAR CANTIDAD
*/

function cestaCarrito(cantidadProductos){

	/*REVISA SI HAY PRODUCTOS EN EL CARRITO*/

	if(cantidadProductos != 0){

		var cantidadItem = $(".cantidadCarritoCompra .cantidadItem");

		var arraySumaCantidades = [];

		for (var i = 0; i < cantidadItem.length; i++){
		
			var cantidadItemArray = $(cantidadItem[i]).val();
			arraySumaCantidades.push(Number(cantidadItemArray));

		}

		function sumaArrayCantidades(total, numero){

			return total + numero;

		}

		var sumaTotalCantidades = arraySumaCantidades.reduce(sumaArrayCantidades);

		$(".cantidadCesta").html(sumaTotalCantidades);

		localStorage.setItem("cantidadCesta", sumaTotalCantidades);

	}

}









