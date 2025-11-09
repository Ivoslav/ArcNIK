import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Maximize2, Play, Lock, CheckCircle, Star, X, Minimize2, RotateCw, Info } from "lucide-react";

interface TourLocation {
  id: string;
  name: string;
  category: "cabin" | "deck" | "restricted" | "common";
  image: string;
  description: string;
  locked: boolean;
  duration: string;
  rating: number;
  totalRatings: number;
}

export function VRShipTour() {
  const [selectedLocation, setSelectedLocation] = useState<TourLocation | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isVRActive, setIsVRActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // VR viewer state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number>();

  const locations: TourLocation[] = [
    {
      id: "bridge",
      name: "Captain's Bridge",
      category: "restricted",
      image: "https://images.unsplash.com/photo-1688413399498-e35ed74b554f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwJTIwYnJpZGdlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyNjg4NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Navigate the ship from the captain's perspective with 360° views of navigation equipment",
      locked: false,
      duration: "5 min",
      rating: 4.8,
      totalRatings: 247,
    },
    {
      id: "lab",
      name: "Marine Biology Lab",
      category: "restricted",
      image: "https://images.unsplash.com/photo-1614934273187-c83f8780fad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpZmljJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NjIwMTA2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Explore the research facilities where samples are analyzed and discoveries are made",
      locked: false,
      duration: "7 min",
      rating: 4.9,
      totalRatings: 312,
    },
    {
      id: "cabin",
      name: "Expedition Cabin",
      category: "cabin",
      image: "https://images.unsplash.com/photo-1680703486830-1b5af60635d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJpbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MjAxMDY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "See the cozy cabins designed for comfort during Antarctic voyages",
      locked: false,
      duration: "3 min",
      rating: 4.6,
      totalRatings: 189,
    },
    {
      id: "deck",
      name: "Observation Deck",
      category: "deck",
      image: "https://images.unsplash.com/photo-1647608493374-5f0cee53b4bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHBlZGl0aW9uJTIwc2hpcCUyMGljZXxlbnwxfHx8fDE3NjIwMDk4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Experience the panoramic views from the outdoor observation areas",
      locked: false,
      duration: "4 min",
      rating: 4.7,
      totalRatings: 201,
    },
    {
      id: "engine",
      name: "Engine Room",
      category: "restricted",
      image: "https://images.unsplash.com/photo-1583326187695-01fb3e059569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHJlc2VhcmNoJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MjAxMDY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Discover the powerful machinery that propels the ship through Antarctic waters",
      locked: true,
      duration: "6 min",
      rating: 0,
      totalRatings: 0,
    },
    {
      id: "dining",
      name: "Main Dining Room",
      category: "common",
      image: "https://images.unsplash.com/photo-1680703486830-1b5af60635d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJpbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MjAxMDY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Tour the elegant dining area where meals and conversations create community",
      locked: false,
      duration: "4 min",
      rating: 4.5,
      totalRatings: 178,
    },
  ];

  // Render 360 view on canvas
  const render360View = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;

    if (!canvas || !ctx || !img || !img.complete) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Calculate the portion of the image to show based on rotation
    const fov = Math.PI / 2; // Field of view
    const aspectRatio = width / height;

    // Normalize rotation
    const normalizedY = ((rotation.y % 360) + 360) % 360;
    const normalizedX = Math.max(-85, Math.min(85, rotation.x));

    // Calculate source rectangle from panoramic image
    const sourceX = (normalizedY / 360) * img.width;
    const sourceWidth = (fov / Math.PI) * img.width;
    const sourceY = ((normalizedX + 90) / 180) * img.height - (img.height * 0.25);
    const sourceHeight = img.height * 0.5;

    // Draw wrapped image for seamless 360 panning
    const drawX = sourceX % img.width;
    
    if (drawX + sourceWidth > img.width) {
      // Draw two parts for wrapping
      const firstPart = img.width - drawX;
      const secondPart = sourceWidth - firstPart;
      
      ctx.drawImage(
        img,
        drawX, Math.max(0, sourceY),
        firstPart, Math.min(img.height, sourceHeight),
        0, 0,
        (firstPart / sourceWidth) * width, height
      );
      
      ctx.drawImage(
        img,
        0, Math.max(0, sourceY),
        secondPart, Math.min(img.height, sourceHeight),
        (firstPart / sourceWidth) * width, 0,
        (secondPart / sourceWidth) * width, height
      );
    } else {
      ctx.drawImage(
        img,
        drawX, Math.max(0, sourceY),
        sourceWidth, Math.min(img.height, sourceHeight),
        0, 0,
        width, height
      );
    }

    animationFrameRef.current = requestAnimationFrame(render360View);
  };

  // Initialize 360 viewer
  useEffect(() => {
    if (isVRActive && selectedLocation) {
      const img = new Image();
      // Remove crossOrigin to avoid CORS issues
      img.src = selectedLocation.image;
      
      img.onload = () => {
        imageRef.current = img;
        if (canvasRef.current) {
          canvasRef.current.width = containerRef.current?.clientWidth || 800;
          canvasRef.current.height = containerRef.current?.clientHeight || 600;
        }
        render360View();
      };

      img.onerror = () => {
        console.error('Failed to load 360 image:', selectedLocation.image);
      };

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isVRActive, selectedLocation, rotation]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    if (isVRActive) {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isVRActive]);

  // Mouse/Touch controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.3,
      y: prev.y - deltaX * 0.3,
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - lastMousePos.x;
    const deltaY = e.touches[0].clientY - lastMousePos.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.3,
      y: prev.y - deltaX * 0.3,
    }));

    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "restricted":
        return "bg-red-100 text-red-800 border-red-200";
      case "cabin":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "deck":
        return "bg-green-100 text-green-800 border-green-200";
      case "common":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSelectLocation = (location: TourLocation) => {
    setSelectedLocation(location);
    setUserRating(0);
    setHasRated(false);
    setUserComment("");
    setShowComments(false);
    setIsVRActive(false);
    setRotation({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const startVRTour = () => {
    setIsVRActive(true);
    setRotation({ x: 0, y: 0 });
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Virtual Reality Ship Tour</h1>
        <p className="text-gray-600">
          Explore the R/V NIK 421 research vessel with immersive 360�� VR experiences. See the actual spaces and equipment used during the Antarctic Peninsula Expedition.
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Badge className="bg-blue-600">R/V NIK 421</Badge>
          <Badge variant="outline">6 Locations Available</Badge>
          <Badge variant="outline">Built 2018 • Ice-Strengthened Hull</Badge>
        </div>
      </div>

      {selectedLocation ? (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div 
              ref={containerRef}
              className={`relative bg-black ${isVRActive ? 'h-[600px]' : 'h-[500px]'}`}
            >
              {!isVRActive ? (
                <>
                  <ImageWithFallback
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-center text-white">
                      <div 
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors"
                        onClick={startVRTour}
                      >
                        <Play className="w-10 h-10 ml-1" />
                      </div>
                      <p className="text-xl mb-2">Start 360° VR Tour</p>
                      <p className="text-sm text-gray-300">Click to begin interactive exploration</p>
                      <p className="text-xs text-gray-400 mt-2">💡 Drag to look around • Works on mobile too!</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-full relative">
                    <iframe
                      src="https://renderstuff.com/tools/360-panorama-web-viewer/"
                      className="w-full h-full border-0"
                      title="360° VR Panorama Viewer"
                      allow="accelerometer; gyroscope"
                    />
                  </div>
                  
                  {/* VR Controls Overlay */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4" />
                      <span>360° VR Active</span>
                    </div>
                    <p className="text-xs text-gray-300">Use viewer controls to explore</p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="gap-2"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      {isFullscreen ? 'Exit' : 'Fullscreen'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsVRActive(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}

              {!isVRActive && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={() => setSelectedLocation(null)}
                >
                  Back to Locations
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="mb-2">{selectedLocation.name}</h2>
                <p className="text-gray-600 mb-3">{selectedLocation.description}</p>
                {selectedLocation.totalRatings > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= Math.round(selectedLocation.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {selectedLocation.rating.toFixed(1)} ({selectedLocation.totalRatings} reviews)
                    </span>
                  </div>
                )}
              </div>
              <Badge variant="outline" className={getCategoryColor(selectedLocation.category)}>
                {selectedLocation.category}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p>{selectedLocation.duration}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">View Type</p>
                <p>Interactive 360° VR</p>
              </div>
            </div>

            {!isVRActive && (
              <Button className="w-full gap-2" onClick={startVRTour}>
                <Play className="w-4 h-4" />
                Start 360° Experience
              </Button>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Rate this VR Tour</h3>
            {!hasRated ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your Rating</p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setUserRating(star)}
                        className="transition-all hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your Feedback (Optional)</p>
                  <Textarea
                    placeholder="Share your thoughts about this VR experience..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={() => {
                    if (userRating > 0) {
                      setHasRated(true);
                      setShowComments(true);
                    }
                  }}
                  disabled={userRating === 0}
                  className="w-full"
                >
                  Submit Rating {userComment && "& Feedback"}
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-600 mb-3">✓ Thank you for your feedback!</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-600">Your rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                {userComment && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">"{userComment}"</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Card
              key={location.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => !location.locked && handleSelectLocation(location)}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
                {location.locked ? (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Complete missions to unlock</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="text-white">
                      <Play className="w-12 h-12 mx-auto" />
                    </div>
                  </div>
                )}
                <Badge
                  variant="outline"
                  className={`absolute top-3 right-3 ${getCategoryColor(location.category)}`}
                >
                  {location.category}
                </Badge>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg">{location.name}</h3>
                  {!location.locked && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
                <p className="text-sm text-gray-600 mb-3">{location.description}</p>
                
                {!location.locked && location.totalRatings > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= Math.round(location.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {location.rating.toFixed(1)} ({location.totalRatings})
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{location.duration}</span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4" />
                    360° VR
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}