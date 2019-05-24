/*
CARGA EL MODAL DE EDIT CON LOS DATOS DEL PRODUCTO A EDITAR
*/

$('.listProductosTotales').on('click','#editProductBtn', function(){

	var prodId = $(this).attr('codProd');

	var productRef = database.ref('productos/'+prodId);

	productRef.once('value', function(snapProd){

		var productData = snapProd.val();

		$('#editProdCodigo').val(productData.codigo);
		$('#editProdCodigo').attr("prodKey", prodId);
		$('#editProdCat').val(productData.categoria);
		$('#editProdNombre').val(productData.nombre);
		$('#editProdModelo').val(productData.modelo);
		$('#editProdDetalles').val(productData.detalles);
		$('#editProdPrecio').val(productData.precio);
		$('#editProdPrecioOfer').val(productData.precioOfer);
		$('#editProdStock').val(productData.stock);

		if(productData.enOferta){

			$('#checkboxActiveOfer').prop('checked', true);

		}else{

			$('#checkboxActiveOfer').prop('checked', false);

		}

		M.updateTextFields();

	});

});

/*
BOTON DE GUARDAR CAMBIOS EN EL PRODUCTO
*/
$('#editProdBtn').on('click', function(){

	var prodKey = $('#editProdCodigo').attr("prodKey");

	var productRef = database.ref('productos/'+prodKey);

	var nombre = $('#editProdNombre').val();
	var modelo = $('#editProdModelo').val();
	var detalles = $('#editProdDetalles').val();
	var precio = $('#editProdPrecio').val();
	var precioOfer = $('#editProdPrecioOfer').val();
	var stock = $('#editProdStock').val();
	var oferCheck = $('#checkboxActiveOfer').prop('checked');

	if (nombre != "") {

	} else {
	    $(".helper-text").remove();
	    $("#editProdNombre").after(
	      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
	    );
	    return false;
	}

	if (modelo != "") {

	} else {
	    $(".helper-text").remove();
	    $("#editProdModelo").after(
	      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
	    );
	    return false;
	}

	if (detalles != "") {

	} else {
	    $(".helper-text").remove();
	    $("#editProdDetalles").after(
	      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
	    );
	    return false;
	}

	if (precio != "") {
	    var expresion = /^[0-9]+\.?[0-9]*$/;
	    if (!expresion.test(precio)) {
	      $(".helper-text").remove();
	      $("#editProdPrecio").after(
	        '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
	      );
	      return false;
	    }

	} else {
	    $(".helper-text").remove();
	    $("#editProdPrecio").after(
	      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
	    );
	    return false;
	}

	if (precioOfer != "") {
	    var expresion = /^[0-9]+\.?[0-9]*$/;
	    if (!expresion.test(precioOfer)) {
	      $(".helper-text").remove();
	      $("#editProdPrecioOfer").after(
	        '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
	      );
	      return false;
	    }

	} else {
	    $(".helper-text").remove();
	    $("#editProdPrecioOfer").after(
	      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
	    );
	    return false;
	}

	if (stock != "") {
	    var expresion = /^\d+$/;
	    if (!expresion.test(stock)) {
	      $(".helper-text").remove();
	      $("#editProdStock").after(
	        '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
	      );
	      return false;
	    }

	} else {
	    $(".helper-text").remove();
	    $("#editProdStock").after(
	      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
	    );
	    return false;
	}

	productRef.update({

		nombre: nombre,
		modelo: modelo,
		detalles: detalles,
		precio: precio,
		precioOfer: precioOfer,
		stock: stock,
		enOferta: oferCheck

	}, function(error) {
            if (error) {
                swal({
                  title: "Producto No Actualizado!",
                  text: "La el producto " + nombre + " " + modelo + " no se ha Actualizado!",
                  icon: "error",
                  button: "Reintentar!",
                });
            } else {
                swal({
                  title: "Producto Actualizado!",
                  text: "La producto " + nombre + " " + modelo + " se ha Actualizado con exito!",
                  icon: "success",
                  button: "Ok!",
                });
                document.getElementById('newProductModal').value = "";
                $('.modal').modal('close');
            }
    });

});


