# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`hc-plan` is a bkit-managed project workspace at the **Dynamic** level (fullstack with backend). It currently contains only PDCA tracking metadata — no source code has been written yet.

## Repository State

- **Pipeline phase**: Phase 1 (Schema/Planning)
- **Level**: Dynamic (fullstack — login, database, API integration expected)
- **bkit PDCA status**: `docs/.pdca-status.json`
- **bkit session memory**: `docs/.bkit-memory.json`

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
