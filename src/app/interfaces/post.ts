export interface Post {
  message: string,
  media: { fileName: string, mediaType: string }[],
  tags: object[]
}