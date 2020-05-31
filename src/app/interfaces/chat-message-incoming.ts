import { Media } from './media';

interface Message {
  createdAt: string,
  id: string,
  media?: Array<Media>,
  messageText?: string,
  service?: object,
  offer?: object
}

export interface ChatMessageIncoming {
  result: Message
}
