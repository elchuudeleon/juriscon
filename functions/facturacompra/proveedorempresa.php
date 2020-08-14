<?php
require_once("php/restrict.php");

include_once($CLASS . "data.php");
include_once($CLASS . "lista.php");

date_default_timezone_set("America/Bogota"); 

if(!isset($_SESSION)){ session_start(); }
$oLista = new Lista();
$sql="SELECT p.idProveedor, p.razonSocial FROM proveedor_empresa as pe 
	  INNER JOIN proveedor as p ON(p.idProveedor=pe.idProveedor)
	  WHERE 0=0 AND pe.idEmpresa=".$_SESSION["idEmpresa"]." ORDER BY p.razonSocial ASC"; 

$aProveedores=$oLista->ejecutarSql($sql); 

?>