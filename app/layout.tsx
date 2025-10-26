import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AP MSME DPR Builder',
  description: 'AI-powered DPR preparation tool for MSMEs in Andhra Pradesh',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js');})}`}} />
        {children}
      </body>
    </html>
  );
}
