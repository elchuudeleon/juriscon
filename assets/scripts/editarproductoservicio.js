$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){
        var texto="Servicio"; 
          if($("#tipo").val()==1){
            var texto="Producto"; 
          }
          swal({
            title: 'Está seguro?',
            text: 'Está a punto de actualizar este '+texto+'!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Continuar!"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/productosservicios/editarproductoservicio.php", 
                type:"POST", 
                data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: texto+" actualizado!",   
                      text: "con exito",
                      type: "success",        
                      closeOnConfirm: true 
                      }).then((element)=>{
                        window.history.back(); 
                      })
                  }else{
                    swal({   
                      title: "Algo ha salido mal!",   
                      text: "Revise su conexión a internet",
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