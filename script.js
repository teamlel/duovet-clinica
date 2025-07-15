// Definir animações
document.styleSheets[0].insertRule(`
  @keyframes navLinkFade {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`, 0);

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

// Alternar informações das doutoras
function toggleDoctorInfo(doctor) {
  const infoElement = document.getElementById(`${doctor}-info`);
  const allInfos = document.querySelectorAll('.doctor-info');
  
  // Fechar todas as informações primeiro
  allInfos.forEach(info => {
    if (info.id !== `${doctor}-info`) {
      info.classList.remove('active');
      // Resetar o texto do botão de outras doutoras
      const otherBtn = info.previousElementSibling.querySelector('.view-profile-btn');
      if (otherBtn) {
        otherBtn.textContent = 'Ver Perfil ↓';
      }
    }
  });
  
  // Alternar a informação clicada
  infoElement.classList.toggle('active');
  
  // Atualizar o botão
  const btn = infoElement.previousElementSibling.querySelector('.view-profile-btn');
  if (infoElement.classList.contains('active')) {
    btn.textContent = 'Ocultar Perfil ↑';
    
    // Scroll suave para a seção expandida
    setTimeout(() => {
      infoElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  } else {
    btn.textContent = 'Ver Perfil ↓';
  }
}

// Scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
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

// Função para obter o clima de Sorocaba
function getWeather() {
  
  document.addEventListener('DOMContentLoaded', getWeather);
  const weatherElement = document.getElementById('weather-alert');
  const apiKey = '4bab5138dccbbf01c879b7f19e46d56b'; // Substitua pela sua chave da OpenWeatherMap
  const city = 'Sorocaba';
  const country = 'BR';
  const lang = 'pt_br';
  const units = 'metric';
  
  // Exibir mensagem de carregamento
  weatherElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando informações do clima...';
  weatherElement.className = 'weather-alert';
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&lang=${lang}&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      return response.json();
    })
    .then(data => {
      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const weatherId = data.weather[0].id;
      const humidity = data.main.humidity;
      
      let icon = '☀️';
      let alertClass = 'weather-normal';
      let message = '';
      
      // Determinar ícone e mensagem com base no clima
      if (weatherId >= 200 && weatherId < 300) {
        // Tempestade
        icon = '⛈️';
        alertClass = 'weather-rain';
        message = `Tempestade em Sorocaba (${temp}°C) — mantenha seu pet em local seguro e protegido!`;
      } else if (weatherId >= 300 && weatherId < 600) {
        // Chuva
        icon = '🌧️';
        alertClass = 'weather-rain';
        message = `Chuva em Sorocaba (${temp}°C, umidade ${humidity}%) — evite sair com seu pet sem proteção!`;
      } else if (weatherId >= 600 && weatherId < 700) {
        // Neve
        icon = '❄️';
        alertClass = 'weather-cold';
        message = `Frio intenso em Sorocaba (${temp}°C) — proteja seu pet do frio com roupinhas!`;
      } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosférico (névoa, etc)
        icon = '🌫️';
        alertClass = 'weather-normal';
        message = `${description} em Sorocaba (${temp}°C) — cuidado com a visibilidade nos passeios!`;
      } else if (weatherId === 800) {
        // Céu limpo
        if (temp > 30) {
          icon = '🔥';
          alertClass = 'weather-hot';
          message = `Calor intenso em Sorocaba (${temp}°C) — atenção com pets de focinho curto e hidratação!`;
        } else if (temp < 15) {
          icon = '❄️';
          alertClass = 'weather-cold';
          message = `Frio em Sorocaba (${temp}°C) — proteja seu pet com roupinhas adequadas!`;
        } else {
          icon = '☀️';
          alertClass = 'weather-normal';
          message = `Clima agradável em Sorocaba (${temp}°C) — ótimo dia para passeios com seu pet!`;
        }
      } else if (weatherId > 800) {
        // Nublado
        icon = '⛅';
        alertClass = 'weather-normal';
        message = `Tempo nublado em Sorocaba (${temp}°C) — bom dia para atividades com seu pet!`;
      }
      
      // Atualizar o elemento com as informações do clima
      weatherElement.innerHTML = `${icon} ${message}`;
      weatherElement.className = 'weather-alert ' + alertClass;
    })
    .catch(error => {
      console.error('Erro ao obter dados do clima:', error);
      weatherElement.innerHTML = '🌤️ Informações do clima indisponíveis no momento';
      weatherElement.className = 'weather-alert weather-normal';
    });
}

// Carregamento otimizado de recursos
document.addEventListener('DOMContentLoaded', function() {
  // Obter informações do clima
  getWeather();
  
  // Atualizar o clima a cada hora (3600000 ms = 1 hora)
  setInterval(getWeather, 3600000);
  
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
