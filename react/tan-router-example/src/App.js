import {
  Outlet,
  Link,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

const Home = () => <h1>Home</h1>
const About = () => <h2>About</h2>
const Contact = () => <h3>Contact</h3>

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const AboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: About,
})

const ContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'contact',
  component: Contact,
})

const routeTree = rootRoute.addChildren([indexRoute, AboutRoute, ContactRoute])

const router = createRouter({
  routeTree,
})

function App() {
  return <RouterProvider router={router} />
}

export default App
