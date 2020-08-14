<?php
header('Content-type: application/json');
require_once("../../php/restrict.php");

include_once($CLASS . "data.php");
include_once($CLASS . "lista.php");


$idfamilia  = (isset($_REQUEST['idfamilia'] ) ? $_REQUEST['idfamilia'] : "" );

$oLista = new Lista('clase');
$oLista->setFiltro("idFamilia","=",$idfamilia);
$lista=$oLista->getLista();
$error=true;

echo json_encode(array("clases"=>$lista));
?>