import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Play, Pause, Volume2, VolumeX, Maximize2, Heart, MessageCircle, Share2, Upload, User, Camera, MapPin, X, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

interface Story {
  id: string;
  title: string;
  mediaUrl: string; // base64 data URL for both images and videos
  mediaType: 'image' | 'video';
  author: {
    name: string;
    role: string;
  };
  location: string;
  duration: string;
  category: string;
  description: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const STORAGE_KEY = 'arcnik_stories';

export function StoriesBehindShot() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // Upload form state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadLocation, setUploadLocation] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Wildlife");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadMediaPreview, setUploadMediaPreview] = useState<string | null>(null);
  const [uploadMediaType, setUploadMediaType] = useState<'image' | 'video'>('image');
  const [uploadVideoDuration, setUploadVideoDuration] = useState<string>("0:00");
  const [isUploading, setIsUploading] = useState(false);
  
  const [stories, setStories] = useState<Story[]>([]);

  // Load stories from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setStories(parsed);
      }
    } catch (error) {
      console.error('Failed to load stories:', error);
    }
  }, []);

  // Helper function to get storage size in MB
  const getStorageSizeMB = (data: string) => {
    const bytes = new Blob([data]).size;
    return bytes / (1024 * 1024);
  };

  // Save stories to localStorage with better error handling
  useEffect(() => {
    if (stories.length === 0) return; // Don't save empty array initially
    
    const saveStories = () => {
      try {
        const dataToSave = JSON.stringify(stories);
        const sizeMB = getStorageSizeMB(dataToSave);
        
        // Check if data is too large (> 8MB - leaving room for other data)
        if (sizeMB > 8) {
          console.warn(`Stories data is large (${sizeMB.toFixed(2)} MB). Consider deleting old stories.`);
          // Try to save anyway, but warn user
          toast.warning(`Storage usage is high (${sizeMB.toFixed(1)} MB). Consider deleting old stories.`, {
            duration: 4000,
          });
        }
        
        localStorage.setItem(STORAGE_KEY, dataToSave);
      } catch (error) {
        console.error('Failed to save stories:', error);
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
          // Remove the most recent story if we just added it
          if (stories.length > 0) {
            toast.error('Storage full! Removing recent upload.', {
              duration: 5000,
              description: 'Please delete older stories and try again.',
            });
            // Revert to previous state by removing the first story (most recent)
            setStories(prev => prev.slice(1));
          }
        }
      }
    };
    
    saveStories();
  }, [stories]);

  const toggleLike = (storyId: string) => {
    setStories(stories.map(story =>
      story.id === storyId
        ? {
            ...story,
            isLiked: !story.isLiked,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1
          }
        : story
    ));
    
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory({
        ...selectedStory,
        isLiked: !selectedStory.isLiked,
        likes: selectedStory.isLiked ? selectedStory.likes - 1 : selectedStory.likes + 1
      });
    }
  };

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
    setIsPlaying(false);
    setIsMuted(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // No file size limit - just inform user about large files
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 50) {
      toast.warning(`Large file detected (${fileSizeMB.toFixed(1)} MB). Loading may take a moment...`, {
        duration: 4000,
      });
    }

    setIsUploading(true);

    try {
      // Determine media type
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      
      // For images, we can compress them
      if (mediaType === 'image') {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Resize to max 1280px width while maintaining aspect ratio
          const maxWidth = 1280;
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Convert to JPEG with quality 0.75 for good balance
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          setUploadMediaPreview(dataUrl);
          setUploadMediaType(mediaType);
          setIsUploading(false);
          
          const sizeMB = getStorageSizeMB(dataUrl);
          toast.success(`Image loaded and optimized! (${sizeMB.toFixed(2)} MB)`);
        };
        
        img.onerror = () => {
          toast.error('Failed to load image');
          setIsUploading(false);
        };
        
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        // For videos, just use as-is - no limits!
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          const sizeMB = getStorageSizeMB(dataUrl);
          
          setUploadMediaPreview(dataUrl);
          setUploadMediaType(mediaType);
          setIsUploading(false);
          toast.success(`Video loaded successfully! (${sizeMB.toFixed(2)} MB)`);
        };
        
        reader.onerror = () => {
          toast.error('Failed to load video');
          setIsUploading(false);
        };
        
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to process file');
      setIsUploading(false);
    }
  };

  const handlePublishStory = () => {
    if (!uploadTitle || !uploadLocation || !uploadDescription || !uploadMediaPreview) {
      toast.error('Please fill in all fields and upload a file');
      return;
    }

    const newStory: Story = {
      id: `story-${Date.now()}`,
      title: uploadTitle,
      mediaUrl: uploadMediaPreview,
      mediaType: uploadMediaType,
      author: {
        name: 'You',
        role: 'Expedition Member - R/V NIK 421',
      },
      location: uploadLocation,
      duration: uploadMediaType === 'video' ? uploadVideoDuration : '1:00',
      category: uploadCategory,
      description: uploadDescription,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      isLiked: false,
    };

    // Check if adding this story would exceed storage
    const testData = JSON.stringify([newStory, ...stories]);
    const testSizeMB = getStorageSizeMB(testData);
    
    if (testSizeMB > 9) {
      toast.error('Cannot publish - storage limit reached!', {
        duration: 6000,
        description: `Total size would be ${testSizeMB.toFixed(1)} MB. Please delete older stories first.`,
      });
      return;
    }

    try {
      setStories([newStory, ...stories]);
      
      // Show success message
      toast.success(
        uploadMediaType === 'video' 
          ? '🎥 Video story published successfully!' 
          : '📷 Photo story published successfully!',
        {
          description: 'Your story is now visible to the NIK 421 community',
          duration: 3000,
        }
      );
      
      // Reset form
      setUploadTitle('');
      setUploadLocation('');
      setUploadCategory('Wildlife');
      setUploadDescription('');
      setUploadMediaPreview(null);
      setUploadMediaType('image');
      setUploadVideoDuration('0:00');
      setIsUploadOpen(false);
    } catch (error) {
      toast.error('Failed to save story. Browser storage might be full.', {
        duration: 5000,
        description: 'Try deleting older stories to free up space.',
      });
    }
  };

  const handleDeleteStory = (storyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this story?')) {
      setStories(stories.filter(s => s.id !== storyId));
      if (selectedStory && selectedStory.id === storyId) {
        setSelectedStory(null);
      }
      toast.success('Story deleted successfully - storage freed up!');
    }
  };

  const getStorageSize = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return '0 KB';
      const bytes = new Blob([data]).size;
      const kb = bytes / 1024;
      const mb = kb / 1024;
      if (mb >= 1) return `${mb.toFixed(1)} MB`;
      return `${kb.toFixed(1)} KB`;
    } catch {
      return 'Unknown';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Stories Behind the Shot</h1>
            <p className="text-gray-600">
              Share and explore authentic moments from the R/V NIK 421 Antarctic Peninsula Expedition. Upload your photos and videos! 📷🎥
            </p>
          </div>
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Story
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Share Your Expedition Story</DialogTitle>
                <DialogDescription>
                  Upload photos or videos from your R/V NIK 421 expedition. Files are stored locally and optimized for best performance.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm">Story Title</label>
                  <Input 
                    placeholder="e.g., Amazing Wildlife Encounter" 
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Location</label>
                  <Input 
                    placeholder="e.g., Paradise Harbor" 
                    value={uploadLocation}
                    onChange={(e) => setUploadLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Category</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                  >
                    <option>Wildlife</option>
                    <option>Landscape</option>
                    <option>Science</option>
                    <option>Navigation</option>
                    <option>Community</option>
                    <option>Ship Life</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Description</label>
                  <Textarea 
                    placeholder="Share the story behind your shot..." 
                    rows={4}
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                  />
                </div>
                
                {/* Media Preview */}
                {uploadMediaPreview ? (
                  <div className="relative rounded-lg overflow-hidden border-2 border-blue-400">
                    {uploadMediaType === 'video' ? (
                      <video
                        src={uploadMediaPreview}
                        className="w-full h-48 object-cover"
                        controls
                        onLoadedMetadata={(e) => {
                          const video = e.currentTarget;
                          const duration = video.duration;
                          const minutes = Math.floor(duration / 60);
                          const seconds = Math.floor(duration % 60);
                          setUploadVideoDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
                        }}
                      />
                    ) : (
                      <img
                        src={uploadMediaPreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setUploadMediaPreview(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-black/60">
                        {uploadMediaType === 'video' ? '🎥 Video' : '📷 Image'}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      id="media-upload" 
                      accept="image/*,video/mp4,video/webm,video/quicktime"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {isUploading ? 'Loading...' : 'Click to upload image or video'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, MP4, MOV, WEBM • No size limit!</p>
                      <p className="text-xs text-blue-500 mt-1">✨ Upload as many videos as you want</p>
                    </label>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handlePublishStory} 
                  className="flex-1"
                  disabled={isUploading}
                >
                  Publish Story
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <Badge className="bg-blue-600">R/V NIK 421 Community</Badge>
          <Badge variant="outline">{stories.length} Stories</Badge>
          <Badge variant="outline" className="text-xs">
            Storage: {getStorageSize()}
          </Badge>
        </div>
      </div>

      {/* Story Detail View */}
      {selectedStory ? (
        <div className="mb-6">
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setSelectedStory(null)}
          >
            ← Back to Grid
          </Button>

          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Media Display */}
              <div className="relative rounded-lg overflow-hidden bg-black">
                {selectedStory.mediaType === 'video' ? (
                  <video
                    src={selectedStory.mediaUrl}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay={isPlaying}
                    muted={isMuted}
                  />
                ) : (
                  <img
                    src={selectedStory.mediaUrl}
                    alt={selectedStory.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Story Details */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="mb-1">{selectedStory.title}</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {selectedStory.location}
                        <Badge variant="outline" className="ml-2">{selectedStory.category}</Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500"
                      onClick={(e) => handleDeleteStory(selectedStory.id, e)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-blue-600 text-white">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{selectedStory.author.name}</p>
                      <p className="text-xs text-gray-500">{selectedStory.author.role}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-auto mb-4">
                  <p className="text-gray-700">{selectedStory.description}</p>
                </div>

                {/* Engagement Stats */}
                <div className="border-t pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{selectedStory.likes} likes</span>
                      <span className="text-sm text-gray-600">{selectedStory.comments} comments</span>
                    </div>
                    <span className="text-xs text-gray-500">{selectedStory.timestamp}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={selectedStory.isLiked ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => toggleLike(selectedStory.id)}
                    >
                      <Heart className={`w-4 h-4 ${selectedStory.isLiked ? 'fill-current' : ''}`} />
                      {selectedStory.isLiked ? 'Liked' : 'Like'}
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Comment
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* Grid View */
        <>
          {stories.length === 0 ? (
            <Card className="p-12 text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="mb-2 text-gray-600">No Stories Yet</h3>
              <p className="text-gray-500 mb-6">
                Be the first to share a moment from the R/V NIK 421 expedition!
              </p>
              <Button onClick={() => setIsUploadOpen(true)} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Your First Story
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Card
                  key={story.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group relative"
                  onClick={() => handleSelectStory(story)}
                >
                  <div className="relative h-56">
                    {story.mediaType === 'video' ? (
                      <>
                        <video
                          src={story.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <Badge className="absolute top-3 left-3 bg-red-600 gap-1">
                          <Play className="w-3 h-3" />
                          Video
                        </Badge>
                      </>
                    ) : (
                      <img
                        src={story.mediaUrl}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Delete button - visible on hover */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDeleteStory(story.id, e)}
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-blue-600 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="line-clamp-1">{story.title}</h3>
                      <Badge variant="outline" className="ml-2">{story.category}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-3 h-3" />
                      {story.location}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {story.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {story.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {story.comments}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{story.timestamp}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
