import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer
  }
})

export { store }
