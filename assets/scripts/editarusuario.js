$("body").on("change","[name='datos[idDepartamentoResidencia]']",function(e){
    var id=$(this).val(); 
    if(id!=""){
      $.ajax({
        url:URL+"functions/generales/ciudades.php", 
        type:"POST", 
        data: {"idDepartamento":id}, 
        dataType: "json",
        }).done(function(msg){  
          var sHtml="<option value=''>Seleccione una opción</option>"; 
          msg.ciudades.forEach(function(element,index){
            sHtml+="<option value='"+element.idCiudad+"'>"+element.nombre+"</option>"; 
          })

          $("[name='datos[idCiudadResidencia]']").html(sHtml);
      });
    }else{
      $("[name='datos[idCiudadResidencia]']").html("<option value=''>Seleccione una opción</option>");
    }
    
})

$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){

          swal({
            title: 'Está seguro?',
            text: 'Está a punto de actualizarlos datos de este usuario!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Actualizar!"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/usuario/editarusuario.php", 
                type:"POST", 
                data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: "Usuario actualizado!",   
                      text: "con exito",
                      type: "success",        
                      closeOnConfirm: true 
                      }).then((element)=>{
                        window.history.back(); 
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