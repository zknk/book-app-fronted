import React from 'react'
import Banner from './Banner'
import TopSellers from './Topsellers'
import Recommened from './Recommened'
import News from './News'

const Home = () => {
  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home