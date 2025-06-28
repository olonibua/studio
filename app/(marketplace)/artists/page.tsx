import Header from "@/components/layout/header";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import BecomeSellerButton from "@/components/ui/become-seller-button";

export default function ArtistsPage() {
  // Mock artists data
  const artists = [
    {
      id: "1",
      name: "Adebayo Arts",
      location: "Lagos, Nigeria",
      specialties: ["Masks", "Wood Carving", "Traditional Art"],
      rating: 4.8,
      totalSales: 156,
      joinedDate: "2022-03-15",
      description: "Master craftsman specializing in traditional West African masks and wood carvings with over 20 years of experience.",
      featured: true,
      verified: true,
      productCount: 24,
      averagePrice: 65000,
    },
    {
      id: "2",
      name: "Ghana Crafts Collective",
      location: "Accra, Ghana",
      specialties: ["Textiles", "Kente", "Weaving"],
      rating: 4.9,
      totalSales: 203,
      joinedDate: "2021-11-08",
      description: "Authentic Ghanaian textile artists preserving the traditional art of Kente weaving and modern African fashion.",
      featured: true,
      verified: true,
      productCount: 18,
      averagePrice: 85000,
    },
    {
      id: "3",
      name: "Modern Africa Arts",
      location: "Cape Town, South Africa",
      specialties: ["Sculptures", "Contemporary Art", "Bronze"],
      rating: 5.0,
      totalSales: 89,
      joinedDate: "2023-01-20",
      description: "Contemporary African artist creating modern sculptures that bridge traditional techniques with contemporary aesthetics.",
      featured: false,
      verified: true,
      productCount: 12,
      averagePrice: 150000,
    },
    {
      id: "4",
      name: "Bead Masters Studio",
      location: "Nairobi, Kenya",
      specialties: ["Jewelry", "Beadwork", "Accessories"],
      rating: 4.6,
      totalSales: 312,
      joinedDate: "2020-07-12",
      description: "Traditional beadwork artisans creating colorful jewelry and accessories using authentic African beading techniques.",
      featured: false,
      verified: true,
      productCount: 45,
      averagePrice: 35000,
    },
    {
      id: "5",
      name: "Canvas Dreams",
      location: "Abuja, Nigeria",
      specialties: ["Paintings", "Abstract Art", "Canvas"],
      rating: 4.7,
      totalSales: 127,
      joinedDate: "2022-09-03",
      description: "Contemporary painter exploring African themes through abstract expressionism and mixed media techniques.",
      featured: false,
      verified: true,
      productCount: 31,
      averagePrice: 95000,
    },
    {
      id: "6",
      name: "Rhythm Makers",
      location: "Kumasi, Ghana",
      specialties: ["Instruments", "Drums", "Music"],
      rating: 4.5,
      totalSales: 78,
      joinedDate: "2023-05-16",
      description: "Traditional drum makers crafting authentic African percussion instruments using time-honored techniques.",
      featured: false,
      verified: false,
      productCount: 16,
      averagePrice: 75000,
    },
  ];

  const featuredArtists = artists.filter(artist => artist.featured);
  const allArtists = artists.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 tracking-wide">
            Meet Our Artists
          </h1>
          <p className="text-xl text-text-muted font-light max-w-3xl mx-auto">
            Discover the talented artisans behind our authentic African art collection. Each artist brings their unique heritage and craftsmanship to create extraordinary pieces.
          </p>
        </div>

        {/* Featured Artists */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-light mb-8 text-center">Featured Artists</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="group"
              >
                <div className="bg-background-secondary border border-neutral-800 rounded-lg overflow-hidden hover:border-text-primary transition-all duration-300">
                  {/* Artist Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-text-primary text-background-primary rounded-full flex items-center justify-center text-xl font-bold">
                          {artist.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-medium group-hover:text-text-secondary transition-colors">
                              {artist.name}
                            </h3>
                            {artist.verified && (
                              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <p className="text-text-muted">{artist.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span className="font-medium">{artist.rating}</span>
                        </div>
                        <p className="text-text-muted text-sm">{artist.totalSales} sales</p>
                      </div>
                    </div>

                    <p className="text-text-muted mb-4 line-clamp-2">
                      {artist.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {artist.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-background-tertiary text-text-secondary text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
                      <div className="text-center">
                        <p className="font-medium text-text-primary">{artist.productCount}</p>
                        <p className="text-xs text-text-muted">Products</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-text-primary">{formatPrice(artist.averagePrice)}</p>
                        <p className="text-xs text-text-muted">Avg. Price</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-text-primary">
                          {new Date(artist.joinedDate).getFullYear()}
                        </p>
                        <p className="text-xs text-text-muted">Joined</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Artists */}
        <div>
          <h2 className="text-3xl font-serif font-light mb-8 text-center">All Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="group"
              >
                <div className="bg-background-secondary border border-neutral-800 rounded-lg p-6 hover:border-text-primary transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-text-primary text-background-primary rounded-full flex items-center justify-center font-bold">
                      {artist.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium group-hover:text-text-secondary transition-colors">
                          {artist.name}
                        </h3>
                        {artist.verified && (
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-text-muted text-sm">{artist.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm">{artist.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-text-muted text-sm mb-3 line-clamp-2">
                    {artist.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {artist.specialties.slice(0, 2).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-background-tertiary text-text-secondary text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {artist.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-background-tertiary text-text-secondary text-xs rounded-full">
                        +{artist.specialties.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{artist.productCount} products</span>
                    <span className="text-text-primary font-medium">View Profile →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-background-secondary border border-neutral-800 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-light mb-4">
              Are you an artist?
            </h2>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              Join our community of talented African artists and showcase your work to art lovers worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BecomeSellerButton>
                Become a Seller
              </BecomeSellerButton>
              <Link
                href="/about"
                className="border border-text-primary text-text-primary px-6 py-3 rounded-md hover:bg-text-primary hover:text-background-primary transition-colors font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 