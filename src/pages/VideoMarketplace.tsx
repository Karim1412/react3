import React, { useState } from 'react';
import { Search, Filter, Check, X, Play, User as UserIcon, Star } from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui/Base';
import { motion, AnimatePresence } from 'motion/react';

interface VideoSubmission {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  score: number;
  duration: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

const mockSubmissions: VideoSubmission[] = [
  { id: '1', title: 'Dog tries to talk like a human', creator: 'bark_master', thumbnail: 'https://picsum.photos/seed/dog/400/600', score: 94, duration: '0:15', status: 'pending', timestamp: '2h ago' },
  { id: '2', title: 'Epic fail at the gym', creator: 'gym_fails_daily', thumbnail: 'https://picsum.photos/seed/gym/400/600', score: 88, duration: '0:24', status: 'pending', timestamp: '4h ago' },
  { id: '3', title: 'Toddler vs Giant Teddy Bear', creator: 'cute_moments', thumbnail: 'https://picsum.photos/seed/baby/400/600', score: 97, duration: '0:12', status: 'pending', timestamp: '5h ago' },
  { id: '4', title: 'Grandma playing VR for the first time', creator: 'tech_granny', thumbnail: 'https://picsum.photos/seed/vr/400/600', score: 91, duration: '0:45', status: 'pending', timestamp: '6h ago' },
  { id: '5', title: 'Cat accidentally starts a live stream', creator: 'cat_vibes', thumbnail: 'https://picsum.photos/seed/cat2/400/600', score: 99, duration: '0:30', status: 'pending', timestamp: '8h ago' },
  { id: '6', title: 'Magic trick gone wrong', creator: 'magic_mike', thumbnail: 'https://picsum.photos/seed/magic/400/600', score: 82, duration: '0:18', status: 'pending', timestamp: '10h ago' },
];

export const VideoMarketplace = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedVideo, setSelectedVideo] = useState<VideoSubmission | null>(null);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    // In a real app, we'd call an API here
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Video Marketplace</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Review and acquire the funniest user-submitted content.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search submissions..." 
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-zinc-500 outline-none w-64"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {submissions.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group h-full flex flex-col">
                <div 
                  className="aspect-[9/16] relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute top-3 left-3">
                    <Badge variant={video.score > 90 ? 'success' : 'info'}>
                      {video.score}% Engagement
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3">
                    <div className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm line-clamp-2 leading-tight">
                      {video.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center">
                        <UserIcon className="w-3 h-3 text-zinc-300" />
                      </div>
                      <span className="text-zinc-300 text-xs">@{video.creator}</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 gap-3 mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 border-red-200 dark:border-red-900/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => handleAction(video.id, 'rejected')}
                  >
                    <X className="w-4 h-4" /> Reject
                  </Button>
                  <Button 
                    variant="primary" 
                    className="w-full gap-2"
                    onClick={() => handleAction(video.id, 'approved')}
                  >
                    <Check className="w-4 h-4" /> Accept
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl"
            >
              <div className="md:w-1/2 aspect-[9/16] bg-black relative">
                <img 
                  src={selectedVideo.thumbnail} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white fill-white opacity-50" />
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{selectedVideo.title}</h2>
                    <p className="text-zinc-500 mt-1">by @{selectedVideo.creator}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Engagement Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-xl font-bold">{selectedVideo.score}%</span>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Duration</p>
                    <p className="text-xl font-bold mt-1">{selectedVideo.duration}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2">AI Content Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Humor Level</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full">
                      <div className="bg-zinc-900 dark:bg-zinc-100 h-full w-[92%]" />
                    </div>
                    <div className="flex justify-between text-xs mt-3">
                      <span className="text-zinc-500">Viral Potential</span>
                      <span className="font-medium">Exceptional</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full">
                      <div className="bg-zinc-900 dark:bg-zinc-100 h-full w-[96%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 py-6"
                    onClick={() => {
                      handleAction(selectedVideo.id, 'rejected');
                      setSelectedVideo(null);
                    }}
                  >
                    Reject Submission
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1 py-6"
                    onClick={() => {
                      handleAction(selectedVideo.id, 'approved');
                      setSelectedVideo(null);
                    }}
                  >
                    Acquire Video
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
