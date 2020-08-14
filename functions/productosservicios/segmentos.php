<?php
header('Content-type: application/json');
require_once("../../php/restrict.php");

include_once($CLASS . "data.php");
include_once($CLASS . "lista.php");


$idgrupo  = (isset($_REQUEST['idgrupo'] ) ? $_REQUEST['idgrupo'] : "" );

$oLista = new Lista('segmento');
$oLista->setFiltro("idGrupo","=",$idgrupo);
$lista=$oLista->getLista();
$error=true;

echo json_encode(array("segmentos"=>$lista));
?>