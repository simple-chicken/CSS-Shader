import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Render your React component instead
const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(<App></App>)
