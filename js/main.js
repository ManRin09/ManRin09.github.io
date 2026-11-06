import { initNavigation } from './nav.js';
import { initCodeTyping } from './typing.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the SPA navigation module
  initNavigation();

  // Animate the hero code editor
  initCodeTyping();
  
  // Future modules can be initialized here
});
