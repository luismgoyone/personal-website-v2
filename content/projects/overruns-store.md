## The problem

The client sells overrun apparel: brand-new branded pieces left over from factory production runs, sold below retail in small, size-limited batches. Most shoppers come from Instagram, on their phones. The client wanted a real store they could try on their own phone before paying for a full setup, so this is a proof of concept that runs on free tiers.

## What it does

Shoppers browse the latest drop, filter by category and size, and see the retail price struck through next to the overrun price. Each size has its own stock, and sold-out sizes can't be added to the cart. The cart lives in the browser, so no account is needed. Checkout takes a Philippine address and hands off to PayMongo for GCash, Maya, card or QR Ph, in test mode for now, and then sends a confirmation email.

The owner signs in to `/admin` to add products, upload photos and set stock per size, and to mark orders shipped or cancelled.

## How it's built

An order is marked paid by PayMongo's signed webhook, not by the redirect back to the store. The server prices the cart again from the database instead of trusting the browser. Payment goes through one Postgres function that locks the size rows and lowers stock, and it can run twice without double-counting. If two people buy the last shirt at the same time, it flags the second order as oversold for the owner instead of failing the payment.

Next.js 16 and React 19 with Tailwind CSS 4, on Supabase for Postgres, auth and photo storage, with row-level security on every table. Email goes through Resend. pgTAP tests the database rules and Vitest covers the rest. The "Warehouse Editorial" design started as Stitch mockups. It runs on Vercel in Singapore, next to the database.
