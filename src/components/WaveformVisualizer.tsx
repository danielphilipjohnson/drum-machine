import { useRef, useEffect, useState } from "react";

interface WebAudioVisualizerProps {
  isPlaying: boolean;
  activeSoundUrl: string;
}

const WebAudioVisualizer = ({
  isPlaying,
  activeSoundUrl,
}: WebAudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create audio context on first render
    if (!audioContextRef.current) {
      try {
        audioContextRef.current =
          new // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window.AudioContext || (window as any).webkitAudioContext)();

        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        setIsInitialized(true);
      } catch (err) {
        console.error("Failed to initialize Audio Context:", err);
        setError("Failed to initialize audio visualizer");
      }
    }

    return () => {
      // Clean up animation frame on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInitialized || !activeSoundUrl || !isPlaying) return;

    let fetchAborted = false;

    const fetchAndPlayAudio = async () => {
      try {
        // Guard clause for critical refs
        if (!audioContextRef.current || !analyserRef.current) return;

        // Cancel previous animation frame
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        // Fetch audio data
        const response = await fetch(activeSoundUrl);
        if (fetchAborted) return;

        const arrayBuffer = await response.arrayBuffer();
        if (fetchAborted) return;

        const audioBuffer =
          await audioContextRef.current.decodeAudioData(arrayBuffer);
        if (fetchAborted || !audioBuffer) return;

        // Create source node
        const bufferSource = audioContextRef.current.createBufferSource();
        bufferSource.buffer = audioBuffer;

        // Connect audio graph: source → analyser → destination
        bufferSource.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        // Store for cleanup
        sourceNodeRef.current = bufferSource;

        // Start audio
        bufferSource.start(0);

        // Start visualizer
        startVisualization();

        // Cleanup on audio end
        bufferSource.onended = () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        };
      } catch (err) {
        console.error("Audio error:", err);
        setError(`Failed to load audio: ${(err as Error).message}`);
      }
    };

    fetchAndPlayAudio();

    return () => {
      fetchAborted = true;
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch (err) {
          setError(`Failed to load audio: ${(err as Error).message}`);
        }
        sourceNodeRef.current = null;
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeSoundUrl, isPlaying, isInitialized]);

  // Visualization function
  const startVisualization = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const width = canvas.width;
    const height = canvas.height;

    const renderFrame = () => {
      animationRef.current = requestAnimationFrame(renderFrame);

      // Get frequency data
      analyserRef.current?.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx?.clearRect(0, 0, width, height);

      // Draw visualization
      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // Map frequency data to bar height
        const barHeight = (dataArray[i] / 255) * height;

        // Create gradient
        const gradient = ctx?.createLinearGradient(0, 0, 0, height);
        gradient?.addColorStop(0, "#4f46e5"); // Indigo at top
        gradient?.addColorStop(0.5, "#8b5cf6"); // Purple in middle
        gradient?.addColorStop(1, "#ef4444"); // Red at bottom

        ctx.fillStyle = gradient || "#4f46e5";

        // Draw bar
        ctx?.fillRect(x, height - barHeight, barWidth, barHeight);

        // Move to next bar position
        x += barWidth + 1;
      }
    };

    renderFrame();
  };

  // Fallback visualization when not playing or if there's an error
  const renderFallbackVisualization = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw static visualization bars (decorative)
    const barCount = 64;
    const barWidth = (width / barCount) * 2;
    let x = 0;

    for (let i = 0; i < barCount; i++) {
      // Generate a random height for each bar
      const barHeight = Math.random() * (height * 0.3);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#4f46e5");
      gradient.addColorStop(0.5, "#8b5cf6");
      gradient.addColorStop(1, "#ef4444");

      ctx.fillStyle = gradient;

      // Draw bar
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);

      // Move to next bar position
      x += barWidth + 1;
    }
  };

  // Render fallback visualization on component mount
  useEffect(() => {
    renderFallbackVisualization();
  }, []);

  return (
    <div className="w-full h-48 bg-black overflow-hidden flex items-center justify-center relative">
      <canvas
        ref={canvasRef}
        width={500}
        height={175}
        className="w-full h-full"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <p className="text-red-500 text-center px-4">{error}</p>
        </div>
      )}
    </div>
  );
};

export default WebAudioVisualizer;
