import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculatedKPIs, MonthlyData } from '../types';
import { formatCurrency, formatPercent } from '../lib/formulas';

interface FinancialViewProps {
  kpis: CalculatedKPIs;
  data: MonthlyData;
}

const FinancialView: React.FC<FinancialViewProps> = ({ kpis, data }) => {
  const revenueData = [
    { name: 'Hotelería', value: data.ingresosHoteleria, color: '#3b82f6' },
    { name: 'Gastronomía', value: data.ingresosGastronomia, color: '#10b981' },
    { name: 'Otros', value: data.ingresosOtros, color: '#8b5cf6' },
  ].filter(d => d.value > 0);

  const expenseData = [
    { name: 'Bienes Consumo', value: data.egresosBienesConsumo, color: '#f59e0b' },
    { name: 'Servicios', value: data.egresosServicios, color: '#6366f1' },
    { name: 'Costo Laboral', value: data.egresosCostoLaboral, color: '#ef4444' },
    { name: 'Otros', value: data.egresosOtros, color: '#94a3b8' },
  ].filter(d => d.value > 0);

  const stats = [
    { label: 'Ingresos Totales', value: formatCurrency(kpis.ingresosTotales) },
    { label: 'Egresos Totales', value: formatCurrency(kpis.egresosTotales) },
    { label: 'Resultado', value: formatCurrency(kpis.resultado), highlight: true },
    { label: 'Punto de Equilibrio ($)', value: formatCurrency(kpis.puntoEquilibrioPesos) },
    { label: 'Margen de Contribución', value: formatCurrency(kpis.margenContribucion) },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Financiero</h2>
        <p className="text-slate-500 mt-1">Análisis detallado de flujos y márgenes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Distribución de Ingresos</h3>
          <div className="flex-1 flex flex-col md:flex-row items-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              {revenueData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{item.name}</span>
                  <span className="font-bold text-slate-800">
                    {formatPercent((item.value / kpis.ingresosTotales) * 100)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Distribución de Egresos</h3>
          <div className="flex-1 flex flex-col md:flex-row items-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              {expenseData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">{item.name}</span>
                  <span className="font-bold text-slate-800">
                    {formatPercent((item.value / kpis.egresosTotales) * 100)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-lg font-bold text-slate-800">Resumen Financiero</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                <th className="px-8 py-4">Concepto</th>
                <th className="px-8 py-4 text-right">Valor</th>
                <th className="px-8 py-4 text-right">Análisis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.map((stat, idx) => (
                <tr key={idx} className={stat.highlight ? "bg-blue-50/50" : ""}>
                  <td className="px-8 py-4 text-sm font-medium text-slate-700">{stat.label}</td>
                  <td className="px-8 py-4 text-right font-mono font-bold text-slate-900">{stat.value}</td>
                  <td className="px-8 py-4 text-right text-xs text-slate-400 italic">
                    {stat.highlight ? "Indicador Crítico" : "Base"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialView;
