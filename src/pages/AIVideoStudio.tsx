import React, { useState } from 'react';
import { Sparkles, Wand2, Play, Download, RefreshCw, Layers, Clock, Palette } from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Badge } from '@/components/ui/Base';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';

export const AIVideoStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [duration, setDuration] = useState('15');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setGeneratedVideo(null);
    
    // Mock API call
    try {
      // In a real app: await axios.post('/api/generate-video', { prompt, style, duration });
      await new Promise(resolve => setTimeout(resolve, 3000));
      setGeneratedVideo('https://picsum.photos/seed/ai-video/1080/1920');
    } catch (error) {
      console.error('Generation failed', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-3">
            AI Video Studio <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500" />
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Transform your wildest ideas into viral funny videos using advanced AI.</p>
        </div>
        <Badge variant="info">Beta Access</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader title="Creative Controls" subtitle="Define the parameters for your AI generation" />
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Video Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the funny scene (e.g., 'A clumsy robot trying to bake a cake and failing spectacularly...')"
                  className="w-full h-32 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-zinc-500 outline-none resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Style
                  </label>
                  <select 
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500"
                  >
                    <option value="cinematic">Cinematic Humor</option>
                    <option value="cartoon">3D Animation</option>
                    <option value="realistic">Hyper-Realistic</option>
                    <option value="meme">Meme Style</option>
                    <option value="sketch">Hand-Drawn Sketch</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Duration
                  </label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-zinc-500"
                  >
                    <option value="15">15 Seconds</option>
                    <option value="30">30 Seconds</option>
                    <option value="60">60 Seconds</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['9:16', '1:1', '16:9'].map((ratio) => (
                    <button 
                      key={ratio}
                      className="py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full py-6 gap-2 text-lg"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Generating Magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" /> Generate Video
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-white font-semibold">Pro Tip</p>
                  <p className="text-zinc-400 text-xs mt-1">Use descriptive adjectives for better humor timing and facial expressions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-7">
          <Card className="h-full min-h-[600px] flex flex-col bg-zinc-50 dark:bg-zinc-950/50 border-dashed border-2">
            <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div 
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-6"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 border-4 border-zinc-200 dark:border-zinc-800 rounded-full animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-amber-500 animate-bounce" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">AI is crafting your masterpiece</h3>
                      <p className="text-zinc-500 mt-2">Analyzing prompt, generating frames, and rendering humor...</p>
                    </div>
                    <div className="w-64 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        className="h-full bg-zinc-900 dark:bg-zinc-100"
                      />
                    </div>
                  </motion.div>
                ) : generatedVideo ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-sm space-y-6"
                  >
                    <div className="aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
                      <img 
                        src={generatedVideo} 
                        alt="Generated" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-16 h-16 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 gap-2">
                        <Download className="w-4 h-4" /> Download
                      </Button>
                      <Button variant="primary" className="flex-1 gap-2">
                        Schedule Post
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto">
                      <Play className="w-10 h-10 text-zinc-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-400">No video generated yet</h3>
                      <p className="text-zinc-500 text-sm mt-1">Enter a prompt and click generate to see the magic.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
