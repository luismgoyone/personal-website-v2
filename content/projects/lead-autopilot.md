## The problem

A small clinic gets inquiries at all hours, and most of them are routine: booking, prices, opening times. Someone still has to read each one, reply, and spot the patient who's actually in pain. Lead Autopilot does the routine part and leaves the rest to the dentist.

The client is Pinecrest Dental, a made-up family clinic in Baguio City, so all the data is fake. The pipeline is real.

## How it works

When someone sends the inquiry form, the AI returns one JSON object: intent, urgency, a confidence score, a one-line summary and a drafted reply. The inquiry is saved as a row in Google Sheets, and the owner gets a Discord alert for every one. Routine inquiries get the reply by email right away, about 3 seconds after submitting. Emergencies, high-urgency messages and anything the AI is less than 70% sure about wait in the owner's dashboard for review and "Approve and send". Spam gets no reply.

If the AI call fails, the inquiry is still saved, the owner is still alerted and the patient gets a standard "we got your message" email. No inquiry gets lost. The prompt also tells the AI to reply in the patient's language, never quote prices, never give medical advice and never invent clinic facts. On a fixed set of 20 test messages (Tagalog, angry patients, vague questions, spam) it tags all 20 correctly.

## Stack

Next.js 16 and TypeScript, with AI SDK 7. The model is one environment variable, Gemini Flash Lite on the free tier by default, and it can switch to Claude without code changes. Zod validates the form and the AI output. The rest is the Google Sheets API, Resend for email, Discord webhooks, and Cloudflare Turnstile plus a honeypot and a five-per-hour rate limit against spam. It runs on Vercel.
