import Header from "@/components/layout/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-wide">
              MOSÉ
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light max-w-3xl mx-auto leading-relaxed">
              Discover authentic African art and handcrafted gifts from talented artisans across the continent
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <button className="bg-text-primary text-background-primary px-8 py-3 text-lg font-medium hover:bg-text-secondary transition-colors">
              SHOP COLLECTION
            </button>
            <button className="border border-text-primary text-text-primary px-8 py-3 text-lg font-medium hover:bg-text-primary hover:text-background-primary transition-colors">
              BECOME A SELLER
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <div className="aspect-square bg-background-secondary mb-4 relative overflow-hidden border border-neutral-800">
                  <div className="absolute top-4 left-4 bg-accent text-text-primary px-2 py-1 text-sm font-medium">
                    SALE
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-background-tertiary to-background-secondary"></div>
                </div>
                <h3 className="text-lg font-medium mb-2">African Mask Collection</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-text-muted line-through">₦25,000</span>
                  <span className="text-text-primary font-medium">₦15,000</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-medium mb-1 text-text-primary">Authenticity Guaranteed</h3>
              <p className="text-text-muted text-sm">Verified artisan creations</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🚚</div>
              <h3 className="font-medium mb-1 text-text-primary">Free Shipping</h3>
              <p className="text-text-muted text-sm">On orders over ₦50,000</p>
            </div>
            <div>
              <div className="text-2xl mb-2">↩️</div>
              <h3 className="font-medium mb-1 text-text-primary">Easy Returns</h3>
              <p className="text-text-muted text-sm">30-day return policy</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-medium mb-1 text-text-primary">24/7 Support</h3>
              <p className="text-text-muted text-sm">Expert customer care</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
