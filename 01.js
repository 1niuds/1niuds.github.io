// 初始化 Lucide 图标
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// 导航栏滚动效果
var nav = document.querySelector('.nav');
var lastScroll = 0;

window.addEventListener('scroll', function() {
  var currentScroll = window.pageYOffset;
  nav.classList.toggle('scrolled', currentScroll > 50);
  lastScroll = currentScroll;
});

// 移动端导航切换
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function() {
  var isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// 点击导航链接后关闭移动端菜单
navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// 滚动揭示动画 (Intersection Observer)
var revealElements = document.querySelectorAll('.reveal');

var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});

// 回到顶部按钮
var backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
  backToTop.classList.toggle('visible', window.pageYOffset > 400);
});

backToTop.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 统计数字递增动画
function animateCounter(element, target, suffix) {
  var current = 0;
  var steps = 30;
  var increment = target / steps;
  var duration = 1500;
  var stepTime = duration / steps;

  function update() {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      return;
    }
    if (target >= 10) {
      element.textContent = Math.floor(current) + suffix;
    } else {
      element.textContent = current.toFixed(1) + suffix;
    }
    setTimeout(update, stepTime);
  }
  update();
}

// 使用 IntersectionObserver 触发统计数字动画
var statsSection = document.querySelector('.stats');
var statNumbers = document.querySelectorAll('.stat-number');
var statsAnimated = false;

var statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      var data = [
        { target: 99.9, suffix: '%' },
        { target: 10, suffix: 'M+' },
        { target: 4.9, suffix: '★' },
        { target: 190, suffix: '+' }
      ];
      statNumbers.forEach(function(el, index) {
        el.textContent = '0' + data[index].suffix;
        setTimeout(function() {
          animateCounter(el, data[index].target, data[index].suffix);
        }, index * 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

statsObserver.observe(statsSection);
