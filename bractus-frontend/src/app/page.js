import Hero from './components/Hero'
import Services from './components/Services'
import { HowWeWork, WhyChooseUs } from './components/Process'
import { ToolsAndPartners, GetInTouch } from './components/ContactForm'
import { Founder, Testimonials, FAQ } from './components/About'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowWeWork />
      <ToolsAndPartners />
      <Founder />
      <WhyChooseUs />
      <Testimonials />
      <GetInTouch />
      <FAQ />
    </>
  )
}