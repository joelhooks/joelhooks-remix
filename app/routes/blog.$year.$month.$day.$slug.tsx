import * as React from 'react'
import type {MetaFunction, LoaderFunction} from 'remix'
import {useLoaderData, json, Link, useParams} from 'remix'
import type {
  CachifiedOptions,
  KCDLoader,
  MDXPage,
  MdxPage,
  Timings,
} from '~/types'
import {getMdxPage, useMdxComponent} from '~/utils/mdx'
import {css} from '@emotion/react'
import {bpMinMD} from '~/lib/breakpoints'
import Container from '~/components/Container'
import Layout from '~/components/Layout'

type CatchData = {}

type LoaderData = CatchData & {
  page: MdxPage
}

export const loader: KCDLoader<{slug: string}> = async ({request, params}) => {
  const timings: Timings = {}
  const page = await getMdxPage(
    {
      contentDir: 'legacy_blog',
      slug: `${params.year}-${params.month}-${params.day}-${params.slug}`,
    },
    {request, timings},
  )

  return json({page})
}

export default function Blog() {
  const data = useLoaderData<LoaderData>()
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
          <Component />
        </Container>
      </article>
    </Layout>
  )
}
