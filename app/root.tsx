import * as React from 'react'
import {
  json,
  Link,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  MetaFunction,
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
import {getEnv} from '~/utils/env.server'
import type {Await, KCDHandle} from '../types'
import {TypographyStyle} from 'react-typography'
import typography from '~/lib/typography'
import type {Timings} from '~/utils/metrics.server'
import {getServerTimeHeader, time} from '~/utils/metrics.server'
import {getDomainUrl, getUrl} from '~/utils/misc'
import {pathedRoutes} from '~/other-routes.server'
import {getSocialMetas} from '~/utils/seo'

export const handle: KCDHandle & {id: string} = {
  id: 'root',
}

export const meta: MetaFunction = ({data}) => {
  const requestInfo = (data as LoaderData | undefined)?.requestInfo
  const title = "Joel's digital garden"
  const description = 'Ramblings of a software developer'
  return {
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
    'theme-color': '#A9ADC1',
    ...getSocialMetas({
      origin: requestInfo?.origin ?? '',
      keywords: '',
      url: getUrl(requestInfo),
      // image: getGenericSocialImage({
      //   origin: requestInfo?.origin ?? '',
      //   url: getDisplayUrl(requestInfo),
      //   words:
      //     'Helping people make the world a better place through quality software.',
      //   featuredImage: 'kentcdodds.com/illustrations/kody-flying_blue',
      // }),
      title,
      description,
    }),
  }
}

export const loader: LoaderFunction = async ({request}) => {
  // because this is called for every route, we'll do an early return for anything
  // that has a other route setup. The response will be handled there.
  if (pathedRoutes[new URL(request.url).pathname]) {
    return new Response()
  }

  const timings: Timings = {}
  // const session = await getSession(request)
  // const themeSession = await getThemeSession(request)
  // const clientSession = await getClientSession(request)
  // const loginInfoSession = await getLoginInfoSession(request)

  const data: LoaderData = {
    ENV: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  }
  const headers: HeadersInit = new Headers()
  headers.append('Server-Timing', getServerTimeHeader(timings))
  // this can lead to race conditions if a child route is also trying to commit
  // the cookie as well. This is a bug in remix that will hopefully be fixed.
  // we reduce the likelihood of a problem by only committing if the value is
  // different.
  // await session.getHeaders(headers)
  // await clientSession.getHeaders(headers)
  // await loginInfoSession.getHeaders(headers)

  return json(data, {headers})
}

export type LoaderData = {
  ENV: ReturnType<typeof getEnv>
  requestInfo: {
    origin: string
    path: string
    session?: {
      email: string | undefined
      magicLinkVerified: boolean | undefined
    }
  }
}

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Inter-UI-Bold.woff',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Inter-UI-Regular.woff',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicons/favicon-16x16.png',
    },
    {rel: 'manifest', href: '/site.webmanifest'},
    {rel: 'icon', href: '/favicon.ico'},
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
