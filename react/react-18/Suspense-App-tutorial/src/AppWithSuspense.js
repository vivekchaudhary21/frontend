import { Suspense } from 'react'
import { fetchCityListData } from './dataApi/fetchCityListData'
import './App.css'

const displayCount = 150
const RenderComponent = ({ resource }) => {
  const cities = resource.cities.read()
  return (
    <div className="container">
      <h1>React 18 with Suspense</h1>
      <div className="col-12">
        <ul className="list-group city--list">
          <li className="list-group-item city--header">City List</li>
          {cities.map((rec) => (
            <li key={rec.id} className="list-group-item list-group-item-action">
              {rec.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function App() {
  const resource = fetchCityListData(displayCount)
  return (
    <Suspense fallback={<div>Loading from suspense...</div>}>
      <RenderComponent resource={resource} />
    </Suspense>
  )
}

export default App
