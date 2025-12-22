# ESG HR Consulting - Company Profile Website

A professional, responsive website for ESG HR Consulting company built with HTML5, CSS3, Bootstrap 5, and JavaScript.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Bootstrap 5**: Utilizing the latest Bootstrap framework for responsive components
- **Interactive Elements**: Smooth scrolling, hover effects, and animated counters
- **Contact Form**: Functional contact form with validation
- **Modular Structure**: Sections are organized in separate HTML files for easy maintenance

## 📁 Project Structure

```
ESG-Company-Profile/
├── index.html              # Main HTML file with all sections
├── sections/               # Individual section HTML files
│   ├── company_info.html   # Company overview and values
│   ├── services.html       # HR consulting services
│   ├── old_customers.html  # Client testimonials and statistics
│   └── contact_us.html     # Contact form and information
├── css/
│   └── styles.css          # Custom styles and animations
├── js/
│   └── animations.js       # JavaScript for interactions and animations
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Running the Website

#### Option 1: Direct File Opening
Simply open `index.html` in your web browser.

#### Option 2: Using Python HTTP Server
```bash
# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

#### Option 3: Using Node.js HTTP Server
```bash
npx http-server -p 8000
# Then open http://localhost:8000 in your browser
```

## 📄 Website Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **Company Info**: Overview of ESG HR Consulting, mission, and values
3. **Services**: Comprehensive list of HR consulting services offered
4. **Our Clients**: Client testimonials, statistics, and success stories
5. **Contact Us**: Contact form and company contact information
6. **Footer**: Quick links and social media connections

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    /* Add more color variables */
}
```

### Modifying Content
- Update section content by editing files in the `sections/` directory
- Modify the main structure in `index.html`
- Customize styles in `css/styles.css`
- Adjust animations and interactions in `js/animations.js`

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles and animations
- **Bootstrap 5.3.0**: Responsive framework
- **Bootstrap Icons**: Icon library
- **JavaScript (ES6+)**: Interactive functionality
- **Intersection Observer API**: Scroll animations
- **Fetch API**: Dynamic content loading

## ✨ Key Features

### Animations
- Smooth scroll to sections
- Fade-in animations on scroll
- Hover effects on cards and buttons
- Animated counters for statistics

### Responsive Design
- Mobile-first approach
- Breakpoints for all device sizes
- Touch-friendly navigation

### Performance
- Optimized loading with CDN resources
- Efficient JavaScript with debouncing
- Minimal dependencies

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📧 Contact Form

The contact form includes:
- Client-side validation
- Loading state indicator
- Success/error messages
- Form reset after submission

Note: The form currently simulates submission. To connect to a backend, modify the form submission handler in `js/animations.js`.

## 📝 License

This project is created for ESG HR Consulting Company.

## 👨‍💻 Development

To contribute or modify:

1. Clone the repository
2. Make your changes
3. Test thoroughly across different browsers
4. Submit your updates

## 🔄 Future Enhancements

Potential improvements:
- Add backend integration for contact form
- Implement CMS for content management
- Add blog section
- Integrate analytics
- Add more interactive elements
- Implement dark mode toggle

---

**Built with ❤️ for ESG HR Consulting**
