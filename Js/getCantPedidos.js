var ref = firebase.database().ref("pedidos");
//Obtenemos la cantidad de peditos en total
ref.on("value", function(snapshot) {
    var a = snapshot.numChildren();
    $('.totPedidos').html(a);
  });
//Obtenemos los pedidos que aun no se han enviado
  ref.orderByChild("Estado").equalTo(0).on("value", function(snapshot){
      var b = snapshot.numChildren();
      $('.totNoEnviados').html(b);
    });
//Obtenemos los pedidos enviados
ref.orderByChild("Estado").equalTo(1).on("value", function(snapshot){
    var c = snapshot.numChildren();
      $('.totEnviados').html(c);
  });
