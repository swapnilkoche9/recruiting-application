import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Applications from '../../pages/Applications'
import PageNotFound from '../../pages/NotFound'

const RootRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Applications />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootRouter
