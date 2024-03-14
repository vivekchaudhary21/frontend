import { cssBundleHref } from '@remix-run/css-bundle'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from '@remix-run/react'

import Error from '~/components/util/Error'
import sharedStyles from '~/styles/shared.css'

export function meta() {
  return [
    {
      charset: 'utf-8',
      title: 'Expense Tracker App',
      viewport: 'width=device-width,initial-scale=1',
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: 'stylesheet', href: cssBundleHref }]
    : [{ rel: 'stylesheet', href: sharedStyles }]),
]

const ErrorDocument = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body style={{ paddingTop: '30vh' }}>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorDocument>
        <Error title={error.data}>
          <p>Status: {error.status}</p>
          <Link to="/">Back to safety</Link>
        </Error>
      </ErrorDocument>
    )
  }

  return (
    <ErrorDocument>
      <Error title={error.message}>
        <Link to="/">Back to safety</Link>
      </Error>
    </ErrorDocument>
  )
}
