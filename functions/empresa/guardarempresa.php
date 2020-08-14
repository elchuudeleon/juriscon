<?php
header('Content-type: application/json');
require_once("../../php/restrict.php");

include_once($CLASS . "data.php");
include_once($CLASS . "lista.php");

date_default_timezone_set("America/Bogota"); 

$datos  = (isset($_REQUEST['datos'] ) ? $_REQUEST['datos'] : "" );
$datosRepresentante  = (isset($_REQUEST['representante'] ) ? $_REQUEST['representante'] : "" );

$sFoto = "";
$sRepresentante = "";
$sCamara = "";
$sRut = "";

if( isset($_FILES['cedula']) && $_FILES['file'] != 'undefined')
    {
               
        $sNombre = $_FILES['file']['name'];                
        $sExtension = substr(strrchr($sNombre, '.'), 1);
        $sTemporal = $_FILES['file']['tmp_name'];
        
        $nombreEncript = uniqid(); 
        
        $nombre_archivo = "{$nombreEncript}.{$sExtension}"; 
        
        $directorioTmp = 'REPRESENTANTE/'.$directorio;
        $ubicacionTmp = "{$directorioTmp}{$nombre_archivo}";  

        if(move_uploaded_file($sTemporal, "../../".$directorioTmp.$nombre_archivo))
        {	
            $sRepresentante = 'REPRESENTANTE/'.$nombre_archivo;
        }
    
} 
if( isset($_FILES['logo']) && $_FILES['logo'] != 'undefined')
    {
               
        $sNombre = $_FILES['logo']['name'];                
        $sExtension = substr(strrchr($sNombre, '.'), 1);
        $sTemporal = $_FILES['logo']['tmp_name'];
        
        $nombreEncript = uniqid(); 
        
        $nombre_archivo = "{$nombreEncript}.{$sExtension}"; 
        
        $directorioTmp = 'EMPRESA/'.$directorio;
        $ubicacionTmp = "{$directorioTmp}{$nombre_archivo}";  

        if(move_uploaded_file($sTemporal, "../../".$directorioTmp.$nombre_archivo))
        {   
            $sFoto = 'EMPRESA/'.$nombre_archivo;
        }
    
} 
if( isset($_FILES['camaraComercio']) && $_FILES['camaraComercio'] != 'undefined')
    {
               
        $sNombre = $_FILES['camaraComercio']['name'];                
        $sExtension = substr(strrchr($sNombre, '.'), 1);
        $sTemporal = $_FILES['camaraComercio']['tmp_name'];
        
        $nombreEncript = uniqid(); 
        
        $nombre_archivo = "{$nombreEncript}.{$sExtension}"; 
        
        $directorioTmp = 'CAMARACOMERCIO/'.$directorio;
        $ubicacionTmp = "{$directorioTmp}{$nombre_archivo}";  

        if(move_uploaded_file($sTemporal, "../../".$directorioTmp.$nombre_archivo))
        {   
            $sCamara = 'CAMARACOMERCIO/'.$nombre_archivo;
        }
    
} 
if( isset($_FILES['rut']) && $_FILES['rut'] != 'undefined')
    {
               
        $sNombre = $_FILES['rut']['name'];                
        $sExtension = substr(strrchr($sNombre, '.'), 1);
        $sTemporal = $_FILES['rut']['tmp_name'];
        
        $nombreEncript = uniqid(); 
        
        $nombre_archivo = "{$nombreEncript}.{$sExtension}"; 
        
        $directorioTmp = 'RUT/'.$directorio;
        $ubicacionTmp = "{$directorioTmp}{$nombre_archivo}";  

        if(move_uploaded_file($sTemporal, "../../".$directorioTmp.$nombre_archivo))
        {   
            $sRut = 'RUT/'.$nombre_archivo;
        }
    
} 


$oItem=new Data("empresa","nit",$datos["NIT"]); 
$aValidate=$oItem->getDatos(); 
unset($oItem); 
if(empty($aValidate)){
    $aDatos["tipoPersona"]=$datos["tipoPersona"]; 
    $aDatos["nit"]=$datos["NIT"]; 
    $aDatos["digitoVerificador"]=$datos["digitoVerificador"]; 
    $aDatos["razonSocial"]=$datos["razonSocial"]; 
    $aDatos["email"]=$datos["correo"]; 
    $aDatos["telefono"]=$datos["telefono"]; 
    $aDatos["idDepartamento"]=$datos["idDepartamento"]; 
    $aDatos["idCiudad"]=$datos["idCiudad"]; 
    $aDatos["direccion"]=$datos["direccion"]; 
    $aDatos["estado"]=1; 
    $aDatos["logo"]=$sFoto; 
    $aDatos["camaraComercio"]=$sCamara; 
    $aDatos["rut"]=$sRut; 
    $aDatos["fechaRegistro"]=date("Y-m-d H:i:s"); 

    $oItem=new Data("empresa","idEmpresa"); 
    foreach($aDatos  as $key => $value){
        $oItem->$key=$value; 
    }
    $oItem->guardar(); 
    $idEmpresa=$oItem->ultimoId(); 
    unset($oItem);


    $aRepresentante["tipoDocumento"]=$datosRepresentante["tipoDocumento"];
    $aRepresentante["numeroDocumento"]=$datosRepresentante["numeroDocumento"];  
    $aRepresentante["nombres"]=$datosRepresentante["nombres"]; 
    $aRepresentante["apellidos"]=$datosRepresentante["apellidos"]; 
    $aRepresentante["email"]=$datosRepresentante["correo"]; 
    $aRepresentante["telefono"]=$datosRepresentante["telefono"]; 
    $aRepresentante["cedula"]=$sRepresentante; 
    $aRepresentante["idEmpresa"]=$idEmpresa; 
    $aRepresentante["fechaRegistro"]=date("Y-m-d H:i:s"); 

    $oItem=new Data("representante_legal","idRepresentanteLegal"); 
    foreach($aRepresentante  as $key => $value){
        $oItem->$key=$value; 
    }
    $oItem->guardar(); 
    unset($oItem);


    $aUsuario["nombreUsuario"]="Administrador";
    $aUsuario["apellidoUsuario"]=$datos["razonSocial"];
    $aUsuario["clave"]=md5("123456"); 
    $aUsuario["tipoDocumento"]=3; 
    $aUsuario["numeroDocumento"]=$datos["NIT"]; 
    $aUsuario["genero"]="NULL"; 
    $aUsuario["correo"]=$datos["correo"]; 
    $aUsuario["telefono"]=$datos["telefono"]; 
    $aUsuario["direccion"]=$datos["direccion"]; 
    $aUsuario["idDepartamentoResidencia"]=$datos["idDepartamento"]; 
    $aUsuario["idCiudadResidencia"]=$datos["idCiudad"]; 
    $aUsuario["idRol"]=3; 
    $aUsuario["cambiarClave"]=1; 
    $aUsuario["ingresoPlataforma"]=1; 
    $aUsuario["estado"]=1; 
    $aUsuario["foto"]=$sFoto; 
    $aUsuario["fechaRegistro"]=date("Y-m-d H:i:s"); 

    $oItem=new Data("usuario","idUsuario"); 
    foreach($aUsuario  as $key => $value){
        $oItem->$key=$value; 
    }
    $usuario=$oItem->guardar(); 
    unset($oItem);


    $oItem=new Data("empresa_acceso","idEmpresaAcceso"); 
    $oItem->idUsuario=$usuario; 
    $oItem->idEmpresa=$idEmpresa; 
    $usuario=$oItem->guardar(); 
    unset($oItem);

    $msg=true; 
}else{
    $msg=false; 
}
 

echo json_encode(array("msg"=>$msg));
?>