# Durga Prasad Jaiswal - Portfolio Website

Welcome to the repository of my personal portfolio website! 🚀

This is a premium, dark-mode inspired personal portfolio designed to showcase my skills, experience, and projects as a **GenAI & AI/ML Engineer**. The design is clean, minimalist, and utilizes subtle neon glows and scroll-triggered animations to provide an engaging user experience.

🔗 **Live Site:** [Your Live Link Here (e.g., GitHub Pages)](#)

---

## 🎨 Features
- **Light & Dark Mode:** Integrated theme toggle with `localStorage` persistence to seamlessly switch between a sleek dark theme and a clean light theme.
- **Dynamic Hero Section:** Morphing text effect highlighting different technical roles.
- **Modern UI/UX:** Purple/cyan neon ambient glow with clean, scalable CSS architecture.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices, featuring a custom **Mobile Hamburger Navigation**.
- **SEO & Accessibility (a11y):** Integrated Open Graph (OG) tags for social sharing and aria-labels for screen readers.
- **Resume Integration:** A dedicated button to seamlessly download the latest CV/Resume.
- **Scroll Animations:** Smooth fade-in and slide-up effects as you scroll through the sections.
- **Functional Contact Form:** Background form submission via Web3Forms API, with real-time **CSS validation feedback** (red/green glowing borders), providing immediate UI feedback without relying on complex backend servers or native mail clients.
- **Organized Sections:**
  - `About Me`: Summary of my journey as a GenAI Engineer.
  - `My Tech Stack`: A dedicated, visually distinct grid with interactive pill badges.
  - `Experience`: An interactive vertical timeline for work history.
  - `Projects`: Card-based layout with integrated GitHub links for featured AI/ML systems.
  - `Education & Certifications`: Clean list for academic background.

## 🛠️ Technology Stack
This project was built from scratch without heavy frameworks to ensure maximum performance and flexibility:
- **HTML5:** Semantic structure and built-in form validation.
- **CSS3 (Vanilla):** Custom design system, Flexbox/Grid layouts, CSS variables for theme-switching, and keyframe animations.
- **JavaScript (Vanilla):** Scroll intersection observers, dynamic DOM manipulation, theme persistence, and Fetch API for asynchronous requests.
- **Web3Forms API:** Serverless email forwarding for the contact section.
- **FontAwesome:** Scalable vector icons for social links.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dpjaiswal/it-s-me-dp.git
   cd it-s-me-dp
   ```

2. **Configure Contact Form (Required for Emails):**
   - Go to [Web3Forms](https://web3forms.com/) and generate a free access key for your email.
   - Open `script.js` and locate the line: `formData.append('access_key', 'YOUR_ACCESS_KEY_HERE');`
   - Replace `'YOUR_ACCESS_KEY_HERE'` with your actual key.

3. **Serve the files:**
   Since this is a static website (HTML/CSS/JS), you can run it using any simple local server. For example, using Python:
   ```bash
   python -m http.server 8080
   ```
   Or using Node's `http-server`:
   ```bash
   npx http-server -p 8080
   ```

4. **Open in browser:**
   Navigate to `http://localhost:8080` to view the site.

## 📞 Connect with Me
- **LinkedIn:** [https://www.linkedin.com/in/dp-jaiswal/](https://www.linkedin.com/in/dp-jaiswal/)
- **GitHub:** [https://github.com/Dpjaiswal](https://github.com/Dpjaiswal)
- **Email:** dpjaiswal.lkouniv@gmail.com

---
*Designed & Built by Durga Prasad Jaiswal © 2026*
