$(document).ready(function(e){
	dataTable("#tableFacturas"); 
})

$("body").on("click",".comprobante",function(e){
	$("#frmGuardar")[0].reset(); 
	var empresa=$(this).parents("tr").find("td").eq(2).html()
	var proveedor=$(this).parents("tr").find("td").eq(3).html()
	var factura=$(this).parents("tr").find("td").eq(4).html()

	var id=$(this).attr("id"); 
	$("[name='datos[idFacturaCompra]']").val(id); 
	$("#nroFactura").val(factura); 
	$("#proveedor").val(proveedor); 
	$("#empresa").val(empresa); 
})

$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      
      if(true === $("#frmGuardar").parsley().validate()){

        swal({
          title: 'Está seguro?',
          text: 'Está a punto de guardar marcar como pagada esta factura!',
          icon: 'warning',
          buttons: ["Cancelar","Si, Continuar!"],
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              var formu = document.getElementById("frmGuardar");
          
              var data = new FormData(formu);
              $.ajax({
              url:URL+"functions/facturacompra/guardarcomprobanteegreso.php", 
              type:"POST", 
              data: data,
              contentType:false, 
              processData:false, 
              dataType: "json",
              cache:false 
              }).done(function(msg){  
                if(msg.msg){

                  swal({   
                    title: "Pago realizado!",   
                    text: "con exito",
                    type: "success",        
                    closeOnConfirm: true 
                    }).then((element)=>{
                      location.reload(); 
                    })
                }else{
                  swal({   
                    title: "Algo ha salido mal!",   
                    text: "Verifique su conexión a internet",
                    type: "error",        
                    closeOnConfirm: true 
                    }).then((element)=>{
                      
                    });
                }
              
            });
            } else {
              
            }
          });
      }
  })