import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function upload(file: File) {
    setUploading(true)
    setError(null)

    try {
      const filePath = `uploads/${Date.now()}-${file.name}`
      const bucket = supabase.storage.from('design-files')

      const { error: uploadError } = await bucket.upload(filePath, file)
      if (uploadError) {
        setError(uploadError.message)
        setUploading(false)
        return
      }

      const { data: { publicUrl } } = bucket.getPublicUrl(filePath)
      setFileUrl(publicUrl)
      setFileName(file.name)

      // Register with Printful for processing
      await supabase.functions.invoke('printful-files', {
        body: { url: publicUrl, filename: file.name },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    }

    setUploading(false)
  }

  return { upload, uploading, fileUrl, fileName, error }
}
