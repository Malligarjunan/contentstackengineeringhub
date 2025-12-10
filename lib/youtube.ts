/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getYouTubeEmbedUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Handle youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      const videoId = urlObj.searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle youtu.be/VIDEO_ID
    if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle youtube.com/embed/VIDEO_ID (already in correct format)
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.includes('/embed/')) {
      return url;
    }
    
    // Fallback: try to extract video ID from path
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return url;
  } catch (error) {
    console.error('Error parsing YouTube URL:', error);
    return url;
  }
}

/**
 * Check if a URL is a YouTube video
 */
export function isYouTubeUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be';
  } catch {
    return false;
  }
}

/**
 * Check if URL is a Contentstack Academy page
 */
export function isContentstackAcademyUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('contentstack.com') && urlObj.pathname.includes('/academy/');
  } catch {
    return false;
  }
}

