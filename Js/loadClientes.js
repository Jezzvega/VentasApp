$( document ).ready(function() {
    
    var clientRef = firebase.database().ref('clientes');

  	clientRef.orderByChild("NombreDueno").on('value', function(snapshot) {

  		$('.listClientes').empty();
  		$('.selectCliente').empty();

  		snapshot.forEach(function(childSnapshot) {
	    
		    var childData = childSnapshot.val();

		    $('.listClientes').append(
	  									'<tr>' +
						    				'<td>' + childData.NombreNegocio + '</td>' +
						    				'<td>' + childData.NombreDueno + '</td>' +
						    				'<td>' + childData.TeleNegocio + ' / ' + childData.CeluNegocio + '</td>' +
						    			'</tr>'
	  									);
		    
		    $('.selectCliente').append('<option value="'+ childData.NombreNegocio +'" id="'+childSnapshot.key+'">'+ childData.NombreNegocio +'</option>');
	  
	  	});

		$(".selectCliente").change(function(){

			var clienteKey = $( ".selectCliente option:selected" ).attr('id');

		  	clientRef.child(clienteKey).once('value',function(snapshot){

		  		var snap = snapshot.val();

		  		$("#checkoutNombreDueno").val(snap.NombreDueno);
		  		$("#checkoutUbic").val(snap.UbicacionNegocio);
		  		//Actualiza el textarea de Materialize
		  		M.textareaAutoResize($('#checkoutUbic'));

		  	});

		});
	
	});

});