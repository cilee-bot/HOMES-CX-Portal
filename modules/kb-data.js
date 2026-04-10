// 홈즈컴퍼니 헬프센터 지식베이스 기본 데이터
// 이 파일은 admin/고객 양쪽에서 공유됩니다.

const DEFAULT_KB = {
  categories: [
    { id: 'facility', icon: 'ri-tools-line', title: '시설 문의', desc: '보일러, 누수, 냉난방, 인터넷, 도어락 등',
      articleIds: ['boiler', 'water-leak', 'facial-recognition', 'hvac', 'internet', 'ventilation', 'plumbing', 'odor', 'door-lock'] },
    { id: 'contract', icon: 'ri-file-text-line', title: '계약 & 결제', desc: '월세, 관리비, 보증금, 계약 연장, 세금계산서',
      articleIds: ['rent-payment', 'management-fee', 'contract-renewal', 'deposit', 'tax-invoice', 'promotion'] },
    { id: 'living', icon: 'ri-home-heart-line', title: '생활 안내', desc: '소음, 택배, 주차, 분리수거, 공용시설',
      articleIds: ['noise', 'parcel', 'parking', 'garbage', 'common-area', 'cleaning'] },
    { id: 'move-in', icon: 'ri-login-box-line', title: '입주 가이드', desc: '투어 예약, 계약 절차, 입주 체크리스트',
      articleIds: ['tour-booking', 'contract-process', 'move-in-checklist'] },
    { id: 'move-out', icon: 'ri-logout-box-line', title: '퇴실 안내', desc: '퇴실 절차, 보증금 반환, 중도 퇴실, 퇴실 청소비',
      articleIds: ['move-out-process', 'deposit-return', 'early-termination', 'move-out-cleaning'] },
    { id: 'emergency', icon: 'ri-alarm-warning-line', title: '긴급 상황', desc: '긴급 연락처, 관리사무소, 화재, 정전',
      articleIds: ['emergency-contact', 'location-contacts', 'fire', 'power-outage'] }
  ],

  articles: {
    // ==================== 시설 ====================
    'boiler': {
      category: 'facility', title: '보일러 사용법 및 고장 대처',
      tags: ['보일러','난방','온수','온도','한파'], time: 3, difficulty: '초급', popular: 1,
      content: `
        <p class="text-gray-600 mb-6">보일러가 작동하지 않거나 온도가 올라가지 않을 때 아래 단계를 순서대로 확인해보세요.</p>
        <h3 class="font-bold text-base mb-3">자가 점검</h3>
        <div class="space-y-3 mb-6">
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>전원 확인</strong> — 보일러 패널 전원이 켜져 있는지 확인. 전원 버튼을 3초 길게 누르면 재시작.</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>모드 확인</strong> — '난방' 모드 선택 확인. '외출' 모드면 난방이 작동하지 않습니다.</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>온도 설정</strong> — 현재 실내 온도보다 높게 설정 (권장 22~24도). 한파 시 19도 이상 안 올라가면 고장 의심.</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div><div><strong>30분 대기</strong> — 바닥 난방은 즉시 따뜻해지지 않습니다. 설정 후 30분 기다려주세요.</div></div>
        </div>
        <div class="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
          <h4 class="font-bold text-red-700 text-sm mb-2"><i class="ri-error-warning-line"></i> 즉시 접수가 필요한 경우</h4>
          <ul class="text-sm text-red-600 space-y-1">
            <li>• 보일러에서 이상한 소리가 나는 경우</li>
            <li>• <strong>가스 냄새</strong> → 즉시 창문 열고 관리사무소 또는 카카오 채널 연락</li>
            <li>• 에러 코드 표시 (사진 찍어서 접수)</li>
            <li>• 한파 시 30분 이상 온도 변화 없음</li>
          </ul>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 class="font-bold text-gray-700 text-sm mb-2">온수가 안 나올 때</h4>
          <ol class="list-decimal list-inside text-sm text-gray-600 space-y-1">
            <li>수전을 온수 방향으로 완전히 돌리기</li>
            <li>1~2분 물을 틀어놓기 (배관 내 찬물 배출)</li>
            <li>보일러 모드를 '난방+온수' 또는 '온수전용'으로 설정</li>
            <li>그래도 안 나오면 카카오 채널로 접수</li>
          </ol>
        </div>
        <p class="text-sm text-gray-500"><i class="ri-lightbulb-line text-blue-500"></i> <strong>절약 팁</strong> — 외출 시 '외출' 모드 설정. 전원을 완전히 끄면 동파 위험이 있으니 절대 끄지 마세요.</p>
        <p data-location="가산" class="text-sm text-gray-500 mt-2"><i class="ri-information-line text-blue-500"></i> <strong>가산</strong> — 보일러/온도조절기 하자가 다수 발생한 이력이 있습니다(101동·201동 일부). 해당 호실 문제는 관리사무소(<strong>02-808-8086</strong>)로 바로 연락하세요.</p>
      `,
      related: ['hvac', 'water-leak', 'emergency-contact']
    },

    'water-leak': {
      category: 'facility', title: '누수 발생 시 대처 방법',
      tags: ['누수','물','천장','배관','습기','결로'], time: 2, difficulty: '초급', popular: 3,
      content: `
        <div class="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
          <h4 class="font-bold text-red-700 text-sm mb-2"><i class="ri-alarm-warning-line"></i> 누수는 긴급 접수 대상입니다</h4>
          <p class="text-sm text-red-600">발견 즉시 카카오 채널 또는 관리사무소로 접수. <strong>사진/영상</strong>을 함께 보내주시면 빠른 대응이 가능합니다.</p>
        </div>
        <h3 class="font-bold text-base mb-3">발견 즉시 해야 할 일</h3>
        <div class="space-y-3 mb-6">
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>전자기기 대피</strong> — 누수 지점 아래의 전자기기, 귀중품 즉시 치우기</div></div>
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>수건/대야 배치</strong> — 물이 떨어지는 곳에 배치</div></div>
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>사진 촬영</strong> — 누수 위치와 범위를 사진/영상으로 기록</div></div>
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div><div><strong>즉시 접수</strong> — 카카오 채널 '시설 문의' 또는 관리사무소 전화</div></div>
        </div>
        <h3 class="font-bold text-base mb-3">처리 절차</h3>
        <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1 mb-4">
          <p>1. 접수 후 <strong>2시간 이내</strong> 시설팀 초기 대응</p>
          <p>2. 누수 원인 파악 (상층 배관 / 외벽 침수 / 결로)</p>
          <p>3. 전문 업체 출동 및 수리</p>
          <p>4. 피해 확인 및 원상복구</p>
        </div>
        <p class="text-sm text-gray-500"><i class="ri-information-line text-blue-500"></i> <strong>결로 vs 누수</strong> — 겨울철 창문이나 벽면에 물방울이 맺히는 것은 결로 현상입니다. 환기를 자주 하면 개선됩니다. 천장이나 벽 내부에서 물이 흐르면 누수이니 바로 접수하세요.</p>
        <p data-location="가산" class="text-sm text-gray-500 mt-2"><i class="ri-information-line text-blue-500"></i> <strong>가산</strong> — 101동 일부 세대(9개실)에서 배연창 불량으로 인한 침수 이력이 있습니다. 창문 틈으로 물이 들어오면 관리사무소로 바로 연락하세요.</p>
      `,
      related: ['plumbing', 'emergency-contact', 'location-contacts']
    },

    'facial-recognition': {
      category: 'facility', title: '안면인식 등록 및 오류 해결',
      tags: ['안면인식','출입','얼굴','인식실패','도어록'], time: 3, difficulty: '초급', popular: 4,
      content: `
        <h3 class="font-bold text-base mb-3">최초 등록</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-6">
          <li>• 입주일에 지점 매니저와 함께 등록</li>
          <li>• 안경, 모자, 마스크를 벗은 상태에서 정면 응시</li>
          <li>• 등록 완료 후 바로 테스트 출입 진행</li>
        </ul>
        <h3 class="font-bold text-base mb-3">인식 안 될 때</h3>
        <div class="space-y-2 mb-6 text-sm text-gray-600">
          <p>✅ <strong>조명</strong> — 너무 어둡거나 역광이면 인식 어려움. 정면 조명 아래에서 시도.</p>
          <p>✅ <strong>정면 응시</strong> — 카메라 정면, 얼굴 전체가 화면에 들어오도록.</p>
          <p>✅ <strong>거리 조절</strong> — 카메라에서 약 30~50cm 거리 유지.</p>
          <p>✅ <strong>악세서리</strong> — 선글라스/모자 제거. 일반 안경은 대부분 인식됨.</p>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <p class="text-sm text-amber-700"><i class="ri-information-line"></i> 3회 이상 연속 실패 시 카카오 채널로 접수하세요. 매니저가 재등록을 도와드립니다. 긴급 출입이 필요하면 지점 연락처로 전화.</p>
        </div>
      `,
      related: ['move-in-checklist', 'door-lock', 'emergency-contact']
    },

    'hvac': {
      category: 'facility', title: '냉난방기(에어컨) 사용법',
      tags: ['에어컨','냉방','난방','냉난방기','리모컨','온도','전열교환기'], time: 2, difficulty: '초급', popular: 6,
      content: `
        <h3 class="font-bold text-base mb-3">기본 사용법</h3>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-6">
          <li>리모컨 전원 버튼으로 켜기 (건전지 AAA 2개)</li>
          <li>모드 선택: 여름 ❄ 냉방 / 겨울 ☀ 난방 / 환절기 AUTO</li>
          <li>온도 설정: 냉방 24~26도 / 난방 20~22도 권장</li>
        </ol>
        <h3 class="font-bold text-base mb-3">고장 의심 시 확인</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-6">
          <li>• 리모컨 배터리 확인</li>
          <li>• 실내기 전원 플러그가 빠졌는지 확인</li>
          <li>• 전면 패널을 열어 필터 먼지 확인</li>
          <li>• 전열교환기(환기장치) 전원이 꺼져 있지 않은지 확인</li>
        </ul>
        <p data-location="회기" class="text-sm text-gray-500"><i class="ri-information-line text-blue-500"></i> <strong>회기</strong> — 3층 일부 호실에서 HVAC 난방/냉방 성능 저하 이력이 있습니다. 해당 층 문제는 관리사무소(강감천 소장 010-4746-2048)로 바로 문의하세요.</p>
      `,
      related: ['boiler', 'ventilation', 'emergency-contact']
    },

    'internet': {
      category: 'facility', title: '인터넷/Wi-Fi 연결 안내',
      tags: ['인터넷','와이파이','WiFi','네트워크','속도','LAN'], time: 3, difficulty: '초급', popular: 2,
      content: `
        <h3 class="font-bold text-base mb-3">Wi-Fi 연결</h3>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-6">
          <li>기기 Wi-Fi 설정에서 <strong>HOMES_[지점명]_[호실]</strong> 또는 공용 Wi-Fi 선택</li>
          <li>비밀번호는 입주 안내서에 기재 (분실 시 카카오 채널 문의)</li>
        </ol>
        <h3 class="font-bold text-base mb-3">인터넷이 느리거나 안 될 때</h3>
        <div class="space-y-3 mb-6">
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>공유기 재부팅</strong> — 전원을 뽑고 10초 후 다시 꽂기</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>기기 재연결</strong> — Wi-Fi 끄고 다시 켜서 재연결</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>다른 기기 테스트</strong> — 특정 기기 문제인지 확인</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div><div>위 방법으로 안 되면 카카오 채널 접수 (호실 번호 필수)</div></div>
        </div>
        <p class="text-sm text-gray-500">벽면 LAN 포트에 랜선 연결 시 유선 인터넷 사용 가능. 랜선 필요 시 카카오 채널로 요청.</p>
        <p class="text-sm text-gray-500 mt-2"><i class="ri-information-line text-blue-500"></i> 관리비에 인터넷/IPTV 비용(월 15,000원)이 포함되어 있습니다.</p>
      `,
      related: ['move-in-checklist', 'management-fee']
    },

    'ventilation': {
      category: 'facility', title: '환풍기 사용법',
      tags: ['환풍기','환기','습기','욕실','곰팡이'], time: 1, difficulty: '초급',
      content: `
        <h3 class="font-bold text-base mb-3">욕실 환풍기</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-4">
          <li>• 욕실 벽면 스위치로 ON/OFF</li>
          <li>• 샤워 후 <strong>최소 30분~1시간</strong> 가동 권장</li>
          <li>• 소음이 심하거나 작동 안 하면 카카오 채널 접수</li>
        </ul>
        <p class="text-sm text-gray-500"><i class="ri-lightbulb-line text-blue-500"></i> <strong>곰팡이 방지</strong> — 샤워 후 욕실 문을 열고 환풍기를 가동하면 습기를 효과적으로 제거할 수 있습니다. 겨울철 결로 방지에도 환기가 중요합니다.</p>
      `,
      related: ['odor', 'cleaning']
    },

    'plumbing': {
      category: 'facility', title: '변기/배관 막힘 해결',
      tags: ['변기','배관','막힘','하수구','세면대'], time: 2, difficulty: '초급', popular: 7,
      content: `
        <h3 class="font-bold text-base mb-3">변기 막힘</h3>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-6">
          <li>뚫어뻥 사용 (호실 욕실 또는 층별 비품함 비치)</li>
          <li>배수구에 밀착 후 강하게 밀고 당기기 반복</li>
          <li>3~4회 시도 후 안 되면 카카오 채널 접수</li>
        </ol>
        <h3 class="font-bold text-base mb-3">세면대/하수구 막힘</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-4">
          <li>• 배수구 덮개를 열어 머리카락 등 이물질 제거</li>
          <li>• 뜨거운 물을 천천히 부어 기름기 녹이기</li>
          <li>• 반복되면 카카오 채널 접수 (전문 업체 조치)</li>
        </ul>
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <p class="text-sm text-amber-700"><i class="ri-error-warning-line"></i> 변기에 물티슈, 생리대 등을 버리지 마세요. <strong>입주자 과실로 인한 배관 막힘은 수리비가 청구</strong>됩니다.</p>
        </div>
      `,
      related: ['water-leak', 'odor']
    },

    'odor': {
      category: 'facility', title: '악취 해결 방법',
      tags: ['악취','냄새','하수구','배수구','트랩'], time: 2, difficulty: '초급',
      content: `
        <div class="space-y-3 mb-4">
          <div class="bg-gray-50 rounded-lg p-4"><h4 class="font-medium text-sm mb-1">하수구 냄새</h4><p class="text-sm text-gray-600">배수 트랩(U자 배관)의 물이 증발하면 냄새가 올라옵니다. <strong>물을 1~2분 틀어</strong> 트랩에 물을 채워주세요.</p></div>
          <div class="bg-gray-50 rounded-lg p-4"><h4 class="font-medium text-sm mb-1">욕실 습기/곰팡이</h4><p class="text-sm text-gray-600">환풍기 가동 + 창문 환기. 습한 환경에서 곰팡이 냄새가 날 수 있습니다.</p></div>
          <div class="bg-gray-50 rounded-lg p-4"><h4 class="font-medium text-sm mb-1">음식물 쓰레기</h4><p class="text-sm text-gray-600">밀봉하여 당일 처리. 분리수거 장소는 각 지점 1층.</p></div>
        </div>
        <p class="text-sm text-gray-500">위 방법으로 해결 안 되거나 원인 모를 악취가 지속되면 카카오 채널 접수.</p>
      `,
      related: ['ventilation', 'plumbing', 'cleaning']
    },

    'door-lock': {
      category: 'facility', title: '도어락/현관문 비밀번호',
      tags: ['도어락','비밀번호','현관','잠김','출입'], time: 2, difficulty: '초급', popular: 5,
      content: `
        <h3 class="font-bold text-base mb-3">비밀번호 관련</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-6">
          <li>• 호실 도어락 비밀번호는 입주 시 안내</li>
          <li>• 공동현관문 비밀번호는 지점별 상이 (입주 안내서 참고)</li>
          <li>• 비밀번호 변경 희망 시 지점 매니저에게 요청</li>
        </ul>
        <h3 class="font-bold text-base mb-3">잠겨서 못 들어갈 때</h3>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-4">
          <li>배터리 방전 → 도어락 하단에 9V 건전지 갖다대면 일시 작동</li>
          <li>비밀번호를 모르겠으면 → 지점 매니저 또는 관리사무소 전화</li>
          <li>야간 잠금 → 카카오 채널로 긴급 접수</li>
        </ol>
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <p class="text-sm text-amber-700"><i class="ri-information-line"></i> 도어락 배터리는 주기적으로 확인해주세요. 저전압 경고음이 울리면 교체 시기입니다. 건전지는 편의점에서 구매 가능합니다.</p>
        </div>
      `,
      related: ['facial-recognition', 'emergency-contact', 'location-contacts']
    },

    // ==================== 계약 & 결제 ====================
    'rent-payment': {
      category: 'contract', title: '월세 납부 안내',
      tags: ['월세','납부','이체','계좌','연체'], time: 2, difficulty: '초급', popular: 8,
      content: `
        <h3 class="font-bold text-base mb-3">납부 방법</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <table class="w-full text-sm">
            <tr class="border-b border-gray-200"><td class="py-2 font-medium text-gray-700 w-28">납부일</td><td class="py-2 text-gray-600">계약서 상 지정일</td></tr>
            <tr class="border-b border-gray-200"><td class="py-2 font-medium text-gray-700">납부 방법</td><td class="py-2 text-gray-600">계좌이체 (자동이체 권장)</td></tr>
            <tr class="border-b border-gray-200"><td class="py-2 font-medium text-gray-700">입금 계좌</td><td class="py-2 text-gray-600">계약서에 기재된 계좌 (지점별 상이)</td></tr>
            <tr><td class="py-2 font-medium text-gray-700">입금자명</td><td class="py-2 text-gray-600">계약자 이름 + 호실번호 (예: 홍길동502)</td></tr>
          </table>
        </div>
        <h3 class="font-bold text-base mb-3">지점별 입금 계좌</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600 space-y-2">
          <p data-location="가산"><strong>가산</strong> — 월세: 수협은행 1130-0063-5885 (현대하임리빙제1의1호)</p>
          <p data-location="회기"><strong>회기</strong> — 월세: 수협은행 1130-0063-5851 (현대하임리빙제1의2호)</p>
          <p data-location="선정릉,남영,망원,원효로,안암"><strong>기타 지점</strong> — 계약서 상 기재된 계좌 확인</p>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <h4 class="font-bold text-amber-700 text-sm mb-2"><i class="ri-information-line"></i> 연체 안내</h4>
          <ul class="text-sm text-amber-700 space-y-1">
            <li>• 5일 이내: 안내 메시지 발송</li>
            <li>• 5일 이상: 연체료 발생 가능 (계약서 확인)</li>
            <li>• 납부가 어려우면 미리 카카오 채널로 상담</li>
          </ul>
        </div>
        <p class="text-sm text-gray-500 mt-4"><i class="ri-information-line text-blue-500"></i> <strong>해외 송금</strong> — Bank: Suhyup Bank, SWIFT: NABORKSEXXX. 상세 계좌는 지점 매니저에게 문의.</p>
      `,
      related: ['management-fee', 'deposit', 'tax-invoice']
    },

    'management-fee': {
      category: 'contract', title: '관리비 안내',
      tags: ['관리비','일반관리비','전기료','수도','가스','멤버십'], time: 3, difficulty: '중급', popular: 9,
      content: `
        <h3 class="font-bold text-base mb-3">관리비 구성 항목</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-gray-300 text-left"><th class="py-2 font-medium text-gray-700">항목</th><th class="py-2 font-medium text-gray-700">구분</th><th class="py-2 font-medium text-gray-700">비고</th></tr></thead>
            <tbody class="text-gray-600">
              <tr class="border-b border-gray-100"><td class="py-2">일반관리비</td><td>과세</td><td>150,000~160,000원 (지점별 상이)</td></tr>
              <tr class="border-b border-gray-100"><td class="py-2">공통 전기료</td><td>과세</td><td>약 16,000~19,000원 (변동)</td></tr>
              <tr class="border-b border-gray-100"><td class="py-2">개별 전기료</td><td>과세</td><td>사용량에 따라 변동</td></tr>
              <tr class="border-b border-gray-100"><td class="py-2">인터넷/IPTV</td><td>과세</td><td>15,000원 (고정)</td></tr>
              <tr class="border-b border-gray-100"><td class="py-2">홈즈멤버십</td><td>과세</td><td>계약 조건에 따라 상이</td></tr>
              <tr class="border-b border-gray-100"><td class="py-2">공용전력기금</td><td>비과세</td><td>약 750~1,050원</td></tr>
              <tr class="border-b border-gray-100"><td class="py-2">세대전력기금</td><td>비과세</td><td>약 230~250원</td></tr>
              <tr><td class="py-2">수도요금</td><td>비과세</td><td>약 3,500~11,700원 (격월 부과)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
          <p><strong>예상 총 관리비:</strong></p>
          <p data-location="가산">• <strong>가산</strong> — 약 17만원 (인터넷 포함, 전기/가스 별도)</p>
          <p data-location="회기">• <strong>회기</strong> — 스튜디오·테라스 타입 약 14만원 (변동)</p>
          <p class="mt-2 text-gray-500">* 과세 항목에는 부가세(10%)가 추가됩니다.</p>
        </div>
        <h3 class="font-bold text-base mb-3">고지서 확인</h3>
        <ul class="text-sm text-gray-600 space-y-2">
          <li>• 매월 관리비 고지서가 발송됩니다</li>
          <li>• 모바일 고지서를 원하시면 카카오 채널로 요청</li>
          <li>• 해외 체류 중 확인이 어려우면 이메일 발송도 가능</li>
        </ul>
        <p class="text-sm text-gray-500 mt-4"><i class="ri-information-line text-blue-500"></i> <strong>퇴실 시</strong> — 고정비용은 해당 월 기준 일할 계산, 변동비용은 직전 3개월 평균으로 정산됩니다.</p>
      `,
      related: ['rent-payment', 'move-out-process', 'tax-invoice']
    },

    'contract-renewal': {
      category: 'contract', title: '계약 연장 절차',
      tags: ['연장','재계약','갱신','임대료인상'], time: 3, difficulty: '중급', popular: 10,
      content: `
        <h3 class="font-bold text-base mb-3">절차</h3>
        <div class="space-y-3 mb-6">
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>만료 30일 전</strong> — 홈즈에서 연장 의향 확인 연락</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>조건 협의</strong> — 임대료, 기간 등 연장 조건 협의 (임대료 변동 가능)</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>계약서 작성</strong> — 합의된 조건으로 새 계약서 작성 (전자서명 가능)</div></div>
        </div>
        <details class="bg-gray-50 rounded-lg mb-2"><summary class="p-3 text-sm font-medium flex items-center justify-between">연장 시 임대료가 인상되나요? <i class="ri-arrow-right-s-line chevron text-gray-400"></i></summary><div class="px-3 pb-3 text-sm text-gray-600">시장 상황과 계약 조건에 따라 변동될 수 있습니다. 연장 안내 시 사전에 조건을 안내드립니다.</div></details>
        <details class="bg-gray-50 rounded-lg mb-2"><summary class="p-3 text-sm font-medium flex items-center justify-between">다른 호실로 이동 가능한가요? <i class="ri-arrow-right-s-line chevron text-gray-400"></i></summary><div class="px-3 pb-3 text-sm text-gray-600">공실 상황에 따라 가능합니다. 카카오 채널로 희망 호실과 사유를 알려주세요.</div></details>
        <details class="bg-gray-50 rounded-lg"><summary class="p-3 text-sm font-medium flex items-center justify-between">단기 연장도 되나요? <i class="ri-arrow-right-s-line chevron text-gray-400"></i></summary><div class="px-3 pb-3 text-sm text-gray-600">최소 1개월부터 가능. 단기 시 월 임대료 조건이 달라질 수 있습니다.</div></details>
      `,
      related: ['rent-payment', 'early-termination', 'promotion']
    },

    'deposit': {
      category: 'contract', title: '보증금 안내',
      tags: ['보증금','계약','입금','선납'], time: 2, difficulty: '초급',
      content: `
        <h3 class="font-bold text-base mb-3">보증금 금액 (지점별)</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600 space-y-2">
          <p data-location="가산"><strong>가산</strong> — 5,000,000원</p>
          <p data-location="회기"><strong>회기</strong> — 단기 3,000,000원 / 장기 5,000,000원 (또는 월세 선납)</p>
          <p data-location="선정릉,남영,망원,원효로,안암"><strong>기타 지점</strong> — 계약 상담 시 안내</p>
        </div>
        <h3 class="font-bold text-base mb-3">보증금 입금 계좌</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600 space-y-2">
          <p data-location="가산"><strong>가산</strong> — 수협은행 1010-2722-8291 (현대하임리빙제1의1호)</p>
          <p data-location="회기"><strong>회기</strong> — 하나은행 198-910029-5 (현대하임리빙제1의2호)</p>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <p class="text-sm text-amber-700"><i class="ri-information-line"></i> 시설 파손이나 미납 월세가 있을 경우 보증금에서 차감될 수 있습니다. 퇴실 시 반환 절차는 <a href="#" onclick="showArticle('deposit-return')" class="text-blue-500 underline">보증금 반환 절차</a>를 참고하세요.</p>
        </div>
      `,
      related: ['deposit-return', 'rent-payment', 'move-out-process']
    },

    'tax-invoice': {
      category: 'contract', title: '세금계산서 발급',
      tags: ['세금계산서','영수증','사업자','홈택스'], time: 2, difficulty: '중급',
      content: `
        <h3 class="font-bold text-base mb-3">발급 대상</h3>
        <p class="text-sm text-gray-600 mb-4">사업자등록증을 보유한 법인/개인사업자 입주자</p>
        <h3 class="font-bold text-base mb-3">신청 방법</h3>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-4">
          <li>카카오 채널에서 '계약 문의' 선택</li>
          <li>사업자등록증 사본 첨부하여 전송</li>
          <li>필요 정보: 상호명, 사업자등록번호, 대표자명, 사업장 주소, 이메일</li>
          <li>담당자 확인 후 익월 10일까지 발급</li>
        </ol>
        <p class="text-sm text-gray-500"><i class="ri-information-line text-blue-500"></i> 렌트플로우 임대료 수납/정산센터 또는 홈택스를 통해 발행됩니다.</p>
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-4">
          <p data-location="가산,회기" class="text-sm text-amber-700"><i class="ri-error-warning-line"></i> <strong>가산·회기</strong> — 사업자등록 불가 지점입니다. 사업자등록이 필요한 경우 입주 전 반드시 확인하세요.</p>
        </div>
      `,
      related: ['rent-payment', 'management-fee']
    },

    'promotion': {
      category: 'contract', title: '프로모션/할인 안내',
      tags: ['프로모션','할인','RF','렌트프리','위약금'], time: 2, difficulty: '초급',
      content: `
        <p class="text-gray-600 text-sm mb-4">장기 계약 시 렌트프리(RF) 혜택이 제공됩니다. 월 균등할인 방식으로 적용됩니다.</p>
        <h3 class="font-bold text-base mb-3">지점별 프로모션 (현행 기준)</h3>
        <div class="space-y-4 mb-6">
          <div data-location="가산" class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-sm mb-2">가산 (아코모 가산)</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• 6개월 계약 → RF 1개월 제공</li>
              <li>• 1년 계약 → RF 3.5개월 제공</li>
            </ul>
          </div>
          <div data-location="회기" class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-sm mb-2">회기 (아코모 회기)</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• 1년 계약 → RF 3~4개월 제공</li>
              <li>• 1년 계약 시 기본 관리비 3개월 면제 (실비 별도)</li>
            </ul>
          </div>
        </div>
        <div class="bg-red-50 border border-red-100 rounded-lg p-4">
          <p class="text-sm text-red-700"><i class="ri-error-warning-line"></i> <strong>중도 퇴실 시</strong> 매월 할인 받은 금액만큼 위약금이 발생합니다. 자세한 내용은 <a href="#" onclick="showArticle('early-termination')" class="text-blue-500 underline">중도 퇴실 안내</a>를 참고하세요.</p>
        </div>
      `,
      related: ['contract-renewal', 'early-termination', 'rent-payment']
    },

    // ==================== 생활 ====================
    'noise': {
      category: 'living', title: '소음 관련 안내',
      tags: ['소음','층간소음','야간'], time: 2, difficulty: '초급',
      content: `
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <ul class="text-sm text-gray-600 space-y-2">
            <li>🕐 <strong>야간 (22:00~08:00)</strong> — 소음 최소화</li>
            <li>🔊 TV/음악은 이어폰 사용 권장</li>
            <li>🏃 실내에서 뛰거나 큰 소리 삼가</li>
          </ul>
        </div>
        <h3 class="font-bold text-base mb-3">소음 민원 접수</h3>
        <p class="text-sm text-gray-600 mb-2">카카오 채널로 접수. 매니저가 해당 호실에 안내합니다.</p>
        <p class="text-sm text-gray-500"><i class="ri-information-line text-blue-500"></i> 접수 시 <strong>소음 시간대, 유형, 해당 호실(알 경우)</strong>을 알려주세요. 직접 항의보다 매니저를 통한 중재를 권장합니다.</p>
        <p class="text-sm text-gray-500 mt-2"><i class="ri-information-line text-blue-500"></i> <strong>주말</strong>에는 관리사무소로 연락해주세요.</p>
      `,
      related: ['cleaning', 'common-area', 'location-contacts']
    },

    'parking': {
      category: 'living', title: '주차 안내',
      tags: ['주차','기계식','주차장','자동차'], time: 2, difficulty: '초급', popular: 11,
      content: `
        <h3 class="font-bold text-base mb-3">주차 이용</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600 space-y-2">
          <p data-location="가산"><strong>가산</strong> — 월 30,000원, 기계식 주차 타워. 자동차등록증 제출 필요.</p>
          <p data-location="회기"><strong>회기</strong> — 월 30,000원, 기계식 주차. 사전 등록 필수.</p>
        </div>
        <h3 class="font-bold text-base mb-3">이용 시 주의사항</h3>
        <ul class="text-sm text-gray-600 space-y-2">
          <li>• 기계식 주차장이므로 차량 크기 제한이 있습니다 (입주 시 확인)</li>
          <li>• 자동차등록증을 제출해야 주차 등록이 가능합니다</li>
          <li>• 방문객 차량은 사전 안내가 필요합니다</li>
          <li>• 주차 관련 문의: 관리사무소</li>
        </ul>
      `,
      related: ['management-fee', 'common-area']
    },

    'parcel': {
      category: 'living', title: '택배 수령 안내',
      tags: ['택배','배달','우편'], time: 1, difficulty: '초급',
      content: `
        <ul class="text-sm text-gray-600 space-y-2 mb-4">
          <li>• <strong>무인 택배함</strong>이 있는 지점 — 비밀번호로 수령</li>
          <li>• <strong>택배함 없는 지점</strong> — 1층 로비 또는 지정 장소 보관</li>
          <li>• 배송 주소: <strong>"홈즈 [지점명] [호실번호]"</strong> 기재</li>
        </ul>
        <p class="text-sm text-gray-500"><i class="ri-information-line text-blue-500"></i> 3일 이상 방치된 택배는 관리 사무실로 이동될 수 있습니다.</p>
      `,
      related: ['common-area']
    },

    'garbage': {
      category: 'living', title: '분리수거 안내',
      tags: ['쓰레기','분리수거','재활용','음식물'], time: 2, difficulty: '초급',
      content: `
        <h3 class="font-bold text-base mb-3">분리수거 장소</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600 space-y-1">
          <p data-location="가산"><strong>가산</strong> — 1층 분리 배출</p>
          <p data-location="회기"><strong>회기</strong> — 1층 분리수거장</p>
          <p data-location="선정릉,남영,망원,원효로,안암"><strong>기타 지점</strong> — 입주 안내서 참고</p>
        </div>
        <h3 class="font-bold text-base mb-3">분류 방법</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-4">
          <li>♻ <strong>재활용</strong> — 종이, 플라스틱, 캔, 유리 종류별 분리</li>
          <li>🗑 <strong>일반 쓰레기</strong> — 종량제 봉투 (편의점 구매)</li>
          <li>🍎 <strong>음식물</strong> — 전용 봉투/용기에 담아 배출</li>
        </ul>
        <p class="text-sm text-gray-500"><i class="ri-error-warning-line text-amber-500"></i> 복도나 호실 앞에 쓰레기를 방치하지 마세요.</p>
      `,
      related: ['cleaning', 'common-area']
    },

    'common-area': {
      category: 'living', title: '공용시설 이용 안내',
      tags: ['공용','라운지','세탁실','주방','피트니스','스터디룸'], time: 2, difficulty: '초급',
      content: `
        <h3 class="font-bold text-base mb-3">지점별 공용시설</h3>
        <div class="space-y-3 mb-6">
          <div data-location="가산" class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-sm mb-1">가산</h4>
            <p class="text-sm text-gray-600">프라이빗 커뮤니티룸, 릴렉스룸, 스터디룸 | 24시간 이용</p>
          </div>
          <div data-location="회기" class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-sm mb-1">회기</h4>
            <p class="text-sm text-gray-600">라운지, 공유 주방, 피트니스룸, 스터디룸 | 24시간 이용</p>
          </div>
        </div>
        <h3 class="font-bold text-base mb-3">이용 수칙</h3>
        <ul class="text-sm text-gray-600 space-y-2">
          <li>• 사용 후 정리정돈 필수 (주방은 설거지 포함)</li>
          <li>• 개인 물품 방치 금지</li>
          <li>• 시설 고장/비품 부족 시 카카오 채널 접수</li>
        </ul>
      `,
      related: ['cleaning', 'noise', 'parking']
    },

    'cleaning': {
      category: 'living', title: '청소 및 위생',
      tags: ['청소','위생','비품'], time: 1, difficulty: '초급',
      content: `
        <ul class="text-sm text-gray-600 space-y-2 mb-4">
          <li>• 호실 내부 청소는 입주자 본인 관리</li>
          <li>• 청소기, 밀대 등은 층별 비품함에서 대여 가능</li>
          <li>• 공용 공간은 정기 청소 진행</li>
          <li>• 청소 상태 문제 시 카카오 채널 접수</li>
        </ul>
      `,
      related: ['garbage', 'common-area']
    },

    // ==================== 입주 ====================
    'tour-booking': {
      category: 'move-in', title: '투어(방문 견학) 예약',
      tags: ['투어','견학','방문','예약'], time: 2, difficulty: '초급',
      content: `
        <h3 class="font-bold text-base mb-3">예약 방법</h3>
        <ul class="text-sm text-gray-600 space-y-2 mb-6">
          <li>• <strong>온라인</strong> — <a href="https://www.homes.global/ko" target="_blank" class="text-blue-500 underline">홈즈컴퍼니 홈페이지</a>에서 '투어 예약하기'</li>
          <li>• <strong>카카오 채널</strong> — '투어 신청' 선택</li>
          <li>• <strong>전화</strong> — 대표번호 <strong>1544-0338</strong></li>
          <li>• <strong>문자</strong> — 고객 성함, 연락처, 희망 입주일, 계약기간, 룸타입 기재</li>
        </ul>
        <h3 class="font-bold text-base mb-3">지점별 상담</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600 space-y-2">
          <p data-location="가산"><strong>가산</strong> — 권기도 매니저 010-2421-7780 / 평일 10:00~19:00</p>
          <p data-location="회기"><strong>회기</strong> — 010-8180-0338 / 평일 10:00~18:30 (주말 휴무)</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p><strong>투어 안내</strong></p>
          <ul class="space-y-1 mt-1">
            <li>• 소요 시간: 약 20~30분</li>
            <li>• 준비물: 신분증</li>
            <li>• 자율 투어도 가능 (사전 연락 시 비밀번호 안내)</li>
            <li>• 투어 후 바로 계약 진행 가능</li>
          </ul>
        </div>
      `,
      related: ['contract-process', 'location-contacts']
    },

    'contract-process': {
      category: 'move-in', title: '계약 절차',
      tags: ['계약','절차','서류','입주','서명'], time: 3, difficulty: '중급',
      content: `
        <div class="space-y-3 mb-6">
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>투어 및 상담</strong> — 희망 지점 방문, 호실/가격/룸타입 상담</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>계약서 작성</strong> — 표준 임대차계약서 양식. 전자서명 가능.</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>보증금 납부</strong> — 지정 계좌로 입금 (계약금은 선납금에 포함)</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div><div><strong>입주일 확정</strong> — 담당자와 날짜 조율</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</div><div><strong>입주</strong> — 시설 안내, 안면인식 등록, 생활 가이드 전달</div></div>
        </div>
        <h3 class="font-bold text-base mb-3">지점별 임대 조건</h3>
        <div class="space-y-3 mb-6">
          <div data-location="가산" class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <h4 class="font-medium mb-1">가산 (아코모 가산)</h4>
            <p>룸타입: 1.5R 복층형 | 면적: 28.42㎡(8.6평) | 최소 계약 1개월</p>
            <p>보증금: 500만원 | 관리비: 약 17만원 | 주차: 3만원</p>
            <p>반려동물: 가능(2층, 추가비용) | 사업자등록: 불가</p>
          </div>
          <div data-location="회기" class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <h4 class="font-medium mb-1">회기 (아코모 회기)</h4>
            <p>룸타입: 1R 복층형 / 1R+테라스 / 1.5R | 면적: 11.56~24.26㎡</p>
            <p>보증금: 단기 300만 / 장기 500만 | 관리비: 약 14만원 | 주차: 3만원</p>
            <p>당일입주·사업자등록·반려동물: 불가 | 최대 계약 1년</p>
          </div>
        </div>
        <h3 class="font-bold text-base mb-3">준비 서류</h3>
        <ul class="text-sm text-gray-600 space-y-1">
          <li>• 신분증 (주민등록증 또는 여권)</li>
          <li>• 외국인: 외국인등록증 또는 여권</li>
          <li>• 법인 계약: 사업자등록증, 법인 인감</li>
        </ul>
      `,
      related: ['tour-booking', 'move-in-checklist', 'deposit', 'promotion']
    },

    'move-in-checklist': {
      category: 'move-in', title: '입주 체크리스트',
      tags: ['입주','체크리스트','첫날','준비'], time: 3, difficulty: '초급', popular: 2,
      content: `
        <div class="space-y-2 mb-6">
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>신분증</strong> 지참 (안면인식 등록용)</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>안면인식 등록</strong> 완료 (매니저와 함께)</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>도어락 비밀번호</strong> 확인 (호실 + 공동현관)</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>Wi-Fi 연결</strong> 테스트 (SSID, 비밀번호)</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>보일러/냉난방</strong> 작동 확인</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>수도/온수</strong> 정상 출수 확인</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>변기/배수</strong> 정상 작동 확인</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>전등/콘센트</strong> 작동 확인</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>시설 상태 사진 촬영</strong> (퇴실 시 비교용)</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>카카오 채널 추가</strong> (홈즈컴퍼니 — 문의/VOC 접수)</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>분리수거 장소</strong> 확인 (각 지점 1층)</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>관리사무소 연락처</strong> 저장</label>
          <label class="flex items-start gap-2 text-sm text-gray-600"><input type="checkbox" class="mt-1 rounded"> <strong>주차 등록</strong> (필요 시 자동차등록증 제출)</label>
        </div>
        <div class="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p class="text-sm text-blue-700"><i class="ri-checkbox-circle-line"></i> <strong>하자 발견 시</strong> — 입주 당일 시설 이상 발견 시 <strong>사진 찍어 카카오 채널로 즉시 접수</strong>. 입주 3일 이내 접수된 하자는 기존 하자로 인정됩니다.</p>
        </div>
      `,
      related: ['facial-recognition', 'internet', 'boiler', 'location-contacts']
    },

    // ==================== 퇴실 ====================
    'move-out-process': {
      category: 'move-out', title: '퇴실 절차',
      tags: ['퇴실','이사','종료','정산'], time: 3, difficulty: '중급', popular: 12,
      content: `
        <div class="space-y-3 mb-6">
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>퇴실 통보 (30일 전)</strong> — 카카오 채널 또는 전화로 퇴실 의사 전달</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>퇴실일 확정</strong> — 담당자와 날짜/시간 조율</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>짐 정리 및 청소</strong> — 개인 물품 반출, 호실 정리</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div><div><strong>시설 점검</strong> — 매니저와 함께 시설 상태 점검</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</div><div><strong>관리비 정산</strong> — 고정비 일할 계산 + 변동비 3개월 평균 정산</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</div><div><strong>보증금 반환</strong> — 점검 후 14일 이내 반환</div></div>
        </div>
        <h3 class="font-bold text-base mb-3">주의사항</h3>
        <ul class="text-sm text-gray-600 space-y-2">
          <li>• 시설 원상복구 필수 (벽 타공, 스티커 자국 등 제거)</li>
          <li>• 비품 파손 시 보증금에서 차감</li>
          <li>• 우편물 수신 주소 변경</li>
          <li>• 미납 월세/관리비 퇴실 전 정산</li>
        </ul>
      `,
      related: ['deposit-return', 'early-termination', 'move-out-cleaning', 'management-fee']
    },

    'deposit-return': {
      category: 'move-out', title: '보증금 반환 절차',
      tags: ['보증금','반환','환불','정산'], time: 2, difficulty: '중급',
      content: `
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-6">
          <li>퇴실 시 시설 점검</li>
          <li>시설 파손/미납 여부 확인</li>
          <li>차감 항목 있을 경우 내역 안내</li>
          <li>퇴실 완료 후 <strong>14일 이내</strong> 지정 계좌로 입금</li>
        </ol>
        <p class="text-sm text-gray-600 mb-4">반환 계좌 등록/변경: 카카오 채널 → 은행명, 계좌번호, 예금주 전달</p>
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <h4 class="font-bold text-amber-700 text-sm mb-2">차감 사유 예시</h4>
          <ul class="text-sm text-amber-700 space-y-1">
            <li>• 벽면 훼손 (못, 타공, 페인트 손상)</li>
            <li>• 비품 파손/분실</li>
            <li>• 미납 월세/관리비</li>
            <li>• 과도한 오염 (특수 청소 필요 시)</li>
          </ul>
        </div>
      `,
      related: ['move-out-process', 'move-out-cleaning', 'deposit']
    },

    'early-termination': {
      category: 'move-out', title: '중도 퇴실(조기 퇴실)',
      tags: ['중도퇴실','조기퇴실','해지','위약금'], time: 3, difficulty: '중급',
      content: `
        <p class="text-sm text-gray-600 mb-4">계약 기간 만료 전 퇴실 시 위약금이 발생합니다.</p>
        <div class="space-y-3 mb-6">
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>사전 상담</strong> — 카카오 채널 또는 전화로 중도 퇴실 의사와 사유 전달</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>조건 확인</strong> — 담당자가 위약금 및 조건 안내</div></div>
          <div class="flex gap-3"><div class="step-number bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>퇴실일 협의</strong> — 최소 30일 전 통보 원칙</div></div>
        </div>
        <div class="bg-red-50 border border-red-100 rounded-lg p-4">
          <h4 class="font-bold text-red-700 text-sm mb-2"><i class="ri-error-warning-line"></i> 위약금</h4>
          <p class="text-sm text-red-600"><strong>매월 할인(렌트프리) 받은 금액만큼 위약금이 발생</strong>합니다. 예: 1년 계약으로 RF 3.5개월을 받고 6개월째 퇴실 시, 6개월간 균등 할인된 금액을 반환해야 합니다. 정확한 금액은 카카오 채널로 문의.</p>
        </div>
      `,
      related: ['move-out-process', 'deposit-return', 'promotion']
    },

    'move-out-cleaning': {
      category: 'move-out', title: '퇴실 청소비',
      tags: ['퇴실청소','청소비','클리닝'], time: 1, difficulty: '초급',
      content: `
        <h3 class="font-bold text-base mb-3">지점별 퇴실 청소비</h3>
        <div class="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-600 space-y-2">
          <p data-location="가산"><strong>가산</strong> — 스튜디오 타입 198,000원</p>
          <p data-location="회기"><strong>회기</strong> — 스튜디오 타입 165,000원</p>
          <p data-location="선정릉,남영,망원,원효로,안암"><strong>기타 지점</strong> — 계약서 확인</p>
        </div>
        <p class="text-sm text-gray-500">퇴실 청소는 전문 업체에서 진행합니다. 비용은 퇴실 정산 시 차감됩니다.</p>
      `,
      related: ['move-out-process', 'deposit-return']
    },

    // ==================== 긴급 ====================
    'emergency-contact': {
      category: 'emergency', title: '긴급 연락처',
      tags: ['긴급','연락처','비상','전화','관리사무소'], time: 1, difficulty: '초급', popular: 1,
      content: `
        <div class="space-y-3 mb-6">
          <div class="flex items-center gap-3 bg-gray-900 text-white rounded-lg p-4">
            <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0"><i class="ri-phone-line text-xl"></i></div>
            <div><div class="font-bold text-sm">홈즈컴퍼니 대표번호</div><div class="font-bold text-xl">1544-0338</div><div class="text-xs text-gray-400">평일 09:00~18:00</div></div>
          </div>

          <div class="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0"><i class="ri-kakao-talk-fill text-yellow-600 text-xl"></i></div>
            <div><div class="font-bold text-sm text-gray-900">카카오 채널 (시설 긴급)</div><div class="text-yellow-700 font-bold">홈즈컴퍼니 채널 → 시설 문의</div><div class="text-xs text-gray-500">24시간 접수 가능</div></div>
          </div>

          <div class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0"><i class="ri-building-2-line text-gray-600 text-xl"></i></div>
            <div><div class="font-bold text-sm text-gray-900">관리사무소 (지점별)</div>
              <div class="text-sm text-gray-600 mt-1 space-y-0.5">
                <p data-location="가산"><strong>가산</strong> — 02-808-8086 / 강감천 소장 010-4746-2048</p>
                <p data-location="회기"><strong>회기</strong> — 강감천 소장 010-4746-2048</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0"><i class="ri-user-line text-gray-600 text-xl"></i></div>
            <div><div class="font-bold text-sm text-gray-900">지점 매니저</div>
              <div class="text-sm text-gray-600 mt-1 space-y-0.5">
                <p data-location="가산"><strong>가산</strong> — 권기도 매니저 010-2421-7780</p>
                <p data-location="회기"><strong>회기</strong> — 010-8180-0338</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div class="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0"><i class="ri-fire-line text-red-500 text-xl"></i></div>
            <div>
              <div class="text-sm text-gray-600 space-y-0.5">
                <p><strong>화재/구조/구급</strong> — 119</p>
                <p><strong>경찰</strong> — 112</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-red-50 border border-red-100 rounded-lg p-4">
          <p class="text-sm text-red-700"><i class="ri-error-warning-line"></i> <strong>가스 냄새</strong>가 나면 즉시 창문을 열고 전기 스위치를 만지지 마세요. 건물 밖으로 대피 후 관리사무소와 119에 신고.</p>
        </div>
      `,
      related: ['location-contacts', 'fire', 'water-leak']
    },

    'location-contacts': {
      category: 'emergency', title: '지점별 상세 연락처',
      tags: ['연락처','지점','매니저','관리사무소','상담시간'], time: 2, difficulty: '초급', popular: 4,
      content: `
        <div class="space-y-4">
          <div data-location="가산" class="border border-gray-200 rounded-lg p-5">
            <h3 class="font-bold text-base mb-3">가산 (아코모 가산 바이 홈즈)</h3>
            <div class="text-sm text-gray-600 space-y-1">
              <p>📍 서울시 금천구 독산동 1000-12 (벚꽃로)</p>
              <p>🏢 101동 10층 / 102동 | 76세대</p>
              <p>👤 담당: 권기도 매니저 <strong>010-2421-7780</strong></p>
              <p>🏠 관리사무소: <strong>02-808-8086</strong></p>
              <p>👨‍💼 관리소장: 강감천 <strong>010-4746-2048</strong></p>
              <p>🕐 상담: 평일 10:00~19:00</p>
            </div>
          </div>
          <div data-location="회기" class="border border-gray-200 rounded-lg p-5">
            <h3 class="font-bold text-base mb-3">회기 (아코모 회기 바이 홈즈)</h3>
            <div class="text-sm text-gray-600 space-y-1">
              <p>📍 서울시 동대문구 전농동 97-4 (왕산로 3)</p>
              <p>🏢 18층 | 147세대</p>
              <p>👤 담당: <strong>010-8180-0338</strong></p>
              <p>👨‍💼 관리소장: 강감천 <strong>010-4746-2048</strong></p>
              <p>🕐 상담: 평일 10:00~18:30 (주말 휴무)</p>
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg p-5">
            <h3 class="font-bold text-base mb-3">공통</h3>
            <div class="text-sm text-gray-600 space-y-1">
              <p>📞 대표번호: <strong>1544-0338</strong></p>
              <p>💬 카카오 채널: 홈즈컴퍼니 (24시간 접수)</p>
              <p class="text-gray-400 text-xs mt-2">* 선정릉, 남영, 망원, 원효로, 안암 지점 연락처는 입주 안내서를 참고하시거나 대표번호로 문의하세요.</p>
            </div>
          </div>
        </div>
      `,
      related: ['emergency-contact', 'tour-booking']
    },

    'fire': {
      category: 'emergency', title: '화재 대피 요령',
      tags: ['화재','불','대피','소화기'], time: 2, difficulty: '초급',
      content: `
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p class="text-red-700 font-bold text-sm"><i class="ri-alarm-warning-line"></i> 화재 시 즉시 관리사무소와 119에 신고!</p>
        </div>
        <div class="space-y-3 mb-4">
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div><div><strong>신고</strong> — 관리사무소 + 119 (주소와 상황 전달)</div></div>
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div><div><strong>비상벨</strong> — 복도 화재 비상벨 누르기</div></div>
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div><div><strong>대피</strong> — 엘리베이터 금지! 비상계단으로 낮은 자세로 이동</div></div>
          <div class="flex gap-3"><div class="step-number bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div><div><strong>집결</strong> — 건물 밖 안전한 장소에서 대기</div></div>
        </div>
        <p class="text-sm text-gray-500">각 층 복도에 소화기가 비치되어 있습니다. 입주 시 위치를 확인해두세요.</p>
      `,
      related: ['emergency-contact', 'power-outage']
    },

    'power-outage': {
      category: 'emergency', title: '정전 대처',
      tags: ['정전','전기','차단기','분전함'], time: 2, difficulty: '초급',
      content: `
        <h3 class="font-bold text-base mb-3">호실 내 정전</h3>
        <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2 mb-6">
          <li><strong>분전함 확인</strong> — 호실 내 분전함(보통 현관 옆)에서 내려간 차단기 확인</li>
          <li><strong>차단기 올리기</strong> — 다시 내려가면 과부하 또는 누전</li>
          <li>차단기 문제 아니면 관리사무소 또는 카카오 채널 접수</li>
        </ol>
        <h3 class="font-bold text-base mb-3">건물 전체 정전</h3>
        <p class="text-sm text-gray-600 mb-4">관리팀에서 파악 후 안내. 엘리베이터 사용 삼가, 냉장고 문 열지 않기.</p>
        <p data-location="회기" class="text-sm text-gray-500"><i class="ri-information-line text-blue-500"></i> <strong>회기</strong> — 지하3층 배전반 누전 이력이 있습니다. 주차장 조명이 꺼져 있으면 관리사무소로 연락하세요.</p>
      `,
      related: ['emergency-contact', 'location-contacts']
    }
  }
};

// ============================================================
// Storage 추상화 레이어 (Supabase + localStorage 이중 구조)
// ============================================================
const KBStorage = {
  STORAGE_KEY: 'kb_overrides',
  SB_CFG_KEY: 'voc_cfg',          // VOC 대시보드와 공유
  TABLE: 'kb_articles',
  _sb: null,                       // Supabase 클라이언트
  _cache: null,                    // 메모리 캐시

  // 기본 Supabase 설정 (배포 환경 자동 연결용)
  DEFAULT_SB: {
    url: 'https://bqzzszmhzfkcbgoyavcn.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxenpzem1oemZrY2Jnb3lhdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5ODU2NTAsImV4cCI6MjA4OTU2MTY1MH0.ScflftO0AwvhfKvr77JuxM4-QEaaLJJNZ-OTYHPU_3Q'
  },

  // ── Supabase 초기화 ──
  initSupabase() {
    try {
      // 1) localStorage 설정 우선
      let cfg = JSON.parse(localStorage.getItem(this.SB_CFG_KEY) || '{}');
      // 2) 없으면 기본값 사용
      if (!cfg.url || !cfg.key) cfg = this.DEFAULT_SB;
      if (!cfg.url || !cfg.key) return false;
      const lib = window.supabase || window.Supabase;
      if (!lib || !lib.createClient) return false;
      this._sb = lib.createClient(cfg.url, cfg.key);
      return true;
    } catch { return false; }
  },

  isConnected() { return !!this._sb; },

  // ── localStorage (폴백) ──
  _getLocal() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {}; }
    catch { return {}; }
  },
  _saveLocal(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  // ── Supabase CRUD ──
  async fetchAll() {
    if (!this._sb) return this._getLocal();
    try {
      const { data, error } = await this._sb.from(this.TABLE).select('*');
      if (error) throw error;
      const map = {};
      (data || []).forEach(row => { map[row.article_id] = JSON.parse(row.content); });
      this._cache = map;
      this._saveLocal(map); // 로컬에도 동기화
      return map;
    } catch (e) {
      console.warn('Supabase fetch 실패, localStorage 폴백:', e.message);
      return this._getLocal();
    }
  },

  async saveRemote(id, articleData) {
    if (!this._sb) return;
    try {
      await this._sb.from(this.TABLE).upsert({
        article_id: id,
        content: JSON.stringify(articleData),
        updated_at: new Date().toISOString()
      }, { onConflict: 'article_id' });
    } catch (e) { console.warn('Supabase save 실패:', e.message); }
  },

  async deleteRemote(id) {
    if (!this._sb) return;
    try {
      await this._sb.from(this.TABLE).delete().eq('article_id', id);
    } catch (e) { console.warn('Supabase delete 실패:', e.message); }
  },

  // ── 통합 API (async) ──
  async getOverridesAsync() {
    return await this.fetchAll();
  },

  // 동기 버전 (캐시/localStorage 사용, 고객 페이지 초기 렌더용)
  getOverrides() {
    if (this._cache) return this._cache;
    return this._getLocal();
  },

  async saveArticle(id, data) {
    // 로컬 즉시 저장
    const overrides = this.getOverrides();
    overrides[id] = data;
    this._saveLocal(overrides);
    this._cache = overrides;
    // Supabase 비동기 저장
    await this.saveRemote(id, data);
  },

  async deleteOverride(id) {
    const overrides = this.getOverrides();
    delete overrides[id];
    this._saveLocal(overrides);
    this._cache = overrides;
    await this.deleteRemote(id);
  },

  getArticle(id) {
    const overrides = this.getOverrides();
    const defaultArt = DEFAULT_KB.articles[id];
    if (!defaultArt) return overrides[id] || null;
    if (!overrides[id]) return { ...defaultArt };
    return { ...defaultArt, ...overrides[id] };
  },

  getAllArticles() {
    const overrides = this.getOverrides();
    const articles = {};
    for (const [id, art] of Object.entries(DEFAULT_KB.articles)) {
      articles[id] = overrides[id] ? { ...art, ...overrides[id] } : { ...art };
    }
    for (const [id, art] of Object.entries(overrides)) {
      if (!DEFAULT_KB.articles[id]) articles[id] = art;
    }
    return articles;
  },

  getKB() {
    return { categories: DEFAULT_KB.categories, articles: this.getAllArticles() };
  },

  exportData() {
    return JSON.stringify(this.getOverrides(), null, 2);
  },

  importData(json) {
    const data = JSON.parse(json);
    this._saveLocal(data);
    this._cache = data;
  },

  // Supabase에 전체 동기화 (import 후 호출)
  async syncToRemote() {
    if (!this._sb) return;
    const overrides = this.getOverrides();
    for (const [id, data] of Object.entries(overrides)) {
      await this.saveRemote(id, data);
    }
  },

  // 테이블 생성 SQL
  getCreateTableSQL() {
    return `create table if not exists kb_articles (
  article_id text primary key,
  content jsonb not null,
  updated_at timestamptz default now()
);

-- RLS 정책 (anon 키로 읽기/쓰기 허용)
alter table kb_articles enable row level security;
create policy "Allow all" on kb_articles for all using (true) with check (true);`;
  },

  // 연결 테스트
  async testConnection(url, key) {
    try {
      const lib = window.supabase || window.Supabase;
      if (!lib || !lib.createClient) throw new Error('Supabase SDK 로드 실패');
      const client = lib.createClient(url, key);
      const { error } = await client.from(this.TABLE).select('article_id').limit(1);
      if (error) throw error;
      // 성공 시 저장
      localStorage.setItem(this.SB_CFG_KEY, JSON.stringify({ url, key }));
      this._sb = client;
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};
