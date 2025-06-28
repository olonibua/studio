import Header from "@/components/layout/header";

export default function CreateGiftPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 tracking-wide">
            Create Gift
          </h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl">
            Design a personalized gift experience with art and music
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gift Type Selection */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-light mb-6">Choose Gift Type</h3>
              {[
                { title: "Art + Playlist", desc: "Curated artwork with custom music" },
                { title: "Collaborative Gift", desc: "Multiple contributors, one gift" },
                { title: "Custom Commission", desc: "Personalized artwork creation" }
              ].map((type, index) => (
                <div key={index} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors cursor-pointer">
                  <h4 className="text-lg font-serif font-light mb-2">{type.title}</h4>
                  <p className="text-neutral-400 text-sm">{type.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Preview Area */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
              <h3 className="text-2xl font-serif font-light mb-6">Gift Preview</h3>
              <div className="aspect-square bg-neutral-800 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-neutral-600">Preview will appear here</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-800 rounded w-1/2"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-neutral-400">Gift platform will be implemented in Phase 6</p>
          </div>
        </div>
      </div>
    </div>
  );
} 