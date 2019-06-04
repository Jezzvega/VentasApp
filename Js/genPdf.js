
function HTMLtoPDF(){

var pdf = new jsPDF('p', 'pt', 'letter');
var numP = $('.dataPedidoNumPedido').html();
source = $('.infoPedidoPdf')[0];
specialElementHandlers = {
	'#bypassme': function(element, renderer){
		return true
	}
}
margins = {
    top: 50,
    left: 60,
    width: 545
  };
	////
	swal({
	  title: "Estas seguro?",
	  text: "Vas a generar una factura, esto cambia el estado del pedido a Enviado!",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
			pdf.fromHTML(
			  	source // HTML string or DOM elem ref.
			  	, margins.left // x coord
			  	, margins.top // y coord
			  	, {
			  		'width': margins.width // max width of content on PDF
			  		, 'elementHandlers': specialElementHandlers
			  	},
			  	function (dispose) {
			  	  // dispose: object with X, Y of the last line add to the PDF
			  	  //          this allow the insertion of new lines after html
			        pdf.save(numP+'.pdf');
			        swal("Pedido generado correctamente!");
							updateState();
							$(".modal").modal('close');
			      }
			  )
	    swal("Su Factura ha sido creada correctamente!", {
	      icon: "success",
	    });
	  } else {
	    swal("Impresion de factura ha sido cancelada.");
	  }
	});

	////

}

function updateState(){
	var numPed = $("#imprimirBtn").attr("idPedido");
	var pedidRef = database.ref('pedidos/'+numPed);
	var status = 1;
	pedidRef.update({

		Estado: status

	}, function(error) {
            if (error) {
              console.log("Error");
            } else {
							console.log("Correcto");
            }
    });

}
