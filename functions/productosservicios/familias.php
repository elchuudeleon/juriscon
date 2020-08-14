<?php
header('Content-type: application/json');
require_once("../../php/restrict.php");

include_once($CLASS . "data.php");
include_once($CLASS . "lista.php");


$idsegmento  = (isset($_REQUEST['idsegmento'] ) ? $_REQUEST['idsegmento'] : "" );

$oLista = new Lista('familia');
$oLista->setFiltro("idSegmento","=",$idsegmento);
$lista=$oLista->getLista();
$error=true;

echo json_encode(array("familias"=>$lista));
?>