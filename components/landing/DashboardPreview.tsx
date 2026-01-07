'use client';

export default function DashboardPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="relative rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden p-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-blue-500/5"></div>
        <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
          {/* Mock Browser Header */}
          <div className="h-8 bg-white border-b border-slate-100 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-orange-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          </div>
          
          {/* Mock Content Area */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90 select-none pointer-events-none">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm col-span-2">
              <div className="h-4 w-1/3 bg-slate-100 rounded mb-4"></div>
              <div className="flex items-end gap-2 h-32">
                <div className="w-full bg-rose-50 rounded-t h-[40%]"></div>
                <div className="w-full bg-rose-100 rounded-t h-[70%]"></div>
                <div className="w-full bg-rose-500 rounded-t h-[55%]"></div>
                <div className="w-full bg-rose-200 rounded-t h-[80%]"></div>
                <div className="w-full bg-rose-50 rounded-t h-[45%]"></div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-100"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}