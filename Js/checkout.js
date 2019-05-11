const ITBMS = 0.07;

$("#checkoutBtn").on('click', function(){

	var numeroPedido = "000001";
	var fechaPedido = getFecha();
	var idclientePedido = $( ".selectCliente option:selected" ).attr('id');
	var precioBrutoPedido = $(".sumaCheckout").html();
	var itbmsPedido = $(".sumaChechoutITBMS").html();
	var precioTotalPedido = $(".sumaTotalCheckout").html();
	var estadoPedido = 0;
	var nombreDueno = $("#checkoutNombreDueno").val();
	
	var nombreProductos = $('.cuerpoCarrito .tituloCarritoCompra');
	var precioProductos = $('.cuerpoCarrito .precioCarritoCompra span');
	var precioSubtotalProductos = $('.cuerpoCarrito .subTotal span');
	var cantidadProductos = $('.cuerpoCarrito .cantidadItem');

	if(nombreDueno == ""){
		
		$(".helper-text").remove();
		$(".selectCliente").after(
									'<span class="helper-text red-text">Debe seleccionar un cliente.</span>'
								);

		return false;

	}

	for (var i = 0; i < nombreProductos.length; i++) {
		
		var nombreProductosArray = $(nombreProductos[i]).html();
		var precioProductosArray = $(precioProductos[i]).html();
		var precioSubtotalProductosArray = $(precioSubtotalProductos[i]).html();
		var cantidadProductosArray = $(cantidadProductos[i]).val();

		console.log(
				nombreProductosArray + " " + 
				precioProductosArray + " " + 
				cantidadProductosArray + " " + 
				precioSubtotalProductosArray
				);

	}

	console.log(
				"# Pedido: " + numeroPedido + "\n",
				"Fecha " + fechaPedido + "\n",
				"Cliente: " + idclientePedido + "\n",
				"Precio Bruto: " + precioBrutoPedido + "\n",
				"ITBMS: " + itbmsPedido + "\n",
				"precioTotalPedido: " + precioTotalPedido + "\n",
				"Estado: " + estadoPedido + "\n",
				);

});

function getFecha(){

	var d = new Date();
	var dia = d.getDate();
	var mes = d.getMonth();
	var year = d.getFullYear();

	return dia + "-" + (mes+1) + "-" + year;

}

$("#checkboxCobrarITMBS").click(function(){

	var check = $(this).prop('checked');

	var sumaCesta = Number($(".sumaCesta").html());

	var checkoutITBMS = sumaCesta * ITBMS;

	if(check){

		$(".sumaChechoutITBMS").html(checkoutITBMS.toFixed(2));
		$(".sumaTotalCheckout").html((checkoutITBMS + sumaCesta).toFixed(2));

	}else{

		$(".sumaChechoutITBMS").html("0.00");
		$(".sumaTotalCheckout").html(sumaCesta.toFixed(2));

	}

});

$(".hacerPedidoBtn").click(function(){

	var sumaCesta = Number($(".sumaCesta").html());

	var checkoutITBMS = sumaCesta * ITBMS;

	$(".sumaCheckout").html(sumaCesta.toFixed(2));

	$(".sumaChechoutITBMS").html(checkoutITBMS.toFixed(2));

	$(".sumaTotalCheckout").html((checkoutITBMS + sumaCesta).toFixed(2));

});


