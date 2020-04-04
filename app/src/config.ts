const isDev = process.env.NODE_ENV === 'development'

export const API_ORIGIN: string = isDev ? 'http://localhost:8080' : 'https://api.berlin-chat.soon.it/'
