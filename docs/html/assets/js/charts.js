/* ==========================================================
   charts.js — 차트 렌더링 유틸 (Chart.js 기반)
   ========================================================== */

const Charts = (() => {

  /* 공통 폰트/컬러 설정 */
  const defaults = {
    font: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
    gridColor: 'rgba(0,0,0,0.06)',
    textColor: '#6b7280',
  };

  /* 판정 등급 컬러 */
  const gradeColors = {
    normal:   '#16a34a',
    caution:  '#ca8a04',
    abnormal: '#ea580c',
    danger:   '#dc2626',
  };

  /* Chart.js 전역 기본값 설정 */
  function initDefaults() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.font.family = defaults.font;
    Chart.defaults.font.size = 11;
    Chart.defaults.color = defaults.textColor;
    Chart.defaults.plugins.legend.labels.boxWidth = 10;
    Chart.defaults.plugins.legend.labels.padding = 16;
  }

  /* ----------------------------------------------------------
     1. 24시간 라인 차트 (일간 리포트)
     ---------------------------------------------------------- */
  function renderDailyLine(canvasId, hourlyData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const labels = hourlyData.map(d => d.label);

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '심박수 (bpm)',
            data: hourlyData.map(d => d.heartRate),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.08)',
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 5,
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
          },
          {
            label: 'SpO2 (%)',
            data: hourlyData.map(d => d.spo2),
            borderColor: '#16a34a',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 5,
            tension: 0.4,
            yAxisID: 'y2',
          },
          {
            label: '스트레스',
            data: hourlyData.map(d => d.stress),
            borderColor: '#ea580c',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [4, 3],
            pointRadius: 0,
            tension: 0.4,
            yAxisID: 'y',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              title: (items) => `${items[0].label}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: defaults.gridColor },
            ticks: { maxTicksLimit: 12 },
          },
          y: {
            position: 'left',
            min: 40,
            max: 120,
            grid: { color: defaults.gridColor },
            title: { display: true, text: 'bpm / 점수' },
          },
          y2: {
            position: 'right',
            min: 85,
            max: 100,
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'SpO2 (%)' },
          },
        },
      },
    });
  }

  /* ----------------------------------------------------------
     2. 7일 바+라인 복합 차트 (주간 리포트)
     ---------------------------------------------------------- */
  function renderWeeklyBar(canvasId, weeklyData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weeklyData.map(d => d.date),
        datasets: [
          {
            label: '걸음 수',
            data: weeklyData.map(d => d.steps),
            backgroundColor: weeklyData.map(d =>
              d.steps >= 10000 ? 'rgba(22,163,74,0.7)' : 'rgba(37,99,235,0.6)'
            ),
            borderColor: weeklyData.map(d =>
              d.steps >= 10000 ? '#16a34a' : '#2563eb'
            ),
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: 'y',
          },
          {
            label: '심박수 (bpm)',
            data: weeklyData.map(d => d.heartRate),
            type: 'line',
            borderColor: '#ea580c',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#ea580c',
            tension: 0.3,
            yAxisID: 'y2',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
          x: { grid: { color: defaults.gridColor } },
          y: {
            position: 'left',
            min: 0,
            grid: { color: defaults.gridColor },
            title: { display: true, text: '걸음 수' },
          },
          y2: {
            position: 'right',
            min: 50,
            max: 110,
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'bpm' },
          },
        },
      },
    });
  }

  /* ----------------------------------------------------------
     3. 30일 추세 라인 차트 (월간 리포트)
     ---------------------------------------------------------- */
  function renderMonthlyLine(canvasId, monthlyData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyData.map(d => `${d.day}일`),
        datasets: [
          {
            label: '심박수 (bpm)',
            data: monthlyData.map(d => d.heartRate),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.05)',
            borderWidth: 2,
            pointRadius: 3,
            fill: true,
            tension: 0.3,
          },
          {
            label: '걸음수 (÷100)',
            data: monthlyData.map(d => Math.round(d.steps / 100)),
            borderColor: '#16a34a',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [4, 3],
            pointRadius: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
          x: {
            grid: { color: defaults.gridColor },
            ticks: { maxTicksLimit: 10 },
          },
          y: {
            grid: { color: defaults.gridColor },
          },
        },
      },
    });
  }

  /* ----------------------------------------------------------
     4. 원형 게이지 (SVG — 건강 점수)
     ---------------------------------------------------------- */
  function renderGauge(containerId, score, grade) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const color = gradeColors[grade] || '#2563eb';
    const r = 54;
    const circumference = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(100, score));
    const offset = circumference - (pct / 100) * circumference;

    container.innerHTML = `
      <svg width="140" height="140" viewBox="0 0 140 140"
           role="img" aria-label="건강 점수 ${score}점">
        <circle cx="70" cy="70" r="${r}"
          fill="none" stroke="#e5e7eb" stroke-width="12"/>
        <circle cx="70" cy="70" r="${r}"
          fill="none" stroke="${color}" stroke-width="12"
          stroke-linecap="round"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
          transform="rotate(-90 70 70)"
          style="transition: stroke-dashoffset 1s ease"/>
        <text x="70" y="65" text-anchor="middle"
          font-size="28" font-weight="700"
          fill="${color}" font-family="inherit">${score}</text>
        <text x="70" y="84" text-anchor="middle"
          font-size="11" fill="#6b7280"
          font-family="inherit">건강 점수</text>
      </svg>`;
  }

  /* ----------------------------------------------------------
     5. 헬스 링 (SVG — 걸음수/칼로리/활동시간)
     ---------------------------------------------------------- */
  function renderHealthRing(containerId, steps, calories, activeMin) {
    const container = document.getElementById(containerId);
    if (!container) return;

    function ring(r, pct, color, trackColor) {
      const c = 2 * Math.PI * r;
      const offset = c - (Math.min(1, pct) * c);
      return `
        <circle cx="70" cy="70" r="${r}"
          fill="none" stroke="${trackColor}" stroke-width="10"/>
        <circle cx="70" cy="70" r="${r}"
          fill="none" stroke="${color}" stroke-width="10"
          stroke-linecap="round"
          stroke-dasharray="${c}"
          stroke-dashoffset="${offset}"
          transform="rotate(-90 70 70)"
          style="transition: stroke-dashoffset 0.8s ease"/>`;
    }

    const stepsPct    = steps.done / steps.goal;
    const calsPct     = calories.done / calories.goal;
    const activePct   = activeMin.done / activeMin.goal;

    container.innerHTML = `
      <svg width="140" height="140" viewBox="0 0 140 140"
           role="img" aria-label="헬스 링">
        ${ring(54, stepsPct,  '#dc2626', '#fee2e2')}
        ${ring(42, calsPct,   '#f97316', '#ffedd5')}
        ${ring(30, activePct, '#16a34a', '#dcfce7')}
      </svg>`;
  }

  /* ----------------------------------------------------------
     6. 24시간 히트맵 (CSS Grid)
     ---------------------------------------------------------- */
  function renderHeatmap(containerId, hourlyData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const max = Math.max(...hourlyData.map(d => d.heartRate));
    const min = Math.min(...hourlyData.map(d => d.heartRate));

    const cells = hourlyData.map(d => {
      const pct = (d.heartRate - min) / (max - min);
      const alpha = 0.15 + pct * 0.75;
      return `<div class="heatmap__cell"
        style="background:rgba(37,99,235,${alpha.toFixed(2)})"
        title="${d.label} 심박수: ${d.heartRate}bpm">
        <span class="heatmap__label">${d.hour}시</span>
      </div>`;
    }).join('');

    container.innerHTML = `<div class="heatmap__grid">${cells}</div>`;
  }

  /* ----------------------------------------------------------
     7. 수면 단계 바
     ---------------------------------------------------------- */
  function renderSleepBar(containerId, stages) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = [
      { label: '깊은 수면', key: 'deep',  color: '#1e3a5f', value: stages.deep },
      { label: '얕은 수면', key: 'light', color: '#3b82f6', value: stages.light },
      { label: 'REM',       key: 'rem',   color: '#8b5cf6', value: stages.rem },
      { label: '각성',      key: 'awake', color: '#e5e7eb', value: stages.awake },
    ];

    const bar = items.map(i =>
      `<div class="sleep-bar__segment"
        style="width:${i.value}%;background:${i.color}"
        title="${i.label}: ${i.value}%"></div>`
    ).join('');

    const legend = items.map(i =>
      `<span class="sleep-bar__legend-item">
        <span class="sleep-bar__dot" style="background:${i.color}"></span>
        ${i.label} ${i.value}%
      </span>`
    ).join('');

    container.innerHTML = `
      <div class="sleep-bar__track">${bar}</div>
      <div class="sleep-bar__legend">${legend}</div>`;
  }

  /* ----------------------------------------------------------
     8. 스파크라인 (SVG polyline)
     ---------------------------------------------------------- */
  function renderSparkline(svgEl, values, color = '#2563eb') {
    if (!svgEl || !values || values.length < 2) return;

    const w = svgEl.clientWidth  || 80;
    const h = svgEl.clientHeight || 32;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const pad = 2;

    const points = values.map((v, i) => {
      const x = pad + (i / (values.length - 1)) * (w - pad * 2);
      const y = pad + ((max - v) / range) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    svgEl.innerHTML = `
      <polyline points="${points}"
        fill="none" stroke="${color}"
        stroke-width="1.5" stroke-linejoin="round"
        stroke-linecap="round"/>`;
  }

  /* ----------------------------------------------------------
     9. 캘린더 히트맵 (월간)
     ---------------------------------------------------------- */
  function renderCalendarHeatmap(containerId, monthlyData, year, month) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const colors = {
      normal:   '#bbf7d0',
      caution:  '#fef08a',
      abnormal: '#fed7aa',
      danger:   '#fecaca',
      none:     '#f3f4f6',
    };

    const firstDay = new Date(year, month - 1, 1).getDay();
    const totalDays = new Date(year, month, 0).getDate();
    const dayLabels = ['일','월','화','수','목','금','토'];

    let html = '<div class="cal-heatmap">';
    html += dayLabels.map(d =>
      `<div class="cal-heatmap__header">${d}</div>`
    ).join('');

    for (let i = 0; i < firstDay; i++) {
      html += '<div class="cal-heatmap__empty"></div>';
    }

    for (let d = 1; d <= totalDays; d++) {
      const dayData = monthlyData.find(m => m.day === d);
      const bg = dayData ? colors[dayData.grade] : colors.none;
      const title = dayData ? `${d}일: ${dayData.grade}` : `${d}일`;
      html += `<div class="cal-heatmap__day"
        style="background:${bg}" title="${title}">${d}</div>`;
    }

    html += '</div>';
    container.innerHTML = html;
  }

  /* ----------------------------------------------------------
     초기화 & 공개 API
     ---------------------------------------------------------- */
  return {
    init: initDefaults,
    renderDailyLine,
    renderWeeklyBar,
    renderMonthlyLine,
    renderGauge,
    renderHealthRing,
    renderHeatmap,
    renderSleepBar,
    renderSparkline,
    renderCalendarHeatmap,
    gradeColors,
  };

})();

/* DOM 준비 후 Chart.js 기본값 적용 */
document.addEventListener('DOMContentLoaded', () => Charts.init());
