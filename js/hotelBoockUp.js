document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.home').addEventListener('click', () => {
    window.location.href = 'index.html';
  });



  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  const checkInDisplay = document.getElementById('checkInDisplay');
  const checkOutDisplay = document.getElementById('checkOutDisplay');
  const nightsDisplay = document.getElementById('nightsDisplay');
  let checkInPicker, checkOutPicker;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  function formatDateToKorean(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const daysOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeeks = daysOfWeeks[date.getDay()];

    if (window.innerWidth <= 780) { // 모바일 기준 너비 설정
      // 모바일 버전 포맷
      return `<span class="monthDay">${month}/${day}</span><br><span class="year">${dayOfWeek}</span>`;
    } else {
      // PC 버전 포맷
      return `<span class="monthDay">${year}.${month}.${day}. ${dayOfWeeks}</span>`;
    }
  }
  

  function updateNightsDisplay() {
    if (checkInPicker.getDate() && checkOutPicker.getDate()) {
      const checkInDate = checkInPicker.getDate();
      const checkOutDate = checkOutPicker.getDate();
      const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      nightsDisplay.textContent = `${nights}박`;
    } else {
      nightsDisplay.textContent = '';
    }
  }


  // 초기 날짜 설정
  checkInDisplay.innerHTML = formatDateToKorean(today);
  checkOutDisplay.innerHTML = formatDateToKorean(tomorrow);

  const koreanLocale = {
    previousMonth: '이전달',
    nextMonth: '다음달',
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    weekdaysShort: ['일', '월', '화', '수', '목', '금', '토']
  };

  checkInPicker = new Pikaday({
    field: checkInInput,
    format: 'YYYY-MM-DD',
    minDate: today,
    i18n: koreanLocale,
    onSelect: function(date) {
      checkInDisplay.innerHTML = formatDateToKorean(date);
      checkOutPicker.setMinDate(date);
      if (checkOutPicker.getDate() && checkOutPicker.getDate() <= date) {
        let newCheckOut = new Date(date);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        checkOutPicker.setDate(newCheckOut);
        checkOutDisplay.innerHTML = formatDateToKorean(newCheckOut);
      }
      updateNightsDisplay();
    }
  });

  checkOutPicker = new Pikaday({
    field: checkOutInput,
    format: 'YYYY-MM-DD',
    minDate: tomorrow,
    i18n: koreanLocale,
    onSelect: function(date) {
      if (date <= checkInPicker.getDate()) {
        alert('퇴실 날짜는 입실 날짜 이후여야 합니다.');
        checkOutPicker.setDate(null);
        checkOutDisplay.innerHTML = '';
      } else {
        checkOutDisplay.innerHTML = formatDateToKorean(date);
      }
                updateNightsDisplay();
    }
  });

  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const checkIn = checkInPicker.getDate();
    const checkOut = checkOutPicker.getDate();
    const adults = document.getElementById('adults') ? document.getElementById('adults').value : '2';
    const children = document.getElementById('children') ? document.getElementById('children').value : '0';

    // 필드 값 검증
    if (!checkIn || !checkOut) {
      alert('체크인과 체크아웃 날짜를 선택해주세요.');
      return;
    }

    if (!adults) {
      alert('성인 수를 선택해주세요.');
      return;
    }

    const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    function formatCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear().toString().slice(2);
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = daysOfWeek[now.getDay()];
    
      // 시간 포맷 설정
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const period = hours >= 12 ? '오후' : '오전';
      hours = hours % 12 || 12; // 12시간제
    
      return `${month}. ${day} ${dayOfWeek} | ${period} ${hours}:${minutes}`;
    }

    // 예약 정보 표시
    const checkInFormatted = `${checkIn.getMonth() + 1}월 ${checkIn.getDate()}일 ${['일', '월', '화', '수', '목', '금', '토'][checkIn.getDay()]}`;
    const checkOutFormatted = `${checkOut.getMonth() + 1}월 ${checkOut.getDate()}일 ${['일', '월', '화', '수', '목', '금', '토'][checkOut.getDay()]}`;
    const currentDateTime = formatCurrentDateTime();

    const result = `
      <div>
        <h2>예약 완료</h2>
        <p>${currentDateTime}</p>
      </div>
      <dl>
        <dt>일정<dt>
        <dd>${checkInFormatted} - ${checkOutFormatted} ㆍ ${nights}박</dd>
      </dl>
      <dl>
        <dt>인원<dt>
        <dd>성인 ${adults}명, 아동 ${children}명</dd>
      </dl>
      <dl>
        <dt>위치<dt>
        <dd>서울 영등포구 양평로 136 (우:07205)</dd>
      </dl>
    `;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = result;
    resultDiv.style.display = 'block';

    resultDiv.scrollIntoView({ behavior: 'smooth' });
    alert('예약이 완료되었습니다. 아래에 예약 정보를 확인하세요!');
  });
});

