const ITBMS = 0.07;

var refPedidos = database.ref('pedidos');

$("#checkoutBtn").on('click', function(){

	var fechaPedido = getFecha();
	var idclientePedido = $( ".selectCliente option:selected" ).attr('id');
	var nombreClientePedido = $( ".selectCliente option:selected" ).val();
	var precioBrutoPedido = $(".sumaCheckout").html();
	var itbmsPedido = $(".sumaChechoutITBMS").html();
	var precioTotalPedido = $(".sumaTotalCheckout").html();
	var estadoPedido = 0;
	var nombreDueno = $("#checkoutNombreDueno").val();
	
	var codeProducto = $('.cuerpoCarrito a');
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

	refPedidos.once('value', function(snap){

		var newNumPedido = (snap.numChildren() + 1);

		var newPedidoKey = refPedidos.push().key;

		database.ref('pedidos/'+ newPedidoKey).set({

			NumPedido: newNumPedido,
			Cliente: nombreClientePedido,
			Fecha: fechaPedido,
			IdCliente: idclientePedido,
			PrecioBruto: precioBrutoPedido,
			ITBMS: itbmsPedido,
			PrecioTot: precioTotalPedido,
			Estado: estadoPedido

		}, function(error) {
	    
		    if (error) {
		      
			    swal({
			        title: "Pedido no enviado!",
			        text: "El pedido #" + newNumPedido + " no se ha guardado!",
			        icon: "error",
			        button: "Reintentar!",
			    });

		    } else {

		    	for (var i = 0; i < nombreProductos.length; i++) {
			
					var codeProductosArray = $(codeProducto[i]).attr('idProducto');
					var nombreProductosArray = $(nombreProductos[i]).html();
					var precioProductosArray = $(precioProductos[i]).html();
					var precioSubtotalProductosArray = $(precioSubtotalProductos[i]).html();
					var cantidadProductosArray = $(cantidadProductos[i]).val();

					database.ref('pedidos/'+ newPedidoKey +'/productos/').push({

						Codigo: codeProductosArray,
						Nombre: nombreProductosArray,
						Precio: Number(precioProductosArray),
						Cantidad: cantidadProductosArray,
						PrecioSubTot: Number(precioSubtotalProductosArray)

					});

				}

			    swal({
			        title: "Pedido Guardado!",
			        text: "El pedido # " + newNumPedido + " se ha guardado con exito!",
			        icon: "success",
			        button: "Ok!",
			    })
			    .then((value) => {
					
					if(value || value == null){

						//limpia la cesta
						localStorage.removeItem("listaProductos");
					    localStorage.removeItem("cantidadCesta");
					    localStorage.removeItem("sumaCesta");
					    //recarga la pagina
					    location.reload();

					}

				});;

		    }

		});

	});

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


