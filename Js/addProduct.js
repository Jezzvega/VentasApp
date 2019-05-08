//var database = firebase.database();
var refdb = database.ref('productos');
//var pathReference = firebase.storage().ref('imagesproducts');

$('#newProdBtn').on('click', function() {

var file = document.getElementById('imagenP').files[0];
var namefile = document.getElementById('namefile').value;
var codiProd = document.getElementById('newProdCodigo').value;
var nombProd = document.getElementById('newProdNombre').value;
var modelProd = document.getElementById('newProdModelo').value;
var catProd = document.getElementById('newProdCat').value;
var descrpProd = document.getElementById('newProdDetalles').value;
var precProd = document.getElementById('newProdPrecio').value;
var stockProd = document.getElementById('newProdStock').value;


if (namefile != "") {

} else {
  $(".helper-text").remove();
  $("#namefile").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}
if (codiProd != "") {

} else {
  $(".helper-text").remove();
  $("#newProdCodigo").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}
if (nombProd != "") {

} else {
  $(".helper-text").remove();
  $("#newProdNombre").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}
if (modelProd != "") {

} else {
  $(".helper-text").remove();
  $("#newProdModelo").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}
if (catProd != "") {

} else {
  $(".helper-text").remove();
  $("#newProdCat").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}
if (descrpProd != "") {

} else {
  $(".helper-text").remove();
  $("#newProdDetalles").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}
if (precProd != "") {
  var expresion = /^[0-9]+\.?[0-9]*$/;
  if (!expresion.test(precProd)) {
    $(".helper-text").remove();
    $("#newProdPrecio").after(
      '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
    );
    return false;
  }

} else {
  $(".helper-text").remove();
  $("#newProdPrecio").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}
if (stockProd != "") {
  var expresion = /^\d+$/;
  if (!expresion.test(stockProd)) {
    $(".helper-text").remove();
    $("#newProdStock").after(
      '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
    );
    return false;
  }

} else {
  $(".helper-text").remove();
  $("#newProdStock").after(
    '<span class="helper-text red-text">Este campo es obligatorio.</span>'
  );
  return false;
}

refdb.orderByChild("codigo").equalTo(codiProd).once("value", snapshot => {
  const userData = snapshot.val();
  if (userData) {
    swal("Ya existe!", "...intenta con otro codigo de producto!");
  } else {
    //Subimos la imagen
    var storage = firebase.storage();
    var pathReference = storage.ref('imagesproducts/' + namefile);
    pathReference.put(file);
    //Capturamos el url de la imagen
    /*  pathReference.getDownloadURL().then(function(file) {
        ref.push().set({
          imgurl: file,

        });
      });
    */
    //Subimos los datos
    refdb.push({
      codigo: codiProd,
      nombre: nombProd,
      modelo: modelProd,
      categoria: catProd,
      detalles: descrpProd,
      precio: precProd,
      stock: stockProd,
      cventas:0

    }, function(error) {
      if (error) {
      swal({
      title: "Producto No Guardado!",
      text: "La el producto " + nombProd + " no se ha guardado!",
      icon: "error",
      button: "Reintentar!",
    });
  } else {
    swal({
      title: "Producto Guardado!",
      text: "La producto " + nombProd + " se ha guardado con exito!",
      icon: "success",
      button: "Ok!",
    });
    document.getElementById('newProductModal').value = "";
    $('.modal').modal('close');
  }
});
}


});



});
