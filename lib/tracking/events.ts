/**
 * Tracking Events Configuration
 * Handles GA4, GTM, and Meta Pixel event tracking
 */

// Event types
export type TrackingEventName =
  | 'whatsapp_click'
  | 'call_click'
  | 'form_submit'
  | 'video_view'
  | 'video_complete'
  | 'service_view'
  | 'cta_click'
  | 'faq_expand'
  | 'map_interaction'
  | 'page_scroll';

export interface TrackingEventData {
  event_category?: string;
  event_label?: string;
  value?: number;
  service_name?: string;
  page_location?: string;
  video_title?: string;
  video_percent?: number;
  form_name?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track event to Google Analytics 4
 */
export function trackGA4Event(
  eventName: TrackingEventName,
  eventData?: TrackingEventData
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    });
  }
}

/**
 * Track event to Google Tag Manager dataLayer
 */
export function trackGTMEvent(
  eventName: TrackingEventName,
  eventData?: TrackingEventData
): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
}

/**
 * Track event to Meta Pixel
 */
export function trackMetaPixelEvent(
  eventName: string,
  eventData?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
  }
}

/**
 * Track custom Meta Pixel event
 */
export function trackMetaPixelCustomEvent(
  eventName: string,
  eventData?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, eventData);
  }
}

/**
 * Universal tracking function - sends to all platforms
 */
export function trackEvent(
  eventName: TrackingEventName,
  eventData?: TrackingEventData
): void {
  // Track to GA4
  trackGA4Event(eventName, eventData);

  // Track to GTM dataLayer
  trackGTMEvent(eventName, eventData);

  // Track to Meta Pixel (map to appropriate FB events)
  const metaEventMapping: Record<TrackingEventName, string> = {
    whatsapp_click: 'Contact',
    call_click: 'Contact',
    form_submit: 'Lead',
    video_view: 'ViewContent',
    video_complete: 'ViewContent',
    service_view: 'ViewContent',
    cta_click: 'InitiateCheckout',
    faq_expand: 'ViewContent',
    map_interaction: 'FindLocation',
    page_scroll: 'ViewContent',
  };

  const metaEventName = metaEventMapping[eventName];
  if (metaEventName) {
    trackMetaPixelEvent(metaEventName, {
      content_name: eventData?.event_label || eventName,
      content_category: eventData?.event_category,
      ...eventData,
    });
  }
}

/**
 * Track WhatsApp button click
 */
export function trackWhatsAppClick(serviceName?: string): void {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: serviceName || 'general',
    service_name: serviceName,
  });
}

/**
 * Track call button click
 */
export function trackCallClick(location?: string): void {
  trackEvent('call_click', {
    event_category: 'engagement',
    event_label: location || 'general',
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, serviceName?: string): void {
  trackEvent('form_submit', {
    event_category: 'conversion',
    event_label: formName,
    form_name: formName,
    service_name: serviceName,
  });

  // Also track as Meta Pixel Lead event
  trackMetaPixelEvent('Lead', {
    content_name: formName,
    content_category: serviceName || 'contact',
  });
}

/**
 * Track video view
 */
export function trackVideoView(
  videoTitle: string,
  percentWatched?: number
): void {
  trackEvent('video_view', {
    event_category: 'video',
    event_label: videoTitle,
    video_title: videoTitle,
    video_percent: percentWatched,
  });
}

/**
 * Track service page view
 */
export function trackServiceView(serviceName: string): void {
  trackEvent('service_view', {
    event_category: 'content',
    event_label: serviceName,
    service_name: serviceName,
  });

  // Track as Meta Pixel ViewContent
  trackMetaPixelEvent('ViewContent', {
    content_name: serviceName,
    content_type: 'service',
  });
}

/**
 * Track CTA button click
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: `${ctaName} - ${location}`,
  });
}

// Declare global types for tracking scripts
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: Record<string, unknown>[];
    fbq: (
      command: string,
      eventName: string,
      eventData?: Record<string, unknown>
    ) => void;
  }
}
