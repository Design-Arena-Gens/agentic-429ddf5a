"use client";
import { useState, useEffect } from 'react';

export type Language = 'en' | 'te';

export function LanguageSwitcher({ onChange }: { onChange?: (lang: Language) => void }) {
  const [lang, setLang] = useState<Language>('en');
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Language | null) : null;
    if (stored) setLang(stored);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', lang);
    onChange?.(lang);
  }, [lang, onChange]);
  return (
    <div className="inline-flex gap-2" role="group" aria-label="Language switcher">
      <button className={`btn ${lang==='en'?'bg-primary text-white':'bg-gray-100 text-gray-800'}`} onClick={() => setLang('en')}>English</button>
      <button className={`btn ${lang==='te'?'bg-primary text-white':'bg-gray-100 text-gray-800'}`} onClick={() => setLang('te')}>తెలుగు</button>
    </div>
  );
}
