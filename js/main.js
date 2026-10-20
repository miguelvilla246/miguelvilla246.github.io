const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('.mobile-menu');const header=document.querySelector('header');if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}))}const updateHeader=()=>{if(header)header.classList.toggle('header-scrolled',window.scrollY>8)};updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});const revealTargets=['.hero .eyebrow','.hero h1','.hero p','.hero-actions','.section-head','.card','.split > *','.process-grid img','.cta-band','.check','.pill','.quote-form'];const elements=[...document.querySelectorAll(revealTargets.join(','))];const grouped=new Map();elements.forEach(el=>{const parent=el.parentElement;const siblings=grouped.get(parent)||[];siblings.push(el);grouped.set(parent,siblings)});grouped.forEach(group=>group.forEach((el,index)=>{el.classList.add('reveal');if(index>0&&index<5)el.classList.add(`reveal-delay-${index}`)}));document.querySelectorAll('.split').forEach(split=>{if(split.children[0])split.children[0].classList.add('reveal-left');if(split.children[1])split.children[1].classList.add('reveal-right')});const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced||!('IntersectionObserver'in window)){elements.forEach(el=>el.classList.add('is-visible'))}else{const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -80px 0px'});elements.forEach(el=>observer.observe(el))}

const quoteForm=document.getElementById('quote-form');
if(quoteForm){
  const submitButton=quoteForm.querySelector('button[type="submit"]');
  const status=document.getElementById('quote-status');
  quoteForm.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!quoteForm.reportValidity())return;
    const originalText=submitButton?.textContent||'Request My Quote';
    if(submitButton){submitButton.disabled=true;submitButton.textContent='Sending…'}
    if(status){status.textContent='Sending your request…';status.style.color='var(--ink-soft)'}
    const formData=new FormData(quoteForm);
    const payload={};
    formData.forEach((value,key)=>{payload[key]=value});
    try{
      const response=await fetch('https://formsubmit.co/ajax/info@villawindowwashing.com',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload)
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok||data.success===false)throw new Error(data.message||'Unable to submit form');
      window.location.href='/thank-you.html';
    }catch(error){
      if(status){status.textContent='We couldn’t send your request. Please call/text (914) 712-8172 or email info@villawindowwashing.com.';status.style.color='var(--coral-deep)'}
      if(submitButton){submitButton.disabled=false;submitButton.textContent=originalText}
    }
  });
}
