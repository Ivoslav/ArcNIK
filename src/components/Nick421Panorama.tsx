import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Navigation, Compass, Maximize2, Info, MapPin, Upload } from 'lucide-react';

interface HotSpot {
  id: string;
  x: number; // Percentage position
  y: number;
  label: string;
  description: string;
}

interface PanoramaData {
  id: string;
  name: string;
  image: string;
  hotspots: HotSpot[];
}

// Placeholder panoramas - ready to be replaced with your NIK 421 images
const panoramas: PanoramaData[] = [
  {
    id: 'deck',
    name: 'Main Deck',
    image: 'https://images.unsplash.com/photo-1758910077960-fb656256593d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHBlZGl0aW9uJTIwc2hpcCUyMGRlY2t8ZW58MXx8fHwxNzYyNDEyNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    hotspots: [
      { id: 'bow', x: 25, y: 45, label: 'Ship Bow', description: 'Forward section of NIK 421 with navigation lights' },
      { id: 'equipment', x: 60, y: 55, label: 'Scientific Equipment', description: 'Specialized research equipment' },
      { id: 'lifeboats', x: 80, y: 50, label: 'Lifeboats', description: 'Emergency rescue equipment for crew' }
    ]
  },
  {
    id: 'interior',
    name: 'Interior',
    image: 'https://images.unsplash.com/photo-1573717865061-202c78c4b414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmN0aWMlMjByZXNlYXJjaCUyMHZlc3NlbCUyMGludGVyaW9yfGVufDF8fHx8MTc2MjQxMjYyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    hotspots: [
      { id: 'lab', x: 35, y: 50, label: 'Science Lab', description: 'Modern laboratory for on-site analysis' },
      { id: 'workspace', x: 65, y: 48, label: 'Workspace', description: 'Data processing and planning area' }
    ]
  },
  {
    id: 'bridge',
    name: 'Captain\'s Bridge',
    image: 'https://images.unsplash.com/photo-1728417593682-3df3ee0e5286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwJTIwYnJpZGdlJTIwY29udHJvbCUyMHJvb218ZW58MXx8fHwxNzYyNDEyNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    hotspots: [
      { id: 'controls', x: 50, y: 60, label: 'Control Panel', description: 'Main navigation controls' },
      { id: 'radar', x: 70, y: 40, label: 'Radar & Communications', description: 'Navigation and communication system' },
      { id: 'wheel', x: 30, y: 55, label: 'Ship Wheel', description: 'Vessel steering controls' }
    ]
  }
];

export function Nick421Panorama() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [startX, setStartX] = useState(0);
  const [selectedPanorama, setSelectedPanorama] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<HotSpot | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number>();
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewAngle, setViewAngle] = useState(0);

  const currentPanorama = panoramas[selectedPanorama];

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = currentPanorama.image;
    image.onload = () => {
      imageRef.current = image;
      setImageLoaded(true);
      setRotation(0);
    };
    setImageLoaded(false);
  }, [currentPanorama.image]);

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawPanorama = () => {
      const img = imageRef.current;
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw panorama with rotation
      const imageWidth = img.width;
      const offsetX = (rotation % imageWidth);
      
      // Draw image twice for seamless looping
      ctx.drawImage(img, -offsetX, 0, canvas.width, canvas.height);
      ctx.drawImage(img, imageWidth - offsetX, 0, canvas.width, canvas.height);

      // Draw hotspots
      currentPanorama.hotspots.forEach(hotspot => {
        const hotspotX = (hotspot.x / 100) * canvas.width - offsetX;
        const hotspotY = (hotspot.y / 100) * canvas.height;

        // Draw hotspot at two positions for seamless looping
        [hotspotX, hotspotX + imageWidth].forEach(x => {
          if (x >= -50 && x <= canvas.width + 50) {
            // Outer circle
            ctx.beginPath();
            ctx.arc(x, hotspotY, 20, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Inner circle
            ctx.beginPath();
            ctx.arc(x, hotspotY, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
            ctx.fill();

            // Pulse effect
            const pulseSize = 20 + Math.sin(Date.now() / 500) * 5;
            ctx.beginPath();
            ctx.arc(x, hotspotY, pulseSize, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 - (pulseSize - 20) / 50})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    drawPanorama();
  }, [imageLoaded, rotation, currentPanorama]);

  useEffect(() => {
    if (autoRotate && !isDragging) {
      const animate = () => {
        setRotation(prev => (prev + 0.5) % (imageRef.current?.width || 1000));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotation(prev => {
        const newRotation = prev - deltaX;
        const imageWidth = imageRef.current?.width || 1000;
        return ((newRotation % imageWidth) + imageWidth) % imageWidth;
      });
      setStartX(e.clientX);
      
      // Update view angle
      const angle = Math.floor((rotation / (imageRef.current?.width || 1000)) * 360);
      setViewAngle(angle);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const offsetX = rotation % (imageRef.current?.width || 1000);
    
    // Check if clicked on a hotspot
    for (const hotspot of currentPanorama.hotspots) {
      const hotspotX = (hotspot.x / 100) * canvasRef.current.width - offsetX;
      const hotspotY = (hotspot.y / 100) * canvasRef.current.height;
      
      // Check both positions (for seamless looping)
      const positions = [hotspotX, hotspotX + (imageRef.current?.width || 1000)];
      for (const posX of positions) {
        const distance = Math.sqrt(Math.pow(x - posX, 2) + Math.pow(y - hotspotY, 2));
        if (distance < 25) {
          setSelectedHotspot(hotspot);
          return;
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDragging && e.touches.length > 0) {
      const deltaX = e.touches[0].clientX - startX;
      setRotation(prev => {
        const newRotation = prev - deltaX;
        const imageWidth = imageRef.current?.width || 1000;
        return ((newRotation % imageWidth) + imageWidth) % imageWidth;
      });
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-blue-100">
                  <Navigation className="w-6 h-6 text-blue-400" />
                  NIK 421 - 360° Virtual Panorama
                </CardTitle>
                <CardDescription className="text-blue-200/70">
                  Explore the expedition vessel in all directions
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/50">
                <Compass className="w-3 h-3 mr-1" />
                {viewAngle}°
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Info Banner - Ready for your images */}
        <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-cyan-500/30 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-cyan-300" />
              <p className="text-cyan-100 text-sm">
                <strong>Ready for your NIK 421 images!</strong> Replace the placeholder panoramas with your actual ship photos for an authentic 360° experience.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Panorama Selector */}
        <div className="flex gap-3 flex-wrap">
          {panoramas.map((pano, index) => (
            <Button
              key={pano.id}
              onClick={() => {
                setSelectedPanorama(index);
                setSelectedHotspot(null);
              }}
              variant={selectedPanorama === index ? 'default' : 'outline'}
              className={selectedPanorama === index 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-slate-700/50 hover:bg-slate-600/50 text-blue-100 border-blue-500/30'}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {pano.name}
            </Button>
          ))}
        </div>

        {/* Main Panorama Viewer */}
        <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="relative bg-black">
              <canvas
                ref={canvasRef}
                width={1200}
                height={600}
                className="w-full h-auto cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleCanvasClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
              
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-blue-200">Loading panorama...</p>
                  </div>
                </div>
              )}

              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="bg-slate-900/80 backdrop-blur rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-blue-100">
                    <Info className="w-4 h-4" />
                    <span className="text-sm">
                      {isDragging ? 'Drag to navigate' : 'Click and drag or use auto-rotate'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => setAutoRotate(!autoRotate)}
                    size="sm"
                    variant={autoRotate ? 'default' : 'outline'}
                    className={autoRotate 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-slate-700/80 hover:bg-slate-600 border-blue-500/30'}
                  >
                    <Compass className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => {
                      if (canvasRef.current) {
                        canvasRef.current.requestFullscreen();
                      }
                    }}
                    size="sm"
                    variant="outline"
                    className="bg-slate-700/80 hover:bg-slate-600 border-blue-500/30 text-blue-100"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotspot Information */}
        {selectedHotspot && (
          <Card className="bg-gradient-to-r from-blue-900/50 to-slate-800/50 border-blue-500/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-blue-100">{selectedHotspot.label}</CardTitle>
              <CardDescription className="text-blue-200/80">
                {selectedHotspot.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setSelectedHotspot(null)}
                variant="outline"
                className="bg-slate-700/50 hover:bg-slate-600/50 text-blue-100 border-blue-500/30"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Hotspots List */}
        <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-blue-100">Points of Interest</CardTitle>
            <CardDescription className="text-blue-200/70">
              Click on the glowing points in the panorama or select from the list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentPanorama.hotspots.map(hotspot => (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  className="p-4 bg-slate-700/50 hover:bg-slate-600/50 border border-blue-500/30 rounded-lg text-left transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-1 animate-pulse"></div>
                    <div>
                      <h4 className="text-blue-100 mb-1">{hotspot.label}</h4>
                      <p className="text-sm text-blue-200/70">{hotspot.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
