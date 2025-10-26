"use client";
import { useEffect, useState } from 'react';

export default function SchemesPage(){
  const [sector, setSector] = useState('food_processing');
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{ (async()=>{
    const res = await fetch(`/api/schemes?sector=${sector}`);
    const json = await res.json();
    setItems(json.schemes);
  })(); }, [sector]);
  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Scheme Matcher</h1>
      <div className="card flex gap-3 items-center">
        <label>Sector
          <select className="border ml-2 p-1" value={sector} onChange={e=>setSector(e.target.value)}>
            <option value="food_processing">Food Processing</option>
            <option value="textiles">Textiles</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((s)=> (
          <div className="card" key={s.id}>
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600">Subsidy: {s.loan_subsidy_pct}% up to ₹{s.max_subsidy_lakh} lakh</p>
            <ul className="list-disc ml-5 text-sm mt-2">
              {s.eligibility.map((e: string)=> <li key={e}>{e}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
