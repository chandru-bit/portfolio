# Chandru S — Portfolio

This repository contains a premium, responsive personal portfolio website built with React, HTML, CSS, and JavaScript.

Profile details now included in the site:
- Chandru S, Passionate Web & AI Developer
- Education, technical skills, soft skills, languages, projects, and achievements
- Contact links for phone, email, LinkedIn, and LeetCode

Structure:

```
portfolio/
│── index.html
│── about.html
│── projects.html
│── contact.html
│── css/
│   ├── style.css
│   ├── responsive.css
│── js/
│   ├── script.js
│   ├── animations.js
│── assets/
│   ├── images/
│   ├── icons/
│── resume/
│── README.md
```

Notes:
- Replace image placeholders in `assets/images/` with optimized images (JPEG/WebP).
- Add your own profile picture to replace the current placeholder image.
- Add a real resume PDF at `resume/ChanS_Resume.pdf`.
- The site uses CDN-hosted libraries for animations (`GSAP`, `AOS`, `Typed.js`, `tsParticles`) — no build step required.

Local test:

Open `index.html` in a browser or use a static server to preview the React app.

Netlify deploy:

1. Connect the repository in Netlify.
2. Set the publish directory to the project root: `.`
3. Leave the build command empty because the app runs directly in the browser with React CDN scripts.
4. Deploy the site.

Want me to: run a quick local server, add example images, or deploy to GitHub Pages? Reply with what you prefer.