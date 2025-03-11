
// Polyfills for Node.js built-ins
if (typeof window !== 'undefined') {
  // Make sure global is defined
  window.global = window.global || window;
  
  // Buffer polyfill
  window.Buffer = window.Buffer || require('buffer').Buffer;
  
  // Process polyfill - use type assertion to avoid type errors
  window.process = window.process || { env: {} } as any;
}
