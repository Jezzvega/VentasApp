var database = firebase.database();
var ref = database.ref('categorias');

$('#addCatBtn').on('click', function() {

  var categoria = document.getElementById('inNewCategoria').value;

  if (categoria != "") {
    var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    if (!expresion.test(categoria)) {
      $(".helper-text").remove();
      $("#inNewCategoria").after(
        '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
      );
      return false;
    }

  } else {
    $(".helper-text").remove();
    $("#inNewCategoria").after(
      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
    );


    return false;

  }

  ref.push({

    nombre: categoria

  }, function(error) {
    if (error) {
      console.log('Error');
      swal({
        title: "Categoria No Guardada!",
        text: "La categoria "+categoria+" no se ha guardado!",
        icon: "error",
        button: "Reintentar!",
      });
    } else {

      swal({
        title: "Categoria Guardada!",
        text: "La categoria "+categoria+" se ha guardado con exito!",
        icon: "success",
        button: "Ok!",
      });
      document.getElementById('inNewCategoria').value = "";
      $('.modal').modal('close');
    }
  });
});
