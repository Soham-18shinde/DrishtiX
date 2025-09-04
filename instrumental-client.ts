import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://544e3985d8a713c9aa2dc6a767cd85d0@o4509950943232000.ingest.us.sentry.io/4509950944935936",

  integrations: [
    // Session Replay (only enabled client-side)
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      colorSchema:'system',
      isNameRequired:true,
      isEmailRequired:true
    })

    // User Feedback
    Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
  ],

  // Capture user IPs and request headers
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Performance Monitoring
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // Recommended to lower in production.
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Session Replay Sampling
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error.
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Enable client-side logs to be sent to Sentry
  enableLogs: true,

  // Note: if you want to override the automatic release value,
  // use the `SENTRY_RELEASE` environment variable instead of setting `release` here.
});

// This export instruments router navigations, only relevant if tracing is enabled.
// Available from SDK version 9.12.0 onwards.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
