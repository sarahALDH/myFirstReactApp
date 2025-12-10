"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  caption?: string;
}

// Placeholder posts to show when no access token is configured
const placeholderPosts: InstagramPost[] = [
  {
    id: "placeholder-1",
    media_type: "IMAGE",
    media_url: "/image/instagram2.webp",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: new Date().toISOString(),
    caption:
      "KFAS continues to support scientific research and innovation in Kuwait. Follow us for the latest updates on our programs and initiatives. #KFAS #Science #Innovation",
  },
  {
    id: "placeholder-2",
    media_type: "IMAGE",
    media_url: "/image/Scientific.png",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    caption:
      "Empowering researchers and scientists to tackle national challenges through cutting-edge research programs. #Research #Kuwait #Technology",
  },
  {
    id: "placeholder-3",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost2.jpg",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    caption:
      "Building a sustainable future through science, technology, and innovation. Join us in our mission. #Sustainability #Future #KFAS",
  },
  {
    id: "placeholder-4",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost.png",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    caption:
      "Science Directors Program 2022 - Empowering the next generation of science leaders in Kuwait. #ScienceDirectors #Leadership #KFAS",
  },
];

export default function InstagramFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Check if access token is configured
    const checkTokenAndFetch = async () => {
      try {
        // First, check if token exists by calling the API
        const response = await fetch("/api/instagram");

        if (!response.ok) {
          const errorData = await response.json();
          // If token not configured, use placeholder posts
          if (errorData.error?.includes("not configured")) {
            setPosts(placeholderPosts);
            setUsePlaceholder(true);
            setLoading(false);
            return;
          }
          throw new Error(errorData.error || "Failed to fetch Instagram posts");
        }

        const data = await response.json();
        setPosts(data.posts || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching Instagram posts:", err);
        // Use placeholder posts if there's an error
        setPosts(placeholderPosts);
        setUsePlaceholder(true);
        setLoading(false);
      }
    };

    checkTokenAndFetch();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateCaption = (caption: string, maxLength: number = 150) => {
    if (!caption) return "";
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength) + "...";
  };

  return (
    <motion.section
      ref={sectionRef}
      id="instagram-feed"
      className="relative py-16 lg:py-20 bg-[#F5F5F5]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              className="w-6 h-6 text-[#E4405F]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-[#1D2D44] font-medium">@kfasinfo</span>
          </div>
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#1D2D44] mb-3">
            Follow Us on Instagram
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Stay connected with the latest updates from KFAS
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        )}

        {/* Posts Grid - Simple 4 Column */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posts.slice(0, 4).map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-200">
                  <img
                    src={post.media_url}
                    alt={post.caption || "Instagram post"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Simple hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Follow Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <a
            href="https://www.instagram.com/kfasinfo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1D2D44] text-[#1D2D44] font-medium rounded-full hover:bg-[#1D2D44] hover:text-white transition-all duration-300"
          >
            <span>View More on Instagram</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
