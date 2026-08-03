"use client";

import React, { useEffect, useState, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale-in" | "fade";
  delay?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 600,
}: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once it intersects, we can unobserve to prevent repeated triggers
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.15, // trigger when 15% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade-up":
        return isIntersecting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none";
      case "fade-left":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-8 pointer-events-none";
      case "fade-right":
        return isIntersecting
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8 pointer-events-none";
      case "scale-in":
        return isIntersecting
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none";
      case "fade":
      default:
        return isIntersecting
          ? "opacity-100"
          : "opacity-0 pointer-events-none";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className={`transition-all duration-inherit ease-inherit ${getVariantStyles()}`}>
        {children}
      </div>
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1500,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, value, duration]);

  // Format numbers (e.g. 500000 -> 500K)
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
