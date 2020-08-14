<?php
require_once($CLASS."sql.php"); 

class Empleados extends Sql{
	
	public function getEmpleadosEmpresa($aDatos=array()){

		$condicion=""; 
		if($_SESSION["idEmpresa"]!=""){
			$condicion.=" AND eil.idEmpresa=".$_SESSION["idEmpresa"]; 
		}
		if($aDatos["estado"]!=""){
			$condicion.=" AND e.estado=".$aDatos["estado"]; 
		}
		$sql="SELECT e.idEmpleado, e.fechaRegistro, e.tipoDocumento, e.numeroDocumento, e.nombre, e.apellido, e.genero, 
			  e.email, eil.estado 
			  FROM empleado as e 
			  INNER JOIN empleado_informacion_laboral as eil ON(eil.idEmpleado=e.idEmpleado)
			  WHERE 0=0 ".$condicion." ORDER BY e.nombre ASC";

	    $aArray=$this->ejecutarSql($sql); 
	    return $aArray; 
	}

	
}
?>