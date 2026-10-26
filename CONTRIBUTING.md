# Contributing to HOT COOL SHAKE

Thank you for your interest in contributing to **HOT COOL SHAKE | International Coffee & Beverage Experience**. We welcome contributions from developers, designers, and coffee enthusiasts worldwide.

---

## ☕ Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please be respectful and collaborative in all communications and code reviews.

---

## 🛠️ Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hari-Haran-A-07/hotcoolshake.in.git
   cd hotcoolshake.in
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npm install --prefix client
   ```

3. **Configure Environment:**
   Copy `.env.example` to `.env` and configure your MongoDB URI and JWT secrets.

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   - Client runs on `http://localhost:5173`
   - Express API runs on `http://localhost:5000`

---

## 🌿 Branching Strategy & Git Workflow

- Main branch: `main`
- Feature branches: `feat/<feature-name>`
- Bugfix branches: `fix/<bug-description>`
- Documentation: `docs/<topic>`

### Conventional Commit Messages

We strictly adhere to [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(scope)`: A new user-facing feature or enhancement
- `fix(scope)`: A bug fix
- `docs(scope)`: Documentation changes only
- `style(scope)`: Formatting, whitespace, missing semi-colons
- `refactor(scope)`: Code change that neither fixes a bug nor adds a feature
- `test(scope)`: Adding missing tests or correcting existing tests
- `chore(scope)`: Tooling, dependencies, or build config

---

## 🧪 Testing & Verification

Always verify and test your changes before submitting a pull request:

```bash
# Run security middleware test suite
node server/testSecurity.js

# Run client production build
npm run build --prefix client
```

---

## 🎨 Design System & Color Palette

Maintain consistency with our luxury coffee palette:
- `#2A1B16`: Primary Deep Coffee Brown
- `#3C2A21`: Secondary Espresso Brown
- `#EEDCC6`: Warm Cream
- `#F4E8D1`: Premium Ivory

Typography:
- Space Grotesk (Headings)
- Inter (Body)
- JetBrains Mono (Technical badges, telemetry, metrics)
