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
        let cursorSpan = null;

        function showCursor() {
            if (cursorSpan) cursorSpan.remove();
            cursorSpan = document.createElement('span');
            cursorSpan.className = 't-cursor';
            termOutput.appendChild(cursorSpan);
            termOutput.scrollTop = termOutput.scrollHeight;
        }

        function hideCursor() {
            if (cursorSpan) {
                cursorSpan.remove();
                cursorSpan = null;
            }
        }

        function getTimestamp() {
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            return `[${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${String(now.getMilliseconds()).padStart(3, '0')}]`;
        }

        async function writeLine(text, type = '', delay = 20) {
            hideCursor();
            const line = document.createElement('p');
            line.className = 't-line';
            if (type === 'prompt') {
                line.innerHTML = `<span class="t-prompt">></span> ${text}`;
            } else if (type === 'success') {
                line.innerHTML = text.replace('[OK]', '<span class="t-success">[OK]</span>').replace('SUCCESS:', '<span class="t-success">SUCCESS:</span>');
            } else if (type === 'info') {
                line.innerHTML = `<span class="t-info">${text}</span>`;
            } else if (type === 'warning') {
                line.innerHTML = `<span class="t-warning">${text}</span>`;
            } else if (type === 'result') {
                line.className = 't-line t-result';
                line.innerHTML = text;
            } else {
                line.textContent = text;
            }
            termOutput.appendChild(line);
            termOutput.scrollTop = termOutput.scrollHeight;
            showCursor();
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        async function typeCommand(commandStr) {
            hideCursor();
            const line = document.createElement('p');
            line.className = 't-line';
            line.innerHTML = `<span class="t-prompt">></span> <span class="t-cmd"></span>`;
            termOutput.appendChild(line);
            const cmdSpan = line.querySelector('.t-cmd');
            
            for (let i = 0; i < commandStr.length; i++) {
                cmdSpan.textContent += commandStr[i];
                termOutput.scrollTop = termOutput.scrollHeight;
                showCursor();
                await new Promise(resolve => setTimeout(resolve, 40));
            }
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Initialize with default state
        termOutput.innerHTML = '';
        (async () => {
            await writeLine('dpjaiswal.init_agent()', 'prompt', 100);
            await writeLine(`${getTimestamp()} INFO: Loading dense-sparse retrievers...`, 'info', 150);
            await writeLine(`${getTimestamp()} INFO: Connecting Qdrant Vector DB (1024-dim)... [OK]`, 'success', 200);
            await writeLine(`${getTimestamp()} INFO: LangGraph state router active... [OK]`, 'success', 150);
            await writeLine(`${getTimestamp()} SUCCESS: Agent online. Select a workflow to execute:`, 'success', 50);
        })();

        async function runPipeline(command, steps) {
            if (isRunning) return;
            isRunning = true;
            termOutput.innerHTML = '';
            
            runTriage.disabled = true;
            runFinance.disabled = true;
            runLegal.disabled = true;

            await typeCommand(command);
            
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
                { text: `${getTimestamp()} INFO: Loading clinical triage workflow with LangGraph...`, type: 'info', delay: 450 },
                { text: `${getTimestamp()} INFO: Parsing input 'patient_report.jpg' using MediaPipe OCR...`, type: 'info', delay: 700 },
                { text: `${getTimestamp()} SUCCESS: Extracted key points. Bounding boxes parsed: [OK]`, type: 'success', delay: 400 },
                { text: `${getTimestamp()} INFO: Generating 1024-dimensional query embeddings (nomic-embed-text)...`, type: 'info', delay: 650 },
                { text: `${getTimestamp()} INFO: Querying Qdrant index 'clinical_symptoms' (similarity threshold: 0.8)...`, type: 'info', delay: 800 },
                { text: `${getTimestamp()} SUCCESS: Found 3 candidate symptom matches in database.`, type: 'success', delay: 500 },
                { text: `${getTimestamp()} INFO: Routing matches to BAAI/bge-reranker-base for precision reranking...`, type: 'info', delay: 750 },
                { text: `${getTimestamp()} SUCCESS: Top match: 'Myocardial Infarction / Angina Triage' (Score: 0.942)`, type: 'success', delay: 450 },
                { text: `${getTimestamp()} WARNING: Critical severity score computed (1.0). Triggering emergency route...`, type: 'warning', delay: 900 },
                { text: `<strong>[DECISION]</strong> Emergency Cardiology consult recommended. Priority: Critical.<br>Triage alert dispatched to duty team.<br><strong>Latency:</strong> 145ms | <strong>Confidence:</strong> 94.2%`, type: 'result', delay: 100 }
            ];
            runPipeline('python clinical_triage.py --query "chest pain, history of hypertension"', steps);
        });

        runFinance.addEventListener('click', () => {
            const steps = [
                { text: `${getTimestamp()} INFO: Starting stateful financial analysis pipeline...`, type: 'info', delay: 500 },
                { text: `${getTimestamp()} INFO: Ingesting document 'AMZN_2025_10K.pdf' via PyPDFLoader...`, type: 'info', delay: 800 },
                { text: `${getTimestamp()} SUCCESS: Tokenized and parsed 42 document chunks. [OK]`, type: 'success', delay: 400 },
                { text: `${getTimestamp()} INFO: Executing hybrid retriever: Qdrant (dense) + BM25 (sparse)...`, type: 'info', delay: 700 },
                { text: `${getTimestamp()} INFO: Running Reciprocal Rank Fusion (RRF, k=60) on result sets...`, type: 'info', delay: 650 },
                { text: `${getTimestamp()} SUCCESS: Merged and retrieved top 10 relevant document pages.`, type: 'success', delay: 450 },
                { text: `${getTimestamp()} INFO: Reranking candidates via BAAI/bge-reranker-large...`, type: 'info', delay: 600 },
                { text: `${getTimestamp()} INFO: Checking quantitative outputs in Math Grounding Verification Layer...`, type: 'info', delay: 750 },
                { text: `${getTimestamp()} SUCCESS: Grounding verified. Output matches source figures on pages 47-50. [OK]`, type: 'success', delay: 500 },
                { text: `<strong>[RESPONSE]</strong> Net profit margin for FY2025 increased by 4.2% YoY, primarily driven by AWS operational efficiencies.<br><strong>Math Grounding check:</strong> PASS (100% match) | <strong>Latency:</strong> 210ms`, type: 'result', delay: 100 }
            ];
            runPipeline('python finance_rag.py --query "Q3 profit margin AWS contribution"', steps);
        });

        runLegal.addEventListener('click', () => {
            const steps = [
                { text: `${getTimestamp()} INFO: Launching Legal AI Assistant question-answering session...`, type: 'info', delay: 450 },
                { text: `${getTimestamp()} INFO: Initializing Llama-3.1-8b-instant model on Groq API... [OK]`, type: 'success', delay: 600 },
                { text: `${getTimestamp()} INFO: Indexing input query 'contract termination notice period'...`, type: 'info', delay: 550 },
                { text: `${getTimestamp()} INFO: Retrieving relevant clauses from Qdrant contract namespace...`, type: 'info', delay: 800 },
                { text: `${getTimestamp()} INFO: Running NLP coherence filter (minimum similarity threshold: 0.78)...`, type: 'info', delay: 650 },
                { text: `${getTimestamp()} SUCCESS: Identified 1 active clause, filtered out 3 weak matches.`, type: 'success', delay: 500 },
                { text: `<strong>[CLAUSE MATCH]</strong> Section 12.3 (Termination for Convenience): Either party may terminate this agreement upon 30 days prior written notice.<br><strong>Model:</strong> Llama-3.1-8b-instant (via Groq) | <strong>Latency:</strong> 85ms`, type: 'result', delay: 100 }
            ];
            runPipeline('python legal_assistant.py --query "termination notice terms"', steps);
        });
    }

});
