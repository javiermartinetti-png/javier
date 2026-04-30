import { MonthlyData, CalculatedKPIs } from '../types';

export function calculateKPIs(data: MonthlyData): CalculatedKPIs {
  const ingresosTotales = data.ingresosHoteleria + data.ingresosGastronomia + data.ingresosOtros;
  const egresosTotales = data.egresosBienesConsumo + data.egresosServicios + data.egresosCostoLaboral + data.egresosOtros;
  const resultado = ingresosTotales - egresosTotales;
  
  const margenUtilidad = ingresosTotales > 0 ? (resultado / ingresosTotales) * 100 : 0;
  
  // ADR = Ingresos Hoteleria / Habitaciones Vendidas
  const adr = data.habitacionesVendidas > 0 ? data.ingresosHoteleria / data.habitacionesVendidas : 0;
  
  const ocupacionHab = data.habitacionesTotales > 0 ? (data.habitacionesVendidas / data.habitacionesTotales) * 100 : 0;
  const ocupacionPlazas = data.plazasTotales > 0 ? (data.plazasVendidas / data.plazasTotales) * 100 : 0;
  
  const revpar = data.habitacionesTotales > 0 ? data.ingresosHoteleria / data.habitacionesTotales : 0;
  const revpor = data.habitacionesVendidas > 0 ? ingresosTotales / data.habitacionesVendidas : 0;
  
  // Costos por plaza
  const costoPlazaAbierto = data.plazasTotales > 0 ? egresosTotales / data.plazasTotales : 0;
  const costoPlazaCerrado = data.plazasTotales > 0 ? data.gastosFijos / data.plazasTotales : 0;
  const rentabilidadPlaza = data.plazasVendidas > 0 ? resultado / data.plazasVendidas : 0;
  
  // Punto de equilibrio
  // Margen de contribución = Ingresos - Gastos Variables
  const margenContribucion = ingresosTotales - data.gastosVariables;
  const razonMargenContribucion = ingresosTotales > 0 ? margenContribucion / ingresosTotales : 0;
  
  const puntoEquilibrioPesos = razonMargenContribucion > 0 ? data.gastosFijos / razonMargenContribucion : 0;
  
  // Tarifa equilibrada (para cubrir costos con la ocupacion actual)
  const tarifaEquilibrio = data.habitacionesVendidas > 0 ? egresosTotales / data.habitacionesVendidas : 0;
  
  const puntoEquilibrioPlazas = adr > 0 ? puntoEquilibrioPesos / adr : 0;
  
  const plazasSinVender = data.plazasTotales - data.plazasVendidas;
  const beneficioNoPercibido = plazasSinVender * (data.plazasVendidas > 0 ? data.ingresosHoteleria / data.plazasVendidas : 0);

  const empleadosPorHabitacion = data.habitacionesTotales > 0 ? data.empleados / data.habitacionesTotales : 0;
  const masaSalarialPorEmpleado = data.empleados > 0 ? data.egresosCostoLaboral / data.empleados : 0;

  return {
    ingresosTotales,
    egresosTotales,
    resultado,
    margenUtilidad,
    margenContribucion,
    adr,
    ocupacionHab,
    ocupacionPlazas,
    revpar,
    revpor,
    costoPlazaAbierto,
    costoPlazaCerrado,
    rentabilidadPlaza,
    puntoEquilibrioPesos,
    puntoEquilibrioPlazas,
    tarifaEquilibrio,
    beneficioNoPercibido,
    plazasSinVender,
    empleadosPorHabitacion,
    masaSalarialPorEmpleado
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
}

export function formatNumber(value: number, decimals = 0) {
  return new Intl.NumberFormat('es-AR', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  }).format(value);
}

export function formatPercent(value: number) {
  return formatNumber(value, 1) + '%';
}
