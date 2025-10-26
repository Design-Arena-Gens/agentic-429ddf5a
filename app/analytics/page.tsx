"use client";
import ReactECharts from 'echarts-for-react';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
const GeoViz = dynamic(()=>import('./geo'), { ssr: false });

export default function AnalyticsPage() {
  const [revenue, setRevenue] = useState(12);
  const [cost, setCost] = useState(8);
  const months = useMemo(()=>Array.from({length:24},(_,i)=>i+1),[]);
  const cumulative = useMemo(()=>months.map(m=> (revenue-cost)*m ),[months,revenue,cost]);

  const cashFlowOption = useMemo(()=>({
    title: { text: 'Cash Flow Timeline' },
    tooltip: {},
    xAxis: { type: 'category', data: months.map(m=>`M${m}`)},
    yAxis: { type: 'value', name: '₹ lakh' },
    series: [{ type: 'line', data: cumulative }]
  }),[months,cumulative]);

  const mixOption = useMemo(()=>({
    title: { text: 'Cost vs Revenue' },
    tooltip: { trigger: 'item' },
    legend: { top: 'bottom' },
    series: [
      { name: 'Mix', type: 'pie', radius: '50%', data: [
        { value: revenue, name: 'Revenue' },
        { value: cost, name: 'Cost' },
      ]}
    ]
  }),[revenue,cost]);

  const sensitivity = useMemo(()=>{
    const xs = [0.8,0.9,1,1.1,1.2];
    const ys = [0.8,0.9,1,1.1,1.2];
    return { xs, ys, data: ys.flatMap((y, yi) => xs.map((x, xi) => [xi, yi, Math.round((revenue*x - cost*y)*12)])) };
  },[revenue,cost]);

  const heatOption = useMemo(()=>({
    title: { text: 'Sensitivity Heatmap (Annual Profit ₹ lakh)' },
    tooltip: { position: 'top' },
    grid: { height: '50%', top: '10%' },
    xAxis: { type: 'category', data: sensitivity.xs.map(x=>`${Math.round(x*100)}% Price`) },
    yAxis: { type: 'category', data: sensitivity.ys.map(y=>`${Math.round(y*100)}% Cost`) },
    visualMap: { min: -50, max: 50, calculable: true, orient: 'horizontal', left: 'center', bottom: '5%' },
    series: [{ name: 'Profit', type: 'heatmap', data: sensitivity.data, label: { show: true } }]
  }),[sensitivity]);

  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <div className="card flex gap-4 items-center">
        <label>Revenue ₹L/mo <input className="border ml-2 p-1" type="number" value={revenue} onChange={e=>setRevenue(Number(e.target.value)||0)} /></label>
        <label>Cost ₹L/mo <input className="border ml-2 p-1" type="number" value={cost} onChange={e=>setCost(Number(e.target.value)||0)} /></label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card"><ReactECharts option={cashFlowOption} style={{height:400}} /></div>
        <div className="card"><ReactECharts option={mixOption} style={{height:400}} /></div>
        <div className="md:col-span-2 card"><ReactECharts option={heatOption} style={{height:420}} /></div>
        <div className="md:col-span-2"><GeoViz /></div>
      </div>
    </main>
  );
}
