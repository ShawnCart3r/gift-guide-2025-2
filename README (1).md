# Fleet Feet Vermont 2025 Holiday Gift Guide

A interactive, flipbook-style digital holiday gift guide built for Fleet Feet Vermont to showcase curated running and athletic products for the 2025 holiday season.

**[View Live Demo →](https://2025-gift-guide.netlify.app/)**

![Fleet Feet Gift Guide Preview](https://via.placeholder.com/800x400?text=Add+Screenshot+Here)

## 📋 Project Overview

This project transforms Fleet Feet's traditional holiday catalog into an engaging digital experience that mimics flipping through a physical magazine. Built as a single-page application with vanilla JavaScript, it features an intuitive modal-based navigation system that allows customers to browse product categories, view detailed product information, and seamlessly navigate between different gift ideas.

### Business Context

Fleet Feet Vermont needed a modern, mobile-friendly way to showcase their holiday product recommendations without relying on static PDFs or traditional e-commerce layouts. The goal was to create something that felt premium and curated while remaining accessible across all devices and driving customers to either online purchases or in-store visits.

## ✨ Key Features

- **Flipbook Interface**: Magazine-style layout with smooth page transitions that creates an engaging browsing experience
- **Modal Navigation System**: Custom-built modal architecture that handles:
  - Dynamic content loading
  - Cross-modal navigation without closing/reopening
  - Product category deep-linking
  - Accessible keyboard navigation and focus management
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing
- **Performance Optimized**: Minimal dependencies, lazy-loaded images, and efficient event delegation
- **Product Categories**: Nine curated gift categories including:
  - Running Socks
  - Cold Weather Accessories
  - Running Jackets
  - Warm Layers
  - Running Nutrition
  - Running Electronics
  - Lululemon Collection
  - Rabbit Performance Gear
  - Injury Prevention & Recovery

## 🛠️ Technical Stack

- **HTML5** - Semantic markup with accessibility considerations
- **CSS3** - Custom styling with Flexbox/Grid layouts, CSS transitions, and mobile-first responsive design
- **Vanilla JavaScript (ES6+)** - Modular architecture with event delegation, no framework dependencies
- **Netlify** - Static site hosting with continuous deployment

## 🏗️ Architecture & Implementation

### Modal System Architecture

The core of this application is a custom modal management system that handles multiple overlapping concerns:

```javascript
// Modular event handling with delegation pattern
- eventHandlers.js: Centralizes all click/keyboard event logic
- modalManager.js: Handles modal lifecycle (open, close, navigation)
- focusTrap.js: Manages keyboard accessibility and focus states
```

**Key Technical Challenges Solved:**

1. **Modal State Management**: Preventing scroll issues and z-index conflicts when navigating between multiple modals
2. **Mobile Optimization**: Touch-friendly hit targets, prevented scroll-through, proper viewport handling
3. **CSS Specificity**: Resolved inheritance issues across deeply nested product modals
4. **Performance**: Event delegation pattern to minimize listener overhead across 100+ interactive elements

### File Structure

```
2025-gift-guide/
├── index.html              # Main HTML structure
├── css/
│   ├── main.css           # Base styles and layout
│   ├── modals.css         # Modal-specific styling
│   └── responsive.css     # Media queries and mobile optimization
├── js/
│   ├── app.js             # Application initialization
│   ├── modalManager.js    # Modal logic and navigation
│   ├── eventHandlers.js   # Event delegation system
│   └── utils.js           # Helper functions
└── image/                 # Product images and assets
```

## 🎯 Technical Highlights

### 1. Event Delegation for Performance

Rather than attaching individual listeners to each product card, the application uses event delegation:

```javascript
// Single listener handles all modal triggers
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-modal-target]');
  if (trigger) {
    openModal(trigger.dataset.modalTarget);
  }
});
```

### 2. Mobile-First Responsive Design

Carefully crafted breakpoints ensure optimal viewing on all devices:
- Mobile: Single-column layout, full-screen modals, touch-optimized buttons
- Tablet: Two-column grid, larger modal viewports
- Desktop: Three-column layout, enhanced hover states

### 3. Accessibility Considerations

- Keyboard navigation support (Tab, Escape, Enter)
- Focus trapping within modals
- ARIA attributes for screen readers
- Semantic HTML structure
- Sufficient color contrast ratios

## 📊 Results & Impact

- **Deployed to Production**: Live for Fleet Feet Vermont's 2025 holiday season
- **Cross-Device Compatible**: Tested and optimized for iOS, Android, and major desktop browsers
- **Fast Load Times**: Sub-second initial page load with optimized asset delivery
- **Client Satisfaction**: Successfully replaced PDF-based gift guide with interactive experience

## 🚀 Development Process

### Challenges Overcome

**1. Mobile Modal Issues**
- **Problem**: Modals weren't properly sizing on mobile devices, content was cut off
- **Solution**: Implemented viewport-based calculations and prevented body scroll during modal interactions

**2. CSS Specificity Conflicts**
- **Problem**: Product modal styles were being overridden by parent modal styles
- **Solution**: Restructured CSS cascade with more specific selectors and BEM-like naming conventions

**3. Navigation Between Modals**
- **Problem**: Users had to close one modal before opening another, breaking flow
- **Solution**: Built state management system that smoothly transitions between modals without full close/reopen cycle

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/ShawnCart3r/2025-gift-guide.git

# Navigate to project directory
cd 2025-gift-guide

# Open in browser (requires local server for ES6 modules)
# Using Python:
python -m http.server 8000

# Using Node:
npx http-server

# Visit http://localhost:8000
```

## 🔧 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android)

## 📝 Future Enhancements

Potential improvements for future iterations:
- [ ] Analytics integration to track popular categories
- [ ] Add to cart functionality with direct e-commerce integration
- [ ] Social sharing capabilities
- [ ] Print-friendly view option
- [ ] A/B testing framework for different layouts
- [ ] Animation performance optimization with CSS containment

## 👤 Developer

**Shawn Carter**  
Full-Stack Software Engineer | Burlington, VT

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [@ShawnCart3r](https://github.com/ShawnCart3r)

## 📄 License

This project was developed for Fleet Feet Vermont. All product images and branding are property of Fleet Feet and respective manufacturers.

---

## 🎓 What This Project Demonstrates

This portfolio piece showcases:
- **Vanilla JavaScript Proficiency**: Complex UI without framework dependencies
- **CSS Architecture**: Scalable, maintainable styling solutions
- **Problem-Solving**: Real-world debugging and optimization scenarios
- **Client Communication**: Translating business requirements into technical solutions
- **Production Code**: Enterprise-ready, deployed application
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Accessibility**: WCAG considerations and keyboard navigation
- **Performance**: Optimization techniques and best practices

Built with attention to user experience, code quality, and business impact.
