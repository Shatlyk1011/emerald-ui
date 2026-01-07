export const MOCK_COMPONENTS = {
  header: `
<header class="bg-white border-b border-gray-100 sticky top-0 z-50">
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold">U</span>
      </div>
      <span class="font-bold text-xl tracking-tight">UltraUI</span>
    </div>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
      <a href="#" class="hover:text-blue-600 transition-colors">Features</a>
      <a href="#" class="hover:text-blue-600 transition-colors">Solutions</a>
      <a href="#" class="hover:text-blue-600 transition-colors">Resources</a>
      <a href="#" class="hover:text-blue-600 transition-colors">Pricing</a>
    </nav>
    <div class="flex items-center gap-4">
      <button class="text-sm font-medium text-gray-600 hover:text-gray-900">Log in</button>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
        Get Started
      </button>
    </div>
  </div>
</header>`,
  hero: `
<section class="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
  <div class="container mx-auto px-4 relative z-10 text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      <span class="text-xs font-semibold text-blue-700 tracking-wide uppercase">New: v4.0 is out now</span>
    </div>
    <h1 class="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
      Build beautiful UI <br />
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">faster than ever.</span>
    </h1>
    <p class="max-w-2xl mx-auto text-lg lg:text-xl text-gray-600 mb-12 leading-relaxed">
      Unlock next-level design with our AI-powered interface generator. 
      Tailwind-ready, accessibility-first, and stunning by default.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button class="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-xl">
        Start Generating
      </button>
      <button class="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all">
        View Sandbox
      </button>
    </div>
    <div class="mt-20 relative">
      <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-32 bottom-0"></div>
      <div class="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 shadow-2xl backdrop-blur-sm">
        <div class="rounded-xl bg-white aspect-video flex items-center justify-center text-gray-400 border border-gray-100 overflow-hidden">
          <div class="w-full h-full bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
  </div>
</section>`,
  pricing: `
<section class="bg-gray-50 py-24">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">Simple, transparent pricing</h2>
    <p class="text-gray-600 mb-16 text-center text-lg max-w-2xl mx-auto">Choose the plan that's right for you and start building your next big idea today.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
      <!-- Starter -->
      <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="font-bold text-xl text-gray-900 mb-2">Starter</h3>
        <p class="text-gray-500 text-sm mb-6">Perfect for side projects</p>
        <div class="flex items-baseline gap-1 mb-8">
          <span class="text-4xl font-bold text-gray-900">$0</span>
          <span class="text-gray-500 text-sm">/month</span>
        </div>
        <ul class="space-y-4 mb-8">
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            5 generations / day
          </li>
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Community support
          </li>
        </ul>
        <button class="w-full border border-gray-200 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">Start Free</button>
      </div>

      <!-- Pro -->
      <div class="bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-xl relative scale-105 z-10">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
        <h3 class="font-bold text-xl text-gray-900 mb-2">Pro</h3>
        <p class="text-gray-500 text-sm mb-6">For professional builders</p>
        <div class="flex items-baseline gap-1 mb-8">
          <span class="text-4xl font-bold text-gray-900">$29</span>
          <span class="text-gray-500 text-sm">/month</span>
        </div>
        <ul class="space-y-4 mb-8">
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Unlimited generations
          </li>
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Priority support
          </li>
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Custom themes
          </li>
        </ul>
        <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Get Started Pro</button>
      </div>

      <!-- Enterprise -->
      <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="font-bold text-xl text-gray-900 mb-2">Enterprise</h3>
        <p class="text-gray-500 text-sm mb-6">Scale without limits</p>
        <div class="flex items-baseline gap-1 mb-8">
          <span class="text-4xl font-bold text-gray-900">$99</span>
          <span class="text-gray-500 text-sm">/month</span>
        </div>
        <ul class="space-y-4 mb-8">
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Custom models
          </li>
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            24/7 dedicated support
          </li>
        </ul>
        <button class="w-full border border-gray-200 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">Contact Sales</button>
      </div>
    </div>
  </div>
</section>`,
  footer: `
<footer class="bg-gray-900 text-gray-300 py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
      <div class="col-span-2 md:col-span-1">
        <div class="flex items-center gap-2 mb-6 text-white">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">U</span>
          </div>
          <span class="font-bold text-lg tracking-tight">UltraUI</span>
        </div>
        <p class="text-sm text-gray-400 leading-relaxed mb-6">
          Architecting the future of web design with AI. Join 10,000+ engineers building better apps.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-white transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.1s.493-1.1 1.1-1.1 1.1.496 1.1 1.1-.493 1.1-1.1 1.1zm8 6.891h-2v-3.4c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v3.4h-2v-6h2v.9c.4-.6 1.1-.9 1.9-.9 1.4 0 2.6 1.1 2.6 2.5v3.5z"></path></svg></a>
        </div>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">Product</h4>
        <ul class="space-y-4 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">Generator</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Components</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Templates</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
        <ul class="space-y-4 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
        <ul class="space-y-4 text-sm text-gray-400">
          <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
      <p>&copy; 2026 UltraUI Inc. All rights reserved.</p>
    </div>
  </div>
</footer>`,
}

export const MOCK_SITES = [
  {
    id: 1,
    title: 'Escape Cafe',
    description: 'Go against the grain',
    imageColor: 'bg-zinc-800',
    logoColor: 'bg-white text-black',
    logoLetter: 'E',
    isNew: true,
    isLocked: false,
  },
  {
    id: 2,
    title: 'Humble',
    description: 'AI for smart manufacturing',
    imageColor: 'bg-orange-900/30',
    logoColor: 'bg-orange-500',
    logoLetter: 'H',
    isNew: true,
    isLocked: false,
  },
  {
    id: 3,
    title: 'Mixpanel',
    description: 'Product analytics for mobile, web & more',
    imageColor: 'bg-purple-900/30',
    logoColor: 'bg-purple-600',
    logoLetter: 'M',
    isNew: false,
    isLocked: false,
  },
  {
    id: 4,
    title: 'Claude',
    description: 'AI assistant for life & work',
    imageColor: 'bg-amber-900/30',
    logoColor: 'bg-amber-600',
    logoLetter: 'C',
    isNew: false,
    isLocked: false,
  },
  {
    id: 5,
    title: 'Unified',
    description: 'Centralize your workflow',
    imageColor: 'bg-blue-900/30',
    logoColor: 'bg-blue-500',
    logoLetter: 'U',
    isNew: false,
    isLocked: true,
  },
  {
    id: 6,
    title: 'Approach',
    description: 'Approachable Intelligence',
    imageColor: 'bg-rose-900/30',
    logoColor: 'bg-rose-500',
    logoLetter: 'A',
    isNew: false,
    isLocked: true,
  },
  {
    id: 7,
    title: 'MindMarket',
    description: 'Marketplace for ideas',
    imageColor: 'bg-green-900/30',
    logoColor: 'bg-green-500',
    logoLetter: 'M',
    isNew: false,
    isLocked: true,
  },
  {
    id: 8,
    title: 'Zenith',
    description: 'Reach your peak performance',
    imageColor: 'bg-indigo-900/30',
    logoColor: 'bg-indigo-500',
    logoLetter: 'Z',
    isNew: false,
    isLocked: true,
  },
]