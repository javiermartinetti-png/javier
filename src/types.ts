export interface MonthlyData {
  id: string;
  month: string; // "YYYY-MM"
  
  // Inputs
  ingresosHoteleria: number;
  ingresosGastronomia: number;
  ingresosOtros: number;
  
  egresosBienesConsumo: number;
  egresosServicios: number;
  egresosCostoLaboral: number;
  egresosOtros: number;
  
  gastosFijos: number;
  gastosVariables: number;
  
  habitacionesTotales: number;
  habitacionesVendidas: number;
  plazasTotales: number;
  plazasVendidas: number;
  
  empleados: number;
}

export interface CalculatedKPIs {
  ingresosTotales: number;
  egresosTotales: number;
  resultado: number;
  
  margenUtilidad: number;
  margenContribucion: number;
  
  adr: number; // Tarifa promedio
  ocupacionHab: number;
  ocupacionPlazas: number;
  revpar: number;
  revpor: number;
  
  costoPlazaAbierto: number;
  costoPlazaCerrado: number;
  rentabilidadPlaza: number;
  
  puntoEquilibrioPesos: number;
  puntoEquilibrioPlazas: number;
  tarifaEquilibrio: number;
  
  beneficioNoPercibido: number; // Plazas no vendidas * ADR
  plazasSinVender: number;
  
  empleadosPorHabitacion: number;
  masaSalarialPorEmpleado: number;
}
