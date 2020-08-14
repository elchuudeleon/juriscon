
$(document).ready(function(e){
	$( "[name='datos[fechaInicio]']" ).datepicker({ minDate: 0, dateFormat:'yy-mm-dd' });
})


$("body").on("change","[name='datos[idEmpleado]']",function(e){
	$("#numeroDocumento").val('')
	if($(this).val()!=""){
		var cc=$(this).find("option:selected").attr("cc")
		$("#numeroDocumento").val(cc)
	}
})

$("body").on("change","[name='datos[cuotas]'],[name='datos[valorDescuento]']",function(e){
	var descuento=0; 
	var cuotas=parseInt($("[name='datos[cuotas]']").val()); 
	if($("[name='datos[valorDescuento]']").val()!=""){
		descuento=parseFloat(eliminarMoneda(eliminarMoneda($("[name='datos[valorDescuento]']").val(),",",""),"$",""));
	}
	var valorCuota=descuento/cuotas; 
	$("[name='datos[valorCuota]']").val(valorCuota).trigger("change"); 
})

$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){

          swal({
            title: 'Está seguro?',
            text: 'Está a punto de guardar un descuesto a '+$("[name='datos[idEmpleado]']").find("option:selected").html()+'!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Guardar!"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/nomina/guardardescuento.php", 
                type:"POST", 
                data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: "Descuento agregado!",   
                      text: "con exito",
                      type: "success",        
                      closeOnConfirm: true 
                      }).then((element)=>{
                        location.reload(); 
                      })
                  }else{
                    swal({   
                      title: "Algo ha salido mal!",   
                      text: "El NIT ya se encuentra registrado",
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