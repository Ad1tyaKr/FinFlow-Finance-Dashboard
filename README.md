# FinFlow — Finance Dashboard

 A responsive personal finance dashboard built with **React 18 + Vite**. No UI framework — pure CSS variables, React Context, and Chart.js.

![Dark Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-c9a84c?style=flat-square)
![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff?style=flat-square&logo=vite)
![Router](https://img.shields.io/badge/React_Router-v6-ca4245?style=flat-square)

---
## 📸 Preview

<p align="center">
  <img src="src\screenshots\dashboard.png" alt="Dashboard" width="45%" />
  <img src="src\screenshots\analytics.png" alt="Analytics" width="45%" />
</p>

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

> **Node.js ≥ 18** required. On first load, 25 mock transactions and 4 savings goals are seeded automatically into `localStorage`.

---

## Pages

| Page | What it does |
|---|---|
| **Dashboard** | Net worth hero, spending chart (W/M/Y), recent transactions, credit score gauge, card carousel, health pulse rings, goals & tutorials preview |
| **Transactions** | Full CRUD table — search, filter by type/category/month, sortable columns, pagination, add/edit/delete via modal |
| **My Cards** | 3-card stacked carousel with arrow navigation, keyboard support (← →), per-card spend chart, card details panel |
| **Analytics** | 4 KPI cards, monthly trend line, spending doughnut, income vs expense bar chart, credit score history |
| **Goals** | Animated progress bars, deadline countdown, add funds, create/delete goals |
| **Learn** | Category-filtered YouTube tutorial grid (Budgeting, Investing, Savings, Debt, Tax) |
| **Security** | Live toggle switches, account status badges, login activity log |

---

## Features Implemented

### Core Requirements

- ✅ **Dashboard overview** — summary cards for balance, income, expenses, savings rate
- ✅ **Time-based chart** — line chart showing monthly balance trend
- ✅ **Categorical chart** — doughnut chart breaking down spending by category
- ✅ **Transactions** — search, multi-filter, sort, paginate, full CRUD
- ✅ **Insights** — 4 KPI metrics, monthly comparison, top spending category
- ✅ **State management** — React Context API + custom hooks, no external store
- ✅ **Responsive design** — CSS Grid, mobile sidebar with overlay, 3 breakpoints

### Optional Enhancements

- ✅ **Dark / Light mode** — toggled from topbar, persisted to `localStorage`, cross-browser (Chrome, Opera, Firefox, Safari)
- ✅ **Data persistence** — transactions, goals, and theme survive page refresh via `localStorage`
- ✅ **Mock API pattern** — seed data → `localStorage` → Context, mirroring a real API → cache flow
- ✅ **Animations** — page fade-in, card stack transitions, progress bar fills, toast slide-in, modal scale-in
- ✅ **Export** — CSV, JSON, and plain-text Summary Report from topbar and transactions page
- ✅ **Advanced filtering** — AND-logic across 4 filters, column sort with direction toggle, URL `?q=` search param

---

## Tech Stack

| | Tool | Why |
|---|---|---|
| Framework | React 18 | Hooks, Context, concurrent features |
| Build | Vite 5 | Fast HMR, ESM-native |
| Routing | React Router v6 | Nested routes, URL params |
| Charts | Chart.js 4 + react-chartjs-2 | 5 chart types, theme-aware |
| Styling | Plain CSS variables | Zero dependencies, full control |
| State | React Context + localStorage | Lightweight, no Redux needed |

**No Tailwind. No MUI. No styled-components.** Every style is a handwritten CSS class using custom property tokens in `themes.css`.

---

## Architecture

```
src/
├── pages/          # One file per route — thin composers only
├── components/     # layout/ · charts/ · cards/ · transactions/ · goals/ · learn/ · security/ · ui/
├── context/        # ThemeContext · TransactionContext · GoalContext · ToastContext · CardContext
├── hooks/          # useTransactions · useCards · useGoals · useExport · useLocalStorage
├── data/           # Static seed files — transactions, goals, cards, tutorials, networth
├── utils/          # formatters · chartHelpers · exportHelpers  (pure functions)
└── styles/         # globals.css · themes.css
```

**Design principles:**
- **Pages are thin** — no business logic, only component composition
- **Hooks own logic** — filtering, sorting, pagination, export, card navigation
- **Context owns state** — one concern per context, localStorage synced automatically
- **Components are dumb** — props in, JSX out

---

## State Management

Four Context providers, each owning exactly one concern:

```
ThemeProvider           → theme ('dark' | 'light'), toggleTheme()
  ToastProvider         → toasts[], addToast(), auto-dismiss after 2.8s
    TransactionProvider → transactions[], add / edit / delete, localStorage sync
      GoalProvider      → goals[], add / update / delete / addFunds, localStorage sync
        CardProvider    → activeIndex, selectCard(), prevCard(), nextCard()
```

Custom hooks wrap each context and add derived logic — `useFilteredTransactions()` handles all filter/sort/paginate state so pages stay clean.

---

## Theming — Cross-Browser

The dark/light toggle works identically on Chrome, Opera, Firefox and Safari via a 4-layer approach:

1. **Inline style on `<html>`** — locks dark background before any CSS parses
2. **Blocking `<script>` in `<head>`** — reads `localStorage`, sets `data-theme` + `color-scheme` before React loads
3. **`html[data-theme]` CSS selectors** — high-specificity variable overrides in `themes.css`
4. **`ThemeContext.applyTheme()`** — sets `backgroundColor`, `color`, and `colorScheme` directly on `document.documentElement` on every toggle

---

## Export

Available from the **topbar download button** (every page) and **inline buttons** on the Transactions page:

| Format | Output |
|---|---|
| **CSV** | `vault-transactions.csv` — header row + one row per transaction |
| **JSON** | `vault-transactions.json` — full array, 2-space indented |
| **Summary** | `vault-summary.txt` — income, expenses, savings rate, category rankings |

All formats are pure functions in `src/utils/exportHelpers.js`.


---

## Known Limitations

| | |
|---|---|
| Security toggles | Reset on refresh — local component state, not persisted |
| Credit score & net worth | Static mock values, not computed from transactions |
| Chart colours | Require page re-navigation after theme switch |
| Tests | Architecture supports testing but no test files written |

---

*April 2026*