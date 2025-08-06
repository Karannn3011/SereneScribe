import Features from "../components/Landing/Features"
import FinalCTA from "../components/Landing/FinalCTA"
import Footer from "../components/Landing/Footer"
import Hero from "../components/Landing/Hero"
import HowItWorks from "../components/Landing/HowItWorks"
import Insights from "../components/Landing/Insights"
import NavBar from "../components/Landing/NavBar"


const index = () => {
  return (
    <>
        <NavBar />
        <Hero />
        <Features />
        <HowItWorks />
        <Insights />
        <FinalCTA />
        <Footer />
    </>
  )
}

export default index