import { ToolsAndPartners, GetInTouch } from '../components/ContactForm'

export const metadata = { title: 'Contact Us | Bractus' }

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 60, paddingBottom: 60, minHeight: '80vh' }}>
      <ToolsAndPartners />
      <div style={{ marginTop: 20 }}>
        <GetInTouch />
      </div>
    </div>
  )
}
