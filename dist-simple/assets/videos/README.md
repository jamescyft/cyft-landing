# Video Asset Required

The hero section requires a video file:
- **Filename**: `Drops of Water Ripples.mp4`
- **Original Size**: 14MB
- **Location**: `/public/assets/videos/Drops of Water Ripples.mp4`

## Performance Note
The video loader module (`src/js/modules/video-loader.js`) includes performance optimizations:
- Lazy loading (only loads when visible)
- Connection speed detection
- Fallback to CSS animation on slow connections
- Proper error handling

## To Restore
1. Place the video file in this directory
2. The video loader will automatically detect and load it
3. Consider compressing the video to reduce the 14MB size:
   ```
   ffmpeg -i "Drops of Water Ripples.mp4" -vcodec h264 -acodec aac -crf 28 -movflags +faststart "Drops of Water Ripples.mp4"
   ``` 