$( document ).ready(function() {
    
    var categRef = firebase.database().ref('categorias');

  	categRef.orderByChild("nombre").on('value', function(snapshot) {

  		$('.categList').empty();
  		$('.selectCateg').empty();

  		snapshot.forEach(function(childSnapshot) {
	    
		    var childData = childSnapshot.val();

		    $('.categList').append(
	  							'<li>'
	  								+'<a href="#categorias" nombCateg="'+ childData.nombre +'" class="link sidenav-close">'
	  									+'<i class="right material-icons blue-text">keyboard_arrow_right</i>'+ childData.nombre
	  								+'</a>'
	  							+'</li>');
		    
		    $('.selectCateg').append('<option value="'+ childData.nombre +'">'+ childData.nombre +'</option>');
	  
	  	});
	
	});
});