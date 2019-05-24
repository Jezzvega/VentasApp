var pedidosRef = database.ref('pedidos');

pedidosRef.orderByKey().limitToLast(5).on('value', function(snapshot){

		$(".pedidosRecientes").empty();

		snapshot.forEach(function(childSnap){

			var data = childSnap.val();

			database.ref('clientes/'+data.Cliente).once('value', function(snap){

				var negocio = snap.val().NombreNegocio;

				$(".pedidosRecientes").append(
											'<tr>' +
									            '<td>'+ data.NumPedido +'</td>' +
									            '<td>'+ negocio +'</td>' +
									            '<td>'+ data.Fecha +'</td>' +
									            '<td>' + (
									            	data.Estado == 0 ?
														'<span class="new badge red" data-badge-caption="Por Procesar"></span>'
													:
														'<span class="new badge green" data-badge-caption="Enviado"></span>'
													) +
									            '</td>' +
									            '<td>$<span>'+ Number(data.PrecioTot).toFixed(2) +'<span></td>' +
									        '</tr>'
										);

			});
			
			

		});

});

/*###################################################
LOAD TODOS LOS PEDIDOS
####################################################*/

pedidosRef.orderByChild('NumPedido').on('value', function(snapshot){

		$(".pedidosTotales").empty();

		snapshot.forEach(function(childSnap){

			var data = childSnap.val();

			database.ref('clientes/'+data.Cliente).once('value', function(snap){

				var negocio = snap.val().NombreNegocio;

				$(".pedidosTotales").append(
											'<tr>' +
									            '<td>'+ data.NumPedido +'</td>' +
									            '<td>'+ negocio +'</td>' +
									            '<td>'+ data.Fecha +'</td>' +
									            '<td>' + (
									            	data.Estado == 0 ?
														'<span class="new badge red" data-badge-caption="Por Procesar"></span>'
													:
														'<span class="new badge green" data-badge-caption="Enviado"></span>'
													) +
									            '</td>' +
									            '<td>$<span>'+ Number(data.PrecioTot).toFixed(2) +'<span></td>' +
									            '<td><a href="#" data-target="infoPedidoModal" class="modal-trigger" id="infoPedidoBtn" codPedido="'+ childSnap.key +'"><span><i class="material-icons blue-text">description</i></span></a></td>' +
									        '</tr>'
										);

			});
			
			

		});

});

/*###################################################
OBTENER INFO PEDIDO
####################################################*/

$('.pedidosTotales').on('click', '#infoPedidoBtn', function(){

	var codPedido = $(this).attr('codPedido');
	var numPedido = $('.dataPedidoNumPedido');
	var fecha = $('.dataPedidoFecha');
	var cliente = $('.dataPedidoCliente');
	var tel = $('.dataPedidoTel');
	var ubic = $('.dataPedidoUbic');
	var subtot = $('.dataPedidoSubTot');
	var itbms = $('.dataPedidoITMBS');
	var total = $('.dataPedidoTotal');


	numPedido.empty();
	fecha.empty();
	cliente.empty();
	tel.empty();
	ubic.empty();
	subtot.empty();
	itbms.empty();
	total.empty();
	$('.dataPedidoProductList').empty();

	pedidosRef.child(codPedido).once('value', function(snapshot){

		var snap = snapshot.val();

		subtot.append(Number(snap.PrecioBruto).toFixed(2));
		itbms.append(Number(snap.ITBMS).toFixed(2));
		total.append(Number(snap.PrecioTot).toFixed(2));

		snapshot.child('productos').forEach(function(prodSnap){

			var prodData = prodSnap.val();

			$('.dataPedidoProductList').append(
												'<tr>' +
													'<td>' + prodData.Codigo + '</td>' +
													'<td>' + prodData.Nombre + '</td>' +
													'<td>$' + Number(prodData.Precio).toFixed(2) + '</td>' +
													'<td>' + prodData.Cantidad + '</td>' +
													'<td>$' + Number(prodData.PrecioSubTot).toFixed(2) + '</td>' +
												'</tr>'
												);

		});

		database.ref('clientes/'+snap.Cliente).once('value', function(childSnap){

			var child = childSnap.val();

			numPedido.append(snap.NumPedido);
			fecha.append(snap.Fecha);
			cliente.append(child.NombreNegocio);
			tel.append(child.CeluNegocio + " / " + child.TeleNegocio);
			ubic.append(child.UbicacionNegocio);

		});

	});

});