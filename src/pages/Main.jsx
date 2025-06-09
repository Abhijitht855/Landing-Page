import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Card from '../components/Card'
import About from '../components/About'
import Services from '../components/Services'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Card/>
      <About/>
      <Services/>
      <Blog/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Main