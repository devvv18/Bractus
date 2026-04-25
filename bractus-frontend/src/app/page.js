import Hero from './components/Hero'
import Services from './components/Services'
import { HowWeWork, WhyChooseUs } from './components/Process'
import { ToolsAndPartners, GetInTouch } from './components/ContactForm'
import { Founder, Testimonials, FAQ } from './components/About'
import DualCards from './components/DualCards'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowWeWork />
      <ToolsAndPartners />
      <DualCards />
      <Founder />
      <WhyChooseUs />
      <Testimonials />
      <GetInTouch />
      <FAQ />
    </>
  )
}