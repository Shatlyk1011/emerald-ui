import { useState, useEffect, useRef } from 'react'

export type RecordStatus = 'idle' | 'recording' | 'recorded'

export function useAudioRecorder() {
  const [status, setStatus] = useState<RecordStatus>('idle')
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackProgress, setPlaybackProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // MediaRecorder refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === 'recording'
      ) {
        mediaRecorderRef.current.stop()
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  /* ── Recording ───────────────────────────────── */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setStatus('recorded')
        stream.getTracks().forEach((t) => t.stop())
      }

      mediaRecorder.start()
      setStatus('recording')
      setRecordingTime(0)
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.error('Microphone error:', err)
      alert(
        'Could not access microphone. Please grant permission and try again.'
      )
    }
  }

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop()
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }

  const resetRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setStatus('idle')
    setAudioUrl(null)
    setRecordingTime(0)
    setPlaybackProgress(0)
    setDuration(0)
    setIsPlaying(false)
  }

  /* ── Playback ────────────────────────────────── */
  const togglePlayback = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying((prev) => !prev)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPlaybackProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      )
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setPlaybackProgress(0)
  }

  /* ── Helpers ─────────────────────────────────── */
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const totalDuration = duration || recordingTime

  return {
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
  }
}
