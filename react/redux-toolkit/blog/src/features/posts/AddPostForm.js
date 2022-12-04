import React, { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { postAdded } from './postsSlice.js'

const AddPostForm = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const canSave = useMemo(() => title !== '' && content !== '', [title, content])

  const onSavePostClicked = () => {
    dispatch(postAdded(title, content))
    setTitle('')
    setContent('')
  }
  const onContentChanged = ev => {
    setContent(ev.target.value)
  }
  const onTitleChanged = ev => {
    setTitle(ev.target.value)
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export { AddPostForm }
