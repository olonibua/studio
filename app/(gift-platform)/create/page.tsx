import Header from "@/components/layout/header";

export default function CreateGiftPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-4 tracking-wide text-text-primary">
            Create Gift
          </h1>
          <p className="text-xl text-text-muted font-light max-w-2xl">
            Design a personalized gift experience with art and music
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gift Type Selection */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-light mb-6 text-text-primary">Choose Gift Type</h3>
              {[
                { title: "Art + Playlist", desc: "Curated artwork with custom music" },
                { title: "Collaborative Gift", desc: "Multiple contributors, one gift" },
                { title: "Custom Commission", desc: "Personalized artwork creation" }
              ].map((type, index) => (
                <div key={index} className="bg-background-secondary border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors cursor-pointer">
                  <h4 className="text-lg font-serif font-light mb-2 text-text-primary">{type.title}</h4>
                  <p className="text-text-muted text-sm">{type.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Preview Area */}
            <div className="bg-background-secondary border border-neutral-800 rounded-lg p-8">
              <h3 className="text-2xl font-serif font-light mb-6 text-text-primary">Gift Preview</h3>
              <div className="aspect-square bg-background-tertiary rounded-lg mb-4 flex items-center justify-center">
                <span className="text-text-muted">Preview will appear here</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-background-tertiary rounded w-3/4"></div>
                <div className="h-3 bg-background-tertiary rounded w-1/2"></div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-text-muted">Gift platform will be implemented in Phase 6</p>
          </div>
        </div>
      </div>
    </div>
  );
} 