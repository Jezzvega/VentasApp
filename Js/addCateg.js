var database = firebase.database();

$('#addCatBtn').on('click', function() {

  var ref = database.ref('categorias');

  var categoria = document.getElementById('inNewCategoria').value;

  function MaysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  categoria = MaysPrimera(categoria.toLowerCase());
  console.log(categoria);

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

  ref.orderByChild("nombre").equalTo(categoria).once("value", snapshot => {
    const userData = snapshot.val();
    if (userData) {
      console.log("Ya existe!");
      swal("Ya existe!", "...intenta con otra categoria!");
    } else {
      ref.push({

        nombre: categoria

      }, function(error) {
        if (error) {
          console.log('Error');
          swal({
            title: "Categoria No Guardada!",
            text: "La categoria " + categoria + " no se ha guardado!",
            icon: "error",
            button: "Reintentar!",
          });
        } else {

          swal({
            title: "Categoria Guardada!",
            text: "La categoria " + categoria + " se ha guardado con exito!",
            icon: "success",
            button: "Ok!",
          });
          document.getElementById('inNewCategoria').value = "";
          $('.modal').modal('close');
        }
      });


    }
  });




});
