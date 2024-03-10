import { useLoaderData } from '@remix-run/react'

export default function SplatPage() {
  const data = useLoaderData()
  return (
    <div style={{ textAlign: 'center', marginTop: '25rem' }}>
      You have enetred wrong url {data['*']}
    </div>
  )
}

export function loader({ params }) {
  // console.log(params) {*: 'sdcws/sdsd/sd/s/ds/d'} any url that does not exists
  return params
}
