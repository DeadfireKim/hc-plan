# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`hc-plan` is a bkit-managed project workspace at the **Dynamic** level (fullstack with backend). It currently contains only PDCA tracking metadata — no source code has been written yet.

## Repository State

- **Pipeline phase**: Phase 1 (Schema/Planning)
- **Level**: Dynamic (fullstack — login, database, API integration expected)
- **bkit PDCA status**: `docs/.pdca-status.json`
- **bkit session memory**: `docs/.bkit-memory.json`
- **Domain glossary**: [`docs/glossary.md`](docs/glossary.md) — 역할·메뉴·용어 공식 정의

## Domain Conventions

작업 전 [`docs/glossary.md`](docs/glossary.md)를 먼저 확인할 것. 핵심 규칙:

- **역할(role) 5종**: `operator`(관리자) / `watch`(와치관리자) / `medical`(의료진) / `senior`(시니어) / `child`(보호자)
- **영문 식별자는 DB·API·코드에서 그대로 사용** — 변경 금지(호환성)
- **UI 라벨은 한국어 통일 용어만 사용** — 예: `child` → "보호자"로 표시(절대 "자녀" 아님)
- **"자녀"는 가족 관계로만 사용** — 비상 연락처·가족 소개 등. 역할 라벨로 쓰면 안 됨
- **메뉴 도메인 분리**: 운영 인력 관리(와치+의료진) / 계정 관리(시니어+보호자) / 가족 그룹(관계망) / 권한 관리(RBAC)
- 변경 사항이 생기면 `docs/glossary.md` §8(변경 이력)에 기록

## Development Approach

This project follows the bkit 9-phase Development Pipeline:

1. Schema definition → 2. Conventions → 3. Mockup → 4. API → 5. Design System → 6. UI Integration → 7. SEO/Security → 8. Review → 9. Deployment

Use `/pdca plan`, `/pdca design`, `/pdca do`, `/pdca analyze` to progress through phases. Run gap analysis (`/pdca analyze`) after each implementation phase; iterate if match rate < 90%.

## bkit Commands

- `/pdca plan <feature>` — create plan document
- `/pdca design <feature>` — create design document  
- `/pdca analyze <feature>` — run gap analysis
- `/pdca status` — show current PDCA phase
- `/dynamic` — fullstack development guide (bkend.ai BaaS)
- `/development-pipeline` — full 9-phase pipeline overview
