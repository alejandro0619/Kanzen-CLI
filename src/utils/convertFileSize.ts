export default function convertFileSize(fileSize: string): string {
  const totalSize = parseInt(fileSize);
  const result = totalSize / Math.pow(1024, 2);
  return result.toFixed(2)
}