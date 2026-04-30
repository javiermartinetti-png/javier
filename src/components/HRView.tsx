import React from 'react';
import { CalculatedKPIs, MonthlyData } from '../types';
import { formatCurrency, formatNumber } from '../lib/formulas';
import { Users, UserPlus, Home } from 'lucide-react';

interface HRViewProps {
  kpis: CalculatedKPIs;
  data: MonthlyData;
}

const HRView: React.FC<HRViewProps> = ({ kpis, data }) => {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Recursos Humanos</h2>
        <p className="text-slate-500 mt-1">Gestión de capital humano y costos asociados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dotación Total</p>
            <p className="text-xl font-bold text-slate-900">{data.empleados} Empleados</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Masa Salarial / Emp.</p>
            <p className="text-xl font-bold text-slate-900">{formatCurrency(kpis.masaSalarialPorEmpleado)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Home size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Empleados por Hab.</p>
            <p className="text-xl font-bold text-slate-900">{kpis.empleadosPorHabitacion.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Impacto en la Operación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-slate-900">{( (data.egresosCostoLaboral / (data.ingresosHoteleria + data.ingresosGastronomia + data.ingresosOtros)) * 100 ).toFixed(1)}%</p>
            <p className="text-sm font-medium text-slate-500">Costo Laboral / Ingresos</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-slate-900">{( (data.egresosCostoLaboral / (data.egresosBienesConsumo + data.egresosServicios + data.egresosCostoLaboral + data.egresosOtros)) * 100 ).toFixed(1)}%</p>
            <p className="text-sm font-medium text-slate-500">Costo Laboral / Egresos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRView;
