# 🧠 Word Memory Game (React 19 + Vite + TypeScript)

A simple word matching game where users pair English words with their correct French translations.  
Visual lines are drawn using `react-archer`, and the app is built with modern React + TypeScript + Vite.

---

## 🚀 Features

- Fixed English ↔ French word list
- Shuffle word order on each GO
- Select–match–lock mechanic with visual lines
- GRADE button to score correctness
- Built with React 19 + Vite + TypeScript
- Unit tested with Vitest + Testing Library

---

## ⚙️ Setup & Commands

```bash
# 1. Clone the project
git clone https://github.com/your-name/word-memory.git
cd word-memory

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. (Optional) Fix peer dependencies if needed
npm install react@19 react-dom@19

# 4. Start dev server
npm run dev

# 5. Run unit tests (once)
npm run test

# 6. Run test in watch mode
npx vitest

# 7. Run test with coverage (optional)
npx vitest run --coverage

# 8. Build project
npm run build

# 9. Reset clean install if needed
rm -rf node_modules package-lock.json && npm install
