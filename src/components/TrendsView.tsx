import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts';
import { MonthlyData } from '../types';
import { calculateKPIs } from '../lib/formulas';

interface TrendsViewProps {
  data: MonthlyData[];
}

const TrendsView: React.FC<TrendsViewProps> = ({ data }) => {
  const chartData = [...data].sort((a,b) => a.month.localeCompare(b.month)).map(d => {
    const kpis = calculateKPIs(d);
    return {
      month: d.month,
      ingresos: kpis.ingresosTotales,
      egresos: kpis.egresosTotales,
      resultado: kpis.resultado,
      puntoEquilibrio: kpis.puntoEquilibrioPesos,
      adr: kpis.adr,
      rentabilidad: kpis.rentabilidadPlaza,
      revpar: kpis.revpar,
      revpor: kpis.revpor,
      tarifaEquilibrio: kpis.tarifaEquilibrio,
      ocupacion: kpis.ocupacionHab
    };
  });

  const formatMonth = (str: string) => {
    const [year, month] = str.split('-');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[parseInt(month)-1]}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-xl">
          <p className="font-bold text-slate-800 mb-2">{formatMonth(label)}</p>
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-slate-500">{p.name}:</span>
              <span className="font-mono font-bold text-slate-800">
                {p.name.includes('%') || p.name === 'ocupacion' ? `${p.value.toFixed(1)}%` : `$${p.value.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tendencias</h2>
        <p className="text-slate-500 mt-1">Comparativas históricas y evolución de indicadores clave.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Ingresos vs Egresos vs Resultado */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[450px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Ingresos vs Egresos vs Resultado</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickFormatter={formatMonth} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Area type="monotone" name="Ingresos" dataKey="ingresos" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                <Area type="monotone" name="Egresos" dataKey="egresos" stroke="#f59e0b" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
                <Bar name="Resultado" dataKey="resultado" fill="#10b981" radius={[4, 4, 0, 0]} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ingresos vs Punto de Equilibrio */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[450px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Ingresos vs Punto de Equilibrio</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickFormatter={formatMonth} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Line type="monotone" name="Ingresos" dataKey="ingresos" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Punto Equilibrio" dataKey="puntoEquilibrio" stroke="#ef4444" strokeWidth={2} strokeDasharray="10 10" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ADR vs Rentabilidad */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[450px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Tarifa Promedio (ADR) vs Rentabilidad/Plaza</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickFormatter={formatMonth} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#10b981', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Bar yAxisId="left" name="ADR" dataKey="adr" fill="#3b82f6" opacity={0.6} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" name="Rentabilidad/Plaza" dataKey="rentabilidad" stroke="#10b981" strokeWidth={4} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* REVPAR vs REVPOR */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-[450px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">REVPAR vs REVPOR</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickFormatter={formatMonth} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Area type="stepAfter" name="REVPOR" dataKey="revpor" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                <Area type="stepAfter" name="REVPAR" dataKey="revpar" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsView;
