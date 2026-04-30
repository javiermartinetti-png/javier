/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import FinancialView from './components/FinancialView';
import TrendsView from './components/TrendsView';
import DataEntryView from './components/DataEntryView';
import OccupationalView from './components/OccupationalView';
import HRView from './components/HRView';
import { MonthlyData } from './types';
import { calculateKPIs, formatCurrency, formatPercent } from './lib/formulas';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';

const MOCK_DATA: MonthlyData[] = [
  {
    id: '2026-01',
    month: '2026-01',
    ingresosHoteleria: 12000000,
    ingresosGastronomia: 4000000,
    ingresosOtros: 800000,
    egresosBienesConsumo: 2500000,
    egresosServicios: 1800000,
    egresosCostoLaboral: 7500000,
    egresosOtros: 400000,
    gastosFijos: 9500000,
    gastosVariables: 3500000,
    habitacionesTotales: 60 * 31,
    habitacionesVendidas: 40 * 31,
    plazasTotales: 150 * 31,
    plazasVendidas: 90 * 31,
    empleados: 11
  },
  {
    id: '2026-02',
    month: '2026-02',
    ingresosHoteleria: 14000000,
    ingresosGastronomia: 4500000,
    ingresosOtros: 900000,
    egresosBienesConsumo: 2800000,
    egresosServicios: 1900000,
    egresosCostoLaboral: 7500000,
    egresosOtros: 450000,
    gastosFijos: 9500000,
    gastosVariables: 3800000,
    habitacionesTotales: 60 * 28,
    habitacionesVendidas: 45 * 28,
    plazasTotales: 150 * 28,
    plazasVendidas: 105 * 28,
    empleados: 11
  },
  {
    id: '2026-03',
    month: '2026-03',
    ingresosHoteleria: 15500000,
    ingresosGastronomia: 5200000,
    ingresosOtros: 1100000,
    egresosBienesConsumo: 3100000,
    egresosServicios: 2100000,
    egresosCostoLaboral: 8200000,
    egresosOtros: 500000,
    gastosFijos: 10000000,
    gastosVariables: 4200000,
    habitacionesTotales: 60 * 31,
    habitacionesVendidas: 48 * 31,
    plazasTotales: 150 * 31,
    plazasVendidas: 115 * 31,
    empleados: 12
  },
  {
    id: '2026-04',
    month: '2026-04',
    ingresosHoteleria: 16800000,
    ingresosGastronomia: 5800000,
    ingresosOtros: 1200000,
    egresosBienesConsumo: 3400000,
    egresosServicios: 2300000,
    egresosCostoLaboral: 8200000,
    egresosOtros: 550000,
    gastosFijos: 10000000,
    gastosVariables: 4500000,
    habitacionesTotales: 60 * 30,
    habitacionesVendidas: 52 * 30,
    plazasTotales: 150 * 30,
    plazasVendidas: 125 * 30,
    empleados: 12
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [allData, setAllData] = useState<MonthlyData[]>(MOCK_DATA);
  const [selectedMonth, setSelectedMonth] = useState('2026-04');

  const currentData = useMemo(() => {
    return allData.find(d => d.month === selectedMonth) || allData[allData.length - 1];
  }, [allData, selectedMonth]);

  const kpis = useMemo(() => {
    return calculateKPIs(currentData);
  }, [currentData]);

  const handleSaveData = (data: MonthlyData) => {
    setAllData(prev => {
      const exists = prev.findIndex(d => d.month === data.month);
      if (exists >= 0) {
        const next = [...prev];
        next[exists] = data;
        return next;
      }
      return [...prev, data];
    });
    setSelectedMonth(data.month);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView kpis={kpis} />;
      case 'basic': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Ingresos</p>
            <p className="text-4xl font-bold text-slate-900">{formatCurrency(kpis.ingresosTotales)}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Egresos</p>
            <p className="text-4xl font-bold text-slate-900">{formatCurrency(kpis.egresosTotales)}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Resultado</p>
            <p className="text-4xl font-bold text-blue-600">{formatCurrency(kpis.resultado)}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Ocupación</p>
            <p className="text-4xl font-bold text-emerald-600">{formatPercent(kpis.ocupacionHab)}</p>
          </div>
        </div>
      );
      case 'trends': return <TrendsView data={allData} />;
      case 'financial': return <FinancialView kpis={kpis} data={currentData} />;
      case 'occupational': return <OccupationalView kpis={kpis} data={currentData} />;
      case 'hr': return <HRView kpis={kpis} data={currentData} />;
      case 'entry': return <DataEntryView currentMonth={selectedMonth} onSave={handleSaveData} existingData={currentData} />;
      default: return <DashboardView kpis={kpis} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-center mb-10 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 px-2">
            <Calendar size={20} className="text-blue-500" />
            <div className="relative group">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-transparent font-bold text-slate-800 pr-8 focus:outline-none cursor-pointer"
              >
                {allData.sort((a,b) => b.month.localeCompare(a.month)).map(d => (
                  <option key={d.month} value={d.month}>{d.month}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">YTD Resultado</p>
              <p className="text-sm font-bold text-emerald-600">
                {formatCurrency(allData.reduce((acc, d) => acc + (d.ingresosHoteleria + d.ingresosGastronomia + d.ingresosOtros) - (d.egresosBienesConsumo + d.egresosServicios + d.egresosCostoLaboral + d.egresosOtros), 0))}
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
              JM
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + selectedMonth}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
