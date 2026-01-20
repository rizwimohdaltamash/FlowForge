# 🔧 FlowForge

## 📖 Overview

**FlowForge** is a powerful, browser-based visual automation engine that empowers users to create executable workflows without writing code. Built on Google's Blockly framework, it provides an intuitive drag-and-drop interface for designing automation logic that generates clean, executable JavaScript in real-time.

### ✨ Key Features

- 🎨 **Visual Workflow Builder** - Intuitive drag-and-drop interface
- ⚡ **Real-time Code Generation** - See JavaScript as you build
- 🔒 **Safe Execution** - Isolated code execution using AsyncFunction
- 📊 **Live Output Display** - Real-time workflow results
- 🎯 **6 Custom Block Types** - Comprehensive automation capabilities
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🚀 **Zero Dependencies** - Pure HTML/CSS/JavaScript (except Blockly CDN)
- 💾 **No Backend Required** - Runs entirely in the browser

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| **HTML5** | Structure and layout | Latest |
| **CSS3** | Styling with Grid/Flexbox | Latest |
| **JavaScript (ES6+)** | Application logic | ES6+ |
| **Blockly** | Visual programming framework | Latest (CDN) |

### Tools & Platforms

- **Version Control**: Git
- **Package Manager**: npm (optional)
- **Deployment**: Vercel, Netlify, GitHub Pages
- **Development Server**: http-server (optional)

---

## 🏗️ Architecture

### Project Structure

```
FlowForge/
├── index.html         # Main application page & toolbox configuration
├── style.css          # Responsive styling (Grid/Flexbox)
├── app.js            # UI logic, workspace initialization & code execution
├── blocks.js         # Custom Blockly block definitions
├── generator.js      # JavaScript code generators for blocks
├── quick-start.html  # Interactive tutorial with examples
├── package.json      # Project metadata & scripts
├── vercel.json       # Vercel deployment configuration
├── LICENSE           # MIT License
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

### Architecture Patterns

- **Modular Design**: Separation of concerns (blocks, generators, UI)
- **Event-Driven**: User interactions trigger code generation/execution
- **Safe Execution**: AsyncFunction for isolated code execution
- **Responsive Layout**: Flexbox/Grid for adaptive UI

### Data Flow

```mermaid
graph LR
    A[User Drags Blocks] --> B[Blockly Workspace]
    B --> C[Generate Code]
    C --> D[JavaScript Generator]
    D --> E[Code Preview]
    E --> F[User Clicks Run]
    F --> G[AsyncFunction Execution]
    G --> H[Output Display]
```

---

## 🧩 Custom Blocks

### 1. 🚀 Trigger Block
**"When App Starts"**
- Entry point for every workflow
- Marks the beginning of automation sequence
- Required for code execution
- **Type**: Statement block (hat block)

### 2. 📦 Set Variable Block
**Variable Assignment**
- Create and assign values to variables
- Supports numbers and text
- Automatic variable name validation
- Example: `Set counter to 10`
- **Inputs**: Variable name (text), Value (number/text)

### 3. 🔀 Condition Block
**Conditional Logic**
- Compare variables with values
- Supported operators: `>`, `<`, `==`, `>=`, `<=`, `!=`
- If/Else branching logic
- Example: `If score >= 80 then "Pass" else "Fail"`
- **Inputs**: Variable, Operator, Value

### 4. 🔄 Transform Block
**Data Transformation**
- **Number Operations**: multiply by 2/10, divide by 2, add 1, subtract 1
- **Text Operations**: uppercase, lowercase, reverse
- In-place variable modification
- Example: `Transform name to uppercase`
- **Inputs**: Variable, Operation type

### 5. ⏱️ Delay Block
**Async Time Control**
- Wait for specified seconds (0-60)
- Full async/await support
- Non-blocking execution
- Example: `Wait for 3 seconds`
- **Inputs**: Duration (seconds)

### 6. 💬 Output Block
**Display Results**
- Show messages or variable values
- Real-time output panel updates
- Supports text and number display
- Example: `Display "Hello, World!"`
- **Inputs**: Message (text/variable)

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Running Locally

1. **Clone or Download**
   ```bash
   git clone https://github.com/rizwimohdaltamash/MedSync77.git
   cd FlowForge
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in your browser
   # Windows
   start index.html
   
   # macOS
   open index.html
   
   # Linux
   xdg-open index.html
   ```

3. **Start Building**
   - Drag blocks from the toolbox
   - Connect them to create workflows
   - Click "Generate Code" to see JavaScript
   - Click "Run" to execute your automation

### Alternative: Use a Local Server

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# Using npm script
npm start

# Then open: http://localhost:8000
```

---

## 📚 Usage Examples

### Example 1: Simple Counter
```
🚀 When App Starts
├─ 📦 Set variable "count" to 0
├─ 🔄 Transform count (add 1)
├─ 🔄 Transform count (multiply by 2)
└─ 💬 Display count

Output: 2
```

### Example 2: Text Processor
```
🚀 When App Starts
├─ 📦 Set variable "message" to "hello world"
├─ 🔄 Transform message (to uppercase)
└─ 💬 Display message

Output: HELLO WORLD
```

### Example 3: Conditional Workflow
```
🚀 When App Starts
├─ 📦 Set variable "temperature" to 28
└─ 🔀 If temperature > 25
    ├─ Then: 💬 Display "It's hot!"
    └─ Else: 💬 Display "It's cool!"

Output: It's hot!
```

### Example 4: Timed Automation
```
🚀 When App Starts
├─ 💬 Display "Starting process..."
├─ ⏱️ Wait for 2 seconds
├─ 💬 Display "Processing..."
├─ ⏱️ Wait for 2 seconds
└─ 💬 Display "Complete!"

Output: Messages with 2-second delays
```

---

## 🔒 Security

FlowForge prioritizes safe code execution:

- **No `eval()`** - Uses `AsyncFunction` constructor for isolation
- **Input Sanitization** - Variable names are validated and sanitized
- **Execution Timeout** - 30-second maximum execution time
- **Error Boundaries** - Comprehensive try/catch blocks
- **Isolated Scope** - Generated code runs in separate context
- **Security Headers** - Configured in `vercel.json`

### Security Features

| Feature | Implementation |
|---------|---------------|
| Code Execution | AsyncFunction (not eval) |
| Input Validation | Variable name sanitization |
| Timeout Protection | 30-second limit |
| Error Handling | Try/catch blocks |
| XSS Protection | Security headers |

---

## 🎯 Use Cases

- 📚 **Education** - Learn programming concepts visually
- 🧪 **Prototyping** - Rapid workflow prototyping
- 🤖 **Automation** - Simple automation tasks
- 🎮 **Game Logic** - Visual game logic design
- 📊 **Data Processing** - Basic data transformations
- 🔧 **Process Automation** - Business process workflows

---

## 🚀 Deployment

### Quick Deploy (Vercel - Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Deployment Options

<details>
<summary><b>1. Vercel</b></summary>

```bash
# Login
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod

# Custom domain
vercel --prod --name my-flowforge-app
```

**Settings:**
- Build Command: None (static site)
- Output Directory: `.` (root)
- Install Command: None

</details>

<details>
<summary><b>2. Netlify</b></summary>

**Method A: Drag & Drop**
1. Visit https://app.netlify.com/drop
2. Drag the `FlowForge` folder
3. Done! 🎉

**Method B: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

</details>

<details>
<summary><b>3. GitHub Pages</b></summary>

```bash
# Push to GitHub
git add .
git commit -m "Deploy FlowForge"
git push origin main

# Enable GitHub Pages in repository settings
# Source: main branch / root folder
```

Access at: `https://yourusername.github.io/repository-name/`

</details>

<details>
<summary><b>4. Cloudflare Pages</b></summary>

```bash
npm install -g wrangler
wrangler login
wrangler pages publish . --project-name=flowforge
```

</details>

### Post-Deployment Checklist

- [ ] Home page loads correctly
- [ ] Blockly workspace initializes
- [ ] All 6 block types visible in toolbox
- [ ] Blocks can be dragged and connected
- [ ] Code generation works
- [ ] Code execution succeeds
- [ ] No console errors
- [ ] Responsive layout on mobile

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Development Guidelines

- Follow ES6+ standards
- Add JSDoc comments for new functions
- Test across browsers (Chrome, Firefox, Safari, Edge)
- Maintain responsive design
- Update documentation

### Adding New Blocks

**Step 1: Define in `blocks.js`**
```javascript
Blockly.Blocks['my_new_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯 My Block")
        .appendField(new Blockly.FieldTextInput("default"), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#4CAF50');
    this.setTooltip("Description");
  }
};
```

**Step 2: Add Generator in `generator.js`**
```javascript
javascriptGenerator['my_new_block'] = function(block) {
  const value = block.getFieldValue('VALUE');
  return `  // Generated code for ${value}\n`;
};
```

**Step 3: Update Toolbox in `index.html`**
```xml
<category name="Custom" colour="#4CAF50">
  <block type="my_new_block"></block>
</category>
```

**Step 4: Test**
- [ ] Block appears in toolbox
- [ ] Block can be dragged
- [ ] Block connects properly
- [ ] Code generates correctly
- [ ] Execution works

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>Code doesn't generate</b></summary>

- ✅ Ensure you have a "When App Starts" trigger block
- ✅ Connect blocks properly (look for connection points)

</details>

<details>
<summary><b>Runtime errors</b></summary>

- ✅ Check variable names (only letters, numbers, underscores)
- ✅ Ensure value blocks are connected
- ✅ Review generated code in preview panel

</details>

<details>
<summary><b>Blocks won't connect</b></summary>

- ✅ Match connection shapes (statement vs value blocks)
- ✅ Value blocks go in rounded input sockets
- ✅ Statement blocks stack vertically

</details>

<details>
<summary><b>Deployment issues</b></summary>

- ✅ Verify `index.html` is in root directory
- ✅ Check script load order (Blockly → blocks → generator → app)
- ✅ Ensure all paths are relative
- ✅ Test locally first: `npx http-server`

</details>

---

## 📊 Code Quality

### Standards Applied

- ✅ ES6+ modern JavaScript
- ✅ JSDoc documentation
- ✅ Modular architecture
- ✅ Clean separation of concerns
- ✅ Error handling & validation
- ✅ Responsive design patterns
- ✅ Safe code execution
- ✅ DRY principles

### File Responsibilities

| File | Responsibility | Lines | Size |
|------|---------------|-------|------|
| `blocks.js` | Block definitions only | ~150 | 5KB |
| `generator.js` | Code generation logic | ~200 | 7KB |
| `app.js` | UI, workspace, execution | ~350 | 10KB |
| `style.css` | All styling | ~250 | 8KB |
| `index.html` | Structure, toolbox | ~100 | 3KB |

---

## 📈 Performance

### Optimizations

- ✅ Lightweight (~60KB total uncompressed)
- ✅ Blockly loaded via CDN (cached globally)
- ✅ No build process required
- ✅ Minimal dependencies
- ✅ Fast load times (<1s on 3G)

### Bundle Size

```
Total Size: ~60KB (uncompressed)
├── HTML:       3KB
├── CSS:        8KB
├── JavaScript: 23KB (app.js + blocks.js + generator.js)
├── Assets:     Minimal
└── Blockly:    Loaded from CDN (cached)
```

---

## 🔐 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2026 FlowForge Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.
```

---

## 🙏 Acknowledgments

- **Google Blockly** - Visual programming framework
- **Community** - Inspiration and feedback
- **Contributors** - All who helped improve FlowForge

---

## 📞 Contact & Support

- 🐛 **Report bugs** via [GitHub Issues](https://github.com/rizwimohdaltamash/MedSync77/issues)
- 💡 **Feature requests** welcome!
- 🌐 **Repository**: [github.com/rizwimohdaltamash/MedSync77](https://github.com/rizwimohdaltamash/MedSync77)

---

## 🎯 Project Status

**Current Version**: 1.0.0  
**Status**: Production Ready ✅  
**Last Updated**: January 2026  

### Completed Features
- ✅ All 6 custom blocks implemented
- ✅ Real-time code generation
- ✅ Safe code execution
- ✅ Responsive UI
- ✅ Comprehensive documentation
- ✅ Deployment ready

### Future Enhancements
- [ ] Save/Load workflows (localStorage)
- [ ] Export workflows as JSON
- [ ] More block types (loops, arrays)
- [ ] Dark mode toggle
- [ ] Undo/Redo functionality
- [ ] Workflow templates

---

<div align="center">

**Built with ❤️ for the no-code community**

</div>
