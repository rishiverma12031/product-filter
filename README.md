
# 🔍 Advanced Product Filter Dashboard

A sophisticated product filtering system built with **pure vanilla JavaScript**, demonstrating advanced filtering logic, immutable state management, and mobile-first responsive design.

![Product Filter Demo](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌟 Live Demo

[View Live Demo](https://productfilterrv.netlify.app/)

## 📸 Screenshots

![Product Filter Interface](./screenshots/demo.png) *(Screenshots will be added soon)*

## ✨ Features

### Core Functionality
- **Multi-Criteria Filtering** - Combine category, brand, price, rating, and availability filters
- **Real-Time Search** - Search products by name with instant results
- **Price Range Slider** - Interactive slider for dynamic price filtering
- **Collapsible Filter Groups** - Accordion-style filter organization
- **Result Count Display** - Shows "X of Y products" in real-time
- **Clear All Filters** - Reset to default state instantly
- **No Results Handling** - User-friendly message when filters return nothing
- **Persistent Filters** - Filter state saved across sessions (localStorage)

### Advanced UX
- **Mobile Filter Drawer** - Slide-out sidebar with backdrop overlay
- **Responsive Grid** - Adapts from 4 → 2 → 1 columns
- **Visual Star Ratings** - Custom star display (★★★★⯪)
- **Stock Status Badges** - Clear in-stock/out-of-stock indicators
- **Smooth Interactions** - Hover effects, transitions, focus states

## 🚀 Technologies & Concepts

### Core Technologies
- **HTML5** - Semantic markup with proper accessibility
- **CSS3** - Modern responsive design with Grid & Flexbox
- **JavaScript (ES6+)** - Pure vanilla JavaScript with advanced patterns

### JavaScript Concepts Demonstrated

#### Advanced Filtering
- **Filter Composition** - Sequential filter pipeline
- **Multi-Criteria Logic** - Combining multiple filter dimensions
- **OR Logic** - Category/brand selection
- **AND Logic** - Cross-filter combination
- **Set Deduplication** - Preventing duplicate results

#### Functional Programming
- **Pure Functions** - All filter operations are side-effect free
- **Immutability** - State updates return new objects
- **Function Composition** - Chaining filter operations
- **Array Methods** - `reduce()`, `filter()`, `map()`, `Set`

#### State Management
- **Complex State Object** - 7-dimension filter state
- **Switch-Case Routing** - Clean update handler dispatch
- **localStorage Integration** - Session persistence
- **State Synchronization** - UI ↔ data consistency

#### Clean Code Practices
- **Separation of Concerns** - Logic, rendering, storage separated
- **DRY Principle** - Reusable checkbox update function
- **Utility Functions** - Custom formatters (price, rating, titleCase)
- **Modular Architecture** - Clear file organization

## 📁 Project Structure

```
product-filter/
├── index.html                    # Main HTML
├── assets/
│   └── products.json             # Product dataset (25 items)
├── scripts/
│   ├── main.js                   # App initialization & event handlers
│   ├── data.js                   # Async product loading
│   ├── filters.js                # Filter logic (pure functions)
│   ├── render.js                 # DOM manipulation
│   ├── storage.js                # localStorage operations
│   └── utils.js                  # Utility functions
├── styles/
│   ├── main.css                  # Import orchestration
│   ├── base/
│   │   ├── reset.css             # CSS reset
│   │   ├── variables.css         # Custom properties
│   │   └── layout.css            # Global layout
│   ├── components/
│   │   ├── header.css            # Header styles
│   │   ├── footer.css            # Footer styles
│   │   ├── filters.css           # Filter sidebar
│   │   ├── price-range.css       # Price slider
│   │   ├── products.css          # Product grid
│   │   ├── card.css              # Product cards
│   │   └── utils.css             # Utility classes
│   └── devices/
│       ├── mobile.css            # Mobile responsive
│       └── others.css            # Tablet/desktop
├── package.json                  # Project metadata
├── LICENSE                       # MIT License
└── README.md                     # This file
```

## 🔧 Installation & Usage

### Prerequisites
- Modern web browser (Chrome 91+, Firefox 88+, Safari 14+, Edge 91+)
- Optional: Node.js for local server

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishiverma12031/product-filter.git
   cd product-filter
   ```

2. **Run locally**
   
   **Option A: Using npx (recommended)**
   ```bash
   npx serve .
   ```
   
   **Option B: Using Python**
   ```bash
   python -m http.server 8000
   ```
   
   **Option C: Using Node.js http-server**
   ```bash
   npm install -g http-server
   http-server
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`

### Using npm Scripts

```bash
npm install  # Optional
npm start    # Start server
```

## 💡 Key Implementation Details

### Filter Composition Pattern

Sequential filter pipeline for clean, maintainable logic:

```javascript
export const filterProducts = (products, {searchInput, categories, brands, slider, prices, ratings, inStock}) => {
    const bySearch = filterBySearch(products, searchInput);
    const byCategory = filterByCategory(bySearch, categories);
    const byBrand = filterByBrand(byCategory, brands);
    const bySlider = filterBySlider(byBrand, slider);
    const byPrice = filterByPrice(bySlider, prices);
    const byRating = filterByRating(byPrice, ratings);
    const byAvailability = filterByAvailability(byRating, inStock);
    return byAvailability;
}
```

### Immutable State Updates

All filter updates return new state objects:

```javascript
const updateCategory = (filters, event) => {
    const updatedCategories = updateCheckboxFilterGroup(filters.categories, event);
    return {...filters, categories: updatedCategories};
}
```

### Checkbox Toggle Logic

DRY implementation for all checkbox groups:

```javascript
const updateCheckboxFilterGroup = (group, event) => {
    const value = event.target.value;
    return group.includes(value) ? 
        group.filter(element => element !== value) : 
        [...group, value];
}
```

### Rating Filter with Deduplication

Using Set to prevent duplicates when multiple rating filters active:

```javascript
const filterByRating = (products, ratings) => {
    return ratings.reduce((filteredProducts, rating) => {
        return [...new Set([...filteredProducts, ...products.filter(product => product.rating >= rating)])];
    }, []);
}
```

### Visual Star Rating System

Custom utility for star display:

```javascript
export const formatRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = ((rating - fullStars) >= 0.5) ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    
    let stars = "★".repeat(fullStars);
    stars += "⯪".repeat(halfStars);
    stars += "☆".repeat(emptyStars);
    
    return `${rating} ${stars}`;
}
```

### Mobile Filter Drawer

Responsive sidebar with backdrop:

```javascript
filtersToggleBtn.addEventListener('click', () => {
    filtersBar.classList.add('filters--open');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = "hidden";  // Prevent body scroll
});
```

## 🎨 Styling Approach

- **Architecture**: Modular CSS with base/components/devices organization
- **Methodology**: BEM naming convention
- **Responsive Strategy**: Mobile-first with breakpoints
- **Modern CSS**: Custom properties, color-mix(), transitions
- **Accessibility**: Focus states, semantic HTML

## 🧪 Filter Capabilities

### Available Filters

| Filter Type | Options | Logic |
|-------------|---------|-------|
| **Search** | Text input | Case-insensitive name matching |
| **Category** | Electronics, Home, Sports, Travel, Stationery, Fashion | OR (any selected) |
| **Brand** | Multiple brands | OR (any selected) |
| **Price Slider** | 0 to max price | Less than or equal |
| **Price Range** | <500, 500-2K, 2K-5K, >5K | OR (any range) |
| **Rating** | 4+, 4.5+, 3+ stars | OR with deduplication |
| **Availability** | In Stock / Include Out of Stock | Boolean toggle |

### Filter Combination Examples

**Scenario 1: Find affordable electronics in stock**
- Category: Electronics ✓
- Price: Under 500 ✓
- Availability: In Stock Only ✓
- Result: Shows wireless mouse, USB cable, etc.

**Scenario 2: High-rated home products**
- Category: Home ✓
- Rating: 4.5+ ✓
- Result: Coffee maker, water bottle, instant pot

**Scenario 3: Search with filters**
- Search: "keyboard"
- Category: Electronics ✓
- Price: 2000-5000 ✓
- Result: Mechanical Keyboard RGB

## 🔒 Security

- **XSS Prevention**: Uses `textContent` for user input (search)
- **No External Dependencies**: Pure vanilla JavaScript
- **Client-Side Only**: All filtering happens in browser
- **Safe Data Handling**: No sensitive information

## 📚 Learning Outcomes

This project demonstrates understanding of:

1. **Advanced Array Methods** - Mastery of `reduce()`, `filter()`, `map()`, `Set`
2. **Filter Logic** - Multi-criteria filtering with AND/OR combination
3. **State Management** - Complex state object with immutable updates
4. **Switch Routing** - Clean event handler dispatch pattern
5. **Responsive Design** - Mobile-first with drawer navigation
6. **localStorage** - Session persistence implementation
7. **Utility Functions** - Custom formatters and transformations
8. **CSS Architecture** - Modular, maintainable stylesheet organization

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Future Enhancements

- [ ] Add sorting (price, rating, name)
- [ ] URL query parameters for shareable filters
- [ ] Filter count badges
- [ ] Smooth product transitions
- [ ] Pagination for large datasets
- [ ] Color/size filters
- [ ] Save favorite searches
- [ ] Export filtered results
- [ ] Dark mode
- [ ] Unit tests (Jest)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rishi Verma**
- Portfolio: [rishiverma.netlify.app](https://rishiverma.netlify.app/)
- GitHub: [@rishiverma12031](https://github.com/rishiverma12031)
- LinkedIn: [Rishi Verma](https://www.linkedin.com/in/rishiverma12031/)

## 🙏 Acknowledgments

- Product data curated for realistic e-commerce scenarios
- Star rating symbols from Unicode character set
- Inspired by modern e-commerce filter systems

---

**Built with ❤️ and vanilla JavaScript**

*If you found this project helpful, please give it a ⭐️*
