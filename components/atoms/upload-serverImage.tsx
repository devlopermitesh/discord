'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import PlaceholderServer from '@/assets/Placeholder_serverupload.png'
import FileUpload from '../providers/Fileupload'
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props'
import axios from 'axios'
import { toast } from 'sonner'
interface UploadServerImageProps {
  currentUrl: string | null
  onChange: (url: string | null) => void
  disabled?: boolean
}

export default function UploadServerImage({
  currentUrl,
  onChange,
  disabled = false,
}: UploadServerImageProps) {
  const [fileId, setfileId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleCancel = async (fileId: string) => {
    try {
      const response = await axios.delete('/api/Imagekitfile-delete', {
        data: { fileId },
      })
      if (response.data.success) {
        toast('Image remove')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong file ', {
        duration: 3000,
        style: {
          background: '#f87171',
          color: '#fff',
          border: '1px solid #b91c1c',
          padding: '12px 16px',
          fontWeight: 'bold',
          borderRadius: '8px',
        },
        icon: '⚠️',
      })
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    if (fileId) handleCancel(fileId)
  }

  const handleSuccess = (response: IKUploadResponse) => {
    onChange(response.url)
    setfileId(response.fileId)
    setIsUploading(false)
    setUploadProgress(0)
  }

  const handleProgress = (progress: number) => {
    setUploadProgress(progress)
    if (progress === 100) {
      setTimeout(() => setIsUploading(true), 300)
    }
  }

  const hasImage = !!currentUrl

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <div
        onClick={handleClick}
        className={cn(
          'group relative w-32 h-32 mx-auto cursor-pointer transition-all duration-200',
          disabled && 'cursor-not-allowed opacity-60',
          !hasImage && 'hover:scale-105'
        )}
      >
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl" />

        {/* Image or Placeholder */}
        <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-background shadow-2xl">
          {hasImage ? (
            <Image
              src={currentUrl}
              alt="Server icon"
              fill
              className="object-cover transition-transform group-hover:scale-110 duration-300"
            />
          ) : (
            <Image
              src={PlaceholderServer}
              alt="Upload server icon"
              fill
              className="object-cover opacity-90"
            />
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>

        {/* Remove Button */}
        {hasImage && !disabled && (
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1.5 bg-destructive rounded-full text-white hover:bg-destructive/90 transition-all shadow-lg"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Upload Indicator */}
        {isUploading && (
          <div className="absolute inset-0 rounded-full bg-black/70 flex items-center justify-center">
            <Progress value={uploadProgress} className="w-20 h-2" />
          </div>
        )}
      </div>

      {/* Hidden File Input + Upload Component */}
      <div className="hidden">
        <FileUpload
          fileType="image"
          ref={fileInputRef}
          onSuccess={handleSuccess}
          onProgress={handleProgress}
          onUploadStart={() => setIsUploading(true)}
          disabled={disabled}
        />
      </div>

      {/* Instruction Text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {hasImage ? 'Click to change' : 'Click to upload'} server icon
        </p>
        <p className="text-xs text-muted-foreground mt-1">Recommended: 512×512 PNG/JPG</p>
      </div>
    </div>
  )
}
