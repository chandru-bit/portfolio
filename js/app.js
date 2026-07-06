const e = React.createElement;
const { useEffect, useMemo, useState } = React;

const rolePhrases = ['Web Developer', 'AI Builder', 'UI Systems Thinker', 'Automation Explorer'];

const accentThemes = [
  { name: 'Ocean', primary: '#00E5FF', secondary: '#7C3AED', accent: '#00FFC6' },
  { name: 'Sunset', primary: '#FF7A59', secondary: '#FFD66B', accent: '#FF66B3' },
  { name: 'Aurora', primary: '#67E8F9', secondary: '#22C55E', accent: '#A78BFA' },
];

const timeline = [
  {
    year: '2024 - 2028',
    title: 'Bachelor of Engineering - Computer Science and Engineering',
    place: 'SNS College of Engineering, Coimbatore',
    detail: 'Current GPA: 7.1/10',
  },
  {
    year: '2023 - 2024',
    title: 'Higher Secondary Certificate',
    place: 'Thirumurugan Matric Higher Secondary School, Tiruppur',
    detail: 'Percentage: 71%',
  },
  {
    year: '2021 - 2022',
    title: 'Secondary School Leaving Certificate',
    place: 'Thirumurugan Matric Higher Secondary School, Tiruppur',
    detail: 'Percentage: 81.3%',
  },
];

const skillTracks = {
  build: ['Python', 'Java', 'C++', 'C', 'Firebase', 'Streamlit'],
  design: ['Figma', 'Responsive UI', 'Glassmorphism', 'Accessibility', 'Motion Design'],
  growth: ['React', 'Automation', 'APIs', 'AI tools', 'Problem solving'],
};

const skills = [
  { name: 'Python', pct: 75 },
  { name: 'Java', pct: 60 },
  { name: 'C++', pct: 55 },
  { name: 'C', pct: 50 },
  { name: 'Figma', pct: 80 },
  { name: 'Firebase', pct: 70 },
];

const projects = [
  {
    title: 'Equipment Failure Detection System',
    category: ['ai'],
    summary: 'Real-time sensor monitoring for vibration and temperature with alerts and predictive insights.',
    tags: ['Python', 'Sensors', 'Alerts'],
    focus: 'Predictive monitoring',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(124,58,237,0.26))',
  },
  {
    title: 'Direct Farmer-Customer Marketplace App',
    category: ['web', 'design'],
    summary: 'A marketplace app for direct farmer-to-customer transactions with transparent pricing and better supply chain efficiency.',
    tags: ['Marketplace', 'Payments', 'UX'],
    focus: 'Transparent commerce flow',
    gradient: 'linear-gradient(135deg, rgba(255,122,89,0.22), rgba(255,214,107,0.18))',
  },
  {
    title: 'Portfolio Website',
    category: ['web', 'design'],
    summary: 'A polished personal site with content sections, glass cards, and responsive layout systems.',
    tags: ['React', 'Design system', 'Responsive'],
    focus: 'Personal brand system',
    gradient: 'linear-gradient(135deg, rgba(103,232,249,0.2), rgba(167,139,250,0.24))',
  },
];

const contactItems = [
  { label: 'Email', value: 'chandrus2629@gmail.com', href: 'mailto:chandrus2629@gmail.com' },
  { label: 'Phone', value: '+91 9677365275', href: 'tel:+919677365275' },
  { label: 'LinkedIn', value: 'linkedin.com/in/chandrusenthilkumar', href: 'https://www.linkedin.com/in/chandrusenthilkumar/' },
  { label: 'LeetCode', value: 'leetcode.com/u/chandru2575', href: 'https://leetcode.com/u/chandru2575/' },
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
  const [statsRef, statsVisible] = useInView();
  const rotatingRole = useRotatingText(rolePhrases);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 500);
    return () => window.clearTimeout(timer);
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
    events: useCounter(3, statsVisible),
    languages: useCounter(2, statsVisible),
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

  function handleMessageSubmit(event) {
    event.preventDefault();
    if (!messageState.name || !messageState.email || !messageState.message) {
      setMessageFeedback('Fill in name, email, and message.');
      return;
    }

    setMessageFeedback('Thanks. This demo form is ready for a backend or Netlify Forms next.');
    setMessageState({ name: '', email: '', message: '' });
  }

  function h(tag, props, ...children) {
    return e(tag, props, ...children.flat());
  }

  return h(
    React.Fragment,
    null,
    !booted && h('div', { id: 'loader', 'aria-hidden': 'true' }, h('div', { className: 'loader-inner' }, h('div', { className: 'dot' }), h('div', { className: 'dot' }), h('div', { className: 'dot' }))),
    h('div', { className: 'blobs', 'aria-hidden': 'true' }, h('div', { className: 'blob blob-1' }), h('div', { className: 'blob blob-2' }), h('div', { className: 'blob blob-3' })),
    h('header', { className: 'site-header' },
      h('nav', { className: 'nav container', 'aria-label': 'Primary' },
        h('a', { className: 'brand', href: '#home' }, 'Chandru S'),
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
    ),
    h('main', null,
      h('section', { id: 'home', className: 'hero container' },
        h('div', { className: 'hero-left' },
          h('p', { className: 'title' }, 'Passionate Web & AI Developer'),
          h('h1', null, 'Hi, I\'m ', h('span', { className: 'name' }, 'Chandru S')),
          h('p', { className: 'tagline' }, 'I build practical, user-centered applications with modern web tools, APIs, automation, and a strong eye for product detail.'),
          h('div', { className: 'typing' }, h('span', null, rotatingRole)),
          h('div', { className: 'hero-ctas' },
            h('a', { className: 'btn btn-primary', href: '#projects' }, 'View Projects'),
            h('a', { className: 'btn btn-outline', href: '#contact' }, 'View Resume'),
            h('a', { className: 'btn btn-ghost', href: 'resume/ChanS_Resume.pdf', download: true }, 'Download Resume'),
          ),
          h('div', { className: 'socials', 'aria-label': 'Social media' },
            h('a', { href: 'https://www.linkedin.com/in/chandrusenthilkumar/', target: '_blank', rel: 'noreferrer', 'aria-label': 'LinkedIn', className: 'social-link' }, h('img', { src: 'assets/icons/linkedin.svg', alt: 'LinkedIn' }), h('span', null, 'LinkedIn')),
            h('a', { href: 'https://leetcode.com/u/chandru2575/', target: '_blank', rel: 'noreferrer', 'aria-label': 'LeetCode', className: 'social-link' }, h('img', { src: 'assets/icons/github.svg', alt: 'LeetCode' }), h('span', null, 'LeetCode')),
            h('a', { href: 'https://github.com/chandru-bit', target: '_blank', rel: 'noreferrer', 'aria-label': 'GitHub', className: 'social-link' }, h('img', { src: 'assets/icons/github.svg', alt: 'GitHub' }), h('span', null, 'GitHub')),
            h('a', { href: '#contact', 'aria-label': 'Contact', className: 'social-link' }, h('img', { src: 'assets/icons/favicon.svg', alt: 'Mail' }), h('span', null, 'Email')),
          ),
        ),
        h('div', { className: 'hero-right' },
          h('div', { className: 'profile-card glass' },
            h('div', { className: 'avatar' }, h('img', { src: 'assets/images/profile.jpeg', alt: 'Chandru S profile photo', loading: 'lazy' })),
            h('div', { className: 'profile-meta' }, h('h3', null, 'Chandru S'), h('p', null, 'Web & AI Developer'), h('a', { href: '#contact', className: 'btn btn-outline' }, 'Hire Me')),
          ),
          h('div', { className: 'experience-cards' },
            h('article', { className: 'card glass' }, h('h3', null, 'Focus'), h('p', null, 'React interfaces, AI-assisted workflows, and useful product dashboards.')),
            h('article', { className: 'card glass' }, h('h3', null, 'Current stack'), h('p', null, 'HTML, CSS, JavaScript, React, Firebase, Python, Figma.')),
            h('article', { className: 'card glass' }, h('h3', null, 'Open for'), h('p', null, 'Internships, freelance work, and portfolio collaborations.')),
          ),
        ),
      ),
      h('section', { id: 'about', className: 'about container' },
        h('h2', null, 'About Me'),
        h('p', null, 'A motivated Computer Science and Engineering student focused on building practical, user-centered applications. I like product thinking, clean UI systems, and shipping useful tools that combine design with automation.'),
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
          h('article', { className: 'card glass' }, h('h3', null, 'What I like building'), h('p', null, 'Reusable components, responsive layouts, and clear information architecture.')),
          h('article', { className: 'card glass' }, h('h3', null, 'Workflow'), h('p', null, 'Research, design, prototype, test, iterate, and polish the interaction details.')),
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
        h('h2', null, 'Featured Projects'),
        h('div', { className: 'projects-controls' },
          h('input', {
            id: 'project-search',
            placeholder: 'Search projects...',
            'aria-label': 'Search projects',
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
          h('div', { className: 'stat card glass' }, h('h3', { className: 'count' }, counters.projects), h('p', null, 'Major Projects')),
          h('div', { className: 'stat card glass' }, h('h3', { className: 'count' }, counters.events), h('p', null, 'Academic Events')),
          h('div', { className: 'stat card glass' }, h('h3', { className: 'count' }, counters.languages), h('p', null, 'Languages')),
        ),
      ),
      h('section', { className: 'testimonials container' },
        h('h2', null, 'Soft Skills'),
        h('div', { className: 'testimonials-grid' },
          ['Decision Making', 'Creative Thinking', 'Strategic Planning'].map((skill) => h('blockquote', { className: 'testimonial glass', key: skill }, h('p', null, skill), h('cite', null, 'Professional skill'))),
        ),
      ),
      h('section', { id: 'contact', className: 'contact container' },
        h('h2', null, 'Contact'),
        h('div', { className: 'contact-grid' },
          h('form', { id: 'contact-form', className: 'contact-form glass', onSubmit: handleMessageSubmit },
            h('label', { htmlFor: 'name' }, 'Name'),
            h('input', { id: 'name', type: 'text', value: messageState.name, onChange: (event) => setMessageState({ ...messageState, name: event.target.value }) }),
            h('label', { htmlFor: 'email' }, 'Email'),
            h('input', { id: 'email', type: 'email', value: messageState.email, onChange: (event) => setMessageState({ ...messageState, email: event.target.value }) }),
            h('label', { htmlFor: 'message' }, 'Message'),
            h('textarea', { id: 'message', rows: 5, value: messageState.message, onChange: (event) => setMessageState({ ...messageState, message: event.target.value }) }),
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
        h('p', null, '© 2026 Chandru S'),
        h('div', { className: 'footer-socials' },
          h('a', { href: 'https://github.com/chandru-bit', target: '_blank', rel: 'noreferrer' }, h('img', { src: 'assets/icons/github.svg', alt: 'GitHub' })),
          h('a', { href: 'https://www.linkedin.com/in/chandrusenthilkumar/', target: '_blank', rel: 'noreferrer' }, h('img', { src: 'assets/icons/linkedin.svg', alt: 'LinkedIn' })),
        ),
      ),
    ),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(e(App));