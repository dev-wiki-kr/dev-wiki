interface UploadImageParams {
  file: File
}

interface UploadImageResponse {
  s3Url: string
  cloudFrontUrl: string
}

export async function uploadImage({ file }: UploadImageParams) {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`/wiki-api/uploads`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error('이미지 업로드에 실패했습니다.')
    }

    return (await res.json()) as UploadImageResponse
  } catch (err) {
    console.log(err)
    return { s3Url: '', cloudFrontUrl: '' }
  }
}
