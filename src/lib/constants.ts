export const DEMO_SITE = {
  '/main.jsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
`,
  '/App.jsx': `import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Pricing />
      <Footer />
    </div>
  );
}
`,
  '/components/Header.jsx': `import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">U</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">UltraUI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Solutions</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Resources</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Log in</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
`,
  '/components/Hero.jsx': `import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
       <div className="container mx-auto px-4 relative z-10 text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
           <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">New: v4.0 is out now</span>
         </div>
         <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
           Build beautiful UI <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">faster than ever.</span>
         </h1>
         <p className="max-w-2xl mx-auto text-lg lg:text-xl text-gray-600 mb-12 leading-relaxed">
           Unlock next-level design with our AI-powered interface generator. 
           Tailwind-ready, accessibility-first, and stunning by default.
         </p>
         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <button className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-xl">
             Start Generating
           </button>
           <button className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all">
             View Sandbox
           </button>
         </div>
       </div>
    </section>
  );
}
`,
  '/components/Pricing.jsx': `import React from 'react';

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left mt-16">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
             <h3 className="font-bold text-xl text-gray-900 mb-2">Starter</h3>
             <span className="text-4xl font-bold text-gray-900">$0</span>
             <button className="w-full mt-8 border border-gray-200 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-50">Start Free</button>
          </div>
          <div className="bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-xl relative scale-105 z-10">
             <h3 className="font-bold text-xl text-gray-900 mb-2">Pro</h3>
             <span className="text-4xl font-bold text-gray-900">$29</span>
             <button className="w-full mt-8 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">Get Started Pro</button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
             <h3 className="font-bold text-xl text-gray-900 mb-2">Enterprise</h3>
             <span className="text-4xl font-bold text-gray-900">$99</span>
             <button className="w-full mt-8 border border-gray-200 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-50">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  '/components/Footer.jsx': `import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">U</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">UltraUI</span>
           </div>
           <p className="text-gray-500 text-sm">&copy; 2026 UltraUI Inc.</p>
        </div>
      </div>
    </footer>
  );
}
`,
}

export const MOCK_CHAT_HISTORY = [
  {
    id: 1,
    role: 'user',
    content: 'Create a modern landing page with a hero section',
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    role: 'agent',
    content:
      "I'll create a modern landing page with a hero section for you. I'll include a gradient background, compelling headline, and call-to-action buttons.",
    timestamp: '10:30 AM',
  },
  {
    id: 3,
    role: 'user',
    content: 'Can you add a features section below the hero?',
    timestamp: '10:32 AM',
  },
  {
    id: 4,
    role: 'agent',
    content:
      "Absolutely! I've added a features section with three feature cards showcasing key benefits. Each card has an icon, title, and description.",
    timestamp: '10:32 AM',
  },
  {
    id: 5,
    role: 'user',
    content: 'Make the buttons more prominent with better colors',
    timestamp: '10:35 AM',
  },
  {
    id: 6,
    role: 'agent',
    content:
      "Done! I've updated the buttons with a vibrant gradient and added hover effects for better interactivity.",
    timestamp: '10:35 AM',
  },
]
