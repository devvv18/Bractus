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

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OpenRouter API key is not configured.' }, { status: 500 })
    }

    const modelName = process.env.OPENROUTER_MODEL_NAME || 'openrouter/free'

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://bractus.com',
        'X-Title': 'Bractus Brack Agent'
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    })

    const data = await res.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message?.content) {
      return NextResponse.json({ error: data.error?.message || 'Chatbot system overloaded.' }, { status: 500 })
    }

    return NextResponse.json({ reply: data.choices[0].message.content })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
