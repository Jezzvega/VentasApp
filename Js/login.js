$('#loginBtn').on('click', function() {
  var email = document.getElementById('loginMail').value;
  var password = document.getElementById('loginPass').value;

  if (email == "") {
    $('.errorMsj').append("Completa el campo Correo");
     //alertify.error('Campo vacio.');
  } else if (password == "") {
    $('.errorMsj').append("Completa el campo Contraseña");
    // alertify.error('Campo vacio.');
  }else {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

    });
  }
});

//Ejecutamos la funcion
window.onload = function(){
  observador();
}

//Funcion que verifica el estado del usuario en el sistema y puede obtener sus datos
//Cada vez que se ejecute nuestro sistema esta funcion se va a ejecutar automaticamente, ya que esta declarada al final para su ejecucion

function observador(){

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      iziToast.success({
      title: 'OK',
      message: 'Sesion Iniciada!',
  });
      //Funcion para mostrar contenido al usuario logueado
      mostrarContenido(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // ...
    } else {

      console.log('No existe usuario activo');
      $('.load').css("display", "none");
      $('.navbarHome').css("display", "none");
      $('.sidenav').sidenav('close');
      $('.sidenavHome').css("display", "none");
      $('.home').css("display", "none");
      $('.admin').css("display", "none");
      $('.login').css("display", "block");
      // User is signed out.
      // ...
    }

  });

}

//Funcion que llena el div en el index solo si el usuario existe y es activado o logueado
function mostrarContenido(user){
  $('.load').css("display", "none");
  $('.navbarHome').css("display", "block");
  $('.sidenavHome').css("display", "block");
  $('.home').css("display", "block");
  $('.admin').css("display", "none");
  $('.login').css("display", "none");

    }
