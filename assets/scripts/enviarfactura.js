var aDatos=[]; 
$(document).ready(function(e){

	$.ajax({
	    url:URL+"functions/productosservicios/listarproductosservicios.php", 
	    type:"POST", 
	    data: {"tipo":1,"idEmpresa":$("[name='datos[idEmpresa']").val()}, 
	    dataType: "json",
	    }).done(function(msg){  
	      msg.forEach(function(element,index){
	      	aDatos.push({
			        value: element.idProductoServicio,
			        label: element.codigo+" - "+element.nombre,
			      })
	      })
	      autocomplete(); 
	  });   
})

autocomplete=function(){
	$( ".producto" ).autocomplete({
      minLength: 0,
      source: aDatos,
      focus: function( event, ui ) {
      	var index=$(this).index(".producto")
        $( ".producto" ).eq(index).val( ui.item.label );
        $( ".idProducto" ).eq(index).val( ui.item.value );
        return false;
      },
      select: function( event, ui ) {
      	var index=$(this).index(".producto")
        $( ".producto" ).eq(index).val( ui.item.label );
        $( ".idProducto" ).eq(index).val( ui.item.value );
        
        return false;
      },
      change: function(event, ui){
        var index=$(this).index(".producto")

        if(ui.item==null){
          $( ".idProducto" ).eq(index).val('');
        }
        return false;
      }
    })
}

$("body").on("click","#agregar",function(e){
	$('select.flexselect').removeData("flexselect");
	var sHtml=$("#tableProductos tbody tr:first").html(); 
	var cant=$("#tableProductos tbody tr").length; 
	$("#tableProductos tbody").append("<tr>"+sHtml+"</tr>"); 
	
	$("#tableProductos tbody tr:last").find("td").eq(0).html(cant+1); 

	$("#tableProductos tbody tr:last").find(".producto").attr("id","item["+cant+"][producto]").attr("name","item["+cant+"][producto]").val("");
	$("#tableProductos tbody tr:last").find(".idProducto").attr("id","item["+cant+"][idProducto]").attr("name","item["+cant+"][idProducto]").val("");
	$("#tableProductos tbody tr:last").find(".descripcion").attr("id","item["+cant+"][descripcion]").attr("name","item["+cant+"][descripcion]").val(""); 
	$("#tableProductos tbody tr:last").find(".cantidad").attr("id","item["+cant+"][cantidad]").attr("name","item["+cant+"][cantidad]").val(""); 
	$("#tableProductos tbody tr:last").find(".idUnidad").attr("id","item["+cant+"][idUnidad]").attr("name","item["+cant+"][idUnidad]").val(""); 
	$("#tableProductos tbody tr:last").find(".valorUnitario").attr("id","item["+cant+"][valorUnitario]").attr("name","item["+cant+"][valorUnitario]").val(''); 
	$("#tableProductos tbody tr:last").find(".subtotal").attr("id","item["+cant+"][subtotal]").attr("name","item["+cant+"][subtotal]").val(""); 
	$("#tableProductos tbody tr:last").find(".iva").attr("id","item["+cant+"][iva]").attr("name","item["+cant+"][iva]").val(''); 
	$("#tableProductos tbody tr:last").find(".total").attr("id","item["+cant+"][total]").attr("name","item["+cant+"][total]").val('');
	autocomplete(); 
})

$("body").on("keyup",".cantidad, .valorUnitario, .iva",function(e){
	var cantidad=$(this).parents("tr").find(".cantidad").val(); 
	var iva=$(this).parents("tr").find(".iva").val(); 
	if(iva=="")iva=0;
	if($(this).parents("tr").find(".valorUnitario").val()!=""){var valorUnitario=eliminarMoneda(eliminarMoneda($(this).parents("tr").find(".valorUnitario").val(),"$",""),",",""); }else{ var valorUnitario=0}
	subtotal=parseInt(cantidad)*parseFloat(valorUnitario); 
	total=parseFloat(subtotal)*(1+(parseFloat(iva)/100)); 
	$(this).parents("tr").find(".total").val(total).trigger("change");
	$(this).parents("tr").find(".subtotal").val(subtotal).trigger("change");
	totalizar(); 
})

$("body").on("keyup","[name='datos[descuento]']",function(e){
	totalizar(); 
})

totalizar=function(){
	var subtotal=0; 
	var valor=0; 
	var iva=0;
	var totalIva=0;
	var total=0; 
	$(".subtotal").each(function(index,element){
		if($(element).val()!=""){valor=parseFloat(eliminarMoneda(eliminarMoneda($(element).val(),"$",""),",","")); }else{ valor=0; }
		subtotal+=valor
	})
	$(".iva").each(function(index,element){
		var subtotal=$(this).parents("tr").find(".subtotal").val(); 
		if(subtotal!=""){subtotal=parseFloat(eliminarMoneda(eliminarMoneda(subtotal,"$",""),",","")); }else{ subtotal=0; }
		if($(element).val()!=""){iva=parseFloat(eliminarMoneda(eliminarMoneda($(element).val(),"$",""),",","")); }else{ iva=0; }
		totalIva+=parseFloat(subtotal)*(parseFloat(iva)/100);
	})
	$(".total").each(function(index,element){
		if($(element).val()!=""){valor=parseFloat(eliminarMoneda(eliminarMoneda($(element).val(),"$",""),",","")); }else{ valor=0; }
		total+=valor
	})
	if($("[name='datos[descuento]']").val()!=""){descuento=parseFloat(eliminarMoneda(eliminarMoneda($("[name='datos[descuento]']").val(),"$",""),",","")); }else{ descuento=0; }
	$("[name='datos[subtotal]']").val(subtotal).trigger("change"); 
	$("[name='datos[iva]']").val(totalIva).trigger("change"); 
	$("[name='datos[total]']").val((subtotal-descuento+totalIva)).trigger("change"); 
}

$("body").on("click","[name='datos[tipoCompra]']",function(e){
    var id=$(this).val(); 
    if(id!=""){
    	var titulo="Servicios"; 
    	if(id==1){
    		titulo="Productos"; 
    		$("#tableProductos thead tr").find("th").eq(1).html(titulo); 
    	}
      $.ajax({
        url:URL+"functions/productosservicios/listarproductosservicios.php", 
        type:"POST", 
        data: {"tipo":id,"idEmpresa":$("[name='datos[idEmpresa']").val()}, 
        dataType: "json",
        }).done(function(msg){  
        	aDatos=[]; 
        	$(".producto").val("");
        	$(".idProducto").val("");
         	msg.forEach(function(element,index){
	      	aDatos.push({
			        value: element.idProductoServicio,
			        label: element.codigo+" - "+element.nombre,
			      })
	      })
	      autocomplete(); 
      });
    }else{
      $(".producto").val("");
    }
    
})


$("body").on("click","#btnGuardar",function(e){
    e.preventDefault();
      if(true === $("#frmGuardar").parsley().validate()){

          swal({
            title: 'Está seguro?',
            text: 'Está a punto de enviar está factura para su gestión!',
            icon: 'warning',
            buttons: ["Cancelar","Si, Enviar!"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                var formu = document.getElementById("frmGuardar");
            
                var data = new FormData(formu);
                $.ajax({
                url:URL+"functions/facturacompra/guardarfactura.php", 
                type:"POST", 
                data: data,
                contentType:false, 
                processData:false, 
                dataType: "json",
                cache:false 
                }).done(function(msg){  
                  if(msg.msg){

                    swal({   
                      title: "Factura enviada!",   
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