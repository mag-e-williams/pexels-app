import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Homepage } from '@/components/homepage'

const inter = Inter({ subsets: ['latin'] })

function Page() {
  return <Homepage />;
}

export default Page;
