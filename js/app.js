const e = React.createElement;
const { useEffect, useMemo, useState } = React;

const rolePhrases = ['Aspiring Full Stack Developer', 'AI Project Builder', 'NLP Explorer', 'Team-Oriented Learner'];

const accentThemes = [
  { name: 'Forest', primary: '#00C853', secondary: '#0288D1', accent: '#6DF5A5' },
  { name: 'Sea Glass', primary: '#00A86B', secondary: '#0091EA', accent: '#7CE0FF' },
  { name: 'Mint Sky', primary: '#2ECC71', secondary: '#1E88E5', accent: '#B2F7EF' },
];

const timeline = [
  {
    year: '2024 - 2028',
    title: 'B.E Computer Science and Engineering (pursuing)',
    place: 'SNS College of Engineering',
    detail: 'Academic year: 2024 - 2028',
  },
  {
    year: '2024',
    title: 'Higher Secondary Certificate',
    place: 'Government Girls Higher Secondary School',
    detail: 'HSC - 82%',
  },
  {
    year: '2022',
    title: 'Secondary School Leaving Certificate',
    place: 'Government Girls Higher Secondary School',
    detail: 'SSLC - 75%',
  },
];

const skillTracks = {
  build: ['Python', 'Node', 'React', 'Streamlit', 'GitHub', 'VS Code'],
  design: ['Figma', 'Responsive UI', 'Clean layouts', 'Accessibility', 'Presentation'],
  growth: ['Machine Learning', 'NLP', 'Sentiment Analysis', 'TF-IDF', 'Teamwork'],
};

const skills = [
  { name: 'Python', pct: 90 },
  { name: 'Node', pct: 75 },
  { name: 'React', pct: 80 },
  { name: 'Figma', pct: 78 },
  { name: 'Streamlit', pct: 72 },
  { name: 'VS Code', pct: 88 },
];

const projects = [
  {
    title: 'E-Commerce Rating Detector',
    category: ['ai', 'web'],
    summary: 'An AI-based detector that identifies fake and genuine product reviews using Machine Learning, NLP, Sentiment Analysis, and TF-IDF.',
    tags: ['Python', 'NLP', 'Trust Score'],
    focus: 'Authentic review analysis',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.26))',
  },
  {
    title: 'AI-Driven Adaptive IoT Surveillance Framework',
    category: ['ai'],
    summary: 'Patent work focused on automated threat recognition and public security management using adaptive IoT surveillance.',
    tags: ['Patent', 'IoT', 'Security'],
    focus: 'Automated threat recognition',
    gradient: 'linear-gradient(135deg, rgba(255,122,89,0.22), rgba(255,214,107,0.18))',
  },
  {
    title: 'Python Full Stack Internship',
    category: ['web', 'design'],
    summary: 'Internship experience building responsive web applications with HTML, CSS, JavaScript, and Python at ETHER SERVICES.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    focus: 'Applied full stack practice',
    gradient: 'linear-gradient(135deg, rgba(103,232,249,0.2), rgba(167,139,250,0.24))',
  },
];

const contactItems = [
  { label: 'Email', value: 'narmathaanbu2007@gmail.com', href: 'mailto:narmathaanbu2007@gmail.com' },
  { label: 'Phone', value: '+91 6381110893', href: 'tel:+916381110893' },
  { label: 'LinkedIn', value: 'linkedin.com/in/narmatha-anbu', href: 'https://www.linkedin.com/in/narmatha-anbu' },
];

function useCounter(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return undefined;
    }

    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = window.setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        window.clearInterval(timer);
      }
      setValue(current);
    }, 28);

    return () => window.clearInterval(timer);
  }, [active, target]);

  return value;
}

function useInView(threshold = 0.45) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      }
    }, { threshold });

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [setNode, visible];
}

function useRotatingText(texts, delay = 2200) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % texts.length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay, texts.length]);

  return texts[index];
}

function App() {
  const [booted, setBooted] = useState(false);
  const [theme, setTheme] = useState(() => window.localStorage.getItem('portfolio-theme') || 'dark');
  const [paletteIndex, setPaletteIndex] = useState(() => Number(window.localStorage.getItem('portfolio-palette') || 0));
  const [navOpen, setNavOpen] = useState(false);
  const [skillTrack, setSkillTrack] = useState('build');
  const [projectQuery, setProjectQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState('');
  const [messageState, setMessageState] = useState({ name: '', email: '', message: '' });
  const [messageFeedback, setMessageFeedback] = useState('');
  const [homeVisible, setHomeVisible] = useState(() => window.scrollY < 120);
  const [statsRef, statsVisible] = useInView();
  const rotatingRole = useRotatingText(rolePhrases);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateHomeVisibility = () => {
      setHomeVisible(window.scrollY < 120);
    };

    updateHomeVisibility();
    window.addEventListener('scroll', updateHomeVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateHomeVisibility);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme !== 'light');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const palette = accentThemes[paletteIndex % accentThemes.length];
    const root = document.documentElement;
    root.style.setProperty('--primary', palette.primary);
    root.style.setProperty('--secondary', palette.secondary);
    root.style.setProperty('--accent', palette.accent);
    window.localStorage.setItem('portfolio-palette', String(paletteIndex % accentThemes.length));
  }, [paletteIndex]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = projectQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter = projectFilter === 'all' || project.category.includes(projectFilter);
      const haystack = [project.title, project.summary, project.tags.join(' ')].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [projectFilter, projectQuery]);

  const counters = {
    projects: useCounter(3, statsVisible),
    events: useCounter(2, statsVisible),
    languages: useCounter(3, statsVisible),
  };

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(`${label} copied`);
      window.setTimeout(() => setCopyStatus(''), 1600);
    } catch {
      setCopyStatus('Copy failed');
      window.setTimeout(() => setCopyStatus(''), 1600);
    }
  }

  async function handleMessageSubmit(event) {
    event.preventDefault();
    if (!messageState.name || !messageState.email || !messageState.message) {
      setMessageFeedback('Fill in name, email, and message.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set('form-name', 'contact');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok && response.status !== 0) {
        throw new Error('Submit failed');
      }

      setMessageFeedback('Message sent. I will reply by email soon.');
      setMessageState({ name: '', email: '', message: '' });
    } catch {
      setMessageFeedback('This preview cannot send email. Deploy to Netlify to receive form messages.');
    }
  }

  function h(tag, props, ...children) {
    return e(tag, props, ...children.flat());
  }

  return h(
    React.Fragment,
    null,
    !booted && h('div', { id: 'loader', 'aria-hidden': 'true' }, h('div', { className: 'loader-inner' }, h('div', { className: 'dot' }), h('div', { className: 'dot' }), h('div', { className: 'dot' }))),
    h('div', { className: 'blobs', 'aria-hidden': 'true' }, h('div', { className: 'blob blob-1' }), h('div', { className: 'blob blob-2' }), h('div', { className: 'blob blob-3' })),
    homeVisible ? h('header', { className: 'site-header' },
      h('nav', { className: 'nav container', 'aria-label': 'Primary' },
        h('button', {
          id: 'nav-toggle',
          'aria-expanded': navOpen,
          'aria-controls': 'nav-menu',
          onClick: () => setNavOpen((value) => !value),
        }, 'Menu'),
        h('ul', { id: 'nav-menu', className: 'nav-menu', role: 'menubar', style: { display: navOpen ? 'flex' : undefined } },
          h('li', null, h('a', { href: '#home', onClick: () => setNavOpen(false) }, 'Home')),
          h('li', null, h('a', { href: '#about', onClick: () => setNavOpen(false) }, 'About')),
          h('li', null, h('a', { href: '#skills', onClick: () => setNavOpen(false) }, 'Skills')),
          h('li', null, h('a', { href: '#projects', onClick: () => setNavOpen(false) }, 'Projects')),
          h('li', null, h('a', { href: '#contact', onClick: () => setNavOpen(false) }, 'Contact')),
        ),
        h('div', { className: 'nav-actions' },
          h('button', {
            id: 'theme-toggle',
            'aria-pressed': theme === 'light',
            title: 'Toggle theme',
            onClick: () => setTheme((value) => (value === 'light' ? 'dark' : 'light')),
          }, theme === 'light' ? '☀️' : '🌙'),
          h('button', {
            id: 'color-toggle',
            title: `Switch primary color to ${accentThemes[(paletteIndex + 1) % accentThemes.length].name}`,
            onClick: () => setPaletteIndex((value) => (value + 1) % accentThemes.length),
          }, '🎨'),
        ),
      ),
    ) : null,
    h('main', null,
      h('section', { id: 'home', className: 'hero container' },
        h('div', { className: 'hero-left' },
          h('p', { className: 'title' }, 'Aspiring Full Stack Developer'),
          h('h1', null, 'Hi, I\'m ', h('span', { className: 'name' }, 'Narmatha A')),
          h('p', { className: 'tagline' }, 'Driven Computer Science Engineering student focused on reliable, scalable, and impactful applications, with interests in ML, NLP, and user-focused development.'),
          h('div', { className: 'typing' }, h('span', null, rotatingRole)),
          h('div', { className: 'hero-ctas' },
            h('a', { className: 'btn btn-primary', href: '#projects' }, 'View Projects'),
            h('a', { className: 'btn btn-outline', href: '#contact' }, 'View Resume'),
            h('a', { className: 'btn btn-ghost', href: 'resume/ChanS_Resume.txt', download: true }, 'Download Resume'),
          ),
          h('div', { className: 'socials', 'aria-label': 'Social media' },
            h('a', { href: 'https://www.linkedin.com/in/narmatha-anbu', target: '_blank', rel: 'noreferrer', 'aria-label': 'LinkedIn', className: 'social-link' }, h('img', { src: 'assets/icons/linkedin.svg', alt: 'LinkedIn' }), h('span', null, 'LinkedIn')),
            h('a', { href: '#contact', 'aria-label': 'Contact', className: 'social-link' }, h('img', { src: 'assets/icons/favicon.svg', alt: 'Mail' }), h('span', null, 'Email')),
          ),
        ),
        h('div', { className: 'hero-right' },
          h('div', { className: 'profile-card glass' },
            h('div', { className: 'avatar' }, h('img', { src: 'assets/images/profile.jpeg', alt: 'Narmatha A profile photo', loading: 'lazy' })),
            h('div', { className: 'profile-meta' }, h('h3', null, 'Narmatha A'), h('p', null, 'Aspiring Full Stack Developer'), h('a', { href: '#contact', className: 'btn btn-outline' }, 'Hire Me')),
          ),
          h('div', { className: 'experience-cards' },
            h('article', { className: 'card glass' }, h('h3', null, 'Career objective'), h('p', null, 'Build reliable, scalable, and impactful applications while growing through innovation and teamwork.')),
            h('article', { className: 'card glass' }, h('h3', null, 'Tech stack'), h('p', null, 'Python, Node, React, Figma, Streamlit, GitHub, VS Code.')),
            h('article', { className: 'card glass' }, h('h3', null, 'Interests'), h('p', null, 'Machine learning, NLP, sentiment analysis, and full stack development.')),
          ),
        ),
      ),
      h('section', { id: 'about', className: 'about container' },
        h('h2', null, 'About Me'),
        h('p', null, 'Driven Computer Science Engineering student with a passion for software development and continuous learning. I aim to build dependable products with clean design, practical problem solving, and collaborative execution.'),
        h('div', { className: 'timeline' },
          timeline.map((item, index) => h('button', {
            key: item.year,
            type: 'button',
            className: 'timeline-item glass',
            onClick: () => setTimelineIndex(index),
            style: { width: '100%', textAlign: 'left', border: 'none' },
          }, h('div', { className: 'timeline-year' }, item.year), h('div', { className: 'timeline-body' }, h('h4', null, item.title), h('p', null, item.place), h('p', null, item.detail)))),
        ),
        h('div', { className: 'experience-cards' },
          h('article', { className: 'card glass' }, h('h3', null, 'Latest milestone'), h('p', null, timeline[timelineIndex].title), h('p', null, timeline[timelineIndex].place)),
          h('article', { className: 'card glass' }, h('h3', null, 'Publication / patent'), h('p', null, 'AI-Driven Adaptive IoT Surveillance Framework for Automated Threat Recognition and Public Security Management.')),
          h('article', { className: 'card glass' }, h('h3', null, 'Approach'), h('p', null, 'Learn, build, test, improve, and present ideas clearly.')),
        ),
      ),
      h('section', { id: 'skills', className: 'skills container' },
        h('h2', null, 'Skills'),
        h('div', { className: 'skills-grid' },
          h('div', null,
            skills.map((skill) => h('div', { className: 'skill', key: skill.name }, h('h4', null, skill.name), h('div', { className: 'skill-bar' }, h('div', { className: 'fill', style: { '--pct': `${skill.pct}%` } })))),
          ),
          h('div', { className: 'glass card' },
            h('div', { className: 'filters', style: { marginBottom: '1rem', flexWrap: 'wrap' } },
              Object.keys(skillTracks).map((track) => h('button', {
                key: track,
                type: 'button',
                className: `filter ${skillTrack === track ? 'active' : ''}`,
                onClick: () => setSkillTrack(track),
              }, track)),
            ),
            h('div', { className: 'skill-circles' }, skillTracks[skillTrack].map((name) => h('div', { className: 'circle glass', key: name, style: { width: 'auto', minWidth: '120px', padding: '1rem' } }, h('span', null, name)))),
          ),
        ),
      ),
      h('section', { id: 'projects', className: 'projects container' },
        h('h2', null, 'Projects, Patent & Experience'),
        h('div', { className: 'projects-controls' },
          h('input', {
            id: 'project-search',
            placeholder: 'Search projects, patent, or internship...',
            'aria-label': 'Search portfolio items',
            value: projectQuery,
            onChange: (event) => setProjectQuery(event.target.value),
          }),
          h('div', { className: 'filters' },
            ['all', 'ai', 'web', 'design'].map((filter) => h('button', {
              key: filter,
              type: 'button',
              className: `filter ${projectFilter === filter ? 'active' : ''}`,
              onClick: () => setProjectFilter(filter),
            }, filter.charAt(0).toUpperCase() + filter.slice(1))),
          ),
        ),
        h('div', { className: 'projects-grid' },
          filteredProjects.map((project) => h('article', { className: 'project-card glass', key: project.title }, h('div', { style: { height: '180px', background: project.gradient, display: 'grid', placeItems: 'center', padding: '1rem' } }, h('div', { className: 'glass card', style: { textAlign: 'center', minWidth: '70%' } }, h('strong', null, project.focus), h('p', { style: { color: 'var(--muted)', marginBottom: 0 } }, project.tags.join(' · ')))), h('div', { className: 'project-body' }, h('h3', null, project.title), h('p', null, project.summary), h('div', { className: 'project-actions' }, h('span', { className: 'btn btn-sm btn-primary' }, 'Live Demo'), h('span', { className: 'btn btn-ghost btn-sm' }, 'GitHub'))))),
        ),
      ),
      h('section', { id: 'achievements', className: 'achievements container', ref: statsRef },
        h('h2', null, 'Achievements'),
        h('div', { className: 'stats' },
          h('div', { className: 'stat card glass' }, h('h3', { className: 'count' }, counters.projects), h('p', null, 'Major Items')),
          h('div', { className: 'stat card glass' }, h('h3', { className: 'count' }, counters.events), h('p', null, 'Events / Presentations')),
          h('div', { className: 'stat card glass' }, h('h3', { className: 'count' }, counters.languages), h('p', null, 'Core Domains')),
        ),
      ),
      h('section', { className: 'testimonials container' },
        h('h2', null, 'Achievements'),
        h('div', { className: 'testimonials-grid' },
          [
            'CGPA: 8.0',
            'Participated in ASTRONOVA - 2025 paper presentation at Coimbatore Institute of Technology',
            'Participated in ZORAX - 2026 hackathon at Kongu College of Engineering',
          ].map((item) => h('blockquote', { className: 'testimonial glass', key: item }, h('p', null, item), h('cite', null, 'Resume highlight'))),
        ),
      ),
      h('section', { id: 'contact', className: 'contact container' },
        h('h2', null, 'Contact'),
        h('div', { className: 'contact-grid' },
          h('form', { id: 'contact-form', name: 'contact', className: 'contact-form glass', method: 'POST', 'data-netlify': 'true', 'netlify-honeypot': 'bot-field', onSubmit: handleMessageSubmit },
            h('input', { type: 'hidden', name: 'form-name', value: 'contact' }),
            h('input', { type: 'hidden', name: 'bot-field', value: '' }),
            h('label', { htmlFor: 'name' }, 'Name'),
            h('input', { id: 'name', name: 'name', type: 'text', value: messageState.name, onChange: (event) => setMessageState({ ...messageState, name: event.target.value }) }),
            h('label', { htmlFor: 'email' }, 'Email'),
            h('input', { id: 'email', name: 'email', type: 'email', value: messageState.email, onChange: (event) => setMessageState({ ...messageState, email: event.target.value }) }),
            h('label', { htmlFor: 'message' }, 'Message'),
            h('textarea', { id: 'message', name: 'message', rows: 5, value: messageState.message, onChange: (event) => setMessageState({ ...messageState, message: event.target.value }) }),
            h('button', { className: 'btn btn-primary', type: 'submit' }, 'Send Message'),
            messageFeedback ? h('p', { style: { color: 'var(--accent)', marginTop: '0.75rem' } }, messageFeedback) : null,
          ),
          h('aside', { className: 'contact-info glass' },
            h('h3', null, 'Get in touch'),
            h('div', { style: { display: 'grid', gap: '0.75rem' } },
              contactItems.map((item) => h('div', { className: 'card glass', key: item.label, style: { padding: '0.85rem' } }, h('strong', null, item.label), h('p', { style: { margin: '0.35rem 0' } }, h('a', { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noreferrer' : undefined }, item.value)), (item.label === 'Email' || item.label === 'Phone') ? h('button', { className: 'btn btn-ghost btn-sm', type: 'button', onClick: () => copyText(item.value, item.label) }, `Copy ${item.label}`) : null)),
            ),
            h('p', { style: { marginTop: '1rem', color: 'var(--muted)' } }, copyStatus),
          ),
        ),
      ),
    ),
    h('footer', { className: 'site-footer' },
      h('div', { className: 'container' },
        h('p', null, '© 2026 Narmatha A'),
        h('div', { className: 'footer-socials' },
          h('a', { href: 'https://www.linkedin.com/in/narmatha-anbu', target: '_blank', rel: 'noreferrer' }, h('img', { src: 'assets/icons/linkedin.svg', alt: 'LinkedIn' })),
        ),
      ),
    ),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));