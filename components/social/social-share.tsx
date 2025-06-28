"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface SocialShareProps {
  product: Product;
  className?: string;
}

export default function SocialShare({ product, className = "" }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/${product.$id}` : '';
  const shareText = `Check out this amazing artwork: ${product.title} by ${product.sellerName}`;

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: "📘",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "Instagram",
      icon: "📷",
      url: `https://www.instagram.com/`,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      note: "Copy link to share on Instagram"
    },
    {
      name: "WhatsApp",
      icon: "💬",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      name: "Pinterest",
      icon: "📌",
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(product.images[0] || '')}&description=${encodeURIComponent(shareText)}`,
      color: "bg-red-600 hover:bg-red-700"
    }
  ];

  const handleShare = (platform: typeof socialPlatforms[0]) => {
    if (platform.name === "Instagram") {
      copyToClipboard();
      return;
    }
    
    window.open(platform.url, '_blank', 'width=600,height=400');
    setIsOpen(false);
    
    // Track share analytics here
    console.log(`Shared ${product.title} on ${platform.name}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: shareText,
          url: shareUrl,
        });
        setIsOpen(false);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="sm"
        className={`${className} flex items-center space-x-2`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span>Share</span>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Share this artwork"
        size="md"
      >
        <div className="space-y-6">
          {/* Product Preview */}
          <div className="flex items-center space-x-4 p-4 bg-background-secondary rounded-lg">
            <div className="w-16 h-16 bg-background-tertiary rounded-lg overflow-hidden">
              {product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-text-primary">{product.title}</h3>
              <p className="text-sm text-text-muted">by {product.sellerName}</p>
            </div>
          </div>

          {/* Social Platforms */}
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Share on social media</h4>
            <div className="grid grid-cols-2 gap-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform)}
                  className={`${platform.color} text-white p-3 rounded-lg flex items-center space-x-3 transition-colors`}
                >
                  <span className="text-lg">{platform.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{platform.name}</div>
                    {platform.note && (
                      <div className="text-xs opacity-90">{platform.note}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Copy link</h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-background-tertiary border border-neutral-700 text-text-primary rounded-md px-3 py-2 text-sm"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className={copied ? "text-green-500" : ""}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
} 