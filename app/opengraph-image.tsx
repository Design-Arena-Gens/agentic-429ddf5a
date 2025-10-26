import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function() {
  return new ImageResponse(
    (
      <div style={{
        fontSize: 64,
        background: 'linear-gradient(135deg,#0B57D0,#1e3a8a)',
        color: 'white',
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        AP MSME DPR Builder
      </div>
    ),
    { ...size }
  );
}
