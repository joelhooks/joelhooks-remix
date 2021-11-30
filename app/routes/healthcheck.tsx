import type {LoaderFunction} from 'remix'


export const loader: LoaderFunction = async ({request}) => {
  try {

    return new Response('OK')
  } catch (error: unknown) {
    console.log('healthcheck ❌', {error})
    return new Response('ERROR', {status: 500})
  }
}
