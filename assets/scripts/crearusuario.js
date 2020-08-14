$("body").on("change","[name='datos[idDepartamentoResidencia]']",function(e){
    var id=$(this).val();
    if(id!=""){
      $.ajax({
        url:"functions/generales/ciudades.php", 
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
    } else{
      $("[name='datos[idCiudadResidencia]']").html("<option value=''>Seleccione una opción</option>");
    }
    
})

$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){

          swal({
            title: 'Está seguro?',
            text: 'Está a punto de guardar un nuevo usuario!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Guardar!"],
            dangerMode: true,
            closeOnConfirm: false,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:"functions/usuario/guardarusuario.php", 
                type:"POST", 
                data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: "Usuario creado!",   
                      text: "con exito",
                      type: "success",        
                      closeOnConfirm: true 
                      }).then((element)=>{
                        if(msg.idUsuario==""){
                          location.href=URL+"listarusuarios";
                        }else{
                          location.href=URL+"asociarusuarios/"+msg.idUsuario;   
                        }
                        
                      })
                  }else{
                    swal({   
                      title: "Algo ha salido mal!",   
                      text: "ya existe un registro con este numero de cedula",
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