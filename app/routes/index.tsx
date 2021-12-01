import * as React from 'react'
import type {MetaFunction, LoaderFunction} from 'remix'
import {useLoaderData, json, Link, useParams} from 'remix'
import type {KCDLoader, MdxPage, Timings} from '~/types'
import {getMdxPage, useMdxComponent} from '~/utils/mdx'
import Layout from '~/components/Layout'
import Container from '~/components/Container'

type CatchData = {}

type LoaderData = CatchData & {
  page: MdxPage
}

export const loader: KCDLoader<{slug: string}> = async ({request, params}) => {
  const timings: Timings = {}
  const page = await getMdxPage(
    {
      contentDir: 'pages',
      slug: 'home',
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
      <Container>
        <Component />
      </Container>
    </Layout>
  )
}
