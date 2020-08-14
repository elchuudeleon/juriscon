<?php
header('Content-type: application/json');
require_once("../../php/restrict.php");

include_once($CLASS . "data.php");
include_once($CLASS . "lista.php");
include_once($CLASS . "control.php");

$oControl=new Control();

date_default_timezone_set("America/Bogota"); 

$datos  = (isset($_REQUEST['datos'] ) ? $_REQUEST['datos'] : "" );


if(!isset($_SESSION)){ session_start(); }

$aDatos["estado"]=3; 
$aDatos["fechaPagoReal"]=$datos["fechaPago"]; 
$oItem=new Data("factura_compra","idFacturaCompra",$datos["idFacturaCompra"]); 
foreach ($aDatos as $key => $value) {
    $oItem->$key=$value; 
}
$oItem->guardar(); 
unset($oItem);

$oItem=new Data("factura_compra_gestion","idFacturaCompra",$datos["idFacturaCompra"]); 
$oItem->comprobanteEgreso=$datos["comprobante"]; 
$oItem->guardar(); 
unset($oItem);

$msg=true; 

echo json_encode(array("msg"=>$msg));
?>