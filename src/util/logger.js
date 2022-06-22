import * as Sentry from '@sentry/react'

import { env } from '../common'

export function logMessage(message) {
    if (env.SENTRY_DSN) {
        Sentry.captureMessage(message)
    }
}

export function logEvent(message, options = {}) {
    if (env.SENTRY_DSN) {
        Sentry.captureEvent({
            message,
            ...options,
        })
    }
}

export function addLoggerBreadcrumb(category, message, options = {}) {
    if (env.SENTRY_DSN) {
        Sentry.addBreadcrumb({
            category,
            message,
            ...options,
        })
    }
}
