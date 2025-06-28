import Header from "@/components/layout/header";
import Link from "next/link";
import { AFRICAN_ART_CATEGORIES } from "@/lib/constants";

// Function to get emoji for category
const getCategoryEmoji = (categoryName: string) => {
  const emojiMap: { [key: string]: string } = {
    'Sculptures': '🗿',
    'Paintings': '🎨',
    'Textiles': '🧵',
    'Jewelry': '💎',
    'Masks': '🎭',
    'Pottery': '🏺',
    'Home Décor': '🏠',
    'Musical Instruments': '🥁'
  };
  return emojiMap[categoryName] || '🎨';
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 tracking-wide">
            Art Categories
          </h1>
          <p className="text-xl text-text-muted font-light max-w-3xl mx-auto">
            Explore our diverse collection of authentic African art organized by traditional and contemporary categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AFRICAN_ART_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="bg-background-secondary border border-neutral-800 rounded-lg overflow-hidden hover:border-text-primary transition-all duration-300">
                {/* Category Image */}
                <div className="aspect-[4/3] bg-background-tertiary relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-background-tertiary to-background-secondary flex items-center justify-center">
                    <div className="text-6xl opacity-50">
                      {getCategoryEmoji(category.name)}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium mb-2 text-text-primary group-hover:text-text-secondary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-3">
                    {category.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">
                      {Math.floor(Math.random() * 50) + 10} items
                    </span>
                    <span className="text-text-primary group-hover:text-text-secondary transition-colors font-medium">
                      Browse →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif font-light text-center mb-12">
            Popular Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Paintings', 'Sculptures', 'Textiles', 'Jewelry'].map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group text-center"
              >
                <div className="aspect-square bg-background-secondary border border-neutral-800 rounded-lg mb-4 flex items-center justify-center group-hover:border-text-primary transition-colors">
                  <span className="text-4xl opacity-50">
                    {getCategoryEmoji(category)}
                  </span>
                </div>
                <h3 className="font-medium text-text-primary group-hover:text-text-secondary transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-background-secondary border border-neutral-800 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-light mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-text-muted mb-6">
              Browse all products or contact our artisans directly for custom pieces
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-text-primary text-background-primary px-6 py-3 rounded-md hover:bg-text-secondary transition-colors font-medium"
              >
                Browse All Products
              </Link>
              <Link
                href="/artists"
                className="border border-text-primary text-text-primary px-6 py-3 rounded-md hover:bg-text-primary hover:text-background-primary transition-colors font-medium"
              >
                Contact Artists
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 