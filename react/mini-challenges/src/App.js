import { Routes, Route } from 'react-router-dom'
import { PATHS } from './paths'
import {
  DadJokes,
  ExpandingCards,
  IncrementCounter,
  InfiniteScroll,
  KeyBoxes,
  ProgressSteps,
  ScrollAnimation,
  DrinkWater,
  ThemeClock,
} from './challenges'
import { Home } from './components/Home'

function App() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.EXPANDING_CARDS} element={<ExpandingCards />} />
      <Route path={PATHS.PROGRESS_STEPS} element={<ProgressSteps />} />
      <Route path={PATHS.INFINITE_SCROLL} element={<InfiniteScroll />} />
      <Route path={PATHS.SCROLL_ANIMATION} element={<ScrollAnimation />} />
      <Route path={PATHS.DAD_JOKES} element={<DadJokes />} />
      <Route path={PATHS.KEY_BOXES} element={<KeyBoxes />} />
      <Route path={PATHS.INCREMENT_COUNTER} element={<IncrementCounter />} />
      <Route path={PATHS.DRINK_WATER} element={<DrinkWater />} />
      <Route path={PATHS.THEME_CLOCK} element={<ThemeClock />} />
    </Routes>
  )
}

export default App
