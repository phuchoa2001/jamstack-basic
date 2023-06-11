import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  isMeta?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children , isMeta  }: Props) => {
  return (
    <>
      <Meta isMeta={isMeta} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
