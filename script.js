// Simple intersection observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navLinksContainer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Unobserve if you only want it to animate once
            }
        });
    }, observerOptions);

    // Let's add simple fade-in classes via JS to keep HTML clean initially
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // We can handle the 'visible' class here since we injected styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        section.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Dynamic text effect in hero
    const highlightText = document.querySelector('.highlight');
    if (highlightText) {
        const roles = ['GenAI', 'AI/ML', 'BACKEND'];
        let roleIndex = 0;

        setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            highlightText.style.opacity = '0';
            
            setTimeout(() => {
                highlightText.textContent = roles[roleIndex];
                highlightText.style.opacity = '1';
            }, 300);
            
        }, 3000);

        // Initial transition setup for highlight
        highlightText.style.transition = 'opacity 0.3s ease';
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Contact Form Logic (Background Submit with Feedback)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop page reload
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData();
            // IMPORTANT: Replace with your actual Web3Forms Access Key
            formData.append('access_key', 'YOUR_ACCESS_KEY_HERE'); 
            formData.append('name', document.getElementById('sender-name').value);
            formData.append('email', document.getElementById('sender-email').value);
            formData.append('message', document.getElementById('sender-message').value);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully! 🚀';
                    formStatus.style.color = '#00ff00';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Failed! Please ensure you added the Access Key in script.js.';
                    formStatus.style.color = '#ff4444';
                    formStatus.style.display = 'block';
                }
            } catch (error) {
                formStatus.textContent = 'An error occurred. Please check your connection.';
                formStatus.style.color = '#ff4444';
                formStatus.style.display = 'block';
            }

            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
        });
    }

    // --- Neural Network Particle Canvas ---
    const canvas = document.getElementById('neural-net-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        // Handle resize
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Track mouse
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            heroSection.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.size = Math.random() * 2.5 + 1.5;
            }

            draw() {
                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                ctx.fillStyle = isLight ? 'rgba(106, 13, 173, 0.4)' : 'rgba(138, 43, 226, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();
        window.addEventListener('resize', initParticles);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const lineColor = isLight ? 'rgba(106, 13, 173, 0.06)' : 'rgba(138, 43, 226, 0.12)';
            const mouseLineColor = isLight ? 'rgba(106, 13, 173, 0.15)' : 'rgba(138, 43, 226, 0.25)';

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1 - dist / 100;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        ctx.strokeStyle = mouseLineColor;
                        ctx.lineWidth = (1 - dist / mouse.radius) * 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- AI Agent Console Terminal logic ---
    const termOutput = document.getElementById('terminal-output');
    const runTriage = document.getElementById('run-triage');
    const runFinance = document.getElementById('run-finance');
    const runLegal = document.getElementById('run-legal');

    if (termOutput && runTriage && runFinance && runLegal) {
        let isRunning = false;

        async function writeLine(text, type = '', delay = 20) {
            const line = document.createElement('p');
            line.className = 't-line';
            if (type === 'prompt') {
                line.innerHTML = `<span class="t-prompt">></span> ${text}`;
            } else if (type === 'success') {
                line.innerHTML = text.replace('[OK]', '<span class="t-success">[OK]</span>');
            } else if (type === 'info') {
                line.innerHTML = `<span class="t-info">${text}</span>`;
            } else if (type === 'warning') {
                line.innerHTML = `<span class="t-warning">${text}</span>`;
            } else {
                line.textContent = text;
            }
            termOutput.appendChild(line);
            termOutput.scrollTop = termOutput.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        async function runPipeline(pipelineName, steps) {
            if (isRunning) return;
            isRunning = true;
            termOutput.innerHTML = '';
            
            runTriage.disabled = true;
            runFinance.disabled = true;
            runLegal.disabled = true;

            await writeLine(`python run_${pipelineName}.py`, 'prompt', 150);
            
            for (const step of steps) {
                await writeLine(step.text, step.type, step.delay || 400);
            }

            runTriage.disabled = false;
            runFinance.disabled = false;
            runLegal.disabled = false;
            isRunning = false;
        }

        runTriage.addEventListener('click', () => {
            const steps = [
                { text: '[INIT] Extracting symptoms via MediaPipe Vision OCR API...', type: 'info' },
                { text: '[PROCCESS] Parsing image data to JSON schemas... [OK]', type: 'success' },
                { text: '[RAG] Embedding clinical symptoms (1024-dim)... [OK]', type: 'success' },
                { text: '[VECTOR] Semantic search in Qdrant database... [OK]', type: 'success' },
                { text: '[RERANK] Applying BGE-Reranker (Top-K query)... [OK]', type: 'success' },
                { text: '[STATUS] Constrained state-machine routing to Cardiology Agent...', type: 'warning' },
                { text: '[RESULT] Successfully Routed. Severity: High. Latency: 145ms.', type: 'info' }
            ];
            runPipeline('clinical_triage', steps);
        });

        runFinance.addEventListener('click', () => {
            const steps = [
                { text: '[INIT] Parsing SEC 10-K report via PyPDFLoader...', type: 'info' },
                { text: '[RAG] Dense-Sparse hybrid retrieval query active...', type: 'info' },
                { text: '[VECTOR] Matching index from Qdrant + BM25 scores...', type: 'success' },
                { text: '[STATUS] Running Reciprocal Rank Fusion (RRF)... [OK]', type: 'success' },
                { text: '[GUARD] Evaluating Math Grounding Layer... (100% verified)', type: 'success' },
                { text: '[RESULT] Profit margins up 4.2% YoY. No hallucinations. Latency: 210ms.', type: 'info' }
            ];
            runPipeline('financial_rag', steps);
        });

        runLegal.addEventListener('click', () => {
            const steps = [
                { text: '[INIT] Creating LangGraph legal intent parser...', type: 'info' },
                { text: '[PROCCESS] Initializing Groq API Llama-3.1 model... [OK]', type: 'success' },
                { text: '[VECTOR] Retrieving local legal clauses from Qdrant... [OK]', type: 'success' },
                { text: '[GUARD] Coherence filtering applied (removed 3 irrelevant docs)... [OK]', type: 'success' },
                { text: '[RESULT] Clause 12.3: 30 days written notice. Latency: 85ms.', type: 'info' }
            ];
            runPipeline('legal_assistant', steps);
        });
    }

});
