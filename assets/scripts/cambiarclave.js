$("body").on("click","#btnGuardar",function(e){
		e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){
            if($("#clave").val()!=$("#nuevaClave").val()){
              swal({   
                  title: "Algo ha salido mal!",   
                  text: "Los campos deben coincidir",
                  type: "error",        
                  closeOnConfirm: true 
                  }, 
                  function(){  
                     
                  });
              return false; 
            }
            var formu = document.getElementById("frmGuardar");
            
            var data = new FormData(formu);
            $.ajax({
            url:"functions/sesion/cambiarclave.php", 
            type:"POST", 
            data: data,
            contentType:false, 
            processData:false, 
            dataType: "json",
            cache:false 
            }).done(function(msg){  
              if(!msg.error){
              	swal({   
                  title: "Algo ha salido mal!",   
                  text: msg.msg,
                  type: "error",        
                  closeOnConfirm: true 
                  }, 
                  function(){  
                     
                  });
              }else{
              	location.href=msg.msg; 
              }

                  
              
            
          });
       
      }
	})