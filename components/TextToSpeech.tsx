"use client";
import { useRef, useState } from 'react';
import type { Language } from './LanguageSwitcher';

export function TextToSpeech({ lang = 'en', text }: { lang?: Language; text: string }) {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (!('speechSynthesis' in window)) { alert('Speech synthesis not supported.'); return; }
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    u.onend = () => setSpeaking(false);
    utterRef.current = u;
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  return <button className="btn" onClick={speak}>{speaking ? 'Stop' : 'Listen'}</button>;
}
