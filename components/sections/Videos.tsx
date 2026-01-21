'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/animations/ScrollAnimation';
import { trackVideoView } from '@/lib/tracking/events';

// Sample videos data - will be replaced by CMS
const videos = [
  {
    id: '1',
    title: 'عملية الليزك - خطوة بخطوة',
    thumbnail: '/images/video-thumb-1.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '5:30',
  },
  {
    id: '2',
    title: 'ما هي المياه البيضاء وكيف نعالجها؟',
    thumbnail: '/images/video-thumb-2.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '8:15',
  },
  {
    id: '3',
    title: 'نصائح للعناية بالعيون',
    thumbnail: '/images/video-thumb-3.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '4:45',
  },
  {
    id: '4',
    title: 'تجربة مريض بعد عملية الليزك',
    thumbnail: '/images/video-thumb-4.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '3:20',
  },
];

interface VideoCardProps {
  video: typeof videos[0];
  onPlay: (video: typeof videos[0]) => void;
}

function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
        onClick={() => onPlay(video)}
      >
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 mb-3">
          {/* Thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 text-primary-600 mr-[-2px]" fill="currentColor" />
            </div>
          </div>
          {/* Duration */}
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
            {video.duration}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {video.title}
        </h3>
      </motion.div>
    </StaggerItem>
  );
}

export function Videos() {
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  const handlePlayVideo = (video: typeof videos[0]) => {
    setActiveVideo(video);
    trackVideoView(video.title, 0);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section id="videos" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <ScrollAnimation>
          <h2 className="section-title">فيديوهات تعليمية</h2>
          <p className="section-subtitle">
            شاهد فيديوهات توضيحية عن خدماتنا وعملياتنا ونصائح للعناية بالعيون
          </p>
        </ScrollAnimation>

        {/* Videos Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
          ))}
        </StaggerContainer>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={handleCloseVideo}
        >
          <button
            onClick={handleCloseVideo}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
