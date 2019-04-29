$('#logoutBtn').on('click', function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Ha finalizado la sesion.");
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });


});
