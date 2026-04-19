/* ==========================================================
   mock-data.js — 전체 더미 데이터
   ========================================================== */

const MockData = (() => {

  /* ----------------------------------------------------------
     1. 사용자
     ---------------------------------------------------------- */
  const users = [
    {
      id: 'u001',
      name: '김민준',
      email: 'min****@gmail.com',
      phone: '010-****-4521',
      birthYear: 1978,
      gender: '남',
      height: 175,
      weight: 78,
      plan: 'paid',
      expireDate: '2026-12-31',
      deviceConnected: true,
      grade: 'caution',
    },
    {
      id: 'u002',
      name: '이서연',
      email: 'seo****@naver.com',
      phone: '010-****-8834',
      birthYear: 1985,
      gender: '여',
      height: 162,
      weight: 55,
      plan: 'demo',
      expireDate: '2026-05-17',
      deviceConnected: true,
      grade: 'normal',
    },
    {
      id: 'u003',
      name: '박도현',
      email: 'doh****@kakao.com',
      phone: '010-****-2290',
      birthYear: 1965,
      gender: '남',
      height: 170,
      weight: 85,
      plan: 'paid',
      expireDate: '2026-10-15',
      deviceConnected: true,
      grade: 'danger',
    },
    {
      id: 'u004',
      name: '최지우',
      email: 'jiw****@gmail.com',
      phone: '010-****-6617',
      birthYear: 1992,
      gender: '여',
      height: 158,
      weight: 50,
      plan: 'demo',
      expireDate: '2026-04-30',
      deviceConnected: false,
      grade: 'abnormal',
    },
  ];

  /* ----------------------------------------------------------
     2. 오늘 건강 요약 (u001 기준)
     ---------------------------------------------------------- */
  const todaySummary = {
    userId: 'u001',
    date: '2026-04-17',
    healthScore: 72,
    grade: 'caution',
    gradeLabel: '주의',
    aiOpinion: '오늘은 심박수가 평소보다 약간 높게 유지되고 있으며, 수면 품질이 다소 저하되었습니다. 활동량은 권장 기준에 근접하였으나, 저녁 시간대 스트레스 지수가 상승한 것이 관찰됩니다. 충분한 수분 섭취와 취침 전 이완 활동을 권장드립니다.',
    metrics: {
      heartRate: {
        label: '심박수',
        measured: 82,
        unit: 'bpm',
        standard: '60–100',
        status: 'caution',
        change: +4,
        changeDir: 'up',
      },
      spo2: {
        label: '혈중산소포화도',
        measured: 97,
        unit: '%',
        standard: '95–100',
        status: 'normal',
        change: 0,
        changeDir: 'flat',
      },
      sleep: {
        label: '수면 시간',
        measured: 5.8,
        unit: '시간',
        standard: '7–9',
        status: 'caution',
        change: -0.7,
        changeDir: 'down',
      },
      stress: {
        label: '스트레스 지수',
        measured: 64,
        unit: '점',
        standard: '0–40',
        status: 'abnormal',
        change: +12,
        changeDir: 'up',
      },
      steps: {
        label: '걸음 수',
        measured: 7842,
        unit: '보',
        standard: '10,000',
        status: 'caution',
        change: +320,
        changeDir: 'up',
      },
      calories: {
        label: '소모 칼로리',
        measured: 412,
        unit: 'kcal',
        standard: '300+',
        status: 'normal',
        change: +18,
        changeDir: 'up',
      },
      bodyTemp: {
        label: '체온',
        measured: null,
        unit: '°C',
        standard: '36.1–37.2',
        status: 'no-data',
        change: null,
        changeDir: 'flat',
      },
      respRate: {
        label: '호흡수',
        measured: null,
        unit: '회/분',
        standard: '12–20',
        status: 'no-data',
        change: null,
        changeDir: 'flat',
      },
    },
    sleepStages: {
      deep: 18,    // %
      light: 47,   // %
      rem: 22,     // %
      awake: 13,   // %
    },
    steps: {
      goal: 10000,
      done: 7842,
    },
    calories: {
      goal: 500,
      done: 412,
    },
    activeTime: {
      goal: 60,
      done: 43,
    },
  };

  /* ----------------------------------------------------------
     3. 24시간 시계열 데이터 (일간 리포트용)
     ---------------------------------------------------------- */
  function generateHourlyData() {
    const hours = [];
    const base = {
      heartRate: [62,60,58,59,61,65,72,78,82,85,83,80,79,82,84,86,83,80,78,76,74,72,70,68],
      spo2:      [98,98,99,99,98,97,97,97,96,97,97,97,98,97,96,97,97,98,98,98,98,98,98,98],
      stress:    [20,18,16,15,18,25,35,48,55,60,58,52,48,55,62,68,64,58,52,45,40,35,28,22],
      steps:     [0,0,0,0,0,20,180,620,850,730,690,440,820,610,720,880,540,430,310,290,210,180,100,20],
    };

    for (let h = 0; h < 24; h++) {
      hours.push({
        hour: h,
        label: `${String(h).padStart(2,'0')}:00`,
        heartRate: base.heartRate[h],
        spo2: base.spo2[h],
        stress: base.stress[h],
        steps: base.steps[h],
        calories: Math.round(base.steps[h] * 0.04 + 5),
      });
    }
    return hours;
  }

  /* ----------------------------------------------------------
     4. 7일 트렌드 데이터 (주간 리포트용)
     ---------------------------------------------------------- */
  function generateWeeklyData() {
    const days = [];
    const labels = ['4/11','4/12','4/13','4/14','4/15','4/16','4/17'];
    const heartRates = [75, 78, 74, 80, 76, 79, 82];
    const steps      = [9200,8400,10100,7600,9800,8200,7842];
    const sleep      = [7.2, 6.8, 7.5, 6.1, 7.0, 5.8, 5.8];
    const grades     = ['normal','normal','normal','caution','normal','caution','caution'];

    for (let i = 0; i < 7; i++) {
      days.push({
        date: labels[i],
        heartRate: heartRates[i],
        steps: steps[i],
        sleep: sleep[i],
        calories: Math.round(steps[i] * 0.04 + 100),
        grade: grades[i],
      });
    }
    return days;
  }

  /* ----------------------------------------------------------
     5. 30일 캘린더 데이터 (월간 리포트용)
     ---------------------------------------------------------- */
  function generateMonthlyData() {
    const grades = [
      'normal','normal','caution','normal','normal',
      'normal','caution','caution','normal','normal',
      'abnormal','caution','normal','normal','normal',
      'caution','normal','normal','caution','caution',
      'danger','abnormal','caution','normal','normal',
      'normal','caution','normal','caution','normal',
    ];
    return grades.map((grade, i) => ({
      day: i + 1,
      grade,
      heartRate: 70 + Math.round(Math.random() * 20),
      steps: 6000 + Math.round(Math.random() * 5000),
    }));
  }

  /* ----------------------------------------------------------
     6. 환자 목록 (의사/상담사용)
     ---------------------------------------------------------- */
  const patientList = [
    { id:'u003', name:'박도현', age:61, gender:'남', grade:'danger',
      gradeLabel:'위험', lastUpdated:'2시간 전', reviewed:false,
      mainIssue:'심박수 지속 이상 상승 (110+ bpm)' },
    { id:'u004', name:'최지우', age:34, gender:'여', grade:'abnormal',
      gradeLabel:'이상', lastUpdated:'4시간 전', reviewed:false,
      mainIssue:'SpO2 저하 반복 (92–94%)' },
    { id:'u001', name:'김민준', age:48, gender:'남', grade:'caution',
      gradeLabel:'주의', lastUpdated:'6시간 전', reviewed:true,
      mainIssue:'수면 품질 저하, 스트레스 지수 상승' },
    { id:'u002', name:'이서연', age:41, gender:'여', grade:'normal',
      gradeLabel:'정상', lastUpdated:'1일 전', reviewed:true,
      mainIssue:'-' },
  ];

  /* ----------------------------------------------------------
     7. 상담 이력
     ---------------------------------------------------------- */
  const counselingHistory = [
    { id:'c001', userId:'u003', userName:'박도현',
      date:'2026-04-16 14:30', duration:'22분',
      summary:'심박수 이상 관련 전화 상담. 평소보다 숨이 차다고 호소. 병원 방문 권유.',
      followUp:'삼성서울병원 심장내과 예약 진행 예정',
      counselor:'이지영 상담사' },
    { id:'c002', userId:'u001', userName:'김민준',
      date:'2026-04-14 10:15', duration:'15분',
      summary:'스트레스 지수 지속 상승. 업무 과부하로 수면 부족 호소.',
      followUp:'1주일 후 재상담 예약',
      counselor:'이지영 상담사' },
    { id:'c003', userId:'u004', userName:'최지우',
      date:'2026-04-12 16:00', duration:'18분',
      summary:'SpO2 저하 증상 확인. 천식 병력 있음. 기존 약 복용 여부 확인.',
      followUp:'호흡기내과 방문 권유',
      counselor:'박성민 상담사' },
  ];

  /* ----------------------------------------------------------
     8. AI 건강 조언 (u001 기준)
     ---------------------------------------------------------- */
  const aiAdvice = {
    userId: 'u001',
    date: '2026-04-17',
    statusSummary: '최근 7일간 수면 부족과 스트레스 지수 상승이 지속되고 있습니다. 심박수는 전반적으로 안정 범위이나 주의가 필요합니다.',
    items: [
      {
        topic: 'exercise',
        topicLabel: '운동',
        icon: '🏃',
        status: 'caution',
        title: '걸음수 목표 달성률 78%',
        desc: '일평균 7,842보로 목표(10,000보)에 미달하고 있습니다. 점심 후 15분 걷기를 추가해 보세요.',
        tips: ['점심 후 짧은 산책 추가', '엘리베이터 대신 계단 이용', '저녁 30분 가벼운 유산소 권장'],
      },
      {
        topic: 'diet',
        topicLabel: '식단',
        icon: '🥗',
        status: 'normal',
        title: '칼로리 소모 적절',
        desc: '활동 칼로리 소모는 목표 범위 내에 있습니다. 규칙적인 식사 시간을 유지하면 더 좋습니다.',
        tips: ['규칙적인 식사 시간 유지', '충분한 수분 섭취 (1.5L 이상/일)', '야식 자제 권장'],
      },
      {
        topic: 'sleep',
        topicLabel: '수면',
        icon: '😴',
        status: 'caution',
        title: '수면 시간 부족 (5.8시간)',
        desc: '권장 수면 시간(7–9시간)보다 1시간 이상 부족합니다. 수면의 질도 저하되고 있습니다.',
        tips: ['취침 1시간 전 스마트폰 사용 자제', '규칙적인 취침·기상 시간 설정', '취침 전 가벼운 스트레칭'],
      },
      {
        topic: 'stress',
        topicLabel: '스트레스',
        icon: '🧘',
        status: 'abnormal',
        title: '스트레스 지수 주의 (64점)',
        desc: '최근 3일간 스트레스 지수가 지속 상승 중입니다. 이완 활동이 필요합니다.',
        tips: ['하루 10분 명상 또는 복식호흡', '주 2회 이상 가벼운 운동', '업무 중 주기적 휴식 (매 1시간마다)'],
      },
      {
        topic: 'lifestyle',
        topicLabel: '생활 패턴',
        icon: '⏰',
        status: 'caution',
        title: '오전 활동 집중, 저녁 비활동',
        desc: '활동량이 오전에 집중되어 있고 오후 8시 이후 완전 비활동 상태입니다.',
        tips: ['저녁 가벼운 걷기 추가', '장시간 앉아있는 경우 1시간마다 기지개', '활동 시간 고르게 분배'],
      },
      {
        topic: 'cardiovascular',
        topicLabel: '심혈관',
        icon: '❤️',
        status: 'normal',
        title: '심박수·SpO2 안정',
        desc: '심박수와 혈중산소포화도는 정상 범위를 유지하고 있습니다. 현재 상태를 잘 유지하세요.',
        tips: ['주 3회 이상 유산소 운동 유지', '과음·흡연 자제', '정기적인 혈압 측정 권장'],
      },
    ],
  };

  /* ----------------------------------------------------------
     9. 직원 목록
     ---------------------------------------------------------- */
  const staff = [
    { id:'d001', name:'김태호', role:'doctor', dept:'순환기내과', status:'active' },
    { id:'d002', name:'정수민', role:'doctor', dept:'내분비내과', status:'active' },
    { id:'c001', name:'이지영', role:'counselor', dept:'상담팀', status:'active' },
    { id:'c002', name:'박성민', role:'counselor', dept:'상담팀', status:'active' },
  ];

  /* ----------------------------------------------------------
     공개 API
     ---------------------------------------------------------- */
  return {
    users,
    todaySummary,
    patientList,
    counselingHistory,
    aiAdvice,
    staff,
    getHourlyData: generateHourlyData,
    getWeeklyData: generateWeeklyData,
    getMonthlyData: generateMonthlyData,

    // report-daily.html 에서 사용 — 컬럼형(배열) 포맷으로 반환
    generateHourlyData: () => {
      const rows = generateHourlyData();
      return {
        heartRate: rows.map(r => r.heartRate),
        spo2:      rows.map(r => r.spo2),
        stress:    rows.map(r => r.stress),
        steps:     rows.map(r => r.steps),
        calories:  rows.map(r => r.calories),
        labels:    rows.map(r => r.label),
      };
    },
    // report-weekly.html 에서 사용 (alias)
    generateWeeklyData: generateWeeklyData,
    getUser: (id) => users.find(u => u.id === id),
    getPatient: (id) => patientList.find(p => p.id === id),

    gradeConfig: {
      normal:   { label: '정상', color: '#16a34a', bg: '#f0fdf4', cls: 'normal' },
      caution:  { label: '주의', color: '#ca8a04', bg: '#fefce8', cls: 'caution' },
      abnormal: { label: '이상', color: '#ea580c', bg: '#fff7ed', cls: 'abnormal' },
      danger:   { label: '위험', color: '#dc2626', bg: '#fef2f2', cls: 'danger' },
    },
  };

})();
