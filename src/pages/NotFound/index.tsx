import { FC } from 'react'

import './not-found.scss'

const PageNotFound: FC = () => {
  return (
    <div className='conatiner'>
      <h1>page not found</h1>
      <a href='/'>go to Applications</a>
    </div>
  )
}

export default PageNotFound
