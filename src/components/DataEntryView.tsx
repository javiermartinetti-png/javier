import React, { useState } from 'react';
import { MonthlyData } from '../types';
import { X, Save } from 'lucide-react';

interface DataEntryViewProps {
  currentMonth: string;
  onSave: (data: MonthlyData) => void;
  existingData?: MonthlyData;
}

const DataEntryView: React.FC<DataEntryViewProps> = ({ currentMonth, onSave, existingData }) => {
  const [formData, setFormData] = useState<MonthlyData>(existingData || {
    id: currentMonth,
    month: currentMonth,
    ingresosHoteleria: 15000000,
    ingresosGastronomia: 5000000,
    ingresosOtros: 1000000,
    egresosBienesConsumo: 3000000,
    egresosServicios: 2000000,
    egresosCostoLaboral: 8000000,
    egresosOtros: 500000,
    gastosFijos: 10000000,
    gastosVariables: 4000000,
    habitacionesTotales: 60,
    habitacionesVendidas: 42,
    plazasTotales: 150,
    plazasVendidas: 95,
    empleados: 12
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    alert('Datos guardados correctamente');
  };

  const sections = [
    {
      title: 'Ingresos',
      fields: [
        { name: 'ingresosHoteleria', label: 'Hotelería ($)', type: 'number' },
        { name: 'ingresosGastronomia', label: 'Gastronomía ($)', type: 'number' },
        { name: 'ingresosOtros', label: 'Otros Ingresos ($)', type: 'number' },
      ]
    },
    {
      title: 'Egresos',
      fields: [
        { name: 'egresosBienesConsumo', label: 'Bienes de Consumo ($)', type: 'number' },
        { name: 'egresosServicios', label: 'Servicios ($)', type: 'number' },
        { name: 'egresosCostoLaboral', label: 'Costo Laboral ($)', type: 'number' },
        { name: 'egresosOtros', label: 'Otros Egresos ($)', type: 'number' },
      ]
    },
    {
      title: 'Gastos de Estructura',
      fields: [
        { name: 'gastosFijos', label: 'Gastos Fijos Total ($)', type: 'number' },
        { name: 'gastosVariables', label: 'Gastos Variables Total ($)', type: 'number' },
      ]
    },
    {
      title: 'Operativo',
      fields: [
        { name: 'habitacionesTotales', label: 'Hab. Disponibles (mes)', type: 'number' },
        { name: 'habitacionesVendidas', label: 'Hab. Vendidas (mes)', type: 'number' },
        { name: 'plazasTotales', label: 'Plazas Disponibles (mes)', type: 'number' },
        { name: 'plazasVendidas', label: 'Plazas Vendidas (mes)', type: 'number' },
        { name: 'empleados', label: 'Cantidad Empleados', type: 'number' },
      ]
    }
  ];

  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Carga de Datos</h2>
          <p className="text-slate-500 mt-1">Configure los parámetros para el mes seleccionado.</p>
        </div>
        <div className="bg-slate-100 px-4 py-2 rounded-xl font-mono font-bold text-slate-600">
          {formData.month}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">{section.title}</h3>
              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
        >
          <Save size={20} />
          Guardar Configuración Mensual
        </button>
      </form>
    </div>
  );
};

export default DataEntryView;
