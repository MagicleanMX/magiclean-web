// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const DEFAULT_DSN = "https://8b1e7e0d4f33f17be8416f4b622420f6@o4511248313352192.ingest.us.sentry.io/4511253451243520";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || DEFAULT_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 0.1,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  beforeSend(event) {
    // Redact request body from API routes (contact form)
    if (event.request?.data) {
      event.request.data = '[REDACTED]'
    }
    return event
  },
});
