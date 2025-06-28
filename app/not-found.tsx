import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-serif font-light mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              Return Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 