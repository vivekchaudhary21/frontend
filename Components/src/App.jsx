import { Navigate, Route, Routes } from 'react-router-dom'

import { componentLevels } from './data/componentCatalog'
import { AppLayout } from './layout/AppLayout'
import { ComponentPage } from './pages/ComponentPage'
import { HomePage } from './pages/HomePage'

export const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<HomePage />} />

      {componentLevels.flatMap((level) =>
        level.components.map((component) => (
          <Route
            key={component.slug}
            path={`components/${component.slug}`}
            element={<ComponentPage component={component} level={level} />}
          />
        )),
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
)
