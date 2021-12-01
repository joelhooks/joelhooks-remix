import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix'
import type {LinksFunction} from 'remix'
import tailwindStyles from './styles/tailwind.css'
import vendorStyles from './styles/vendors.css'
import appStyles from './styles/app.css'
import proseStyles from './styles/prose.css'
import noScriptStyles from './styles/no-script.css'
import {illustrationImages} from '~/images'
import {getEnv} from '~/utils/env.server'
import type {Await} from '../types'
import {User} from '@prisma/client'
import {TypographyStyle, GoogleFont} from 'react-typography'
import typography from '~/lib/typography'

export type LoaderData = {
  user: User | null
  userInfo: Await<ReturnType<typeof getUserInfo>> | null
  ENV: ReturnType<typeof getEnv>
  randomFooterImageKey: keyof typeof illustrationImages
  requestInfo: {
    origin: string
    path: string
    session: {
      email: string | undefined
      magicLinkVerified: boolean | undefined
      theme: Theme | null
    }
  }
}

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: vendorStyles},
    {rel: 'stylesheet', href: tailwindStyles},
    {rel: 'stylesheet', href: proseStyles},
    {rel: 'stylesheet', href: appStyles},
  ]
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <TypographyStyle typography={typography} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="remix-app">
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer"></footer>
    </div>
  )
}
