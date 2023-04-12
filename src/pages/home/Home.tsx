import { FC } from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Routes, useLocation } from 'react-router-dom'

import Header from '@/components/header/Header'
import Search from '@/components/search/Search'
import List from '@/components/list/List'

import '@/assets/styles/home.css'

import { entitiesInfo, IEntitiesInfo } from '@/assets/data/entities'

const Home: FC = () => {
  const location = useLocation()

  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} className='fade' timeout={300}>
          <Routes>
            <Route path='/' element={<Search />} />
            {entitiesInfo.map((entitiesInfo: IEntitiesInfo) => (
              <Route
                key={entitiesInfo.name}
                path={`/${entitiesInfo.name}`}
                element={<List entityInfo={entitiesInfo} />}
              />
            ))}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default Home
