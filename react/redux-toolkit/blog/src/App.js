import React from 'react'
import { AddPostForm } from './features/posts/AddPostForm'
import { PostsList } from './features/posts/PostsList'

function App() {
  return (
    <div className="flex">
      <main className="App">
        <AddPostForm />
        <PostsList />
      </main>
    </div>
  )
}

export default App
