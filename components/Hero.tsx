"use client";

import Link from "next/link";
import type { HeroSection } from "@/types";

interface HeroProps extends HeroSection {
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText = "Get Started",
  ctaLink = "/contact",
  image,
  video,
  videoPoster,
  className = "",
}: HeroProps) {
  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden ${className}`}
    >
      {/* Video Background */}
      {video && (
        <>
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={videoPoster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </>
      )}

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-[5%] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={video ? "text-white" : ""}>
            {subtitle && (
              <p
                className={`text-lg mb-4 font-medium ${
                  video ? "text-white/90" : "text-gray-600"
                }`}
              >
                {subtitle}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {video ? (
                <span className="inline-block">{title}</span>
              ) : (
                <span className="inline-block px-6 py-3">{title}</span>
              )}
            </h1>
            {description && (
              <p
                className={`text-xl mb-8 leading-relaxed ${
                  video ? "text-white/90" : "text-gray-600"
                }`}
              >
                {description}
              </p>
            )}
          </div>

          {/* Image (only show if no video) */}
          {image && !video && (
            <div className="relative">
              <img
                src={image}
                alt={typeof title === "string" ? title : "Hero image"}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
