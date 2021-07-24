export default function convertFileSize(fileSize: string): number {
  const totalSize = parseInt(fileSize);
  return totalSize / Math.pow(1024,2)
}