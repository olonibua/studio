"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MobileImageGalleryProps {
  images: string[];
  title: string;
  showThumbnails?: boolean;
}

export default function MobileImageGallery({ 
  images, 
  title, 
  showThumbnails = true 
}: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef({ 
    startX: 0, 
    startY: 0, 
    lastX: 0, 
    lastY: 0,
    startDistance: 0,
    startScale: 1
  });

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchRef.current.startX = e.touches[0].clientX;
      touchRef.current.startY = e.touches[0].clientY;
      touchRef.current.lastX = position.x;
      touchRef.current.lastY = position.y;
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchRef.current.startDistance = distance;
      touchRef.current.startScale = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - touchRef.current.startX;
      const deltaY = e.touches[0].clientY - touchRef.current.startY;
      
      if (isZoomed) {
        // Pan when zoomed
        setPosition({
          x: touchRef.current.lastX + deltaX,
          y: touchRef.current.lastY + deltaY
        });
      } else if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        // Swipe to change image
        if (deltaX > 0 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setIsDragging(false);
        } else if (deltaX < 0 && currentIndex < images.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setIsDragging(false);
        }
      }
    } else if (e.touches.length === 2) {
      // Pinch to zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      const newScale = (distance / touchRef.current.startDistance) * touchRef.current.startScale;
      const clampedScale = Math.min(Math.max(newScale, 1), 4);
      
      setScale(clampedScale);
      setIsZoomed(clampedScale > 1);
      
      if (clampedScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Double tap to zoom
  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsZoomed(false);
    } else {
      setScale(2);
      setIsZoomed(true);
    }
  };

  // Navigate to specific image
  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  };

  // Fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Close fullscreen on escape
  useEffect(() => {
    if (isFullscreen) {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft') {
        goToImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToImage(currentIndex + 1);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleKeyPress);
        document.body.style.overflow = 'auto';
      }
    };
  }, [isFullscreen]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-background-tertiary rounded-lg flex items-center justify-center">
        <svg className="w-16 h-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const GalleryContent = () => (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        ref={containerRef}
        className={`
          relative overflow-hidden rounded-lg bg-background-tertiary
          ${isFullscreen ? 'h-screen w-screen' : 'aspect-square w-full'}
        `}
      >
        <div
          ref={imageRef}
          className="w-full h-full relative cursor-pointer select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes={isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={currentIndex === 0}
          />
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 w-10 h-10 p-0 bg-black/50 text-white hover:bg-black/70 rounded-full"
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h4m0-6L3 7m18 0l-5 5m0-6h4a1 1 0 011 1v4m-6-4l5-5M3 17l5-5m0 6H4a1 1 0 01-1-1v-4m6 4l-5-5m18 0l-5 5m0-6v4a1 1 0 01-1 1h-4m6-4l-5 5" />
            </svg>
          )}
        </Button>

        {/* Navigation Arrows */}
        {images.length > 1 && !isZoomed && (
          <>
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToImage(currentIndex - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 bg-black/50 text-white hover:bg-black/70 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
            )}
            
            {currentIndex < images.length - 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToImage(currentIndex + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 bg-black/50 text-white hover:bg-black/70 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            )}
          </>
        )}

        {/* Zoom Instructions */}
        {!isZoomed && images.length === 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            Double tap to zoom
          </div>
        )}

        {/* Swipe Instructions */}
        {!isZoomed && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
            Swipe to browse • Double tap to zoom
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && !isFullscreen && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`
                relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors
                ${index === currentIndex ? 'border-blue-500' : 'border-neutral-600'}
              `}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Dots (for mobile when thumbnails are hidden) */}
      {!showThumbnails && images.length > 1 && !isFullscreen && (
        <div className="flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`
                w-2 h-2 rounded-full transition-colors
                ${index === currentIndex ? 'bg-blue-500' : 'bg-neutral-600'}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <GalleryContent />
      </div>
    );
  }

  return <GalleryContent />;
} 