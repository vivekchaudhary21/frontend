import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Posts } from './Posts'
import './App.css'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
