$( document ).ready(function() {
    
    var clientRef = firebase.database().ref('clientes');

  	clientRef.orderByChild("NombreDueno").on('value', function(snapshot) {

  		$('.listClientes').empty();
  		//$('.selectCateg').empty();

  		snapshot.forEach(function(childSnapshot) {
	    
		    var childData = childSnapshot.val();

		    $('.listClientes').append(
	  									'<tr>' +
						    				'<td>' + childData.NombreNegocio + '</td>' +
						    				'<td>' + childData.NombreDueno + '</td>' +
						    				'<td>' + childData.TeleNegocio + ' / ' + childData.CeluNegocio + '</td>' +
						    			'</tr>'
	  									);
		    
		    //$('.selectCateg').append('<option value="'+ childData.nombre +'">'+ childData.nombre +'</option>');
	  
	  	});
	
	});
});