// src/components/ClipboardChunkNoWorker.jsx
import { useState } from 'react'

const ClipboardChunkNoWorker = () => {
  const [data, setData] = useState('') // Large dataset input
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Function to split data into chunks
  const chunkData = (data, chunkSize = 1000000) => {
    const chunks = []
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize))
    }
    return chunks
  }

  // Process chunks asynchronously to avoid blocking the UI
  const processChunks = async (chunks, processFn) => {
    const processedChunks = new Array(chunks.length).fill(null)
    let completedChunks = 0

    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          try {
            // Process chunk (e.g., convert to uppercase)
            processedChunks[i] = processFn(chunks[i])
            completedChunks++
            setProgress((completedChunks / chunks.length) * 100)
            resolve()
          } catch (err) {
            setError(`Error processing chunk ${i}: ${err.message}`)
            resolve() // Continue to allow error display
          }
        }, 0) // 0ms delay yields to event loop
      })

      if (error) break
    }

    return processedChunks
  }

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text:', err)
      setError('Failed to copy text to clipboard: ' + err.message)
    }
  }

  // Handle copy button click
  const handleCopy = async () => {
    if (!data) {
      setError('No data provided.')
      return
    }

    if (!window.isSecureContext) {
      setError('This feature requires a secure context (HTTPS or localhost).')
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setError(null)

    try {
      const chunkSize = 1000000 // 1MB chunks
      const chunks = chunkData(data, chunkSize)

      // Process chunks (e.g., convert to uppercase)
      const processFn = (chunk) => chunk.toUpperCase() // Replace with your logic
      const processedChunks = await processChunks(chunks, processFn)

      if (!error) {
        const finalText = processedChunks.join('')
        await copyToClipboard(finalText)
      }
    } catch (err) {
      setError('Processing failed: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  // Generate sample large data (~1MB)
  const generateSampleData = () => {
    const largeData = Array(1000000)
      .fill()
      .map((_, i) => `Line ${i + 1}`)
      .join('\n')
    setData(largeData)
  }

  // Generate sample JSON data (~1MB)
  const generateSampleJson = () => {
    const largeData = JSON.stringify(
      Array(100000)
        .fill()
        .map((_, i) => ({ id: i, name: `Item ${i}` })),
      null,
      2
    )
    setData(largeData)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Copy Large Data to Clipboard</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter or generate large text/JSON to copy"
        rows={10}
        cols={50}
        disabled={isProcessing}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div style={{ marginBottom: '10px' }}>
        <button onClick={generateSampleData} disabled={isProcessing}>
          Generate Sample Text (~1MB)
        </button>
        <button
          onClick={generateSampleJson}
          disabled={isProcessing}
          style={{ marginLeft: '10px' }}
        >
          Generate Sample JSON (~1MB)
        </button>
      </div>
      <button onClick={handleCopy} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Copy to Clipboard'}
      </button>
      {isProcessing && (
        <div style={{ marginTop: '10px' }}>
          <p>Progress: {progress.toFixed(2)}%</p>
          <progress value={progress} max="100" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  )
}

export default ClipboardChunkNoWorker
