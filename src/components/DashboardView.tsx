import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Users, 
  Hotel,
  Activity
} from 'lucide-react';
import { CalculatedKPIs } from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../lib/formulas';
import { cn } from '../lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  icon: any;
  description?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, description, trend, trendValue, color = "blue" }) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    red: "bg-rose-50 text-rose-600 border-rose-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-xl border", colorMap[color])}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        {description && <p className="text-xs text-slate-400 mt-2">{description}</p>}
      </div>
    </motion.div>
  );
};

interface DashboardViewProps {
  kpis: CalculatedKPIs;
}

const DashboardView: React.FC<DashboardViewProps> = ({ kpis }) => {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
        <p className="text-slate-500 mt-1">Resumen del rendimiento operativo y financiero.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <KPICard title="Ingresos Totales" value={formatCurrency(kpis.ingresosTotales)} icon={DollarSign} color="blue" />
        <KPICard title="Egresos Totales" value={formatCurrency(kpis.egresosTotales)} icon={Activity} color="amber" />
        <KPICard 
          title="Resultado (Neto)" 
          value={formatCurrency(kpis.resultado)} 
          icon={TrendingUp} 
          color={kpis.resultado >= 0 ? "green" : "red"} 
        />
        <KPICard title="Margen de Utilidad" value={formatPercent(kpis.margenUtilidad)} icon={Percent} color="purple" />
        
        <KPICard title="ADR (Tarifa Promedio)" value={formatCurrency(kpis.adr)} icon={DollarSign} color="blue" />
        <KPICard title="REVPAR" value={formatCurrency(kpis.revpar)} icon={DollarSign} color="green" />
        <KPICard title="REVPOR" value={formatCurrency(kpis.revpor)} icon={DollarSign} color="amber" />
        <KPICard title="Ocupación" value={formatPercent(kpis.ocupacionHab)} icon={Hotel} color="blue" />

        <KPICard title="Beneficio no Percibido" value={formatCurrency(kpis.beneficioNoPercibido)} icon={TrendingDown} color="red" />
        <KPICard title="Tarifa de Equilibrio" value={formatCurrency(kpis.tarifaEquilibrio)} icon={Activity} color="orange" />
        <KPICard title="Costo Plaza (Abierta)" value={formatCurrency(kpis.costoPlazaAbierto)} icon={Users} color="blue" />
        <KPICard title="Costo Plaza (Cerrada)" value={formatCurrency(kpis.costoPlazaCerrado)} icon={Users} color="slate" />
        
        <KPICard title="Rentabilidad/Plaza" value={formatCurrency(kpis.rentabilidadPlaza)} icon={TrendingUp} color="green" />
        <KPICard title="Punto Equilibrio ($)" value={formatCurrency(kpis.puntoEquilibrioPesos)} icon={Activity} color="orange" />
      </div>

      <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl shadow-blue-600/20">
        <div>
          <h3 className="text-2xl font-bold mb-2">Análisis de Eficiencia</h3>
          <p className="text-blue-100 max-w-xl">
            Su punto de equilibrio operativo se alcanza actualmente con una facturación de <strong>{formatCurrency(kpis.puntoEquilibrioPesos)}</strong>. 
            Cualquier ingreso por encima de este valor contribuye directamente a la utilidad neta.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 min-w-[140px]">
            <p className="text-blue-100 text-xs uppercase tracking-wider mb-1 font-semibold">Ocup. Plazas</p>
            <p className="text-2xl font-bold">{formatPercent(kpis.ocupacionPlazas)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 min-w-[140px]">
            <p className="text-blue-100 text-xs uppercase tracking-wider mb-1 font-semibold">Plazas Sin Vender</p>
            <p className="text-2xl font-bold">{formatNumber(kpis.plazasSinVender)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
