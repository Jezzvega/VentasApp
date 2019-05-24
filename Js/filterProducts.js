$('#searchCat').keyup(function() {
  var refProduct = database.ref('productos');
  var buscar = $(this).val();

  function MaysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  buscarFormated = MaysPrimera(buscar.toLowerCase());
  console.log(buscarFormated);

  refProduct.orderByChild('nombre').startAt(buscarFormated).endAt(buscarFormated+"\uf8ff").on('value', function(snapshot){

	   $(".listProductos").empty();

		snapshot.forEach(function(childSnap){

			var snapProduct = childSnap.val();


			if(snapProduct.categoria == nombCateg){

				$(".listProductos").append(
											'<div class="col m4 l3">' +
												'<div class="card white">' +
													'<div class="card-content">' +
														'<div class="row noBottom">' +
															'<div class="col s12 center">' +
																'<img class="card-img" src="' + snapProduct.url + '">' +
																'<h6 class="black-text"><b>' + snapProduct.nombre + '</b></h6>' +
																'<p class="grey-text">' + snapProduct.modelo + '</p>' +
															'</div>' +
															'<div class="col s12">' +
																'<ul class="collection">' +
																	'<li class="collection-item"><b>Precio:</b><span class="right">$' + snapProduct.precio + '</span></li>' +
																	'<li class="collection-item"><b>Cantidad:</b>' + (
																	snapProduct.stock > 0 ?
																		'<span class="right">' + snapProduct.stock + '</span>'
																	:
																		'<span class="red-text right">Agotado</span>'
																	) + '</li>' +
																'</ul>' +
															'</div>' +
															'<div class="col s12 center">' +
																'<a href="#" codProducto="' + snapProduct.codigo + '" cantProducto="1" nombreProducto="' + snapProduct.nombre + '" modelProducto="' + snapProduct.modelo + '" categProducto="' + snapProduct.categoria + '" precioProducto="' + snapProduct.precio + '" stockProducto="' + snapProduct.stock + '" class="addProduct btn blue"><i class="right material-icons">add</i>Añadir</a>' +
															'</div>' +
														'</div>' +
													'</div>' +
												'</div>' +
											'</div>'
											);

				//x = 1;

			}

		});
/*
		if(x == 0){

			$(".listProductos").empty();

			$(".listProductos").append(
										'<div class="col s12 center">' +
											'<h4 class="grey-text"><b>No hay productos :(</b></h4>' +
										'</div>'
										);

		}*/

	});

});
