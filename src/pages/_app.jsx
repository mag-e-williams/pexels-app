import '@/styles/globals.css'
import '@/styles/Home.module.css'
import '@/styles/custom.css'

// import type { AppProps } from 'next/app'
// import { GlobalStyleProvider } from '@/ui/theme/GlobalStyleProvider'

import { AppProps } from 'next/app'
import { GlobalStyleProvider } from '@/ui/theme/GlobalStyleProvider'

export default function App({ Component, pageProps }) {
  return  <GlobalStyleProvider><Component {...pageProps} /></GlobalStyleProvider>
}
