import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as LineTooltip, PieChart, Pie, Cell, Tooltip as PieTooltip, Legend } from 'recharts';

const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AutoChart({ data }) {
  if (!data || data.length === 0) return null;

  const keys = Object.keys(data[0]);
  let numKey = keys.find(k => typeof data[0][k] === 'number');
  let catKey = keys.find(k => typeof data[0][k] === 'string' && isNaN(Number(data[0][k])));

  if (!numKey) return null; 
  if (!catKey) catKey = 'index'; 

  const mappedData = data.map((d, i) => ({
    name: d[catKey] || `Item ${i+1}`,
    value: d[numKey]
  }));

  const isLine = mappedData.length > 5;

  return (
    <div className="h-72 w-full mt-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/50 shadow-inner">
      <p className="text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">{numKey} by {catKey}</p>
      <ResponsiveContainer width="100%" height="90%">
        {isLine ? (
          <LineChart data={mappedData}>
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={30} />
            <LineTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
            <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3, fill: '#4f46e5' }} />
          </LineChart>
        ) : (
          <PieChart>
             <Pie
               data={mappedData}
               innerRadius={60}
               outerRadius={90}
               paddingAngle={3}
               dataKey="value"
               nameKey="name"
             >
               {mappedData.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
               ))}
             </Pie>
             <PieTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
             <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
