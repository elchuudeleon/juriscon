$(document).ready(function(e){
	$('.select2').select2(); 
	$('.datatooltip').tooltip(); 
	$( ".datepicker" ).datepicker({ dateFormat:'yy-mm-dd' });
})
function dataTable($elemento){
	$($elemento).dataTable({
	  "columnDefs": [
	  ]
	});
}

function eliminarMoneda(valor,buscar,reemplazar){
	return valor.split(buscar).join(reemplazar); 
}
$("body").on("keyup, change",".moneda",function(e){
	$('.moneda').formatCurrency({roundToDecimalPlace:0});
})
$("body").on("keyup",".numero",function(e){
	this.value = this.value.replace(/[^0-9]/g,'');
})
$("body").on("change",".decimal",function(e){
	
	$('.decimal').formatCurrency({roundToDecimalPlace:1, symbol: ''});

})