export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '');
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return 'https://fabfitperformance.com';
    }
  }
  return 'http://localhost:5000';
};

export const fixImageUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  const apiBaseUrl = getApiBaseUrl();

  let cleanUrl = url.replace(/\\/g, '/');

  const uploadIndex = cleanUrl.indexOf('/uploads/');
  if (uploadIndex !== -1) {
    const relativePath = cleanUrl.substring(uploadIndex);
    return `${apiBaseUrl}${relativePath}`;
  }

  if (cleanUrl.startsWith('uploads/')) {
    return `${apiBaseUrl}/${cleanUrl}`;
  }

  return cleanUrl;
};

