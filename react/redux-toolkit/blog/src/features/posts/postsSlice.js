import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Learning Redux Toolkit', content: 'I have heard good things' },
  { id: 2, title: 'Slices ...', content: 'More I heard about slices, more I want pizza.' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content) => {
        return {
          payload: {
            title,
            content,
            id: nanoid()
          }
        }
      }
    }
  }
})

const { postAdded } = postsSlice.actions
const selectAllPosts = state => state.posts

export { postAdded, selectAllPosts }
export default postsSlice.reducer
