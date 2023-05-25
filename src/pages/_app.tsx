// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalStyleProvider } from '@/ui/theme/GlobalStyleProvider'

export default function App({ Component, pageProps }: AppProps) {
  return  <GlobalStyleProvider><Component {...pageProps} /></GlobalStyleProvider>
}
