(function() {
  // Find all instances of this script
  const scripts = document.querySelectorAll('script[src*="embed.js"]');
  
  scripts.forEach(script => {
    // Prevent double injection
    if (script.getAttribute('data-injected') === 'true') return;
    
    let slug = script.getAttribute('data-calculator');
    const theme = script.getAttribute('data-theme') || 'light';
    const width = script.getAttribute('data-width') || '100%';
    const height = script.getAttribute('data-height') || '600px';
    
    if (!slug) return;

    // Strip category prefix if present (e.g., "employment/bonus-tax-calculator" → "bonus-tax-calculator")
    // The embed route only accepts a single slug segment: /embed/[slug]
    if (slug.includes('/')) {
      slug = slug.split('/').pop();
    }
    
    const iframe = document.createElement('iframe');
    
    // In production this would be the actual domain
    const domain = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000' 
      : 'https://dailyfinance.tools';
      
    iframe.src = `${domain}/embed/${slug}?theme=${theme}`;
    iframe.style.width = width;
    iframe.style.height = height;
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.style.overflow = 'hidden';
    iframe.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    
    script.parentNode.insertBefore(iframe, script);
    script.setAttribute('data-injected', 'true');
  });
})();
