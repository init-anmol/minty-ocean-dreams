
// Polyfills for Node.js built-ins
if (typeof window !== 'undefined') {
  // Make sure global is defined
  window.global = window.global || window;
  
  // Buffer polyfill
  window.Buffer = window.Buffer || require('buffer').Buffer;
  
  // Process polyfill
  window.process = window.process || { env: {} };
}
