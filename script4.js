/**
 * MediGas Solutions - Complete JavaScript Implementation
 * Includes all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===== GLOBAL VARIABLES =====
  let customerCount = 1;
  const currentYear = new Date().getFullYear();
  
  // ===== PRODUCT DATA =====
  const products = [
    { 
      name: "Medical Oxygen Cylinder", 
      capacity: "6.8 m³",
      price: 15000,
      type: "cylinder",
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Large capacity cylinder for hospital use"
    },
    { 
      name: "Medical Oxygen Cylinder", 
      capacity: "1.5 m³",
      price: 6500,
      type: "cylinder",
      image: "https://images.unsplash.com/photo-1584473457407-1d529d59c91b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Portable cylinder for home therapy"
    },
    { 
      name: "Oxygen Concentrator", 
      capacity: "5 L/min",
      price: 45000,
      type: "equipment",
      image: "https://images.unsplash.com/photo-1585435557343-3b0783433541?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Continuous oxygen supply system"
    },
    { 
      name: "Refill Service", 
      capacity: "1.5 m³ Cylinder",
      price: 1000,
      type: "service",
      image: "https://images.unsplash.com/photo-1581093450022-4b1d3c4a24e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Professional cylinder refilling"
    },
    { 
      name: "Refill Service", 
      capacity: "6.8 m³ Cylinder",
      price: 2500,
      type: "service",
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Professional cylinder refilling"
    }
  ];

  // ===== DOM ELEMENTS =====
  const elements = {
    productSelect: document.getElementById('product-select'),
    orderForm: document.querySelector('.order-form'),
    menuToggle: document.querySelector('.menu-toggle'),
    navList: document.querySelector('.nav-list'),
    yearElement: document.getElementById('current-year'),
    customerIdField: document.getElementById('customer-id'),
    productsGrid: document.querySelector('.products-grid'),
    productFilter: document.getElementById('product-type'),
    settingsToggle: document.getElementById('settings-toggle'),
    settingsPanel: document.getElementById('settings-panel'),
    closeSettings: document.querySelector('.close-settings'),
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    fontSizeSelect: document.getElementById('font-size'),
    animationsToggle: document.getElementById('animations-toggle'),
    faqItems: document.querySelectorAll('.faq-item')
  };

  // ===== INITIALIZATION FUNCTIONS =====
  
  /**
   * Initialize the entire page
   */
  function initPage() {
    initCurrentYear();
    initCustomerId();
    initProductDropdown();
    renderProducts();
    initVideoPlayer();
    initSettings();
    initFAQ();
    setupEventListeners();
    console.log('MediGas Solutions website initialized');
  }

  /**
   * Set current year in footer
   */
  function initCurrentYear() {
    elements.yearElement.textContent = currentYear;
  }

  /**
   * Initialize customer ID with default value
   */
  function initCustomerId() {
    elements.customerIdField.value = `CUST-${String(customerCount).padStart(3, '0')}`;
  }

  /**
   * Initialize product dropdown in order form
   */
  function initProductDropdown() {
    elements.productSelect.innerHTML = '<option value="">--Select a product--</option>';
    
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = `${product.name} ${product.capacity}`;
      option.textContent = `${product.name} ${product.capacity} - KES ${product.price.toLocaleString()}`;
      option.dataset.price = product.price;
      elements.productSelect.appendChild(option);
    });
  }

  /**
   * Initialize video player with custom controls
   */
  function initVideoPlayer() {
    const video = document.getElementById('oxygen-video');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.video-progress');
    const muteBtn = document.querySelector('.mute');
    const fullscreenBtn = document.querySelector('.fullscreen');
    const chapterBtns = document.querySelectorAll('.chapter-btn');

    // Play/Pause toggle
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸';
      } else {
        video.pause();
        playPauseBtn.textContent = '▶️';
      }
    });

    // Update progress bar
    video.addEventListener('timeupdate', () => {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.value = percent;
    });

    // Seek video when progress bar changes
    progressBar.addEventListener('input', () => {
      const seekTime = (progressBar.value / 100) * video.duration;
      video.currentTime = seekTime;
    });

    // Mute toggle
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });

    // Chapter navigation
    chapterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const time = parseFloat(btn.dataset.time);
        video.currentTime = time;
        if (video.paused) {
          video.play();
          playPauseBtn.textContent = '⏸';
        }
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT') return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸';
          } else {
            video.pause();
            playPauseBtn.textContent = '▶️';
          }
          break;
        case 'm':
          video.muted = !video.muted;
          muteBtn.textContent = video.muted ? '🔇' : '🔊';
          break;
        case 'f':
          if (!document.fullscreenElement) {
            video.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          break;
        case 'ArrowLeft':
          video.currentTime = Math.max(0, video.currentTime - 5);
          break;
        case 'ArrowRight':
          video.currentTime = Math.min(video.duration, video.currentTime + 5);
          break;
      }
    });
  }

  /**
   * Initialize FAQ functionality
   */
  function initFAQ() {
    elements.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question.addEventListener('click', () => {
        // Toggle active class on question
        question.classList.toggle('active');
        
        // Toggle answer visibility
        answer.classList.toggle('active');
        
        // Close other open FAQs
        if (question.classList.contains('active')) {
          elements.faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.querySelector('.faq-question').classList.remove('active');
              otherItem.querySelector('.faq-answer').classList.remove('active');
            }
          });
        }
      });
    });
  }

  /**
   * Initialize settings from localStorage
   */
  function initSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('appSettings')) || {};
    
    // Dark Mode
    if (savedSettings.darkMode) {
      document.body.classList.add('dark-theme');
      elements.darkModeToggle.checked = true;
    }
    
    // Font Size
    if (savedSettings.fontSize) {
      document.body.classList.add(`font-${savedSettings.fontSize}`);
      elements.fontSizeSelect.value = savedSettings.fontSize;
    }
    
    // Animations
    if (savedSettings.animationsEnabled !== undefined) {
      document.body.classList.toggle('no-animations', !savedSettings.animationsEnabled);
      elements.animationsToggle.checked = savedSettings.animationsEnabled;
    }
  }

  /**
   * Render products to the products grid
   * @param {string} filter - Product type filter ('all', 'cylinder', 'equipment', 'service')
   */
  function renderProducts(filter = 'all') {
    elements.productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
      ? products 
      : products.filter(p => p.type === filter);
    
    if (filteredProducts.length === 0) {
      elements.productsGrid.innerHTML = '<p class="no-products">No products found in this category</p>';
      return;
    }
    
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image" style="background-image: url('${product.image}')"></div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-capacity">${product.capacity}</p>
          <p class="product-description">${product.description}</p>
          <p class="product-price">KES ${product.price.toLocaleString()}</p>
          <button class="product-order-btn" data-product="${product.name} ${product.capacity}">
            Order Now
          </button>
        </div>
      `;
      elements.productsGrid.appendChild(productCard);
    });
  }

  // ===== SETTINGS FUNCTIONS =====
  function toggleSettingsPanel() {
    elements.settingsPanel.classList.toggle('active');
  }

  function handleDarkModeToggle(e) {
    const isDark = e.target.checked;
    document.body.classList.toggle('dark-theme', isDark);
    saveSettings({ darkMode: isDark });
  }

  function handleFontSizeChange(e) {
    const size = e.target.value;
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
    saveSettings({ fontSize: size });
  }

  function handleAnimationsToggle(e) {
    const enabled = e.target.checked;
    document.body.classList.toggle('no-animations', !enabled);
    saveSettings({ animationsEnabled: enabled });
  }

  function saveSettings(updates) {
    const currentSettings = JSON.parse(localStorage.getItem('appSettings')) || {};
    const newSettings = { ...currentSettings, ...updates };
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  }

  // ===== FORM VALIDATION =====
  function setupFormValidation() {
    const form = elements.orderForm;
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        validateField(e.target);
      });
      
      input.addEventListener('blur', (e) => {
        validateField(e.target);
      });
    });
  }

  function validateField(field) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    switch(field.name) {
      case 'fullname':
        if (!field.value.trim()) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (!/^[a-zA-Z\s]{3,}$/.test(field.value)) {
          errorMessage = 'Enter a valid name (min 3 letters)';
          isValid = false;
        }
        break;
      case 'email':
        if (!field.value.trim()) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          errorMessage = 'Enter a valid email address';
          isValid = false;
        }
        break;
      case 'phone':
        if (!field.value.trim()) {
          errorMessage = 'Phone number is required';
          isValid = false;
        } else if (!/^[0-9]{10,15}$/.test(field.value)) {
          errorMessage = 'Enter a valid phone number (10-15 digits)';
          isValid = false;
        }
        break;
      case 'delivery_date':
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!field.value) {
          errorMessage = 'Delivery date is required';
          isValid = false;
        } else if (selectedDate < today) {
          errorMessage = 'Delivery date cannot be in the past';
          isValid = false;
        }
        break;
    }
    
    if (!isValid) {
      field.classList.add('invalid');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      field.insertAdjacentElement('afterend', errorDiv);
    } else {
      field.classList.remove('invalid');
    }
    
    return isValid;
  }

  function validateForm() {
    const form = elements.orderForm;
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  // ===== EVENT HANDLERS =====
  function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }
    
    customerCount++;
    const customerId = `CUST-${String(customerCount).padStart(3, '0')}`;
    elements.customerIdField.value = customerId;
    
    const formData = new FormData(elements.orderForm);
    const selectedOption = elements.productSelect.options[elements.productSelect.selectedIndex];
    const productPrice = selectedOption.dataset.price;
    
    const orderSummary = {
      customerId: customerId,
      customerName: formData.get('fullname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      product: formData.get('product'),
      quantity: formData.get('quantity'),
      price: productPrice,
      total: (productPrice * formData.get('quantity')).toLocaleString(),
      address: formData.get('address'),
      deliveryDate: formData.get('delivery_date')
    };
    
    const submitBtn = elements.orderForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Processing <span class="loading"></span>';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Order';
      showOrderConfirmation(orderSummary);
      console.log('Order processed:', orderSummary);
    }, 2000);
  }

  function showOrderConfirmation(order) {
    const confirmationMessage = `
      Order Confirmation #${order.customerId}
      ----------------------------
      Customer: ${order.customerName}
      Product: ${order.product}
      Quantity: ${order.quantity}
      Total: KES ${order.total}
      Delivery Date: ${order.deliveryDate}
      
      Thank you for your order!
    `;
    
    alert(confirmationMessage);
  }

  function toggleMobileMenu() {
    elements.navList.classList.toggle('active');
    elements.menuToggle.textContent = elements.navList.classList.contains('active') ? '✕' : '☰';
  }

  function handleServiceCardClick(event) {
    const card = event.currentTarget;
    const serviceName = card.querySelector('h3').textContent;
    
    card.style.transform = 'scale(0.98)';
    card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    setTimeout(() => {
      card.style.transform = '';
      card.style.boxShadow = '';
    }, 300);
    
    console.log('Service selected:', serviceName);
  }

  function handleProductFilter(event) {
    renderProducts(event.target.value);
  }

  function handleProductOrder(event) {
    if (event.target.classList.contains('product-order-btn')) {
      const productName = event.target.dataset.product;
      alert(`Added to order: ${productName}`);
      
      document.querySelector('#order').scrollIntoView({
        behavior: 'smooth'
      });
      
      const productSelect = document.getElementById('product-select');
      for (let i = 0; i < productSelect.options.length; i++) {
        if (productSelect.options[i].value === productName) {
          productSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // ===== EVENT LISTENER SETUP =====
  function setupEventListeners() {
    elements.orderForm.addEventListener('submit', handleFormSubmit);
    elements.menuToggle.addEventListener('click', toggleMobileMenu);
    elements.productFilter.addEventListener('change', handleProductFilter);
    document.addEventListener('click', handleProductOrder);
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', handleServiceCardClick);
    });
    
    // Settings event listeners
    elements.settingsToggle.addEventListener('click', toggleSettingsPanel);
    elements.closeSettings.addEventListener('click', toggleSettingsPanel);
    elements.darkModeToggle.addEventListener('change', handleDarkModeToggle);
    elements.fontSizeSelect.addEventListener('change', handleFontSizeChange);
    elements.animationsToggle.addEventListener('change', handleAnimationsToggle);
    
    // Form validation
    setupFormValidation();
  }

  // ===== START THE APPLICATION =====
  initPage();
});