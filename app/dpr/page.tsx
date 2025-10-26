"use client";
import { useMemo, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { generateNarrative } from '@/utils/nlg';
import { TextToSpeech } from '@/components/TextToSpeech';

export default function DPRPage(){
  const [summary, setSummary] = useState('This DPR outlines the project for an MSME in Andhra Pradesh producing millet-based snacks...');
  const [lang, setLang] = useState<'en'|'te'>('en');
  const regen = () => setSummary(generateNarrative({ sector: 'food processing', location: 'Anantapur', capacity: '2T/day', usp: 'organic millet snacks for schools', lang }));
  const chartRef = useRef<ReactECharts>(null);
  const option = useMemo(()=>({
    title: { text: 'Projected Monthly Cash Flow (₹ lakh)' },
    xAxis: { type: 'category', data: Array.from({length:12},(_,i)=>`M${i+1}`)},
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [1,2,3,4,5,6,5,4,3,4,5,6] }]
  }),[]);

  const exportPNG = async () => {
    const instance = chartRef.current?.getEchartsInstance();
    if (!instance) return;
    const dataUrl = instance.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#ffffff' });
    const a = document.createElement('a');
    a.href = dataUrl; a.download = 'chart.png'; a.click();
  };

  const exportPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    doc.setFontSize(16);
    doc.text('AP MSME DPR', 40, 40);
    doc.setFontSize(12);
    doc.text(summary, 40, 70, { maxWidth: 515 });
    const instance = chartRef.current?.getEchartsInstance();
    if (instance) {
      const dataUrl = instance.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#ffffff' });
      doc.addImage(dataUrl, 'PNG', 40, 200, 515, 300);
    }
    doc.save('DPR.pdf');
  };

  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Compose DPR</h1>
      <div className="flex items-center gap-3">
        <label>Language
          <select className="border ml-2 p-1" value={lang} onChange={e=>setLang(e.target.value as any)}>
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
          </select>
        </label>
        <button className="btn" onClick={regen}>Generate Narrative</button>
        <TextToSpeech lang={lang} text={summary} />
      </div>
      <textarea className="w-full border p-3 rounded-md h-40" value={summary} onChange={e=>setSummary(e.target.value)} />
      <div className="card">
        <ReactECharts ref={chartRef as any} option={option} style={{height:380}} />
      </div>
      <div className="flex gap-3">
        <button className="btn" onClick={exportPNG}>Export Chart PNG</button>
        <button className="btn" onClick={exportPDF}>Export DPR PDF</button>
      </div>
    </main>
  );
}
