"use client";

import React, { useState, useEffect, useRef } from "react";

export default function MinimalCounterSection() {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const counterValues = [1100, 1600, 3250, 26800, 950, 10000];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate counters
            counterValues.forEach((value, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = value / steps;
              const stepDuration = duration / steps;

              let currentStep = 0;
              const timer = setInterval(() => {
                currentStep++;
                setCounts((prev) => {
                  const newCounts = [...prev];
                  if (newCounts[index] < value) {
                    newCounts[index] = Math.min(
                      newCounts[index] + increment,
                      value
                    );
                  }
                  return newCounts;
                });

                if (currentStep >= steps) {
                  clearInterval(timer);
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = value;
                    return newCounts;
                  });
                }
              }, stepDuration);
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
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
  }, [hasAnimated]);

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "url('/image/banner3.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* High Orange Color Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(236, 96, 27, 0.85)",
        }}
      ></div>

      <div className="text-center mb-14 animate-fade-in relative z-10">
        {/* <h2 className="text-2xl font-medium text-white animate-slide-down">
          Counter
        </h2> */}
      </div>

      <div className="max-w-6xl mx-auto px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 animate-fade-in-up">
        {/* Left Text Content */}
        <div className="flex flex-col justify-center animate-slide-in-left">
          <h3 className="text-4xl font-bold leading-snug mb-4 text-white">
            Shaping Kuwait&apos;s Future <br /> through Science & Innovation
          </h3>
          <p className="text-white/80 leading-relaxed">
            Search Web Design Company About Us, in the a Information from
            Trusted Internet Sources. If a Explore the Best Info Now.
          </p>
        </div>

        {/* Right Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {/* Counter Item 1 */}
          <div
            className="flex flex-col items-center text-center group animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="w-28 h-28 rounded-full border-4 flex items-center justify-center text-3xl font-semibold mb-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-6 animate-bounce-in"
              style={{
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF20",
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              {formatNumber(counts[0])}
            </div>
            <p className="text-white text-sm font-medium group-hover:scale-105 transition-transform duration-300">
              Researcher Supported
            </p>
          </div>

          {/* Counter Item 2 */}
          <div
            className="flex flex-col items-center text-center group animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="w-28 h-28 rounded-full border-4 flex items-center justify-center text-3xl font-semibold mb-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-rotate-6 animate-bounce-in"
              style={{
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF20",
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              {formatNumber(counts[1])}
            </div>
            <p className="text-white text-sm font-medium group-hover:scale-105 transition-transform duration-300">
              Project Funded
            </p>
          </div>

          {/* Counter Item 3 */}
          <div
            className="flex flex-col items-center text-center group animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="w-28 h-28 rounded-full border-4 flex items-center justify-center text-3xl font-semibold mb-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-6 animate-bounce-in"
              style={{
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF20",
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              {formatNumber(counts[2])}
            </div>
            <p className="text-white text-sm font-medium group-hover:scale-105 transition-transform duration-300">
              Articles Published
            </p>
          </div>

          {/* Counter Item 4 */}
          <div
            className="flex flex-col items-center text-center group animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              className="w-28 h-28 rounded-full border-4 flex items-center justify-center text-3xl font-semibold mb-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-rotate-6 animate-bounce-in"
              style={{
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF20",
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              {formatNumber(counts[3])}
            </div>
            <p className="text-white text-sm font-medium group-hover:scale-105 transition-transform duration-300">
              Citations
            </p>
          </div>

          {/* Counter Item 5 */}
          <div
            className="flex flex-col items-center text-center group animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div
              className="w-28 h-28 rounded-full border-4 flex items-center justify-center text-3xl font-semibold mb-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:rotate-6 animate-bounce-in"
              style={{
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF20",
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              {formatNumber(counts[4])}
            </div>
            <p className="text-white text-sm font-medium group-hover:scale-105 transition-transform duration-300">
              International Collaborations
            </p>
          </div>

          {/* Counter Item 6 */}
          <div
            className="flex flex-col items-center text-center group animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div
              className="w-28 h-28 rounded-full border-4 flex items-center justify-center text-3xl font-semibold mb-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:-rotate-6 animate-bounce-in"
              style={{
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF20",
                color: "#FFFFFF",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              {formatNumber(counts[5])}
            </div>
            <p className="text-white text-sm font-medium group-hover:scale-105 transition-transform duration-300">
              Professional Trends
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
