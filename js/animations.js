// Animations: Typed.js, tsParticles, GSAP intro
document.addEventListener('DOMContentLoaded',()=>{
  // Typed.js
  if(window.Typed){
    const typed = new Typed('#typed',{
      strings:['AI Developer','UI/UX Designer','Product Designer','Frontend Developer','Prompt Engineer'],
      typeSpeed:60,backSpeed:30,backDelay:1200,loop:true
    });
  }

  // tsParticles background
  if(window.tsParticles){
    tsParticles.load('particles',{
      fpsLimit:60,
      particles:{
        number:{value:60,density:{enable:true,value_area:800}},
        color:{value:['#00E5FF','#7C3AED','#00FFC6']},
        opacity:{value:0.7},
        size:{value:{min:1,max:4}},
        move:{enable:true,speed:1,direction:'none',outMode:'bounce'}
      },
      interactivity:{events:{onHover:{enable:true,mode:'repulse'},onClick:{enable:true,mode:'push'}}}
    });
  }

  // Entrance GSAP timeline
  if(window.gsap){
    const tl = gsap.timeline();
    tl.from('.brand',{y:-20,opacity:0,duration:0.6})
      .from('.hero-left h1',{y:20,opacity:0,duration:0.6},'-=0.4')
      .from('.hero-right .profile-card',{scale:0.98,opacity:0,duration:0.6},'-=0.4')
      .from('.nav-menu a',{y:-8,opacity:0,stagger:0.05,duration:0.4},'-=0.6');
  }

  // Floating subtle parallax for hero image on mouse
  const hero = document.querySelector('.hero');
  const profile = document.querySelector('.profile-card');
  if(hero && profile){
    hero.addEventListener('mousemove',e=>{
      const rect=hero.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width - 0.5;
      const y=(e.clientY-rect.top)/rect.height - 0.5;
      profile.style.transform = `translate(${x*8}px, ${y*8}px)`;
    });
    hero.addEventListener('mouseleave',()=>profile.style.transform='translate(0,0)');
  }
});
