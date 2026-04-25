import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { messages } = await req.json()

    // Query Groq explicitly using their open-source LLaMA endpoints via native fetch
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are a helpful, professional, and concise customer support representative for Bractus, a premium AI and Software Development Consulting company. Answer queries regarding services like Advisory, Design, Development, and Data gracefully.' },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    })

    const data = await res.json()

    if (!data.choices || !data.choices[0]) {
      return NextResponse.json({ error: data.error?.message || 'Chatbot system overloaded.' }, { status: 500 })
    }

    return NextResponse.json({ reply: data.choices[0].message.content })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
