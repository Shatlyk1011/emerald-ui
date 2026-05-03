'use client'

/**
 * @author: @shatlyk1011
 * @description: A dynamic voice recorder component with waveform visualization
 * @version: 1.0.0
 * @date: 2026-04-29
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { FormEvent, useState } from 'react'
import { Check, Mic, Pause, PlayCircle, RefreshCcw, Square } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useAudioRecorder } from '@/hooks/use-audio-recorder'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'

export default function VoiceRecord() {
  const [isUploading, setIsUploading] = useState(false)
  const {
    status,
    recordingTime,
    audioUrl,
    isPlaying,
    playbackProgress,
    audioRef,
    startRecording,
    stopRecording,
    resetRecording,
    togglePlayback,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    formatTime,
    totalDuration,
  } = useAudioRecorder()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      ;(setIsUploading(false), 1000)
      toast.success('Successfully simulated upload', { position: 'top-center' })
    })
  }

  return (
    // Note: You may want to wrap TooltipProvider on the root page
    <TooltipProvider>
      <div className='bg-card relative mt-4 w-full max-w-sm rounded-2xl border-2 border-transparent px-10 pt-20 pb-10 transition-colors'>
        <form
          onSubmit={handleSubmit}
          className='relative mx-auto flex w-full max-w-xl min-w-66 flex-col items-center gap-2.5'
        >
          {/* Hidden audio element for playback */}
          {audioUrl && (
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              className='hidden'
            />
          )}

          {/* ── IDLE ───────────────────────────── */}
          {status === 'idle' && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className='group flex h-20 w-20 items-center justify-center'
                    type='button'
                    variant='outline'
                    onClick={startRecording}
                    aria-label='Start recording'
                  >
                    <Mic className='text-foreground/90 size-6 transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Click to start recording</TooltipContent>
              </Tooltip>

              <span className='text-foreground/70 font-mono text-sm'>
                00:00
              </span>

              {/* Static flat waveform */}
              <SoundWave isStatic />

              <div className='flex h-32 w-full flex-col justify-end gap-2'>
                <p className='text-foreground/70 text-center text-xs'>
                  Click to speak
                </p>

                <Button
                  type='button'
                  onClick={startRecording}
                  size='lg'
                  aria-label='Start recording'
                >
                  <Mic className='mr-2 size-4' />
                  Start Recording
                </Button>
              </div>
            </>
          )}

          {/* ── RECORDING ──────────────────────── */}
          {status === 'recording' && (
            <>
              {/* Pulsing stop button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className='group flex h-20 w-20 items-center justify-center transition-colors'
                    type='button'
                    variant='outline'
                    onClick={stopRecording}
                    aria-label='Stop recording'
                  >
                    <div
                      className='bg-foreground/85 h-6 w-6 animate-spin rounded-md transition duration-300 group-hover:scale-105'
                      style={{ animationDuration: '3s' }}
                    />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Stop recording</TooltipContent>
              </Tooltip>

              {/* Live timer */}
              <span className='text-foreground/70 font-mono text-sm'>
                {formatTime(recordingTime)}
              </span>

              {/* Animated waveform bars */}
              <SoundWave />

              <div className='flex h-32 w-full flex-col justify-end gap-2'>
                <p className='text-foreground/70 text-center text-xs'>
                  Listening…
                </p>

                {/* Stop button */}
                <Button
                  type='button'
                  size='lg'
                  variant='destructive'
                  onClick={stopRecording}
                  className='w-full'
                >
                  <Square className='mr-2 size-4' />
                  Stop Recording
                </Button>
              </div>
            </>
          )}

          {/* ── RECORDED ───────────────────────── */}
          {status === 'recorded' && (
            <>
              {/* Play / Pause button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className='group flex h-20 w-20 items-center justify-center transition-colors'
                    type='button'
                    variant='outline'
                    onClick={togglePlayback}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className='text-foreground/90 size-6 transition duration-300' />
                    ) : (
                      <PlayCircle className='text-foreground/90 size-6 transition duration-300' />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isPlaying ? 'Pause' : 'Play'}</TooltipContent>
              </Tooltip>

              {/* Playback timer */}
              <span className='text-foreground/70 font-mono text-sm'>
                {formatTime((playbackProgress / 100) * totalDuration)} /{' '}
                {formatTime(totalDuration)}
              </span>

              <SoundWave
                isStatic={!isPlaying}
                containerClasses={cn(!isPlaying && 'items-end')}
                classes={cn(isPlaying ? 'h-auto' : 'max-h-1 items-end')}
              />

              <div className='flex h-32 w-full flex-col justify-end gap-2'>
                <p className='text-foreground/70 h-4 text-center text-xs'>
                  Recording ready
                </p>

                {/* Actions */}
                <div className='flex w-full items-center justify-center gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={resetRecording}
                    size='lg'
                    className='flex-1 items-center justify-center gap-1.5'
                    aria-label='Reset recording'
                  >
                    <RefreshCcw className='size-4' />
                    Reset
                  </Button>

                  <Button
                    type='submit'
                    disabled={isUploading}
                    size='lg'
                    className='min-w-30 flex-1 items-center justify-center gap-1.5'
                    aria-label='Use recording'
                  >
                    {isUploading ? (
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent bg-transparent' />
                    ) : (
                      <>
                        <Check className='size-4' />
                        Use Audio
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </TooltipProvider>
  )
}

const BAR_COUNT = 48

const SoundWave = ({
  isStatic = false,
  containerClasses,
  classes,
}: {
  isStatic?: boolean
  containerClasses?: string
  classes?: string
}) => {
  const animations = ['wave1', 'wave2', 'wave3', 'wave4', 'wave5', 'wave6']

  return (
    <div className={cn('flex h-3.5', containerClasses)}>
      <div
        className={cn(
          'relative flex h-full items-center justify-center gap-[3px] overflow-hidden',
          classes
        )}
      >
        {[...Array(BAR_COUNT)].map((_, i) => {
          const animationName = isStatic
            ? 'none'
            : animations[i % animations.length]
          return (
            <div
              key={i}
              className={cn(
                'bg-muted-foreground/70 h-[inherit] w-0.5 origin-bottom'
              )}
              style={{
                height: '100%',
                animationName,
                animationDuration: `${2 + (i % animations.length) * 0.1}s`,
                animationDelay: `-${i * 0.1}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
              }}
            />
          )
        })}
      </div>
      {/* Note: move these keyframer inside .css file */}
      <style>{`
        @keyframes wave1 { 0%, 100% { transform: scaleY(0.2); } 50% { transform: scaleY(1); } }
        @keyframes wave2 { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(0.8); } }
        @keyframes wave3 { 0%, 100% { transform: scaleY(0.1); } 50% { transform: scaleY(0.9); } }
        @keyframes wave4 { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(0.7); } }
        @keyframes wave5 { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(0.9); } }
        @keyframes wave6 { 0%, 100% { transform: scaleY(0.2); } 50% { transform: scaleY(0.8); } }
      `}</style>
    </div>
  )
}
