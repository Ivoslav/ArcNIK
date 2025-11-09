import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Download, X, ChevronLeft, ChevronRight, ZoomIn, Upload, Image as ImageIcon } from 'lucide-react';

// Import NIK 421 expedition photos
import nick421Interior from 'figma:asset/17e25339ba5ab0f07fff754f4f212e80ef68307b.png';
import nick421Canal from 'figma:asset/cade31e95d3573e049343428ac4be2f02a6c27a1.png';
import nick421Sunset from 'figma:asset/e4b8d41ce3405f227d3956c2facf8a50298547e1.png';
import aerialShipView from 'figma:asset/d2665142911bb947417d79edb80696bc2a59677c.png';
import canalPassage from 'figma:asset/5fdca760a492dc20f3623c8fbe93cf3316f770e5.png';
import antarcticIceberg from 'figma:asset/510d98767864c5b4d2ee871941aff59839994971.png';
import ship421Port from 'figma:asset/ca47fbc707df749ce5a23cc595bf312a34ea88c6.png';

// NIK 421 expedition gallery
const galleryImages = [
  {
    id: 1,
    url: nick421Interior,
    title: 'Ship Interior View',
    location: 'NIK 421 - Main Deck',
    date: 'Nov 1, 2025',
    category: 'Ship'
  },
  {
    id: 2,
    url: nick421Canal,
    title: 'Navigating the Canal',
    location: 'Corinth Canal, Greece',
    date: 'Nov 2, 2025',
    category: 'Ship'
  },
  {
    id: 3,
    url: nick421Sunset,
    title: 'Sunset at Sea',
    location: 'NIK 421 - Open Waters',
    date: 'Nov 3, 2025',
    category: 'Ship'
  },
  {
    id: 4,
    url: aerialShipView,
    title: 'Aerial View - Ship Wake',
    location: 'Open Waters',
    date: 'Nov 5, 2025',
    category: 'Ship'
  },
  {
    id: 5,
    url: canalPassage,
    title: 'Canal Passage',
    location: 'Corinth Canal, Greece',
    date: 'Nov 8, 2025',
    category: 'Ship'
  },
  {
    id: 6,
    url: ship421Port,
    title: 'NIK 421 at Port',
    location: 'Ushuaia, Argentina',
    date: 'Mar 15, 2026',
    category: 'Ship'
  },
  {
    id: 7,
    url: antarcticIceberg,
    title: 'Antarctic Waters',
    location: 'Antarctic Peninsula',
    date: 'Apr 10, 2026',
    category: 'Landscape'
  },
];

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Wildlife', 'Landscape', 'Ship'];
  
  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-2">Photo Gallery</h1>
            <p className="text-gray-600">
              Nick 421 Expedition Photography Collection
            </p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="text-sm">
                <strong className="text-blue-900">Nick 421 Expedition Gallery</strong>
                <span className="text-gray-700 ml-2">
                  Featuring authentic photos from the vessel and voyage.
                </span>
              </p>
            </div>
          </div>
        </Card>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
            >
              {category}
              {category !== 'All' && (
                <Badge variant="secondary" className="ml-2">
                  {galleryImages.filter(img => img.category === category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">{galleryImages.length}</div>
          <p className="text-sm text-gray-600">Total Photos</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">{galleryImages.filter(img => img.category === 'Wildlife').length}</div>
          <p className="text-sm text-gray-600">Wildlife</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">{galleryImages.filter(img => img.category === 'Landscape').length}</div>
          <p className="text-sm text-gray-600">Landscapes</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">{galleryImages.filter(img => img.category === 'Ship').length}</div>
          <p className="text-sm text-gray-600">Ship Photos</p>
        </Card>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <Card 
            key={image.id} 
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setSelectedImage(galleryImages.findIndex(img => img.id === image.id))}
          >
            <div className="relative aspect-square">
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm truncate">{image.title}</p>
                  <p className="text-white/80 text-xs">{image.location}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge className="bg-white/90 text-gray-900 backdrop-blur">
                  <ZoomIn className="w-3 h-3 mr-1" />
                  View
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <Card className="p-12 text-center">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg mb-2">No photos in this category</h3>
          <p className="text-gray-600">Try selecting a different filter</p>
        </Card>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          {selectedImage !== null && (
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  variant="ghost"
                  size="icon"
                  disabled={selectedImage === 0}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  variant="ghost"
                  size="icon"
                  disabled={selectedImage === galleryImages.length - 1}
                  className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Image */}
              <img
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Image Info */}
              <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-start justify-between">
                  <div className="text-white">
                    <h3 className="text-xl mb-1">{galleryImages[selectedImage].title}</h3>
                    <p className="text-white/70 text-sm mb-2">
                      {galleryImages[selectedImage].location} • {galleryImages[selectedImage].date}
                    </p>
                    <Badge variant="secondary">{galleryImages[selectedImage].category}</Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setSelectedImage(null)}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Counter */}
              <div className="absolute top-4 left-4 text-white bg-black/50 backdrop-blur px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}