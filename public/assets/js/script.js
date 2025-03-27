// Biến để lưu vị trí scroll trước đó
let lastScrollTop = 0
const header = document.querySelector('header')
const scrollThreshold = 50 // Ngưỡng scroll để ẩn/hiện header

// Hàm xử lý sự kiện scroll
window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Xác định hướng cuộn
  if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
    // Cuộn xuống -> ẩn header
    header.classList.add('header-hidden')
  } else {
    // Cuộn lên -> hiện header
    header.classList.remove('header-hidden')
  }

  lastScrollTop = scrollTop
})

// Thêm đoạn này vào cuối file script.js
document.addEventListener('DOMContentLoaded', function() {
  // Lấy các elements
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuIcon = document.querySelector('.mobile-menu-toggle i');
  const body = document.body;
  const mobileVideo = document.querySelector('.mobile-menu-overlay video');
  
  // Xử lý sự kiện click vào nút toggle
  menuToggle.addEventListener('click', function() {
      // Toggle class menu-open
      body.classList.toggle('menu-open');
      
      // Thay đổi icon từ bars sang xmark và ngược lại
      if (body.classList.contains('menu-open')) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
          
          // Play video khi menu mở
          if (mobileVideo) {
              mobileVideo.play();
          }
      } else {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
          
          // Pause video khi menu đóng (tùy chọn, để tiết kiệm tài nguyên)
          if (mobileVideo) {
              mobileVideo.pause();
          }
      }
      
      // Reset animations khi đóng menu
      if (!body.classList.contains('menu-open')) {
          setTimeout(function() {
              const mobileLogoContainer = document.querySelector('.mobile-logo-container');
              const mobileNavButtons = document.querySelectorAll('.mobile-nav-buttons .nav-button');
              
              if (mobileLogoContainer) {
                  mobileLogoContainer.style.animation = 'none';
                  mobileLogoContainer.offsetHeight; // Trigger reflow
                  mobileLogoContainer.style.animation = null;
              }
              
              mobileNavButtons.forEach(button => {
                  button.style.animation = 'none';
                  button.offsetHeight; // Trigger reflow
                  button.style.animation = null;
              });
          }, 300);
      }
  });
  
  // Đóng menu khi bấm vào các nút trong menu
  const mobileNavButtons = document.querySelectorAll('.mobile-nav-buttons .nav-button');
  mobileNavButtons.forEach(button => {
      button.addEventListener('click', function() {
          body.classList.remove('menu-open');
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
      });
  });
  
  // Đóng menu khi resize lên desktop
  window.addEventListener('resize', function() {
      if (window.innerWidth >= 768 && body.classList.contains('menu-open')) {
          body.classList.remove('menu-open');
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
      }
  });
});