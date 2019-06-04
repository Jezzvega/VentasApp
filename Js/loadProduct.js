/*##############################################
LOAD PRODUCTOS POR CATEGORIAS
################################################*/

function getProductCateg(categoria){

	var refProd = database.ref('productos');

	var x = 0;

	refProd.orderByChild('nombre').on('value', function(snapshot){

		$(".listProductos").empty();

		snapshot.forEach(function(childSnap){

			var snapProduct = childSnap.val();

			if(snapProduct.categoria == categoria){

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
																	'<li class="collection-item">' + (
																		snapProduct.enOferta == true ?
																			'<b class="red-text">Oferta:</b><span class="red-text right">$' + snapProduct.precioOfer + '</span>'
																		:
																			'<b>Precio:</b><span class="right">$' + snapProduct.precio + '</span>'
																		) + 
																	'</li>' +
																	'<li class="collection-item"><b>Cantidad:</b>' + (
																		snapProduct.stock > 0 ?
																			'<span class="right">' + snapProduct.stock + '</span>'
																		:
																			'<span class="red-text right">Agotado</span>'
																		) + 
																	'</li>' +
																'</ul>' +
															'</div>' +
															'<div class="col s12 center">' +
																'<a href="#" data-target="infoProductModal" prodKey="'+ childSnap.key +'" class="modal-trigger btn blue infoProdBtn"><i class="right material-icons">visibility</i>Ver</a>' +
															'</div>' +
														'</div>' +
													'</div>' +
												'</div>' +
											'</div>'
											);

				x = 1;

			}

		});

		if(x == 0){

			$(".listProductos").empty();

			$(".listProductos").append(
										'<div class="col s12 center">' +
											'<h4 class="grey-text"><b>No hay productos :(</b></h4>' +
										'</div>'
										);

		}

	});

}

/*##############################################
LOAD PRODUCTOS MAS VENDIDOS
################################################*/
	
	database.ref('productos')
			.orderByChild('cventas')
			.limitToLast(3)
			.on('value', function(snapshot){

				$(".listProductMasVendidos").empty();

				snapshot.forEach(function(childSnap){

					var snapProduct = childSnap.val();

					$(".listProductMasVendidos").append(
											'<div class="col m4 l4">' +
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
																	'<li class="collection-item">' + (
																		snapProduct.enOferta == true ?
																			'<b class="red-text">Oferta:</b><span class="red-text right">$' + snapProduct.precioOfer + '</span>'
																		:
																			'<b>Precio:</b><span class="right">$' + snapProduct.precio + '</span>'
																		) + 
																	'</li>' +
																	'<li class="collection-item"><b>Cantidad:</b>' + (
																	snapProduct.stock > 0 ?
																		'<span class="right">' + snapProduct.stock + '</span>'
																	:
																		'<span class="red-text right">Agotado</span>'
																	) + '</li>' +
																'</ul>' +
															'</div>' +
															'<div class="col s12 center">' +
																'<a href="#" data-target="infoProductModal" prodKey="'+ childSnap.key +'" class="modal-trigger btn blue infoProdBtn"><i class="right material-icons">visibility</i>Ver</a>' +
															'</div>' +
														'</div>' +
													'</div>' +
												'</div>' +
											'</div>'
											);

				});

			});


/*##############################################
LOAD PRODUCTOS EN OFERTA
################################################*/
	
	database.ref('productos')
			.orderByChild('enOferta')
			.equalTo(true)
			.limitToLast(3)
			.on('value', function(snapshot){

				$(".listProductOfer").empty();

				snapshot.forEach(function(childSnap){

					var snapProduct = childSnap.val();

					$(".listProductOfer").append(
											'<div class="col m4 l4">' +
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
																	'<li class="collection-item"><b>Precio:</b><span class="right"><strike>$' + snapProduct.precio + '</strike></span></li>' +
																	'<li class="collection-item"><b class="red-text">Oferta:</b><span class="red-text right">$'+ snapProduct.precioOfer +' </span></li>' +
																	'<li class="collection-item"><b>Cantidad:</b>' + (
																	snapProduct.stock > 0 ?
																		'<span class="right">' + snapProduct.stock + '</span>'
																	:
																		'<span class="red-text right">Agotado</span>'
																	) + '</li>' +
																'</ul>' +
															'</div>' +
															'<div class="col s12 center">' +
																'<a href="#" data-target="infoProductModal" prodKey="'+ childSnap.key +'" class="modal-trigger btn blue infoProdBtn"><i class="right material-icons">visibility</i>Ver</a>' +
															'</div>' +
														'</div>' +
													'</div>' +
												'</div>' +
											'</div>'
											);

				});

			});


/*##############################################
LOAD PRODUCTOS TOTALES
################################################*/

database.ref('productos')
		.orderByChild('categoria')
		.on('value', function(snapshot){

			$('.listProductosTotales').empty();

			snapshot.forEach(function(snap){

				var prodSnap = snap.val();

				$('.listProductosTotales').append(
												'<tr>' +
													'<td>'+ prodSnap.codigo +'</td>' +
													'<td>'+ prodSnap.nombre +' '+ prodSnap.modelo +'</td>' +
													'<td>'+ prodSnap.categoria +'</td>' +
													'<td>$<span>'+ prodSnap.precio +'</span></td>' +
													'<td>'+ (
														prodSnap.stock > 0 ?
															prodSnap.stock
														:
															'<span class="new badge red" data-badge-caption="Agotado"></span>'
														) +'</td>' +
													'<td><a href="#" data-target="editProductModal" class="modal-trigger" id="editProductBtn" codProd="'+ snap.key +'"><span><i class="material-icons blue-text">edit</i></span></a></td>' +
												'</tr>'
												);

			});

		});

/*##############################################
LOAD INFO PRODUCTOS
################################################*/

$('.listProductos, .listProductMasVendidos, .listProductOfer').on('click', '.infoProdBtn', function(){

	var prodKey = $(this).attr('prodKey');

	database.ref('productos/' + prodKey + '/')
			.once('value', function(snap){

				var prodData = snap.val();

				$('.infoProductView').empty();

				$('.infoProductView').append(
											'<div class="row">' +
											    '<div class="col s5 center">' +
											    	'<img style="height: 260px; width: 100%;" src="' + prodData.url + '">' +
											    '</div>' +
											    '<div class="col s7">' +
											      	'<h5><b>' + prodData.nombre + '</b>' +
											      		'<span class="right">' + (
											      			prodData.stock > 0 ?
																'<a href="#" codProducto="' + prodData.codigo + '" cVentas="'+ prodData.cventas +'" prodKey="'+ snap.key +'" cantProducto="1" nombreProducto="' + prodData.nombre + '" modelProducto="' + prodData.modelo + '" categProducto="' + prodData.categoria + '" ' + ( prodData.enOferta == true ? 'precioProducto="'+ prodData.precioOfer +'"' : 'precioProducto="'+ prodData.precio +'"' ) +  ' stockProducto="' + prodData.stock + '" class="addProduct btn blue"><i class="right material-icons">add</i>Añadir</a>'
															:
																'<a href="#" class="addProduct btn blue disabled"><i class="right material-icons">add</i>Añadir</a>'
															) +
											      		'</span>' +
											      	'</h5>' +
											      	'<h6 class="grey-text"> ' + prodData.modelo + '</h6>' + 
											      	'<div class="divider"></div>' +
											      	'<p><b>Descripción:</b><br><span>' + prodData.detalles + '</span></p>' +
											    '</div>' +
											'</div>'
											);

			});

});