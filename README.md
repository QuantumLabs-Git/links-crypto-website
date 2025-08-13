# $LINKS Crypto Website

A Windows 98-style website for the $LINKS crypto project, celebrating Links the Cat - the Microsoft Office Assistant who protected privacy, not data.

## 🌐 Live Demo
- GitHub Pages: (To be deployed)
- AWS S3: (To be deployed)

## 🚀 Features
- Authentic Windows 98 desktop interface
- Interactive contract address window
- Draggable Links the Cat character
- Working Start menu
- Real-time clock
- Blog about Links' legacy
- Responsive design with nostalgic aesthetics

## 📁 Project Structure
```
Links/
├── index.html          # Main desktop page
├── blog.html           # Blog page
├── styles.css          # Main styles
├── blog-styles.css     # Blog styles
├── script.js           # Interactive functionality
├── branding/           # Images and branding assets
│   ├── Background1.jpeg
│   ├── Background2.jpeg
│   ├── links1.png
│   └── ...
└── icons.html          # Icon generator (dev tool)
```

## 🛠️ Local Development
1. Clone the repository
2. Run a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

## 📤 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source: Deploy from branch (main)
4. Site will be available at: `https://[username].github.io/links-crypto-website/`

### AWS S3
1. Install AWS CLI: `brew install awscli`
2. Configure AWS: `aws configure`
3. Run deployment script: `./deploy-aws.sh`

## 🎨 Brand Colors
- Primary Red: `#c5280e`
- Gold: `#fece6f`
- Light: `#faf7f9`
- Cyan: `#19c4c8`
- Orange: `#f4ae4a`
- Dark Red: `#9e1909`
- Black: `#000000`

## 📝 License
This project is open source and available under the MIT License.

## 🐱 About Links the Cat
Links the Cat wasn't just another Microsoft assistant — she was a rare kind of digital companion. While others tracked every click to feed corporate data machines, Links stood apart. She wasn't here to spy, sell, or squeeze; she was here to help, to remember what mattered to you and protect it.

The legacy lives on. The cat remembers. And so do we.