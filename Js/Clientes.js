var database = firebase.database();

$('#newClientBtn').on('click', function() {

  var ref = database.ref('clientes');

  var nombNegocio = $("#inNombreNegocio").val();
  var nombDueno = $("#inNombreDueno").val();
  var ubicNegocio = $("#inUbicNegocio").val();
  var telNegocio = $("#inTelNegocio").val();
  var celNegocio = $("#inCelNegocio").val();

  if (nombNegocio != "") {
    var expresion = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ#., ]*$/;

    if (!expresion.test(nombNegocio)) {
      $(".helper-text").remove();
      $("#inNombreNegocio").after(
        '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
      );
      return false;
    }

  } else {
    $(".helper-text").remove();
    $("#inNombreNegocio").after(
      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
    );
    return false;
  }

  if (nombDueno != "") {
    var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

    if (!expresion.test(nombDueno)) {
      $(".helper-text").remove();
      $("#inNombreDueno").after(
        '<span class="helper-text red-text">No se permiten números ni caracteres especiales.</span>'
      );
      return false;
    }

  } else {
    $(".helper-text").remove();
    $("#inNombreDueno").after(
      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
    );
    return false;
  }

  if (ubicNegocio != "") {
    var expresion = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ,#. ]*$/;

    if (!expresion.test(ubicNegocio)) {
      $(".helper-text").remove();
      $("#inUbicNegocio").after(
        '<span class="helper-text red-text">No se permiten caracteres especiales.</span>'
      );
      return false;
    }

  } else {
    $(".helper-text").remove();
    $("#inUbicNegocio").after(
      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
    );
    return false;
  }

  if (telNegocio != "") {
    var expresion = /^\d{3}-\d{4}$/;

    if (!expresion.test(telNegocio)) {
      $(".helper-text").remove();
      $("#inTelNegocio").after(
        '<span class="helper-text red-text">No se permiten letras ni caracteres especiales.</span>'
      );
      return false;
    }

  } else {
    $(".helper-text").remove();
    $("#inTelNegocio").after(
      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
    );
    return false;
  }

  if (celNegocio != "") {
    var expresion = /^\d{4}-\d{4}$/;

    if (!expresion.test(celNegocio)) {
      $(".helper-text").remove();
      $("#inCelNegocio").after(
        '<span class="helper-text red-text">No se permiten letras ni caracteres especiales.</span>'
      );
      return false;
    }

  } else {
    $(".helper-text").remove();
    $("#inCelNegocio").after(
      '<span class="helper-text red-text">Este campo es obligatorio.</span>'
    );
    return false;
  }

  ref.push({

    NombreNegocio: nombNegocio,
    NombreDueno: nombDueno,
    UbicacionNegocio: ubicNegocio,
    TeleNegocio: telNegocio,
    CeluNegocio: celNegocio 

  }, function(error) {
    
    if (error) {
      
      swal({
        title: "Cliente No Guardado!",
        text: "El cliente " + nombDueno + " no se ha guardado!",
        icon: "error",
        button: "Reintentar!",
      });

    } else {

      swal({
        title: "Cliente Guardado!",
        text: "El cliente " + nombDueno + " se ha guardado con exito!",
        icon: "success",
        button: "Ok!",
      });

      $("#inNombreNegocio").val("");
      $("#inNombreDueno").val("");
      $("#inUbicNegocio").val("");
      $("#inTelNegocio").val("");
      $("#inCelNegocio").val("");

      $('.modal').modal('close');
    }
      
  });

});