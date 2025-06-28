import Header from "@/components/layout/header";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-primary mx-auto mb-4"></div>
            <p className="text-text-muted">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 