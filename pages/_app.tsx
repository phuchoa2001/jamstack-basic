import { AppProps } from 'next/app'
import '../styles/index.css'
import 'antd/dist/reset.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
