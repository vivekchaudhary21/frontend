/* eslint-disable no-unused-vars */
import { Outlet } from '@remix-run/react'

import MainHeader from '~/components/navigation/MainHeader'
import marketingStyles from '~/styles/marketing.css'

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }]
}

export function headers(header) {
  // console.log(header) // {
  //   loaderHeaders: {},
  //   parentHeaders: {},
  //   actionHeaders: {},
  //   errorHeaders: undefined
  // }
  return {
    'Cache-control': 'max-age=36000',
    'X-my-value': 'Vivek',
  }
}
