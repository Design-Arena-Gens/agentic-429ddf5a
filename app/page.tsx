import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">AP MSME DPR Builder</h1>
        <p className="text-gray-600 max-w-2xl">Prepare bankable, investor-ready Detailed Project Reports with AI guidance, scheme matching, and financial analytics. Supports English and Telugu.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-2">Start DPR</h2>
          <p className="text-sm text-gray-600 mb-3">Conversational onboarding to capture your business details.</p>
          <Link className="btn" href="/onboarding">Get Started</Link>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Analytics</h2>
          <p className="text-sm text-gray-600 mb-3">Visualize cash flows, sensitivity, and market reach.</p>
          <Link className="btn" href="/analytics">Open Analytics</Link>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Scheme Matcher</h2>
          <p className="text-sm text-gray-600 mb-3">Find eligible subsidies and credit guarantees.</p>
          <Link className="btn" href="/schemes">Browse Schemes</Link>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Compose DPR</h2>
          <p className="text-sm text-gray-600 mb-3">Generate narrative and export bank-ready reports.</p>
          <Link className="btn" href="/dpr">Compose</Link>
        </div>
      </div>
    </main>
  );
}
