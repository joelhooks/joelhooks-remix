/** @jsx jsx */
import * as React from 'react'
import type {MetaFunction, LoaderFunction} from 'remix'
import {useLoaderData, json, Link, useParams, HeadersFunction} from 'remix'
import type {KCDHandle, KCDLoader, MdxPage} from '~/types'
import {
  getMdxPage,
  getMdxPagesInDirectory,
  mdxPageMeta,
  useMdxComponent,
} from '~/utils/mdx'
import {css, jsx} from '@emotion/react'
import {bpMaxSM, bpMinMD, bpMinLG} from '~/lib/breakpoints'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import type {Timings} from '~/utils/metrics.server'
import {useRootData} from '~/utils/use-root-data'
import {pathedRoutes} from '~/other-routes.server'
import {reuseUsefulLoaderHeaders} from '~/utils/misc'

type CatchData = {}

type LoaderData = CatchData & {
  page: MdxPage
}

export const handle: KCDHandle = {
  getSitemapEntries: async (request) => {
    const pages = await getMdxPagesInDirectory('pages', {request})
    return pages
      .filter((page) => !page.frontmatter.draft)
      .map((page) => {
        return {route: `/${page.slug}`, priority: 0.6}
      })
  },
}

export const loader: KCDLoader<{slug: string}> = async ({request, params}) => {
  console.log(
    new URL(request.url).pathname,
    pathedRoutes,
    pathedRoutes[new URL(request.url).pathname],
  )

  if (pathedRoutes[new URL(request.url).pathname]) {
    console.log('WHY NO HERE')
    return new Response()
  }

  const timings: Timings = {}
  const page = await getMdxPage(
    {
      contentDir: 'blog',
      slug: params.slug,
    },
    {request, timings},
  )

  const headers = {
    'Cache-Control': 'private, max-age=3600',
    Vary: 'Cookie',
  }

  return json({page}, {status: 200, headers})
}

export const meta = mdxPageMeta

export const headers: HeadersFunction = reuseUsefulLoaderHeaders

export default function Blog() {
  const data = useLoaderData<LoaderData>()
  const {requestInfo} = useRootData()

  const params = useParams()

  const {code, frontmatter} = data.page

  const Component = useMdxComponent(code)

  return (
    <Layout>
      <article
        css={css({
          width: '100%',
          display: 'flex',
          '.gatsby-resp-image-link': {
            margin: '0 -20px',
            [bpMinMD]: {
              margin: 0,
            },
          },
        })}
      >
        <Container>
          <h1
            css={css({
              textAlign: 'center',
              margin: '0 0 30px 0',
              [bpMinMD]: {
                margin: '0 0 50px 0',
                fontSize: '3rem',
              },
              fontSize: '1.75rem',
            })}
          >
            {frontmatter.title}
          </h1>
          <Component />
        </Container>
      </article>
    </Layout>
  )
}
