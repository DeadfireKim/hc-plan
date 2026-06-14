# 도메인 용어집 (Domain Glossary)

> hc-plan (HealthCare Watch) 프로젝트의 공식 용어 정의서.
> 같은 단어를 다른 의미로 쓰지 않도록, 코드·UI·문서 어디서나 일관된 명칭을 사용하기 위한 기준 문서입니다.

- **최종 갱신**: 2026-06-14
- **적용 범위**: `docs/html2/**` 목업 전체, 향후 구현될 백엔드 API·DB 스키마·프론트엔드 컴포넌트

---

## 1. 역할 (Role) — 5종

시스템 권한은 5개 역할로 분류합니다. 권한 매트릭스 정의는 `docs/html2/pc-admin/permissions.html`.

| UI 라벨 (한글) | 영문 식별자 | 핵심 정의 | 주 사용 화면 |
|---|---|---|---|
| **관리자** | `operator` | 시스템 슈퍼유저. 모든 기능 ON 고정, UI에서 변경 불가 | 관리자 포털 전체 |
| **와치관리자** | `watch` | 병원·기관 운영 인력. 와치 기기·매칭 관리 + 대시보드·공지사항 운영. 개인 건강 데이터 열람 제한 | 관리자 포털 (운영 인력 관리) |
| **의료진** | `medical` | 담당 시니어 건강 데이터 열람·수정, 소견서 작성. CSV 원본 내보내기. 위치 차단 | 모바일 앱 |
| **시니어** | `senior` | 서비스 주 사용자. 데이터 소유자(Owner). 본인 결정이 모든 관리자 설정보다 우선 | 모바일 앱 |
| **보호자** | `child` | 시니어가 허용한 범위에서 데이터 조회·알림 수신. 소견서·CSV는 차단 | 모바일 앱 |

### 영문 식별자(role key) 사용 원칙
- **DB·API·코드에서는 영문 식별자**를 그대로 사용 — 변경 금지(호환성)
- **UI 라벨만 한국어 통일된 용어** 사용
- `child`는 historical naming. 의미는 "역할로서의 보호자"이며, 가족 관계로서의 "자녀"와는 다른 개념(아래 §2 참조)

### CSS 클래스 매핑 (현황)
페이지마다 클래스명이 약간씩 다르므로 통일이 필요한 부분입니다.

| role key | permissions.html | operators.html | accounts.html |
|---|---|---|---|
| operator | `.role-card.operator` / `.role-chip.operator` | `.role-super` (관리자), `.role-op` (dead CSS 잔재) | — |
| watch | `.role-card.watch` / `.role-chip.watch` | `.role-watch` | — |
| medical | `.role-card.medical` / `.role-chip.medical` | `.role-medical` | — |
| senior | `.role-card.senior` / `.role-chip.senior` | — | `.role-senior` |
| child | `.role-card.child` / `.role-chip.child` | — | `.role-child` |

⚠️ **TODO**: 디자인 시스템 구축 시 `.role-{key}` 패턴으로 통일 권장.

---

## 2. 가족 관계 (Family Relationship)

역할로서의 "보호자"와 별개로, 시니어의 가족 구성원을 가리키는 표현입니다.

| 표현 | 의미 | 사용처 |
|---|---|---|
| **자녀** | 시니어의 아들·딸 (혈연 가족 관계) | 비상 연락처 관계, 가족 소개 텍스트 |
| **배우자** | 시니어의 배우자 | 비상 연락처 관계 |
| **이웃** | 시니어 인근 거주자 | 비상 연락처 관계 |
| **주치의** | 시니어의 담당 의사 | 비상 연락처 관계 |

### ❗ "자녀"와 "보호자"의 구분 원칙

| 용어 | 의미 | 예시 |
|---|---|---|
| 보호자 | 역할(role)로서 — 시니어를 돌보는 사람 (`role=child`) | "보호자 알림 수신", "보호자 권한" |
| 자녀 | 가족 관계로서 — 시니어의 아들·딸 | "비상 연락처 자녀 이민준 010-1234-5678" |

```
✅ "보호자(이민준) — 와치 알림 수신"             (역할)
✅ "비상 연락처 자녀(이민준) 010-1234-5678"      (가족 관계)
❌ "자녀 권한"  → "보호자 권한"
❌ "보호자 김순자의 아들"  → "시니어 김순자의 자녀(=보호자 이민준)"
```

---

## 3. 메뉴/페이지 도메인

각 메뉴가 다루는 대상이 명확히 분리되어 있습니다.

| 메뉴 | 다루는 대상 | 도메인 |
|---|---|---|
| 👨‍💼 **운영 인력 관리** (`operators.html`) | 와치관리자 + 의료진 | 병원·기관 직원 |
| 👥 **계정 관리** (`accounts.html`) | 시니어 + 보호자 | 앱 사용자 |
| 👨‍👩‍👧 **가족 그룹** (`family-groups.html`) | 시니어 ↔ 보호자 그룹 단위 묶음 | 시니어-보호자 관계망 |
| 🛡️ **권한 관리** (`permissions.html`) | 5개 역할의 RBAC 매트릭스 | 권한 정책 |
| 🏥 **병원·기관 관리** (`hospitals.html`) | 의료기관·요양기관 | 조직 |

### 파일명 ↔ 메뉴명
| 파일명 | UI 메뉴명 |
|---|---|
| `operators.html` | 운영 인력 관리 (※ 파일명은 historical naming, 의미는 운영 인력) |
| `accounts.html` | 계정 관리 |
| `family-groups.html` | 가족 그룹 |
| `permissions.html` | 권한 관리 |

---

## 4. 와치 기기 (Watch Device)

시니어의 건강 데이터를 수집하는 wearable. **소유 방식이 두 가지로 갈리며**, 이에 따라 페어링·회수·권한이 모두 분기됩니다.

### 4.1 소유 유형 (`ownership_type`)

| 유형 | 영문 키 | 의미 | 조달 주체 | 페어링 주도자 |
|---|---|---|---|---|
| **대여형** | `rental` | 병원·지자체가 보유한 기기를 시니어에게 대여 | 기관 | 와치관리자 |
| **본인형** | `personal` | 시니어가 직접 구매·보유 | 시니어 본인 | 시니어/보호자 (셀프) |

### 4.2 지원 브랜드와 Tier 정책

본 시스템은 *모든* 와치를 지원하지 않습니다. 데이터 정확도·법적 책임·보안을 위해 **화이트리스트 기반**으로 운영합니다.

**기본 원칙**
- `rental`(대여형): **HealthWatch 자체 와치만 허용** — 기관이 일괄 구매·관리, 검증된 펌웨어만 운용
- `personal`(본인형): 사전 검증된 브랜드만 페어링 허용. 비지원 브랜드는 셀프 페어링 단계에서 차단

### 지원 등급 (`support_tier`)

| Tier | 영문 키 | 브랜드·모델 (대표) | 데이터 접근 방식 | 정확도 | UI 표시 |
|---|---|---|---|---|---|
| **Tier 1** | `tier1` | HealthWatch (자체) · Apple Watch · Galaxy Watch | Native / HealthKit / Health Connect | 의료급 | ✅ 녹색 배지 |
| **Tier 2** | `tier2` | Fitbit · Garmin · COROS | 공식 OAuth API | 일부 항목 누락 | ⚠️ 노란 배지 |
| **Tier 3** | `tier3` | Xiaomi Mi Band · Amazfit | 비공식 / 클라우드 우회 | 끊김 잦음 | 🧪 회색 배지 (실험적) |
| **Tier X** | `unsupported` | 위 외 전체 | — | 페어링 차단 | ❌ |

### Tier별 수집 가능 데이터 (대표 예시)

| 데이터 항목 | Tier 1 | Tier 2 | Tier 3 |
|---|:-:|:-:|:-:|
| 심박수 (실시간) | ✔ | ✔ | △ |
| SpO₂ (혈중 산소) | ✔ | ✔ | △ |
| 걸음수·활동량 | ✔ | ✔ | ✔ |
| 수면 패턴 | ✔ | ✔ | △ |
| 혈압 | ✔ (지원 모델만) | ✘ | ✘ |
| ECG (심전도) | ✔ (지원 모델만) | ✘ | ✘ |
| 낙상 감지 | ✔ | △ | ✘ |
| GPS·위치 | ✔ | ✔ | △ |

✔ 정상 수집 · △ 일부 데이터만 · ✘ 미수집

### 운영 정책

- **화이트리스트 업데이트**: 분기별 1회, 새 모델 검증을 거쳐 추가
- **Tier 강등** (Tier 1 → Tier 2 등): 제조사 정책 변경 시 — 기존 사용자에게 **90일 사전 고지**
- **미지원 브랜드 페어링 시도**: 모바일에서 차단 + "지원 예정 리스트"로 가이드
- **시니어 안내** (셀프 페어링 완료 시):
  - Tier 2: "혈압·ECG는 수집되지 않습니다"
  - Tier 3: "데이터가 끊길 수 있어요. 안정적 사용을 위해 Tier 1 와치를 권장합니다"

### 4.3 데이터 모델 (개념)

```
device
├─ id
├─ serial_no
├─ brand: 'healthwatch'|'apple'|'samsung'|'xiaomi'|'fitbit'|'garmin'|'coros'|'amazfit'|...
├─ model: 'A2X'|'Watch Ultra 2'|'Galaxy Watch 6'|'Mi Band 8'|...
├─ support_tier: 'tier1'|'tier2'|'tier3'  ← brand+model로부터 자동 산정
├─ capabilities: { heart_rate, spo2, ecg, blood_pressure, fall_detection, gps, sleep, ... }
├─ data_source: 'native'|'healthkit'|'health_connect'|'fitbit_api'|'garmin_connect'|...
├─ ownership_type: 'rental' | 'personal'
├─ owner_org_id    (rental일 때만 채움)    ← 소속 기관
├─ owner_user_id   (personal일 때만 채움)  ← 시니어 본인
└─ status                                   ← 아래 §4.4

senior_device_assignment   -- 활성 매핑 (시니어 1 ↔ 기기 1)
├─ senior_id
├─ device_id
├─ paired_at
└─ status

senior_device_history      -- 종료된 매핑 누적 (감사 추적)
├─ senior_id
├─ device_id
├─ paired_at
├─ ended_at
└─ end_reason   ← 만료/분실/사망/교체/사용자요청
```

**제약 조건 (DB 레벨)**
- `ownership_type='rental'` AND `brand != 'healthwatch'` → 위반 (rental은 자체 와치만)
- `support_tier='unsupported'` → 페어링 자체 차단 (active로 저장 불가)
- `support_tier`는 `brand+model` 매핑 테이블에서 자동 산정 — 수동 입력 금지

**핵심 원칙**: 건강 데이터는 *기기*가 아닌 *시니어 계정*에 귀속됩니다. 기기를 회수해도 데이터는 시니어에 남고, 다음 대여자에게는 격리되어야 합니다 (data partition by `senior_id`).

### 4.4 기기 상태 머신

**대여형 (`rental`)** — 7단계 lifecycle

```
미등록 ─입고─▶ 재고 ─배정─▶ 페어링대기 ─첫 데이터 수신─▶ 사용중
              ▲                                              │
              │                                              ▼
       재고복귀 ◀─ 점검중 ◀─ 회수대기 ◀──────회수 요청──────┘
                                                              │
                                          폐기 ◀──────────────┘
```

**본인형 (`personal`)** — 단순 lifecycle (재고 개념 없음)

```
페어링대기 ─셀프 페어링 완료─▶ 사용중 ─시니어 신고─▶ 분실 / 폐기
```

**상태 영문 키**

| 키 | 의미 | 적용 |
|---|---|---|
| `unregistered` | 미등록 | rental |
| `in_stock` | 재고 | rental |
| `pairing_wait` | 페어링대기 (시니어 배정 완료, 첫 데이터 미수신) | 공통 |
| `active` | 사용중 | 공통 |
| `retrieval_wait` | 회수대기 | rental |
| `maintenance` | 점검중 | rental |
| `returned_stock` | 재고복귀 (점검 통과) | rental |
| `lost` | 분실 | 공통 |
| `disposed` | 폐기 | 공통 |

### 4.5 페어링 진입점

| 진입점 | 대상 | 입력 수단 (우선순위) |
|---|---|---|
| **와치관리자 콘솔** (`pc-watch/devices.html`) | 대여형 | ① 박스 QR 스캔(입고) ② 기기 QR 스캔(배정) ③ BLE 근접 인식 ④ 시리얼 수기(폴백) |
| **모바일 셀프 페어링** (`mobile/watch-pairing.html`) | 본인형 | ① 기기 QR 스캔 ② BLE 근접 인식 + 본인 인증(SMS·생체) 1회 |

**시리얼 수기 입력은 폴백 전용** — QR 손상·라벨 누락 시에만 사용, UI에서 "고급" 토글 뒤로 숨김.

**페어링 시 Tier 검증 단계** (본인형 핵심 흐름)

```
① 기기 식별 (QR / BLE)
   ↓
② brand + model 추출
   ↓
③ support_tier 자동 산정  ←─ 화이트리스트 매핑 테이블 조회
   ↓
④ tier별 안내 표시          ←─ Tier 2/3은 제약 사전 고지
   ↓
⑤ 시니어 동의 (Tier 2/3만)
   ↓
⑥ active 등록
```

`support_tier='unsupported'`는 ②~③ 단계에서 차단됩니다. UI에는 "지원 예정 리스트로 안내".

### 4.6 권한 비교

| 항목 | 대여형 | 본인형 |
|---|---|---|
| 데이터 소유권 | 시니어 (계정 귀속) | 시니어 |
| 기기 소유권 | 기관 | 시니어 본인 |
| **허용 브랜드** | **HealthWatch 자체 와치만** | **Tier 1·2·3 화이트리스트** |
| **Tier 등급** | 항상 Tier 1 | 모델별 자동 산정 |
| 와치관리자 회수 권한 | ✔ | ✘ (조회만) |
| 분실 처리 | 기관 자산 손실 + 시니어 면책 정책 | 시니어 본인 책임 |
| 페어링 인증 | 와치관리자 신원으로 충분 | **시니어 본인 인증 필수** |
| 다음 사용자 격리 | **필수** (data partition by `senior_id`) | 해당 없음 (영구 1:1) |

### 4.7 회수 정책 (대여형 전용)

회수 시 사유 필수 기록.

| 사유 영문 키 | 의미 |
|---|---|
| `expired` | 대여 기간 만료 |
| `lost` | 분실 |
| `deceased` | 시니어 사망 |
| `replaced` | 기기 교체 (장애·업그레이드) |
| `user_request` | 시니어 요청 |

회수 즉시 처리:
1. 기기 상태 → `retrieval_wait`
2. `senior_device_assignment` 종료 → `senior_device_history`로 이관
3. **24시간 누락 데이터 업로드만 허용**, 신규 페어링 불가
4. 점검 통과 후 `returned_stock`(재고복귀) 또는 `disposed`(폐기)

### 4.8 하이브리드 케이스

- **대여 → 본인 전환**: 시니어가 대여 만료 후 같은 기기를 구매. `ownership_type`을 `rental → personal`로 변경하되 *전환 이력* 별도 테이블에 기록. 데이터·매핑은 그대로 유지.
- **대리 셀프 페어링**: 시니어가 본인 와치를 가져왔으나 모바일 사용이 어려워 와치관리자가 대신 페어링. `ownership_type=personal` 유지, *대리 등록 로그*에 와치관리자 ID 기록(감사 추적용).
- **브랜드 전환** (Tier 2/3 → Tier 1): 시니어가 사용 중인 기기를 더 상위 Tier로 교체. 데이터 마이그레이션은 시니어 계정 단위라 자동 — 단, 측정 항목이 늘어남에 따라 *이전 기간 데이터의 일관성 부족*을 안내.

---

## 5. 데이터 공개 범위 (Visibility) — 3단계

`permissions.html` 탭 2에서 사용. 시니어 건강 데이터를 어떤 수준으로 다른 역할에게 공개할지 정의.

| 옵션 | 의미 |
|---|---|
| **전체 공개** | 원본 측정값까지 모두 조회 가능 |
| **요약만** | 일 평균·범위 등 가공된 요약만 조회 |
| **비공개** | 항목 자체 비표시 |

### 우선순위 규칙
1. **관리자**는 항상 "전체 공개" 고정 — UI에서 변경 불가
2. **시니어 본인**이 앱에서 더 제한적으로 설정하면 관리자 설정보다 우선 적용

---

## 6. 측정 주기 (Measurement Frequency)

권한 매트릭스 탭 2의 점 색상 표시 (`.perm-freq`).

| 색 | 주기 | CSS 클래스 | 예시 데이터 |
|---|---|---|---|
| 🔴 | 실시간 | `.perm-freq.realtime` | 심박수, 걸음수·활동량 |
| 🔵 | 10분 단위 | `.perm-freq.interval` | 혈중 산소(SpO₂), 체온 |
| 🟢 | 1일 1회/집계 | `.perm-freq.daily` | 혈압, 체성분, 수면 패턴 |

---

## 7. 사생활 민감 표기 (`.perm-warn`)

`⚠ 사생활 민감` 배지가 붙은 항목은 권한 부여 시 신중을 요함.

### 현재 표기 항목
- 사회적 고립 위험 알림 (스마트폰 사용 패턴 기반)
- 위치 정보 조회
- 사용패턴·통신 분석
- 사회적 연결 지수 (고립 위험)

→ **의료진에게도 일부는 차단**(예: 위치 정보) — 진료 목적을 넘어선 사생활 침해 방지.

---

## 8. 권한 변경 이력 유형 (operators.html 기준)

운영 인력 관리 페이지의 변경 이력 카드에서 사용.

| 유형 | 영문 키 | 의미 | 배지 색상 |
|---|---|---|---|
| 업무 범위 | `scope` | 와치관리자의 대시보드/기기·매칭/공지사항/계정 조회 ON·OFF | 🟢 ON / 🔴 OFF |
| 활성 상태 | `status` | 계정 활성 ↔ 비활성 | 🟢 활성 / 🔴 비활성 |
| 계정 정보 | `info` | 직종·소속 부서·소속 병원 변경 | 🟠 update |
| 신규 생성 | `create` | 운영 인력 계정 초대 발송 | 🔵 create |

---

## 9. 정합 작업 변경 이력

### 9.1 "운영자" 폐지 → "와치관리자" 통합 (2026-05-25)
- `operators.html`의 `role:'op'` 사용자 3명(박운영·최서연·정재호)을 `role:'watch'`로 마이그레이션
- 통계 카드 4열 → 3열, 필터·모달의 "운영자" 옵션 제거
- 권한 매트릭스에서 "운영자" 컬럼 제거, 와치관리자에 권한 흡수
- `ROLE_LABEL.op`, `ROLE_HINT.op` 등 JS 상수 제거

### 9.2 "운영자 관리" 메뉴 → "운영 인력 관리" (2026-05-25)
- 11개 admin 페이지의 사이드바 텍스트 일괄 변경
- 의료진까지 포괄하는 명칭으로 통일
- 파일명은 `operators.html` 유지(링크 호환성)

### 9.3 "자녀" 역할 라벨 → "보호자" 통일 (2026-05-25)
- `accounts.html`의 role-badge·tab·JS 상수에서 "자녀" → "보호자"
- 가족 관계로 쓰인 "자녀"(비상 연락처 등)는 보존
- `permissions.html`의 역할 카드 description·role-sub 함께 정합

### 9.4 permissions.html 역할 카드 순서 변경 (2026-05-25)
- 기존: 시니어 → 자녀 → 의료진 → 와치 → 운영자
- 신규: **관리자 → 와치관리자 → 의료진 → 시니어 → 보호자**
- 탭 1/탭 2 헤더 컬럼·CSS nth-child 색상 강조선·매트릭스 셀까지 모두 재배치

### 9.5 와치관리자 설명 정합 (2026-05-25)
- 카드 description: "기기·매칭 관리 + 운영 포털(대시보드·공지사항) 운영. 개인 건강 데이터 열람 제한"
- 헤더 role-sub: "기기·매칭 + 운영"
- 매트릭스 권한 칸은 보수적으로 기존 유지

### 9.6 운영자 사이드바에서 "계정 관리" 제거 (2026-05-27)
- `pc-operator/dashboard.html`, `device.html`, `matching.html`, `notice.html` 4개 사이드바에서 "계정 관리" 항목 제거
- "계정 관리" 권한은 와치관리자(`pc-watch/`)로 일원화
- `pc-operator/matching.html` 파일과 dashboard 카드/퀵버튼 링크는 후속 정리 대상으로 잔존

### 9.7 와치 기기 소유 유형(ownership_type) 도입 (2026-05-27)
- 신규 §4 절 추가 — `rental`(대여) / `personal`(본인) 두 유형 정의
- 기기 상태 머신 9개 키 정의(`unregistered/in_stock/pairing_wait/active/retrieval_wait/maintenance/returned_stock/lost/disposed`)
- 페어링 진입점 2종 분기 — 와치관리자 콘솔(rental) / 모바일 셀프 페어링(personal)
- 회수 사유 5종(`expired/lost/deceased/replaced/user_request`), 데이터 격리·하이브리드 케이스 명시
- 영향 화면: `pc-watch/devices.html`(탭 분리), `mobile/watch-pairing.html`(신규)

### 9.8 와치 브랜드·Tier 매트릭스 도입 (2026-05-27)
- §4.2 "지원 브랜드와 Tier 정책" 신규 절 추가 — 화이트리스트 기반 운영
- 데이터 모델에 `brand`/`model`/`support_tier`/`capabilities`/`data_source` 5개 필드 추가
- Tier 4단계 정의: `tier1`(HealthWatch·Apple·Galaxy) / `tier2`(Fitbit·Garmin·COROS) / `tier3`(Xiaomi·Amazfit) / `unsupported`(차단)
- Tier별 수집 가능 데이터 매트릭스(심박·SpO₂·ECG·혈압·낙상·GPS 등 8종) 명시
- DB 제약: `rental` 브랜드는 `healthwatch`로 제한, `unsupported`는 active 저장 불가
- §4.5 페어링 진입점에 Tier 검증 6단계 흐름 추가
- §4.6 권한 비교에 "허용 브랜드"·"Tier 등급" 행 추가
- §4.8 하이브리드 케이스에 브랜드 전환(Tier 2/3 → 1) 시나리오 추가
- 영향 화면: `pc-watch/devices.html`(본인 보유 탭에 브랜드·Tier 컬럼), `mobile/watch-pairing.html`(BLE 리스트·완료 화면 Tier 표시)

### 9.10 값 표기 규칙(일자/일시) 도입 (2026-06-14)
- 부록 B 신규 추가 — `date`는 "일자", `datetime`은 "일시"로 UI 라벨 구분
- 영문 식별자는 코드·DB·API에서 유지, UI 라벨만 한국어 통일
- 영향 범위: 향후 모든 화면의 컬럼 헤더·폼 라벨·상세 표기

### 9.9 잔여 정리 항목 (백로그)
- `operators.html:247` `.role-op` dead CSS 잔재 제거
- CSS 클래스명 `.role-{key}` 패턴 통일 (디자인 시스템 작업 시)
- `operators.html` 파일명을 `staff.html` 등으로 변경할지 검토 (영향 범위 큼)
- `pc-operator/matching.html` 파일 자체 처리(삭제 vs 유지) — 9.6의 잔여
- `brand + model → support_tier` 매핑 테이블 별도 정의 (현재 본문에 예시만 존재)
- Tier 강등 시 90일 사전 고지 메커니즘 (알림 시스템과 연계 필요) — 9.8의 잔여

---

## 10. 변경 절차

용어집을 갱신할 때:

1. 이 문서(`docs/glossary.md`)를 먼저 수정해 새로운 정의를 합의
2. 영향 받는 파일 일괄 변경 (sidebar·라벨·JS 상수·CSS 클래스 순)
3. `docs/html2/pc-admin/permissions.html`의 권한 매트릭스에 반영 (필요 시)
4. 변경 이력을 §9에 추가 (날짜 + 사유 + 영향 파일)

---

## 부록 B. 값 표기 규칙 (일자 / 일시)

날짜·시간 값을 UI에 표시할 때 **시간 포함 여부**에 따라 라벨을 구분합니다.

| 데이터 형식 | 영문(코드·DB·API) | UI 라벨 | 예시 |
|---|---|---|---|
| 날짜만 | `date` | **일자** | 가입일자, 생년월일, 대여 시작일자 |
| 날짜+시간 | `datetime` | **일시** | 등록일시, 측정일시, 회수 요청일시 |

- **영문 식별자(`date`/`datetime`)는 코드·DB·API에서 그대로 사용** — UI 라벨만 한국어 통일(§1 원칙과 동일)
- 컬럼 헤더·폼 라벨·상세 표기 모두 시간 포함 여부로 "일자"/"일시"를 가린다
- ❌ "측정날짜시간" / "등록일자(시간 포함)" 같은 혼용 금지

---

## 부록 A. 권한 비교 요약표

| 기능 | 관리자 | 와치관리자 | 의료진 | 시니어 | 보호자 |
|---|:-:|:-:|:-:|:-:|:-:|
| 건강 데이터 조회 | ✔ | ✘¹ | ✔ | ✔ | ✔ |
| 건강 데이터 수정 | ✔ | ✘ | ✔ | ✘ | ✘ |
| 소견서 작성·조회 | ✔ | ✘ | ✔ | ✔ | ✘ |
| 위치 정보 조회 | ✔ | ✘ | ✘ | ✔ | ✔ |
| 보호자 연락처 관리 | ✔ | ✘ | ✘ | ✔ | ✘ |
| CSV 원본 내보내기 | ✔ | ✘ | ✔ | ✘ | ✘ |
| 기기 설정 | ✔ | ✔ | ✘ | ✘ | ✘ |
| 의료진-시니어 매칭 | ✔ | ✔ | ✘ | ✘ | ✘ |
| 계정 관리 | ✔ | ✔² | ✘ | ✘ | ✘ |
| 긴급 이벤트 알림 수신 | ✔ | ✘ | ✔ | ✔ | ✔ |
| 복약 미실시 알림 수신 | ✔ | ✘ | ✘ | ✔ | ✔ |
| 대여 기기 회수 | ✔ | ✔ | ✘ | ✘ | ✘ |
| 본인 와치 셀프 페어링 | ✘ | ✘ | ✘ | ✔ | ✔ (시니어 대리) |

¹ 와치관리자는 건강 데이터 **열람 불가**(운영 정보·수집 현황만). `medical` 겸직 시에만 의료진 권한으로 열람 — §1·요건 §2.1 기준. (2026-06-14 정정: 기존 ✔ → ✘)
² 와치관리자도 **계정 관리(생성·수정) 가능**하나 **관리자(operator) 역할은 부여 불가** — 요건 §2.2. (2026-06-14 정정: 기존 ✘ → ✔)

전체 매트릭스는 `docs/html3/pc-admin/permissions.html` 참조.
