// Управление меню-бургером
document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const nav = document.querySelector('.nav');
  const body = document.body;
  
  // Функция для переключения меню
  function toggleMenu() {
    nav.classList.toggle('active');
    
    // Добавляем/удаляем класс для анимации полосок бургера
    burgerMenu.classList.toggle('active');
    
    // Блокируем прокрутку страницы при открытом меню
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }
  
  // Обработчик клика на бургер-меню
  burgerMenu.addEventListener('click', toggleMenu);
  
  // Закрываем меню при клике на пункт меню
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Проверяем, что мы на мобильном устройстве (бургер-меню видимо)
      if (window.getComputedStyle(burgerMenu).display !== 'none') {
        nav.classList.remove('active');
        burgerMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });
  
  // Обработка изменения размера окна
  window.addEventListener('resize', () => {
    // Если ширина окна больше 768px, сбрасываем мобильное меню
    if (window.innerWidth > 768) {
      nav.classList.remove('active');
      burgerMenu.classList.remove('active');
      body.style.overflow = '';
    }
    
    // Запускаем выравнивание карточек при изменении размера окна
    equalizeCardHeights();
  });
    // Функция для выравнивания высоты карточек
  function equalizeCardHeights() {
    // Выравниваем высоту карточек услуг
    const serviceCards = document.querySelectorAll('.services__grid .card');
    if (serviceCards.length > 0) {
      // Сбрасываем высоту перед измерением
      serviceCards.forEach(card => card.style.height = '');
      
      // Находим максимальную высоту
      let maxHeight = 0;
      serviceCards.forEach(card => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
      });
      
      // Устанавливаем одинаковую высоту для всех карточек
      serviceCards.forEach(card => card.style.height = maxHeight + 'px');
    }
    
    // Выравниваем высоту видимых кейсов
    const visibleCases = document.querySelectorAll('.cases__carousel .case:not([style*="display: none"])');
    if (visibleCases.length > 0) {
      // Сбрасываем высоту перед измерением
      visibleCases.forEach(card => card.style.height = '');
      
      // Находим максимальную высоту
      let maxHeight = 0;
      visibleCases.forEach(card => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
      });
      
      // Устанавливаем одинаковую высоту для всех видимых кейсов
      visibleCases.forEach(card => card.style.height = maxHeight + 'px');
    }
      // Дополнительно убеждаемся, что контейнеры имеют правильные свойства
    document.querySelectorAll('.services__grid, .cases__carousel').forEach(container => {
      container.style.justifyContent = 'center';
    });
  }
  
  // Функция фильтрации кейсов
  function setupCasesFiltering() {
    const filterButtons = document.querySelectorAll('.filter');
    const cases = document.querySelectorAll('.case');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке
        button.classList.add('active');
        
        // Получаем тип фильтра
        const filterType = button.getAttribute('data-type');
        
        // Фильтруем кейсы
        cases.forEach(caseCard => {
          const caseType = caseCard.getAttribute('data-type');
          
          if (filterType === 'all' || filterType === caseType) {
            caseCard.style.display = '';
          } else {
            caseCard.style.display = 'none';
          }
        });
        
        // Выравниваем высоту карточек после фильтрации
        equalizeCardHeights();
      });
    });
  }
  
  // Настраиваем открытие попапа с подробностями
  function setupDetailButtons() {
    const detailButtons = document.querySelectorAll('.more-btn');
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');
    const popupClose = document.getElementById('popupClose');
    
    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        const info = button.getAttribute('data-info');
        popupText.textContent = info;
        popup.classList.add('open');
      });
    });
    
    popupClose.addEventListener('click', () => {
      popup.classList.remove('open');
    });
    
    // Закрытие при клике на фон
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('open');
      }
    });
  }
  
  // Попапы услуг и кейсов
const servicePopups = {
  'Консультация': 'popup-service-consult',
  'Ведение проекта': 'popup-service-project',
  'Анализ данных': 'popup-service-analysis',
  'Разработка': 'popup-service-dev',
};

const casePopups = {
  'case1': 'popup-case1',
  'case2': 'popup-case2',
  'case3': 'popup-case3',
  'case4': 'popup-case4',
  'case5': 'popup-case5',
};

// Открытие попапа услуги
const serviceButtons = document.querySelectorAll('.services__grid .card .btn');
serviceButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.card');
    const title = card.querySelector('h3').textContent.trim();
    const popupId = servicePopups[title];
    if (popupId) {
      document.getElementById(popupId).classList.add('open');
    }
  });
});

// Открытие попапа кейса
const caseButtons = document.querySelectorAll('.cases__carousel .case .btn');
caseButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const caseKey = btn.getAttribute('data-case');
    if (caseKey && casePopups[caseKey]) {
      document.getElementById(casePopups[caseKey]).classList.add('open');
    }
  });
});

// Универсальное закрытие попапов
const allPopups = document.querySelectorAll('.popup');
allPopups.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      popup.classList.remove('open');
    }
  });
});

  // Инициализация всех функций
  setupCasesFiltering();
  setupDetailButtons();
  
  // Запускаем выравнивание высоты карточек после загрузки страницы
  // Используем небольшую задержку для надежности
  setTimeout(equalizeCardHeights, 100);
});
