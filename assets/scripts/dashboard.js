$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
     
                // var formu = document.getElementById("frmGuardar");
            
                // var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/generales/enviarcorreo.php", 
                type:"POST", 
                //data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: "Cambios realizados!",   
                      text: "con exito",
                      type: "success",        
                      closeOnConfirm: true 
                      }).then((element)=>{
                        location.href=URL+"vercliente/"+$("#url").val(); 
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
              

  })