"use client";
import { useEffect, useRef, useState } from 'react';
import type { Language } from './LanguageSwitcher';

export function VoiceInput({ lang = 'en', onResult }: { lang?: Language; onResult: (text: string) => void }) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join(' ');
      onResult(transcript);
    };
    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [lang, onResult]);

  const toggle = () => {
    if (!recognitionRef.current) { alert('Speech recognition not supported on this device.'); return; }
    if (recording) { recognitionRef.current.stop(); setRecording(false); }
    else { recognitionRef.current.start(); setRecording(true); }
  };

  return (
    <button className="btn" onClick={toggle}>{recording ? 'Stop Voice' : 'Speak'}</button>
  );
}
