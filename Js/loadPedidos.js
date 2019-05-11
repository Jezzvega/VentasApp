var pedidosRef = database.ref('pedidos');

function loadUltimosPedidos(){

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

}