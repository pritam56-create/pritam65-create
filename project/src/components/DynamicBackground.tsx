import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

export const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { settings } = useSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createAnimation = () => {
      switch (settings.animationMode) {
        case 'particles':
          return createParticleAnimation(ctx, canvas);
        case 'waves':
          return createWaveAnimation(ctx, canvas);
        case 'geometric':
          return createGeometricAnimation(ctx, canvas);
        case 'minimal':
          return createMinimalAnimation(ctx, canvas);
        case 'cosmic':
          return createCosmicAnimation(ctx, canvas);
        default:
          return createParticleAnimation(ctx, canvas);
      }
    };

    resizeCanvas();
    const animate = createAnimation();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [settings.animationMode, settings.theme]);

  const createParticleAnimation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    return function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = settings.theme === 'dark' 
          ? `rgba(139, 92, 246, ${particle.opacity})`
          : `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };
  };

  const createWaveAnimation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    let time = 0;

    return function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, settings.theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, settings.theme === 'dark' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(147, 51, 234, 0.1)');

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height / 2 + Math.sin((x * 0.01) + (time * 0.02) + (i * 0.5)) * (50 + i * 20);
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };
  };

  const createGeometricAnimation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 20; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 50 + 20,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    return function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      shapes.forEach(shape => {
        shape.rotation += shape.rotationSpeed;
        
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        
        ctx.strokeStyle = settings.theme === 'dark' 
          ? `rgba(139, 92, 246, ${shape.opacity})`
          : `rgba(59, 130, 246, ${shape.opacity})`;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        ctx.stroke();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };
  };

  const createMinimalAnimation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const dots: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      pulseSpeed: number;
    }> = [];

    for (let i = 0; i < 15; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        opacity: 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let time = 0;

    return function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach(dot => {
        const pulse = Math.sin(time * dot.pulseSpeed) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = settings.theme === 'dark' 
          ? `rgba(255, 255, 255, ${dot.opacity * pulse})`
          : `rgba(0, 0, 0, ${dot.opacity * pulse * 0.3})`;
        ctx.fill();
      });

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };
  };

  const createCosmicAnimation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      twinkle: number;
      twinkleSpeed: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    return function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create nebula effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, settings.theme === 'dark' ? 'rgba(139, 92, 246, 0.05)' : 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw twinkling stars
      stars.forEach(star => {
        star.twinkle += star.twinkleSpeed;
        const brightness = Math.sin(star.twinkle) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * brightness, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.8})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };
  };

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};