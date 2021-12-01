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

  console.log({page})

  return json({})
}

export default function Blog() {
  const data = useLoaderData<LoaderData>()
  const params = useParams()

  // const {code, frontmatter} = data.page

  // const Component = useMdxComponent(code)

  console.log(params, data)
  return <div>{/*<Component />*/}</div>
}
