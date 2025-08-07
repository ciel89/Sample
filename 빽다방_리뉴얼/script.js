// DOM 요소들
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const cartCount = document.querySelector('.cart-count');

// 햄버거 메뉴 토글
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 메뉴 링크 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 장바구니 카운트 애니메이션
let cartItems = 0;

function updateCartCount() {
    cartItems++;
    cartCount.textContent = cartItems;
    cartCount.style.animation = 'pulse 0.5s ease-in-out';
    
    setTimeout(() => {
        cartCount.style.animation = '';
    }, 500);
}

// 장바구니 아이콘 클릭 이벤트
document.querySelector('.nav-icon[href="#cart"]').addEventListener('click', (e) => {
    e.preventDefault();
    updateCartCount();
});

// 검색 기능
document.querySelector('.nav-icon[href="#search"]').addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = prompt('검색어를 입력하세요:');
    if (searchTerm) {
        alert(`"${searchTerm}" 검색 결과를 보여드립니다.`);
    }
});

// 로그인 버튼 클릭 이벤트
document.querySelector('.nav-btn[href="#login"]').addEventListener('click', (e) => {
    e.preventDefault();
    alert('로그인 페이지로 이동합니다.');
});

// CTA 버튼 클릭 이벤트
document.querySelector('.cta-button').addEventListener('click', () => {
    alert('메뉴 페이지로 이동합니다.');
});

// 메뉴 링크들에 호버 효과 추가
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// 키보드 접근성
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// 터치 디바이스 지원
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 위로 스와이프 - 메뉴 숨기기
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .nav-item {
        transition: all 0.3s ease;
    }
    
    .nav-link {
        transition: all 0.3s ease;
    }
    
    .nav-icon {
        transition: all 0.3s ease;
    }
    
    .nav-btn {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 성능 최적화를 위한 스크롤 이벤트 쓰로틀링
let ticking = false;

function updateHeader() {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}); 