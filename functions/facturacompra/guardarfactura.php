<?php
header('Content-type: application/json');
require_once("../../php/restrict.php");

include_once($CLASS . "data.php");
include_once($CLASS . "lista.php");
include_once($CLASS . "control.php");

$oControl=new Control();

date_default_timezone_set("America/Bogota"); 

$datos  = (isset($_REQUEST['datos'] ) ? $_REQUEST['datos'] : "" );
$item  = (isset($_REQUEST['item'] ) ? $_REQUEST['item'] : "" );

if( isset($_FILES['file']) && $_FILES['file'] != 'undefined')
    {
               
        $sNombre = $_FILES['file']['name'];                
        $sExtension = substr(strrchr($sNombre, '.'), 1);
        $sTemporal = $_FILES['file']['tmp_name'];
        
        $nombreEncript = uniqid(); 
        
        $nombre_archivo = "{$nombreEncript}.{$sExtension}"; 
        
        $directorioTmp = 'FACTURACOMPRA/';
        $ubicacionTmp = "{$directorioTmp}{$nombre_archivo}";  

        if(move_uploaded_file($sTemporal, "../../".$directorioTmp.$nombre_archivo))
        {	                                              
            $sFoto = $nombre_archivo;
        }
        else
        {
            $sFoto = "";
        }
    
} 

$oItem=new Data("proveedor","idProveedor",$datos["idProveedor"]); 
$aProveedor=$oItem->getDatos(); 
unset($oItem);

if($aProveedor["periodoPago"]==0){
    $nuevafecha=$datos["fechaRecibido"];
}else{
    $nuevafecha = strtotime ( '+'.$aProveedor["periodoPago"].' day' , strtotime ( $datos["fechaRecibido"] ) ) ;
    $nuevafecha = date ( 'Y-m-d' , $nuevafecha );    
}


if(!isset($_SESSION)){ session_start(); }
$aDatos["fechaRegistro"]=date("Y-m-d H:i:s");
$aDatos["idUsuarioRegistra"]=$_SESSION["idUsuario"]; 
$aDatos["idEmpresa"]=$datos["idEmpresa"]; 
$aDatos["tipoFactura"]=$datos["tipoCompra"]; 
$aDatos["fechaRecibido"]=$datos["fechaRecibido"]; 
$aDatos["fechaPago"]=$nuevafecha; 
$aDatos["idProveedor"]=$datos["idProveedor"]; 
$aDatos["nroFactura"]=$datos["nroFactura"]; 
$aDatos["archivo"]=$sFoto; 
$aDatos["subtotal"]=str_replace("$", "", str_replace(",", "", $datos["subtotal"])); 
$aDatos["descuento"]=str_replace("$", "", str_replace(",", "", $datos["descuento"])); 
$aDatos["iva"]=str_replace("$", "", str_replace(",", "", $datos["iva"])); 
$aDatos["total"]=str_replace("$", "", str_replace(",", "", $datos["total"])); 
$aDatos["estado"]=1; 

$oItem=new Data("factura_compra","idFacturaCompra"); 
foreach($aDatos  as $key => $value){
    $oItem->$key=$value; 
}
$oItem->guardar(); 
$idfactura=$oItem->ultimoId(); 
unset($oItem);

foreach ($item as $key => $value) {
    $aItem["idFacturaCompra"]=$idfactura; 
    $aItem["detalleProducto"]=$value["producto"]; 
    $aItem["idProductoServicio"]=$value["idProducto"]==""?"NULL":$value["idProducto"]; 
    $aItem["descripcion"]=$value["descripcion"]; 
    $aItem["idUnidad"]=$value["idUnidad"]; 
    $aItem["cantidad"]=$value["cantidad"]; 
    $aItem["iva"]=$value["iva"]; 
    $aItem["valorUnitario"]=str_replace("$", "", str_replace(",", "", $value["valorUnitario"])); 
    $aItem["subtotal"]=str_replace("$", "", str_replace(",", "", $value["subtotal"])); 
    $aItem["total"]=str_replace("$", "", str_replace(",", "", $value["total"]));

    $oItem=new Data("factura_compra_item","idFacturaCompraItem"); 
    foreach($aItem  as $key => $value){
        $oItem->$key=$value; 
    }
    $oItem->guardar(); 
    unset($oItem);
}

$msg=true; 

echo json_encode(array("msg"=>$msg));
?>