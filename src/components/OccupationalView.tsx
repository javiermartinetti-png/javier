import React from 'react';
import { CalculatedKPIs, MonthlyData } from '../types';
import { formatNumber, formatPercent } from '../lib/formulas';
import { Bed, Home, Calendar, UserMinus } from 'lucide-react';

interface OccupationalViewProps {
  kpis: CalculatedKPIs;
  data: MonthlyData;
}

const OccupationalView: React.FC<OccupationalViewProps> = ({ kpis, data }) => {
  const stats = [
    { label: 'Habitaciones Totales (Mes)', value: data.habitacionesTotales, icon: Home },
    { label: 'Habitaciones Vendidas', value: data.habitacionesVendidas, icon: Calendar },
    { label: 'Plazas Totales (Mes)', value: data.plazasTotales, icon: Bed },
    { label: 'Plazas Vendidas', value: data.plazasVendidas, icon: Bed },
    { label: 'Plazas Sin Vender', value: kpis.plazasSinVender, icon: UserMinus, warning: true },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Ocupacional</h2>
        <p className="text-slate-500 mt-1">Métricas de inventario y capacidad utilizada.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className={`p-2 rounded-lg inline-block mb-4 ${stat.warning ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{formatNumber(stat.value)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Eficiencia de Ocupación</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 font-medium">Ocupación de Habitaciones</span>
                <span className="text-blue-600 font-bold">{formatPercent(kpis.ocupacionHab)}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${kpis.ocupacionHab}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500 font-medium">Ocupación de Plazas (Camas)</span>
                <span className="text-emerald-600 font-bold">{formatPercent(kpis.ocupacionPlazas)}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${kpis.ocupacionPlazas}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-lg font-bold mb-4">Promedios Diarios</h3>
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Habitaciones / Día</p>
              <p className="text-3xl font-light">{(data.habitacionesVendidas / 30).toFixed(1)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-2">Plazas / Día</p>
              <p className="text-3xl font-light">{(data.plazasVendidas / 30).toFixed(1)}</p>
            </div>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            * Basado en un mes promedio de 30 días para fines de proyección rápida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OccupationalView;
