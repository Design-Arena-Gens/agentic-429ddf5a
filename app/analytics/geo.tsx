"use client";
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

export default function GeoViz(){
  const [features, setFeatures] = useState<any[]>([]);
  useEffect(()=>{ (async()=>{
    const geo = await (await fetch('/geo.json')).json();
    setFeatures(geo.features);
  })(); },[]);

  const option = {
    title: { text: 'AP Market Reach (sample)' },
    tooltip: { trigger: 'item' },
    geo: { map: 'world', roam: true },
    series: [{
      name: 'Markets', type: 'scatter', coordinateSystem: 'geo', data: features.map((f:any)=>({ name: f.properties.name, value: [...f.geometry.coordinates, 10] }))
    }]
  };

  return <div className="card"><ReactECharts option={option} style={{height:400}} /></div>;
}
