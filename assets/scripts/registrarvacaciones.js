$("body").on("change","[name='datos[idEmpleado]']",function(e){
	$("#numeroDocumento").val('')
	if($(this).val()!=""){
		var cc=$(this).find("option:selected").attr("cc")
		$("#numeroDocumento").val(cc)
	}
})

$("body").on("change","[name='datos[fechaInicioVacaciones]'], [name='datos[fechaFinalVacaciones]']",function(e){

	var fechaInicio=$("[name='datos[fechaInicioVacaciones]']").val(); 
	var fechaFin=$("[name='datos[fechaFinalVacaciones]']").val(); 
	var ONE_DAY = 1000 * 60 * 60 * 24;

	if(fechaInicio!=""){
		firstDate = new Date(fechaInicio);
	    var date1_ms = firstDate.getTime();
	    var date2_ms = new Date().getTime();
	    
	    var difference_ms = Math.abs(date1_ms - date2_ms);
	    
	    if(date1_ms>=date2_ms){
	    	min=(Math.round(difference_ms/ONE_DAY)+1);
	    }else{
	    	min=(Math.round(difference_ms/ONE_DAY)-1)*-1;
	    }
	    
	    $("[name='datos[fechaFinalVacaciones]']").datepicker("destroy").removeClass("hasDatepicker");
		$("[name='datos[fechaFinalVacaciones]']").datepicker({ minDate:min, dateFormat:'yy-mm-dd' });
		$("[name='datos[fechaReinicioFunciones]']").datepicker("destroy").removeClass("hasDatepicker");
		$("[name='datos[fechaReinicioFunciones]']").datepicker({ minDate:min, dateFormat:'yy-mm-dd' });
	}
    if(fechaFin!=""){
    	firstDate = new Date(fechaFin);
	    var date1_ms = firstDate.getTime();
	    var date2_ms = new Date().getTime();
	    
	    var difference_ms = Math.abs(date2_ms - date1_ms);
	    if(date2_ms>=date1_ms){
	    	max=(Math.round(difference_ms/ONE_DAY)-1)*-1;
	    }else{
	    	max=Math.round(difference_ms/ONE_DAY)+1;
	    }
	    
	    
	    $("[name='datos[fechaInicioVacaciones]']").datepicker("destroy").removeClass("hasDatepicker");
		$("[name='datos[fechaInicioVacaciones]']").datepicker({ maxDate:max, dateFormat:'yy-mm-dd' });
    }  
	if(fechaInicio!=""&&fechaFin!=""){
		$.ajax({
	        url:URL+"functions/generales/diashabiles.php", 
	        type:"POST", 
	        data: {"fechaInicio":fechaInicio,"fechaFin":fechaFin}, 
	        dataType: "json",
	        }).done(function(msg){  
	          
	          $("[name='datos[totalDias]']").val(msg.dias)
	      });
	}
})

$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){

          swal({
            title: 'Está seguro?',
            text: 'Está a punto de registrar vacaciones a '+$("[name='datos[idEmpleado]']").find("option:selected").html()+'!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Guardar!"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/nomina/guardarvacaciones.php", 
                type:"POST", 
                data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: "Vacaciones registradas!",   
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