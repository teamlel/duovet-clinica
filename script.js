// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
  
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
});

// Fechar menu ao clicar em um link
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
    
    links.forEach(link => {
      link.style.animation = '';
    });
  });
});

// Efeito de scroll no cabeçalho
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

// Scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Fechar menu mobile se estiver aberto
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    }
  });
});

// Carregamento otimizado de recursos
document.addEventListener('DOMContentLoaded', function() {
  // Lazy loading para imagens
  const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
  
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
  
  // Animação ao rolar
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.service-card, .highlight-card, .testimonial-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Definir estado inicial
  document.querySelectorAll('.service-card, .highlight-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Executar uma vez ao carregar
});

// Formulário de contato
const contactForm = document.getElementById('appointmentForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio (substituir por AJAX na implementação real)
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com Sucesso!';
      
      // Resetar formulário após 2 segundos
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = '<i class="far fa-paper-plane"></i> Enviar Solicitação';
        submitBtn.disabled = false;
        
        // Mostrar mensagem de sucesso
        alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
      }, 2000);
    }, 1500);
  });
}

// Newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input[type="email"]');
    const btn = this.querySelector('button');
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Simular cadastro (substituir por AJAX na implementação real)
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i>';
      input.value = '';
      
      setTimeout(() => {
        btn.innerHTML = '<i class="far fa-paper-plane"></i>';
        alert('Obrigado por assinar nossa newsletter!');
      }, 1000);
    }, 1500);
  });
}