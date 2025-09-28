# Kanban Board

## 🚀 Quick Start

npm install
npm run dev

## ✅ What's Implemented

- 429/503 errors → retry with delay
- 409 conflicts → handle serverVersion/serverDiff  
- WebSocket → reconnect when connection drops
- Offline mode → save to IndexedDB
- Drag & Drop → custom implementation
- Search and filters
- TypeScript strict mode

## 📋 Commands

npm run dev
npm run build  
npm run lint
npm run typecheck
npm test

## 🔧 For Reviewers

Key files:
- lib/api/client.ts - 429/503 retry logic
- lib/stores/sync.ts - 409 conflict resolution
- lib/websocket/client.ts - WS reconnection
- lib/offline/ - offline support

Project ready for review - core requirements implemented

**Live Demo:** https://vercel.com/nikitas-projects-007847e1/kanplan