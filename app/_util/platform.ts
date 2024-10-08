export function isMobileServer(userAgent: string) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(
    userAgent,
  )
}

export function isMobileClient() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
}

export function isIOSClient() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}
