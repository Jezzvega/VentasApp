//var database = firebase.database();
var refdb = database.ref('productos');
var storage = firebase.storage();
//var storRef = storageRef.child('imagesproducts/');

function limpiar() {
document.getElementById('imagenP').value = "";
document.getElementById('namefile').value = "";
document.getElementById('newProdCodigo').value = "";
document.getElementById('newProdNombre').value = "";
document.getElementById('newProdModelo').value = "";
document.getElementById('newProdDetalles').value = "";
document.getElementById('newProdPrecio').value = "";
document.getElementById('newProdPrecioOfer').value = "";
document.getElementById('newProdStock').value = "";
}

$('#newProdBtn').on('click', function() {

  var file = document.getElementById('imagenP').files[0];
  var namefile = document.getElementById('namefile').value;
  var codiProd = document.getElementById('newProdCodigo').value;
  var nombProd = document.getElementById('newProdNombre').value;
  var modelProd = document.getElementById('newProdModelo').value;
  var catProd = document.getElementById('newProdCat').value;
  var descrpProd = document.getElementById('newProdDetalles').value;
  var precProd = document.getElementById('newProdPrecio').value;
  var precOferProd = document.getElementById('newProdPrecioOfer').value;
  var stockProd = document.getElementById('newProdStock').value;
  var downloadURL;

  function MaysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  nombProd = MaysPrimera(nombProd.toLowerCase());
  //console.log(nombProd);


  if (namefile != "") {
    var file = document.getElementById('imagenP');
    var filePath = file.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(filePath)) {
      $(".helper-text").remove();
      $("#namefile").after(
        '<span class="helper-text red-text">Por favor solo suba imagenes con extensiones .jpeg/.jpg/.png/.gif solamente.</span>'
      );
      namefile.value = '';
      return false;
    } else {
      //Image preview

    }

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
  if (precOferProd != "") {
    var expresion = /^[0-9]+\.?[0-9]*$/;
    if (!expresion.test(precOferProd)) {
      $(".helper-text").remove();
      $("#newProdPrecioOfer").after(
        '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
      );
      return false;
    }

  } else {
    $(".helper-text").remove();
    $("#newProdPrecioOfer").after(
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
      var file = document.getElementById('imagenP').files[0];
      var storage = firebase.storage();
      var pathReference = storage.ref('imagesproducts/' + namefile);
      pathReference.put(file).on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function(error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          pathReference.getDownloadURL().then(function(downloadURL) {

            //Subimos los datos
            refdb.push({
              url: downloadURL,
              codigo: codiProd,
              nombre: nombProd,
              modelo: modelProd,
              categoria: catProd,
              detalles: descrpProd,
              precio: precProd,
              precioOfer: precOferProd,
              stock: stockProd,
              cventas: 0,
              enOferta: false

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
                limpiar();
                document.getElementById('newProductModal').value = "";
                $('.modal').modal('close');
              }
            });

          });

        });

    }

  });

});
