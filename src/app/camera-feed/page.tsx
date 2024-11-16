'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Camera, Video, X, RefreshCw, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function CameraFeed() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<string | null>(null)
  const [isBlackScreen, setIsBlackScreen] = useState(false)
  const [diagnosticInfo, setDiagnosticInfo] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)

  const updateDiagnosticInfo = useCallback((info: string) => {
    setDiagnosticInfo(prev => `${new Date().toISOString()}: ${info}\n${prev}`)
  }, [])

  const startCamera = useCallback(async () => {
    try {
      updateDiagnosticInfo('Attempting to start camera...')
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        updateDiagnosticInfo('Camera stream set to video element')
      }
      setError(null)
      setIsBlackScreen(false)
      updateDiagnosticInfo('Camera started successfully')
    } catch (err) {
      const errorMessage = 'Failed to access camera. Please ensure you have given permission.'
      setError(errorMessage)
      updateDiagnosticInfo(`Error: ${errorMessage}`)
      console.error('Error accessing camera:', err)
    }
  }, [updateDiagnosticInfo])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop()
        updateDiagnosticInfo(`Stopped track: ${track.kind}`)
      })
      setStream(null)
      updateDiagnosticInfo('Camera stopped')
    }
  }, [stream, updateDiagnosticInfo])

  const takeSnapshot = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      const imageDataUrl = canvas.toDataURL('image/jpeg')
      setSnapshot(imageDataUrl)
      updateDiagnosticInfo(`Snapshot taken: ${canvas.width}x${canvas.height}`)
    }
  }, [updateDiagnosticInfo])

  const closeSnapshot = useCallback(() => {
    setSnapshot(null)
    updateDiagnosticInfo('Snapshot closed')
  }, [updateDiagnosticInfo])

  const checkForBlackScreen = useCallback(() => {
    if (videoRef.current && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        let isAllBlack = true
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] !== 0 || data[i + 1] !== 0 || data[i + 2] !== 0) {
            isAllBlack = false
            break
          }
        }
        setIsBlackScreen(isAllBlack)
        updateDiagnosticInfo(`Black screen check: ${isAllBlack ? 'Black' : 'Not black'}`)
      }
    } else {
      updateDiagnosticInfo('Video not ready for black screen check')
    }
  }, [updateDiagnosticInfo])

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      const handleLoadedMetadata = () => {
        updateDiagnosticInfo(`Video metadata loaded: ${video.videoWidth}x${video.videoHeight}`)
        const checkInterval = setInterval(checkForBlackScreen, 1000)
        return () => clearInterval(checkInterval)
      }
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [checkForBlackScreen, updateDiagnosticInfo])

  const restartCamera = useCallback(() => {
    stopCamera()
    setTimeout(startCamera, 1000)
    updateDiagnosticInfo('Camera restart initiated')
  }, [stopCamera, startCamera, updateDiagnosticInfo])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-60 p-4">
      <div className="w-full max-w-4xl space-y-4">
        <h1 className="text-4xl font-bold text-center mb-24 text-gray-800">Camera Feed</h1>
        
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden w-full h-[60vh]">
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              aria-label="Live camera feed"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              {error ? error : "Camera is off"}
            </div>
          )}
        </div>
        
        {isBlackScreen && (
          <Alert variant="destructive">
            <AlertTitle>Black Screen Detected</AlertTitle>
            <AlertDescription>
              We've detected a black screen. This could be due to:
              <ul className="list-disc list-inside mt-2">
                <li>Camera is covered or obstructed</li>
                <li>Lighting conditions are too dark</li>
                <li>Camera driver issues</li>
              </ul>
              Try restarting the camera or check your device settings.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center space-x-4">
          {!stream ? (
            <Button onClick={startCamera}>
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          ) : (
            <>
              <Button onClick={stopCamera} variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Stop Camera
              </Button>
              <Button onClick={takeSnapshot}>
                <Camera className="mr-2 h-4 w-4" />
                Take Snapshot
              </Button>
              <Button onClick={restartCamera}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Restart Camera
              </Button>
            </>
          )}
        </div>

        {snapshot && (
          <div className="mt-4 relative">
            <img src={snapshot} alt="Snapshot" className="w-full rounded-lg" />
            <Button
              onClick={closeSnapshot}
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2"
              aria-label="Close snapshot"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}