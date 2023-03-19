import { Route, Routes, Link } from 'react-router-dom'
import { DataPage, Home, RQDatapage, RQDataIDpage } from './pages'

function App() {
  return (
    <div>
      <div>
        <nav
          style={{
            backgroundColor: 'black',
            color: 'white',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ul>
            <Link style={{ color: 'white' }} to="/">
              Home
            </Link>{' '}
            &nbsp;
            <Link style={{ color: 'white' }} to="/data">
              Data page
            </Link>{' '}
            &nbsp;
            <Link style={{ color: 'white' }} to="/rqdata">
              RQData page
            </Link>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/data" Component={DataPage} />
        <Route path="/rqdata" Component={RQDatapage} />
        <Route path="/rqdata/:id" Component={RQDataIDpage} />
      </Routes>
    </div>
  )
}

export default App
