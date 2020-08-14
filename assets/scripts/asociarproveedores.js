$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
           swal({
            title: 'Está seguro?',
            text: 'Está a punto de hacer cambios en las empresas para este proveedor!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Continuar!"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/proveedor/asociarempresas.php", 
                type:"POST", 
                data: data,
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
                        location.href=URL+"verproveedor/"+$("#url").val(); 
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

  })