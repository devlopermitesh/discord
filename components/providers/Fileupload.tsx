'use client'

import React, { forwardRef } from 'react'
import { IKUpload } from 'imagekitio-next'
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props'
import { toast } from 'sonner'

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void
  onProgress?: (progress: number) => void
  onUploadStart: () => void
  fileType?: 'image' | 'video' | 'audio'
  disabled: boolean
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ onSuccess, onProgress, onUploadStart, disabled, fileType = 'image', ...props }, ref) => {
    const onError = (err: { message: string }) => {
      console.log('Error', err)
    }

    const handleSuccess = (response: IKUploadResponse) => {
      onSuccess(response)
    }

    const handleStartUpload = () => {
      onUploadStart()
    }

    const handleProgress = (evt: ProgressEvent) => {
      if (evt.lengthComputable && onProgress) {
        const percentComplete = (evt.loaded / evt.total) * 100
        onProgress(Math.round(percentComplete))
      }
    }

    const validateFile = (file: File) => {
      console.log('Validating file:', file)
      const sizeLimits = {
        image: 5 * 1024 * 1024,
        video: 10 * 1024 * 1024,
        audio: 10 * 1024 * 1024,
      }

      const validTypes: { [key: string]: string[] } = {
        image: ['image/jpeg', 'image/png', 'image/webp'],
        video: ['video/mp4', 'video/webm', 'video/ogg'],
        audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
      }

      if (!validTypes[fileType].includes(file.type)) {
        toast.error(`Please upload a valid ${fileType} file`, {
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
        return false
      }

      if (file.size > sizeLimits[fileType]) {
        toast.error(
          `${fileType[0].toUpperCase() + fileType.slice(1)} size must be less than ${sizeLimits[fileType] / (1024 * 1024)}MB`,
          {
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
          }
        )
        return false
      }

      return true
    }
    const acceptType = {
      image: 'image/*',
      video: 'video/*',
      audio: 'audio/*',
    }

    const uploadFolder = {
      image: '/images',
      video: '/videos',
      audio: '/audios',
    }

    const fileNamePrefix = {
      image: 'image',
      video: 'video',
      audio: 'audio',
    }

    return (
      <div className="space-y-2 w-0 h-0">
        <IKUpload
          ref={ref}
          fileName={fileNamePrefix[fileType]}
          disabled={disabled}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadStart={handleStartUpload}
          onUploadProgress={handleProgress}
          accept={acceptType[fileType]}
          className="file-input file-input-bordered w-full"
          validateFile={validateFile}
          useUniqueFileName={true}
          folder={uploadFolder[fileType]}
          {...props}
        />
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'
export default FileUpload
