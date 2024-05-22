import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

const LazyPage = React.lazy(
  () => import(/** webpackChunkName: "LazyPage" */ './shader')
)
const Home = React.lazy(
  () => import(/** webpackChunkName: "Home" */ './module/Home')
)
const About = React.lazy(
  () => import(/** webpackChunkName: "About" */ './module/About')
)

function NavigateButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => {
        navigate('/lazy')
      }}
    >
      Go to Lazy Page
    </button>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/lazy" element={<LazyPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aount" element={<About />} />
          <Route path="/" element={<NavigateButton />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
