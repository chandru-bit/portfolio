// Main interactivity (vanilla JS)
// Modular, accessible helpers
document.addEventListener('DOMContentLoaded',()=>{
  // Remove loader
  const loader=document.getElementById('loader');
  if(loader){setTimeout(()=>loader.style.display='none',700)}

  // Year
  const yearEl=document.getElementById('year'); if(yearEl) yearEl.textContent=new Date().getFullYear();

  // Theme toggle
  const themeToggle=document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click',()=>{
    document.body.classList.toggle('light');
    const pressed = document.body.classList.contains('light');
    themeToggle.setAttribute('aria-pressed', String(pressed));
  });

  // Color toggle (cycle a few palettes)
  const colorToggle=document.getElementById('color-toggle');
  const palettes=[['#00E5FF','#7C3AED','#00FFC6'],['#FF7A59','#FFD66B','#7C3AED'],['#7C3AED','#00E5FF','#FF66B3']];
  let palIndex=0;
  colorToggle?.addEventListener('click',()=>{
    palIndex=(palIndex+1)%palettes.length;
    const p=palettes[palIndex];
    document.documentElement.style.setProperty('--primary',p[0]);
    document.documentElement.style.setProperty('--secondary',p[1]);
    document.documentElement.style.setProperty('--accent',p[2]);
  });

  // Nav toggle for small screens
  const navToggle=document.getElementById('nav-toggle');
  const navMenu=document.getElementById('nav-menu');
  navToggle?.addEventListener('click',()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if(navMenu) navMenu.style.display = expanded ? 'none' : 'flex';
  });

  // Back to top
  const btt=document.getElementById('back-to-top');
  window.addEventListener('scroll',()=>{
    if(window.scrollY>400) btt.style.display='block'; else btt.style.display='none';
  });
  btt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Simple counters
  const counters=document.querySelectorAll('.count');
  const runCounters=()=>{
    counters.forEach(c=>{
      const target=parseInt(c.getAttribute('data-target')||'0',10);
      const step=Math.ceil(target/120);
      let cur=0;
      const t=setInterval(()=>{
        cur+=step; if(cur>=target){c.textContent=String(target);clearInterval(t)} else c.textContent=String(cur);
      },12);
    });
  };
  // trigger when in viewport
  const statSection=document.querySelector('#achievements');
  if(statSection){
    const obs=new IntersectionObserver((entries,io)=>{
      entries.forEach(e=>{if(e.isIntersecting){runCounters();io.disconnect()}});
    },{threshold:0.4});
    obs.observe(statSection);
  }

  // Projects filter & search
  const filterButtons=document.querySelectorAll('.filter');
  const projectGrid=document.getElementById('projects-grid');
  const searchInput=document.getElementById('project-search');

  function applyFilter(filter){
    const cards=projectGrid?.querySelectorAll('.project-card')||[];
    cards.forEach(card=>{
      const cats=(card.getAttribute('data-category')||'').split(' ');
      const show = filter==='all' || cats.includes(filter);
      card.style.display = show ? 'block' : 'none';
    });
  }
  filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
    filterButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.getAttribute('data-filter')||'all');
  }));
  searchInput?.addEventListener('input',e=>{
    const q=(e.target.value||'').toLowerCase().trim();
    const cards=projectGrid?.querySelectorAll('.project-card')||[];
    cards.forEach(card=>{
      const t = (card.textContent||'').toLowerCase();
      card.style.display = t.includes(q) ? 'block' : 'none';
    });
  });

  // Contact form simple validation (no backend)
  const form=document.getElementById('contact-form');
  form?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=form.querySelector('#name').value.trim();
    const email=form.querySelector('#email').value.trim();
    const message=form.querySelector('#message').value.trim();
    if(!name||!email||!message){
      alert('Please fill all required fields.');
      return;
    }
    // Simulate send
    alert('Thank you, your message has been sent (demo).');
    form.reset();
  });

  // Initialize AOS (animations should be in animations.js too)
  if(window.AOS) AOS.init({duration:800,once:true,offset:60});

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el=document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });
});
