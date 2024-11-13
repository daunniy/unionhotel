let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const header = document.querySelector('header'); // <header> 태그 선택

  // 데스크탑
  if (window.innerWidth > 780) {
    if (currentScrollY > lastScrollY) {
      // 스크롤을 내릴 때 - 헤더 숨기기
      header.style.top = '-100px';
    } else {
      // 스크롤을 올릴 때 - 헤더 표시
      header.style.top = '0';
    }

    // 스크롤 위치에 따라 배경 색 변경
    if (currentScrollY > 600) { // 200px 이상 스크롤 시 배경 색 변경
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // 검은색 반투명
    } else {
      header.style.backgroundColor = 'transparent'; // 원래 상태로 복원
    }
  } else {
    // 모바일 버전
    if (currentScrollY > lastScrollY) {
      // 스크롤을 내릴 때 - 헤더 숨기기
      header.style.top = '-60px'; // 모바일에서 숨기는 정도를 조정
    } else {
      // 스크롤을 올릴 때 - 헤더 표시
      header.style.top = '0';
    }

    // 모바일에서는 더 낮은 스크롤 기준으로 배경 색 변경
    if (currentScrollY > 100) { // 100px 이상 스크롤 시 배경 색 변경
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // 모바일용 배경 색
    } else {
      header.style.backgroundColor = 'transparent'; // 원래 상태로 복원
    }
  }

  // 현재 스크롤 위치를 업데이트
  lastScrollY = currentScrollY;
});





// 예약 버튼 클릭 시 이동
document.querySelector('.reservation').addEventListener('click', () => {
  window.location.href = 'hotelBoockUp.html';
});

// 텍스트 애니메이션 (GSAP)
const textElement = document.getElementById('animatedText');
const splitText = textElement.innerText.split(''); // 텍스트를 하나씩 분리
textElement.innerHTML = ''; // 기존 텍스트 지우기

splitText.forEach((char, i) => {
  const span = document.createElement('span'); // 각 글자를 위한 span 생성
  span.innerText = char;
  textElement.appendChild(span);
});

gsap.from("#animatedText span", { // span 태그마다 애니메이션
  opacity: 0,
  y: 50, // y축으로 50px 아래에서 시작
  duration: 0.3,
  stagger: 0.07 // 각 글자마다 0.07초 간격으로 순차 애니메이션
});


// 메뉴 호버 동작
const mainMenu = document.querySelectorAll('.gnb>ul>li');
const enterFunc = (e) => {
  const subMenu = e.currentTarget.querySelector('.sub');
  if (subMenu) {
    subMenu.style.display = 'block';
  }
};
const leaveFunc = (e) => {
  const subMenu = e.currentTarget.querySelector('.sub');
  if (subMenu) {
    subMenu.style.display = 'none';
  }
};
const checkWindow = () => {
  if (window.innerWidth >= 1200) {
    mainMenu.forEach((list) => {
      list.addEventListener('mouseenter', enterFunc);
      list.addEventListener('mouseleave', leaveFunc);
    });
  } else {
    mainMenu.forEach((list) => {
      list.removeEventListener('mouseenter', enterFunc);
      list.removeEventListener('mouseleave', leaveFunc);
    });
  }
};
checkWindow(); // 최초 실행
window.addEventListener('resize', checkWindow);

// 토글 버튼 클릭 시 gnb 표시/숨기기
const toggle = document.querySelector('.toggle');
const gnb = document.querySelector('.gnb');
const bg = document.querySelector('.black_bg');
let toggleState = true;
toggle.addEventListener('click', () => {
  if (toggleState) {
    gnb.style.left = 0;
    bg.style.display = 'block';
    bg.style.zIndex = 999;
    toggleState = false;
  } else {
    gnb.style.left = '-70vw';
    bg.style.display = 'none';
    toggleState = true;
  }
  toggle.classList.toggle('on');
});

// 모바일 메뉴 클릭 시 하위 메뉴 토글
mainMenu.forEach((mainMenu, index) => {
  if (index === 1) {
    mainMenu.querySelector('a').addEventListener('click', (e) => {
      if (window.innerWidth < 1200) {
        const sub = e.currentTarget.nextElementSibling;
        if (sub) {
          e.preventDefault();
          if (sub.style.display === 'none' || sub.style.display === '') {
            sub.style.display = 'block';
          } else {
            sub.style.display = 'none';
          }
        }
      }
    });
  }
});




const swiper = new Swiper('.main-swiper', {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  on: {
    slideChangeTransitionStart: function () {
      // 슬라이드 변경 시 텍스트를 숨김 상태로
      document.querySelectorAll('.slide-text').forEach(text => {
        text.style.opacity = 0;
        text.style.transform = 'translate(-50%, -50%) scale(1.1)';
      });
    },
    slideChangeTransitionEnd: function () {
      // 활성 슬라이드의 텍스트를 자연스럽게 나타냄
      const activeSlideText = document.querySelector('.swiper-slide-active .slide-text');
      activeSlideText.style.opacity = 1;
      activeSlideText.style.transform = 'translate(-50%, -50%) scale(1)';
    },
  },
  breakpoints: {
    // 모바일 설정 (화면 너비 780px 이하)
    0: {
      slidesPerView: 1.8, // 슬라이드 개수를 줄여서 더 보기 쉽게
      spaceBetween: 40,   // 슬라이드 간 간격 축소
    },
    // 태블릿 설정 (화면 너비 781px ~ 1024px)
    781: {
      slidesPerView: 2,   // 중간 크기 화면에서 슬라이드 개수 늘림
      spaceBetween: 30,   // 간격 조정
    },
    // PC 설정 (화면 너비 1025px 이상)
    1025: {
      slidesPerView: 2, // 기본 설정
      spaceBetween: 100,
    }
  }
});

// 슬라이드 클릭 시 해당 슬라이드로 이동하는 이벤트 설정

document.querySelectorAll('.swiper-slide').forEach((slide) => {
  slide.addEventListener('click', () => {
    const realIndex = slide.getAttribute('data-swiper-slide-index'); // 실제 슬라이드 인덱스 가져오기
    swiper.slideToLoop(realIndex); // 실제 인덱스를 사용하여 이동
  });
});

if (window.innerWidth < 780) {
document.querySelectorAll('#article .swiper-slide').forEach((slide) => {
  slide.addEventListener('click', () => {
    const realIndex = slide.getAttribute('data-swiper-slide-index'); // 실제 슬라이드 인덱스 가져오기
    swiper.slideToLoop(realIndex); // 실제 인덱스를 사용하여 이동
  });
});
}


// Swiper 및 GSAP 스크롤 애니메이션
document.addEventListener('DOMContentLoaded', function () {
  const animateText = (text) => {
    const letters = text.textContent.split('');
    text.innerHTML = '';
    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      letter === ' ' ? span.innerHTML = '&nbsp;' : span.textContent = letter;
      span.style.display = 'inline-block';
      text.appendChild(span);
    });
    const spans = text.querySelectorAll('span');
    spans.forEach((span, index) => {
      gsap.set(span, { opacity: 0, y: 60 });
      gsap.to(span, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        delay: (index + 1) * 0.08,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  };



  let articleSwiperInstance;
  let slideContainerSwiperInstance;
  
  function initializeSwipers() {
    // #slide_container 슬라이더는 PC와 모바일 모두 활성화
    if (!slideContainerSwiperInstance) {
      slideContainerSwiperInstance = new Swiper('#slide_container .swiper', {
        loop: true,
        autoplay: {
          delay: 4000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  
    // 모바일 환경에서만 #article 슬라이더 활성화
    if (window.innerWidth <= 768) {
      if (!articleSwiperInstance) {
        articleSwiperInstance = new Swiper('#article .swiper', {
          loop: true,
          autoplay: {
            delay: 4000,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      }
    } else {
      // PC 화면일 때 articleSwiperInstance를 제거하여 메모리 절약
      if (articleSwiperInstance) {
        articleSwiperInstance.destroy(true, true);
        articleSwiperInstance = null;
      }
    }
  }
  
  // 초기 슬라이더 설정
  initializeSwipers();
  
  // 창 크기 변경 시 슬라이더 재설정
  window.addEventListener('resize', initializeSwipers);

  
  

  // ScrollTrigger 애니메이션
  gsap.utils.toArray(".reveal").forEach(item => {
    gsap.set(item, { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: item,
      start: "top bottom",
      end: "bottom top",
      markers: false,
      onEnter: () => {
        let x = 0, y = 0;
        if (item.classList.contains("reveal_LTR")) x = -100;
        else if (item.classList.contains("reveal_BTT")) y = 100;
        else if (item.classList.contains("reveal_TTB")) y = -100;
        else x = 100;

        gsap.fromTo(item, { autoAlpha: 0, x: x, y: y }, { autoAlpha: 1, x: 0, y: 0, duration: 1.25, ease: "expo", overwrite: "auto" });
      }
    });
  });

  // Amenity 섹션 애니메이션
  const amenities = document.querySelectorAll('#Amenity .content_wrap>div');
  const rows = [];
  amenities.forEach((item, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!rows[rowIndex]) {
      rows[rowIndex] = [];
    }
    rows[rowIndex].push(item);
  });

  rows.forEach((row) => {
    gsap.from(row, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: row[0],
        start: 'top 70%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
        onEnter: () => gsap.to(row, { opacity: 1, y: 0, overwrite: true }),
        onLeaveBack: () => gsap.to(row, { opacity: 1, y: 0, overwrite: true })
      }
    });
  });

  gsap.fromTo('#info_wrap .wellness', {
    opacity: 0,
    y: 300
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '#info_wrap .wellness',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });
  gsap.fromTo('#slide_container', {
    opacity: 0,
    x: 300
  }, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '#slide_container',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });



// 이미지 변경 애니메이션
const images1 = [
  'images/img_1.png',
  'images/img_2.png',
  'images/img_3.png',
  'images/img_4.png',
  'images/img_5.png',
];
const images2 = [
  'images/slider_1.jpeg',
  'images/slider_2.png',
  'images/slider_3.png',
];

let currentIndex1 = 0;
let currentIndex2 = 0;

const imageElement1 = document.getElementById('image1'); // 첫 번째 이미지 엘리먼트
const imageElement2 = document.getElementById('image2'); // 두 번째 이미지 엘리먼트

// 첫 번째 이미지 변경 함수
function changeImage1() {
  imageElement1.classList.add('fade');
  setTimeout(() => {
    currentIndex1 = (currentIndex1 + 1) % images1.length;
    imageElement1.src = images1[currentIndex1];
    imageElement1.classList.remove('fade');
  }, 200);
}

// 두 번째 이미지 변경 함수
function changeImage2() {
  imageElement2.classList.add('fade');
  setTimeout(() => {
    currentIndex2 = (currentIndex2 + 1) % images2.length;
    imageElement2.src = images2[currentIndex2];
    imageElement2.classList.remove('fade');
  }, 200);
}

// 3.5초마다 첫 번째와 두 번째 이미지 각각 변경
setInterval(changeImage1, 3500);
setInterval(changeImage2, 3500);

  // info_wrap 배경색 변경 애니메이션
  gsap.utils.toArray("#info_wrap").forEach((item) => {
    let color = item.getAttribute("data-bgcolor");

    ScrollTrigger.create({
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      markers: false,
      onEnter: () => gsap.to("#info_wrap", { backgroundColor: color }),
      onEnterBack: () => gsap.to("#info_wrap", { backgroundColor: color })
    });
  });
});