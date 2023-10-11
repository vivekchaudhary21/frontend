import App from './App'
import { PATHS } from './paths'
import { ExpandingCards } from './challenges'

export const routes = [
  {
    path: PATHS.HOME,
    element: <App />,
  },
  {
    path: PATHS.EXPANDING_CARDS,
    element: <ExpandingCards />,
  },
]
