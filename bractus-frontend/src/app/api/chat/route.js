import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are Brack, the official helpful, professional, and concise AI customer support assistant for Bractus Innovations. Bractus is a premium technology consulting and software engineering firm based in Delhi, India.

When answering queries, use this specific company context to respond accurately:
- Founder: Kunal Khanna.
- Location: Delhi, India (info@bractus.com, +91 8766328987).
- Services: Web & Applications, Full-Stack Engineering, AI & Machine Learning, Cloud & DevOps, Data Engineering, and Advisory.
- Our 3-Step Process: 1. Architect & Advice (blueprinting), 2. Engineer & Execute (clean code construction), 3. Deploy & Evolve (automated delivery and optimizations).
- Values: Clients own 100% of the IP from day one, absolute transparency, and no long-term contracts.
- Stats: 120+ clients served, 50+ projects delivered, 98% satisfaction rate, and 8+ years of experience.

Be concise, warm, professional, and direct. Keep your answers brief (1-3 sentences) to fit nicely in the chat bubble UI.`

export async function POST(req) {
  try {
    const { messages } = await req.json()

    // 1. Try OpenRouter if the key is defined
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://bractus.com',
            'X-Title': 'Bractus Brack Agent'
          },
          body: JSON.stringify({
            model: 'openrouter/free',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages
            ],
            temperature: 0.7,
            max_tokens: 500,
          })
        })

        const data = await res.json()
        if (data.choices && data.choices[0]?.message?.content) {
          return NextResponse.json({ reply: data.choices[0].message.content })
        }
        console.warn('OpenRouter API returned no choices, trying Groq fallback:', data)
      } catch (err) {
        console.error('OpenRouter call failed, attempting Groq fallback:', err)
      }
    }

    // 2. Fall back to Groq using GROQ_API_KEY if OpenRouter is unconfigured or fails
    if (process.env.GROQ_API_KEY) {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      })

      const data = await res.json()
      if (data.choices && data.choices[0]?.message?.content) {
        return NextResponse.json({ reply: data.choices[0].message.content })
      }
      return NextResponse.json({ error: data.error?.message || 'Chatbot system overloaded.' }, { status: 500 })
    }

    return NextResponse.json({ error: 'No AI API keys configured.' }, { status: 500 })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
