import React from 'react'
import Banner from './Banner'
import TopSellers from './TopSellers'
import Recommened from './Recommened'
import UserRatings from './UserRatings'

const Home = () => {
    return (
        <>
            <Banner />
            <TopSellers />
            <Recommened />
            <UserRatings />
        </>
    )
}

export default Home