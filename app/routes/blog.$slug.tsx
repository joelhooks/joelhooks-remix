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
import {getMdxPage} from '~/utils/mdx'

type CatchData = {}

type LoaderData = CatchData & {
  page: MdxPage
}

export const loader: KCDLoader<{slug: string}> = async ({request, params}) => {
  const timings: Timings = {}
  const page = await getMdxPage(
    {
      contentDir: 'blog',
      slug: params.slug,
    },
    {request, timings},
  )

  console.log('***', page)

  return json({butts: 666})
}

export default function Blog() {
  const data = useLoaderData<LoaderData>()
  const params = useParams()

  console.log(params, data)
  return <div>{params.slug}</div>
}
