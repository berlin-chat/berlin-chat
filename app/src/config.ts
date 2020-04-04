const isDev = process.env.NODE_ENV === 'development'

export const API_ORIGIN: string = isDev ? 'http://localhost:8080' : 'http://berlin-chat.soon.it:8080'
