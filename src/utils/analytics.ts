import { type Metric } from 'web-vitals';

// Analytics events interface
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

// Performance metrics tracking
export const sendToAnalytics = ({ name, delta, id }: Metric) => {
  // Here you would typically send to your analytics service
  console.log(`Metric: ${name} | ID: ${id} | Delta: ${delta}`);
};

// Basic event tracking
export const trackEvent = ({ name, properties = {} }: AnalyticsEvent) => {
  // Here you would typically send to your analytics service
  console.log('Event:', name, properties);
};

// Error tracking
export const trackError = (error: Error, componentStack?: string) => {
  console.error('Error:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    componentStack,
  });
};

// Page view tracking
export const trackPageView = (path: string) => {
  console.log('Page View:', path);
};