$("body").on("change","[name='datos[idEmpleado]']",function(e){
	$("#numeroDocumento").val('')
	if($(this).val()!=""){
		var cc=$(this).find("option:selected").attr("cc")
		$("#numeroDocumento").val(cc)
	}
})

$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){

          swal({
            title: 'Está seguro?',
            text: 'Está a punto de realizar el retiro del empleado '+$("[name='datos[idEmpleado]']").find("option:selected").html()+'!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Guardar!"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/nomina/guardarretiro.php", 
                type:"POST", 
                data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: "Permiso registrado!",   
                      text: "con exito",
                      type: "success",        
                      closeOnConfirm: true 
                      }).then((element)=>{
                        location.reload(); 
                      })
                  }else{
                    swal({   
                      title: "Algo ha salido mal!",   
                      text: "Revise su conexion a internet",
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