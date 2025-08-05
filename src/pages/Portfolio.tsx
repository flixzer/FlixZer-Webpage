import { motion } from 'framer-motion';
import { ExternalLink, Play, Users, Calendar, Briefcase, Download, Eye } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import { projects } from '../data';
import portfolioImg from '../assets/portfolio.png';
import resumePdf from '../assets/Soraaut\'s Resume.pdf';
import resumePreview from '../assets/Soraaut\'s Resume_page-0001.jpg';

// Interface สำหรับข้อมูลวิดีโอ
interface VideoData {
  id: number;
  title: string;
  channelTitle: string;
  views: string;
  videoUrl: string;
  duration: string;
  viewCount?: number; // เพิ่มสำหรับเก็บยอดวิวจริง
  thumbnailUrl?: string; // เพิ่มสำหรับเก็บ thumbnail URL จริง
}

export default function Portfolio() {
  // Add error state
  const [error, setError] = useState<string | null>(null);

  const skills = [
    { 
      name: 'Premiere Pro', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg',
      color: 'from-purple-500 to-pink-500',
      category: 'Video Editing'
    },
    { 
      name: 'After Effects', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
      color: 'from-blue-500 to-cyan-500',
      category: 'Motion Graphics'
    },
    { 
      name: 'Photoshop', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
      color: 'from-indigo-500 to-purple-500',
      category: 'Graphic Design'
    },
    { 
      name: 'Microsoft Office', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Microsoft_365_%282022%29.svg/512px-Microsoft_365_%282022%29.svg.png',
      color: 'from-orange-500 to-red-500',
      category: 'Productivity'
    },
  ];

  // Function to extract channel handle/ID from YouTube URL
  const getChannelHandle = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      
      // Handle different YouTube URL formats
      if (path.startsWith('/@')) {
        return path.substring(2); // Remove /@
      } else if (path.startsWith('/channel/')) {
        return path.substring(9); // Remove /channel/
      } else if (path.startsWith('/c/')) {
        return path.substring(3); // Remove /c/
      } else if (path.startsWith('/user/')) {
        return path.substring(6); // Remove /user/
      }
      
      return url; // Return original if can't parse
    } catch {
      return url; // Return original if invalid URL
    }
  };

  // Function to get YouTube channel profile picture
  const getYouTubeProfilePicture = (channelUrl: string): string => {
    const handle = getChannelHandle(channelUrl);
    
    // Use YouTube's RSS feed to get channel info (this works without API key)
    // Alternative: use a proxy service or YouTube thumbnail URL pattern
    return `https://unavatar.io/youtube/${handle}`;
    
    // Fallback options:
    // return `https://img.youtube.com/vi/${handle}/maxresdefault.jpg`; // For video thumbnails
    // return `https://yt3.ggpht.com/ytc/${handle}=s800-c-k-c0x00ffffff-no-rj`; // Direct but needs channel ID
  };

  // Function to extract video ID from YouTube URL
  const getYouTubeVideoId = useCallback((url: string): string => {
    try {
      const urlObj = new URL(url);
      
      // Handle different YouTube URL formats
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.substring(1); // Remove leading /
      } else if (urlObj.hostname.includes('youtube.com')) {
        const searchParams = urlObj.searchParams;
        return searchParams.get('v') || '';
      }
      
      return '';
    } catch {
      return '';
    }
  }, []);

  // Function to extract TikTok video ID from URL
  const getTikTokVideoId = useCallback((url: string): string => {
    try {
      const urlObj = new URL(url);
      
      // Handle different TikTok URL formats
      if (urlObj.hostname.includes('tiktok.com')) {
        // Extract video ID from path like /video/7123456789
        const pathMatch = urlObj.pathname.match(/\/video\/(\d+)/);
        if (pathMatch) {
          return pathMatch[1];
        }
        
        // Handle short format like /@username/video/7123456789
        const userVideoMatch = urlObj.pathname.match(/\/@[^/]+\/video\/(\d+)/);
        if (userVideoMatch) {
          return userVideoMatch[1];
        }
      }
      
      return '';
    } catch {
      return '';
    }
  }, []);

  // Function to detect if URL is TikTok or YouTube
  const getVideoType = (url: string): 'youtube' | 'tiktok' | 'unknown' => {
    try {
      const urlObj = new URL(url);
      
      if (urlObj.hostname.includes('tiktok.com')) {
        return 'tiktok';
      } else if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
        return 'youtube';
      }
      
      return 'unknown';
    } catch {
      return 'unknown';
    }
  };

  // Function to get YouTube video thumbnail
  const getYouTubeThumbnail = (videoUrl: string, quality: string = 'maxresdefault'): string => {
    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) return `https://picsum.photos/1920/1080?random=${Math.random()}`;
    
    // YouTube thumbnail qualities: maxresdefault, hqdefault, mqdefault, sddefault
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  // Function to get TikTok video thumbnail
  const getTikTokThumbnail = (videoUrl: string, videoData?: VideoData): string => {
    // If we have real thumbnail from API, use it
    if (videoData?.thumbnailUrl) {
      return videoData.thumbnailUrl;
    }
    
    const videoId = getTikTokVideoId(videoUrl);
    if (!videoId) return `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=640&h=1138&fit=crop&crop=center&auto=format&q=60`;
    
    // Use a better placeholder service that supports TikTok-like ratios
    const placeholderImages = [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=640&h=1138&fit=crop&crop=center&auto=format&q=60',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=640&h=1138&fit=crop&crop=center&auto=format&q=60',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=640&h=1138&fit=crop&crop=center&auto=format&q=60',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=640&h=1138&fit=crop&crop=center&auto=format&q=60'
    ];
    
    const imageIndex = parseInt(videoId.slice(-1)) % placeholderImages.length;
    return placeholderImages[imageIndex];
  };

  // Universal function to get video thumbnail
  const getVideoThumbnail = (videoUrl: string, quality: string = 'maxresdefault', videoData?: VideoData): string => {
    const videoType = getVideoType(videoUrl);
    
    switch (videoType) {
      case 'youtube':
        return getYouTubeThumbnail(videoUrl, quality);
      case 'tiktok':
        return getTikTokThumbnail(videoUrl, videoData);
      default:
        return `https://picsum.photos/1920/1080?random=${Math.random()}`;
    }
  };

  // State สำหรับเก็บข้อมูลวิดีโอแยกตาม section
  const [gamingVideos, setGamingVideos] = useState<VideoData[]>([]);
  const [storytellingVideos, setStorytellingVideos] = useState<VideoData[]>([]);
  const [shortformVideos, setShortformVideos] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch YouTube data when component mounts
  useEffect(() => {
    // Function to format view count
    const formatViewCount = (viewCount: number): string => {
      if (viewCount >= 1000000) {
        return (viewCount / 1000000).toFixed(1) + 'M';
      } else if (viewCount >= 1000) {
        return (viewCount / 1000).toFixed(0) + 'K';
      }
      return viewCount.toString();
    };

    // Function to get real YouTube video data from YouTube Data API
    const fetchYouTubeVideoData = async (videoUrl: string): Promise<{ title: string; duration: string; viewCount: number; channelTitle: string } | null> => {
      try {
        const videoId = getYouTubeVideoId(videoUrl);
        if (!videoId) return null;

        // YouTube Data API key - ใส่ API key ของคุณตรงนี้
        const API_KEY = 'AIzaSyCyXeVVcJJ8oEn0zZD5EPo_UzwP5nYk9U0';
        
        // Call YouTube Data API
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,statistics,contentDetails`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch from YouTube API');
        }

        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          throw new Error('Video not found');
        }

        const video = data.items[0];
        
        // Parse duration from ISO 8601 format (PT4M13S) to readable format
        const parseDuration = (duration: string): string => {
          const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
          const matches = duration.match(regex);
          
          if (!matches) return '0:00';
          
          const hours = parseInt(matches[1] || '0');
          const minutes = parseInt(matches[2] || '0');
          const seconds = parseInt(matches[3] || '0');
          
          if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          }
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };

        return {
          title: video.snippet.title,
          duration: parseDuration(video.contentDetails.duration),
          viewCount: parseInt(video.statistics.viewCount || '0'),
          channelTitle: video.snippet.channelTitle
        };
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return null;
      }
    };

    // Function to get real TikTok video data using TikTok API or scraping service
    const fetchTikTokVideoData = async (videoUrl: string): Promise<{ title: string; duration: string; viewCount: number; channelTitle: string; thumbnailUrl?: string } | null> => {
      try {
        const videoId = getTikTokVideoId(videoUrl);
        if (!videoId) return null;

        // Using TikTok oEmbed API (free but limited data)
        const oEmbedResponse = await fetch(
          `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!oEmbedResponse.ok) {
          throw new Error('Failed to fetch from TikTok oEmbed API');
        }

        const oEmbedData = await oEmbedResponse.json();
        
        // Extract duration from title if available, otherwise default to short duration
        const estimatedDuration = '0:30'; // TikTok videos are typically 15-60 seconds
        
        return {
          title: oEmbedData.title || 'TikTok Video',
          duration: estimatedDuration,
          viewCount: 0, // oEmbed doesn't provide view count
          channelTitle: oEmbedData.author_name || 'TikTok User',
          thumbnailUrl: oEmbedData.thumbnail_url || undefined
        };
      } catch (error) {
        console.error('Error fetching TikTok data:', error);
        return null;
      }
    };

    // Gaming Section Videos - ใส่ลิงค์ Gaming ตรงนี้
    const gamingVideoUrls = [
      "https://www.youtube.com/watch?v=7VDfNJwcXO0", // Gaming Video 1
      "https://www.youtube.com/watch?v=fyE79PekAio", // Gaming Video 2
      "https://www.youtube.com/watch?v=12ps1IznCMo", // Gaming Video 3
      "https://www.youtube.com/watch?v=grgIvFuTi7w", // Gaming Video 4
    ];

    // Storytelling Section Videos - ใส่ลิงค์ Storytelling ตรงนี้
    const storytellingVideoUrls = [
      "https://www.youtube.com/watch?v=BzleDhuC-GM", // Storytelling Video 1
      "https://www.youtube.com/watch?v=Xnn81vlZa9U", // Storytelling Video 2
      "https://www.youtube.com/watch?v=sZ3Rm8Nm6fE", // Storytelling Video 3
    ];

    // Shortform Section Videos - ใส่ลิงค์ TikTok จริงตรงนี้
    const shortformVideoUrls = [
      "https://www.tiktok.com/@pangboyz/video/7520562857608580370", // Khaby Lame - Popular TikTok Creator
      "https://www.tiktok.com/@pangboyz/video/7515748140578802952", // Charli D'Amelio - Popular TikTok Creator  
      "https://www.tiktok.com/@pangboyz/video/7513892919724526855", // Addison Rae - Popular TikTok Creator
      "https://www.tiktok.com/@pangboyz/video/7530200755278613778", // Zach King - Magic Videos
      "https://www.tiktok.com/@pangboyz/video/7499406715579010322", // SpencerX - Beatboxer
      "https://www.tiktok.com/@pangboyz/video/7498657189909794056", // Dixie D'Amelio - Popular TikTok Creator
    ];

    // Function to fetch TikTok video data using oEmbed API
    const fetchTikTokData = async (videoUrl: string): Promise<VideoData> => {
      try {
        // Skip invalid URLs
        if (!videoUrl || videoUrl.includes('example')) {
          throw new Error('Invalid URL');
        }

        // Get real TikTok data first
        const realData = await fetchTikTokVideoData(videoUrl);

        // Use real data from TikTok API if available
        if (realData) {
          return {
            id: Date.now() + Math.random(),
            title: realData.title,
            channelTitle: realData.channelTitle,
            views: realData.viewCount > 0 ? formatViewCount(realData.viewCount) : 'N/A',
            videoUrl: videoUrl,
            duration: realData.duration,
            viewCount: realData.viewCount,
            thumbnailUrl: realData.thumbnailUrl,
          };
        }

        // Fallback data for TikTok
        return {
          id: Date.now() + Math.random(),
          title: 'TikTok Video',
          channelTitle: 'TikTok User',
          views: 'N/A',
          videoUrl: videoUrl,
          duration: '0:30',
        };
      } catch (error) {
        console.log('Error fetching TikTok data for:', videoUrl, error);
      }

      // Final fallback data
      return {
        id: Date.now() + Math.random(),
        title: `TikTok Video ${Math.floor(Math.random() * 100)}`,
        channelTitle: 'TikTok Creator',
        views: 'N/A',
        videoUrl: videoUrl,
        duration: '0:30',
      };
    };

    // Universal function to fetch video data (YouTube or TikTok)
    const fetchVideoData = async (videoUrl: string): Promise<VideoData> => {
      const videoType = getVideoType(videoUrl);
      
      switch (videoType) {
        case 'youtube':
          return await fetchYouTubeData(videoUrl);
        case 'tiktok':
          return await fetchTikTokData(videoUrl);
        default:
          // Fallback for unknown URLs
          return {
            id: Date.now() + Math.random(),
            title: `Video ${Math.floor(Math.random() * 100)}`,
            channelTitle: 'Unknown Platform',
            views: 'N/A',
            videoUrl: videoUrl,
            duration: '0:00',
          };
      }
    };

    // Function to fetch YouTube video data using oEmbed API + real data
    const fetchYouTubeData = async (videoUrl: string): Promise<VideoData> => {
      try {
        // Skip invalid URLs
        if (!videoUrl || videoUrl.includes('example')) {
          throw new Error('Invalid URL');
        }

        // Get real video data first
        const realData = await fetchYouTubeVideoData(videoUrl);

        // ใช้ oEmbed API ของ YouTube สำหรับ title และ channel
        const oEmbedResponse = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        let title = 'YouTube Video';
        let channelTitle = 'Unknown Channel';

        if (oEmbedResponse.ok) {
          const oEmbedData = await oEmbedResponse.json();
          title = oEmbedData.title || title;
          channelTitle = oEmbedData.author_name || channelTitle;
        }

        // Use real data from YouTube API if available, otherwise fallback to oEmbed
        if (realData) {
          return {
            id: Date.now() + Math.random(),
            title: realData.title,
            channelTitle: realData.channelTitle,
            views: formatViewCount(realData.viewCount),
            videoUrl: videoUrl,
            duration: realData.duration,
            viewCount: realData.viewCount,
          };
        }

        // Fallback to oEmbed data if YouTube API fails
        return {
          id: Date.now() + Math.random(),
          title: title,
          channelTitle: channelTitle,
          views: 'N/A',
          videoUrl: videoUrl,
          duration: '0:00',
        };
      } catch (error) {
        console.log('Error fetching YouTube data for:', videoUrl, error);
      }

      // Final fallback data
      return {
        id: Date.now() + Math.random(),
        title: `Sample Video ${Math.floor(Math.random() * 100)}`,
        channelTitle: 'Sample Channel',
        views: 'N/A',
        videoUrl: videoUrl,
        duration: '0:00',
      };
    };

    const fetchAllVideoData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch Gaming videos (YouTube)
        const gamingDataPromises = gamingVideoUrls.map(url => fetchVideoData(url));
        const gamingResults = await Promise.all(gamingDataPromises);
        setGamingVideos(gamingResults);
        
        // Fetch Storytelling videos (YouTube)
        const storytellingDataPromises = storytellingVideoUrls.map(url => fetchVideoData(url));
        const storytellingResults = await Promise.all(storytellingDataPromises);
        setStorytellingVideos(storytellingResults);
        
        // Fetch Shortform videos (TikTok)
        const shortformDataPromises = shortformVideoUrls.map(url => fetchVideoData(url));
        const shortformResults = await Promise.all(shortformDataPromises);
        setShortformVideos(shortformResults);
      } catch (error) {
        console.error('Error fetching video data:', error);
        setError('Failed to load video data');
        // Set fallback data if everything fails - using API data if available
        const fallbackGamingData = await Promise.all(
          gamingVideoUrls.map(async (url, index) => {
            const realData = await fetchYouTubeVideoData(url);
            return {
              id: index + 1,
              title: realData?.title || `Gaming Video ${index + 1}`,
              channelTitle: realData?.channelTitle || 'FlixZer',
              views: realData ? formatViewCount(realData.viewCount) : 'N/A',
              videoUrl: url,
              duration: realData?.duration || '0:00',
              viewCount: realData?.viewCount || 0,
            };
          })
        );
        
        const fallbackStorytellingData = await Promise.all(
          storytellingVideoUrls.map(async (url, index) => {
            const realData = await fetchYouTubeVideoData(url);
            return {
              id: gamingVideoUrls.length + index + 1,
              title: realData?.title || `Storytelling Video ${index + 1}`,
              channelTitle: realData?.channelTitle || 'FlixZer',
              views: realData ? formatViewCount(realData.viewCount) : 'N/A',
              videoUrl: url,
              duration: realData?.duration || '0:00',
              viewCount: realData?.viewCount || 0,
            };
          })
        );
        
        const fallbackShortformData = await Promise.all(
          shortformVideoUrls.map(async (url, index) => {
            const realData = await fetchYouTubeVideoData(url);
            return {
              id: gamingVideoUrls.length + storytellingVideoUrls.length + index + 1,
              title: realData?.title || `Shortform Video ${index + 1}`,
              channelTitle: realData?.channelTitle || 'FlixZer',
              views: realData ? formatViewCount(realData.viewCount) : 'N/A',
              videoUrl: url,
              duration: realData?.duration || '0:60',
              viewCount: realData?.viewCount || 0,
            };
          })
        );
        
        setGamingVideos(fallbackGamingData);
        setStorytellingVideos(fallbackStorytellingData);
        setShortformVideos(fallbackShortformData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllVideoData();
  }, [getYouTubeVideoId, getTikTokVideoId]); // Add dependencies

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 md:pt-40 pb-16 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left Side - Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative">
                  {/* Background decorative elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full opacity-40 blur-xl"></div>
                  
                  {/* Main image */}
                  <img
                    src={portfolioImg}
                    alt="Portfolio Preview"
                    className="relative w-full max-w-md mx-auto lg:max-w-full h-80 md:h-96 lg:h-[400px] rounded-3xl object-cover shadow-2xl border-4 border-white dark:border-gray-700"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
                </div>
              </motion.div>

              {/* Right Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-8 text-center lg:text-left order-1 lg:order-2"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight"
                >
                  Portfolio
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  สร้างสรรค์ผลงานด้วยความเชี่ยวชาญในการตัดต่อวิดีโอและการออกแบบกราฟิก
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="grid grid-cols-3 gap-6 py-6"
                >
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">3+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">ปีประสบการณ์</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">100+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">วิดีโอที่ตัดต่อ</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">4+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">โปรเจกต์ปัจจุบัน</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <a
                    href="https://youtube.com/playlist?list=PL8jTaMUfEIynMbNlQG1TywiUGeB8wCcWu&si=GsaPaJ5Juj6EmG1q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Play size={24} />
                    ดูตัวอย่างผลงาน
                    <ExternalLink size={20} />
                  </a>
                  
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Users size={24} />
                    ติดต่อสอบถาม
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Software Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent"
              >
                Software Skills
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="text-gray-600 dark:text-gray-300 text-lg mb-8"
              >
                เครื่องมือมืออาชีพที่ใช้ในการสร้างสรรค์ผลงาน
              </motion.p>
            </div>
            
            {/* Elegant Grid Layout */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: 1.8 + index * 0.2,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="group relative"
                    >
                      {/* Card Container */}
                      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                        
                        {/* Background Gradient Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`}></div>
                        
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 dark:from-gray-700 to-transparent rounded-bl-full opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-50 dark:from-gray-700 to-transparent rounded-tr-full opacity-30"></div>
                        
                        {/* Content Layout */}
                        <div className="relative z-10 flex items-center gap-6">
                          
                          {/* Icon Section */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex-shrink-0"
                          >
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${skill.color} p-1 shadow-lg group-hover:shadow-xl transition-all duration-500`}>
                              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center">
                                <img 
                                  src={skill.icon} 
                                  alt={skill.name}
                                  className="w-10 h-10 object-contain filter drop-shadow-sm"
                                />
                              </div>
                            </div>
                          </motion.div>
                          
                          {/* Text Content */}
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300">
                                {skill.name}
                              </h3>
                              
                              <p className="text-gray-500 dark:text-gray-400 font-medium">
                                {skill.category}
                              </p>
                            </div>
                            
                            {/* Professional Badge */}
                            <div className={`inline-block px-4 py-2 bg-gradient-to-r ${skill.color} text-white text-sm font-semibold rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}>
                              Professional Level
                            </div>
                          </div>
                          
                          {/* Arrow Indicator */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.5 + index * 0.1 }}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg`}>
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Floating Accent */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.8 + index * 0.1 }}
                        className="absolute -top-2 -right-2 z-20"
                      >
                        <div className={`w-6 h-6 bg-gradient-to-br ${skill.color} rounded-full shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}></div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Bottom Decorative Element */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.0 }}
                  className="mt-12 text-center"
                >
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-full border border-emerald-100 dark:border-emerald-800">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      เครื่องมือมืออาชีพสำหรับการสร้างสรรค์
                    </span>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </motion.div>
              </div>

            {/* Skills Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="rounded-2xl p-8 border transition-all duration-500 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border-emerald-100 dark:border-emerald-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                      ความเชี่ยวชาญระดับมืออาชีพ
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      เชี่ยวชาญในการใช้เครื่องมือมืออาชีพสำหรับการสร้างสรรค์เนื้อหาดิจิทัล 
                      ตั้งแต่การตัดต่อวิดีโอ Motion Graphics ไปจนถึงการออกแบบกราฟิก
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">3+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">ปีประสบการณ์</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">4</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Software หลัก</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Resume Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ประวัติส่วนตัว
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                ดาวน์โหลดหรือดู Resume ของผม
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Resume Preview */}
                  <div className="flex-shrink-0">
                    <div className="relative group">
                      {/* Resume Image Preview */}
                      <div className="w-32 h-40 rounded-xl border-2 border-indigo-200 dark:border-indigo-700 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                        <img
                          src={resumePreview}
                          alt="Resume Preview"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <Eye className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" size={24} />
                        </div>
                      </div>
                      
                      {/* Floating Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                        JPG
                      </div>
                    </div>
                  </div>

                  {/* Resume Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Soraaut's Resume
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      ประวัติการศึกษา ประสบการณ์การทำงาน และทักษะต่างๆ ที่ผมมี
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      {/* Preview Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(resumePdf, '_blank')}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                      >
                        <Eye size={20} />
                        ดู Preview
                      </motion.button>

                      {/* Download Button */}
                      <motion.a
                        href={resumePdf}
                        download="Soraaut_Resume.pdf"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
                      >
                        <Download size={20} />
                        ดาวน์โหลด
                      </motion.a>
                    </div>

                    {/* Resume Stats */}
                    <div className="flex justify-center md:justify-start gap-8 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">4+</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">ปีประสบการณ์</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">3</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">โปรเจกต์หลัก</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">4</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Software</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Current Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                โปรเจกต์ปัจจุบัน
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                ร่วมงานกับช่อง YouTuber ชั้นนำต่างๆ
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Channel Avatar */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <img
                        src={
                          project.channelUrl 
                            ? getYouTubeProfilePicture(project.channelUrl)
                            : project.channelId || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}&background=random&color=fff&size=120`
                        }
                        alt={`${project.name} Channel`}
                        className="relative w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // First fallback: try ui-avatars
                          if (!e.currentTarget.src.includes('ui-avatars.com')) {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}&background=0369a1&color=fff&size=120`;
                          }
                        }}
                      />
                      
                      {/* Channel Link Overlay */}
                      {project.channelUrl && (
                        <motion.a
                          href={project.channelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                          title={`ไปยังช่อง ${project.name}`}
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </motion.a>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                        {project.name}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">{project.period}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2">
                        <Briefcase size={16} className="text-sky-500" />
                        <span className="text-sky-600 dark:text-sky-400 font-medium">
                          {project.role}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex justify-center space-x-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Work Thumbnails Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                ตัวอย่างผลงาน
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Thumbnail และวิดีโอที่ได้รับความนิยม
              </p>
              {error && (
                <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
                  <p className="text-sm">⚠️ {error} - Using sample data instead</p>
                </div>
              )}
            </div>
            
            {/* Section 1: Text Left, Thumbnails Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="mb-24"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2 }}
                    className="space-y-6"
                  >
                    <div className="inline-block">
                      <span className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        🎮 Gaming Content
                      </span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200">
                      Gaming Highlight<br />
                      <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                        ที่โดดเด่น
                      </span>
                    </h3>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      เชี่ยวชาญในการสร้าง Gaming Montage และ Highlight Reel 
                      ที่สร้างความตื่นเต้นให้กับผู้ชม พร้อมเอฟเฟ็กต์และการตัดต่อ
                      ที่ลื่นไหลตามจังหวะเพลง
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Longform Content และ Shortform Content
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Highlight Reel และ Game Footage ต่าง ๆ
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">200+</div>
                          <div>Gaming Videos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">10M+</div>
                          <div>Total Views</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Side - Thumbnails Grid */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.4 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {isLoading ? (
                      // Loading skeleton
                      Array.from({ length: 4 }).map((_, index) => (
                        <div key={`loading-${index}`} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
                          <div className="aspect-video bg-gray-300 dark:bg-gray-600"></div>
                          <div className="p-3">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      gamingVideos.slice(0, 4).map((item, index) => (
                        <motion.a
                          key={`section1-${item.id}`}
                          href={item.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.6 + index * 0.1 }}
                          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={getYouTubeThumbnail(item.videoUrl)}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Duration Badge */}
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                              {item.duration}
                            </div>
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                              <Play className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" size={32} />
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          
                          <div className="p-3">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 line-clamp-1 text-sm">
                              {item.title}
                            </h4>
                            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
                              <span className="font-medium text-sky-600 dark:text-sky-400">
                                {item.channelTitle}
                              </span>
                              <div className="flex items-center gap-1">
                                <Users size={12} />
                                <span>{item.views}</span>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Thumbnails Left, Text Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              className="mb-24"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Thumbnails Grid */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.0 }}
                    className="order-2 lg:order-1"
                  >
                    {/* Featured Large Thumbnail */}
                    {storytellingVideos.length > 0 && (
                      <motion.a
                        href={storytellingVideos[0].videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.2 }}
                        className="mb-4 group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 block"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={getYouTubeThumbnail(storytellingVideos[0].videoUrl)}
                            alt={storytellingVideos[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <Play className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" size={48} />
                          </div>
                          <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-sm px-3 py-1 rounded">
                            {storytellingVideos[0].duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                            {storytellingVideos[0].title}
                          </h4>
                          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                            <span className="text-sky-600 dark:text-sky-400 font-medium">
                              {storytellingVideos[0].channelTitle}
                            </span>
                            <div className="flex items-center gap-2">
                              <Users size={14} />
                              <span>{storytellingVideos[0].views}</span>
                            </div>
                          </div>
                        </div>
                      </motion.a>
                    )}

                    {/* Small Thumbnails Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {!isLoading && storytellingVideos.length >= 2 ? (
                        storytellingVideos.slice(1, 3).map((item, index) => (
                          <motion.a
                            key={`section2-${item.id}`}
                            href={item.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.4 + index * 0.1 }}
                            className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 block"
                          >
                            <div className="relative aspect-video overflow-hidden">
                              <img
                                src={getYouTubeThumbnail(item.videoUrl)}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                                {item.duration}
                              </div>
                            </div>
                            <div className="p-2">
                              <h5 className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                                {item.title}
                              </h5>
                            </div>
                          </motion.a>
                        ))
                      ) : (
                        // Loading placeholders
                        Array.from({ length: 2 }).map((_, index) => (
                          <div key={`small-loading-${index}`} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
                            <div className="aspect-video bg-gray-300 dark:bg-gray-600"></div>
                            <div className="p-2">
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>

                  {/* Right Side - Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.6 }}
                    className="space-y-6 order-1 lg:order-2"
                  >
                    <div className="inline-block">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        🎬 Story Telling
                      </span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200">
                      Storytelling<br />
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ที่สร้างสรรค์
                      </span>
                    </h3>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      การสร้างเนื้อหาที่มีเรื่องราวและอารมณ์ ตั้งแต่ Vlog, Highlight ต่าง ๆ
                      รวมถึง LIVE Streaming ที่ถูกย่อออกมาให้เป็นคลิปที่สั้น กระชับ แต่ยังสามารถเก็บเรื่องราวได้อย่างน่าสนใจ
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Professional Color Grading
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Audio Enhancement & Mixing
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          Creative Transitions
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">30+</div>
                          <div>Creative Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">1.5M+</div>
                          <div>Watch Hours</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Section 3: Shortform Videos - Mobile-first Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.0 }}
              className="mb-24"
            >
              <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.2 }}
                  className="text-center mb-16"
                >
                  <div className="inline-block mb-6">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                      📱 Short Form Content
                    </span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    Shortform Videos<br />
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ที่ดึงดูดใจ
                    </span>
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    วิดีโอสั้นที่ออกแบบมาเพื่อ Social Media รูปแบบ 9:16 เหมาะสำหรับ TikTok, Instagram Reels, YouTube Shorts
                    ที่สามารถดึงดูดความสนใจได้ในเวลาอันสั้น
                  </p>
                </motion.div>

                {/* Mobile Grid Layout for 9:16 Videos */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                  {shortformVideos.slice(0, 6).map((video, index) => (
                    <motion.a
                      key={video.id}
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 4.4 + index * 0.1 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* 9:16 Aspect Ratio Container */}
                      <div className="relative aspect-[9/16] overflow-hidden">
                        <img
                          src={getVideoThumbnail(video.videoUrl, 'hqdefault', video)}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <Play className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75" size={32} />
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        
                        {/* Views Badge */}
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-2 py-1 rounded-full">
                          {video.views}
                        </div>
                      </div>
                      
                      {/* Video Info */}
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm line-clamp-2 mb-1">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {video.channelTitle}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Features List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.0 }}
                  className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">📱</span>
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Mobile Optimized</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ออกแบบเฉพาะสำหรับการรับชมบนมือถือ อัตราส่วน 9:16
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">⚡</span>
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Quick Engagement</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      เนื้อหาที่ดึงดูดความสนใจได้ในวินาทีแรก
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🎯</span>
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Trend Following</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ทันเทรนด์และสไตล์ที่ได้รับความนิยมในแต่ละช่วงเวลา
                    </p>
                  </div>
                </motion.div>
  
                {/* Stats Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                  className="mt-20 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-8 text-white text-center"
                >
                  <h3 className="text-2xl font-bold mb-8">สถิติการทำงาน</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">4+</div>
                      <div className="text-sky-100">โปรเจกต์ที่ทำงานอยู่</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">4+</div>
                      <div className="text-sky-100">ปีประสบการณ์</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">100+</div>
                      <div className="text-sky-100">วิดีโอที่ตัดต่อ</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}