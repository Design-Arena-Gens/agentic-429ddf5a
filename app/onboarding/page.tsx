"use client";
import { useState } from 'react';
import { LanguageSwitcher, type Language } from '@/components/LanguageSwitcher';
import { VoiceInput } from '@/components/VoiceInput';

const t = (lang: Language) => ({
  title: lang==='te' ? 'సంభాషణాత్మక ఆన్‌బోర్డింగ్' : 'Conversational Onboarding',
  prompt: lang==='te' ? 'మీ వ్యాపారం గురించి చెప్పండి' : 'Tell us about your business',
  start: lang==='te' ? 'విశ్లేషణ ప్రారంభించండి' : 'Start Analysis',
});

export default function OnboardingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [input, setInput] = useState('We make organic millet snacks for local markets. Capex ₹15 lakh, opex ₹2 lakh/month.');

  const submit = async () => {
    const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang, input }) });
    const data = await res.json();
    alert(`${data.message}`);
  };

  return (
    <main className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t(lang).title}</h1>
        <LanguageSwitcher onChange={setLang} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 card space-y-3">
          <label className="text-sm text-gray-600" htmlFor="desc">{t(lang).prompt}</label>
          <textarea id="desc" className="w-full h-40 p-3 border rounded-md" value={input} onChange={e=>setInput(e.target.value)} />
          <div className="flex gap-3">
            <button className="btn" onClick={submit}>{t(lang).start}</button>
            <VoiceInput lang={lang} onResult={(text)=>setInput(text)} />
          </div>
        </div>
        <div className="card text-sm text-gray-700">
          <p>Tips: Mention sector, capacity, pricing, location, inputs, customers.</p>
        </div>
      </div>
    </main>
  );
}
