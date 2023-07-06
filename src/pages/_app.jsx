import '@/styles/globals.css'
import '@/styles/Home.module.css'

import { GlobalStyleProvider } from '@/ui/theme/GlobalStyleProvider'

export default function App({ Component, pageProps }) {
  return  <GlobalStyleProvider><Component {...pageProps} /></GlobalStyleProvider>
}
