# JavaScript Quiz Web App

A browser-based quiz application built with **Node.js**, **Express**, and **Vanilla JavaScript**. Features dynamic question loading from a REST API, a countdown timer, score tracking, and a final results screen.

---

## 📁 Project Structure

```
javascript-quiz-web/
├── data/
│   └── questions.json       # Quiz question data
├── public/
│   ├── index.html           # App HTML structure
│   ├── style.css            # Styles and animations
│   └── app.js               # All frontend quiz logic
├── node_modules/            # Installed dependencies (never commit)
├── .gitignore               # Excludes node_modules
├── package.json             # Project metadata and scripts
├── package-lock.json        # Locked dependency versions
└── server.js                # Express server and API routes
```

---

## ⚙️ Tech Stack

| Layer    | Technology                |
| -------- | ------------------------- |
| Runtime  | Node.js                   |
| Server   | Express.js                |
| Frontend | Vanilla JavaScript (ES6+) |
| Styling  | CSS3 with animations      |
| Data     | JSON                      |
| Dev Tool | Nodemon                   |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/javascript-quiz-web.git

# 2. Navigate into the project
cd javascript-quiz-web

# 3. Install dependencies
npm install
```

### Running the App

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

Then open your browser and go to:

```
http://localhost:3000
```

---

## 📡 API Reference

### `GET /api/questions`

Returns the full list of quiz questions as a JSON array.

**Response:**

```json
[
  {
    "id": 1,
    "question": "What does DOM stand for?",
    "answers": [
      { "text": "Document Object Model", "correct": true },
      { "text": "Data Object Map", "correct": false },
      { "text": "Display Output Mode", "correct": false },
      { "text": "None of the above", "correct": false }
    ]
  }
]
```

---

## 📝 Data Format

Questions are stored in `data/questions.json`. Each question must follow this shape:

| Field      | Type    | Description                         |
| ---------- | ------- | ----------------------------------- |
| `id`       | number  | Unique identifier                   |
| `question` | string  | The question text                   |
| `answers`  | array   | List of answer objects              |
| `text`     | string  | Answer option text (inside answers) |
| `correct`  | boolean | Whether this answer is correct      |

> ⚠️ Only one answer per question should have `"correct": true`.

---

## 🧩 Frontend Features

### Show/Hide Questions — DOM Manipulation

Questions and screens are toggled using `classList.add('active')` and `classList.add('hide')`. Smooth CSS transitions handle the visual effect between screens.

### Score Tracking

A `score` variable increments each time the user selects the correct answer. It resets to `0` when the quiz is restarted.

### Countdown Timer — `setInterval`

Each question has a **15-second** countdown. The timer:

- Starts fresh on every new question via `setInterval`
- Clears with `clearInterval` when the user answers
- Turns red and adds a `.warning` class when ≤ 5 seconds remain
- Auto-advances and marks the question wrong if time runs out

### Progress Bar

Updates after every question to reflect how far through the quiz the user is.

### Answer Feedback

After selecting an answer:

- Correct answers highlight in **green**
- Wrong answers highlight in **red**
- The correct answer is always revealed
- All buttons are disabled to prevent double-clicking

### Final Score Screen

Displays the user's score with a **conic-gradient circle** that fills proportionally to the percentage of correct answers. A **Restart** button resets all state without reloading the page.

---

## 🔄 Data Flow

```
questions.json
     ↓
server.js  →  GET /api/questions  →  res.json(data)
                                           ↓
                                    fetch() in app.js
                                           ↓
                                    questions[] array populated
                                           ↓
                                    Quiz UI renders
```

---

## 📦 NPM Scripts

| Script        | Command             | Description                        |
| ------------- | ------------------- | ---------------------------------- |
| `npm start`   | `node server.js`    | Start the production server        |
| `npm run dev` | `nodemon server.js` | Start with auto-restart on changes |

---

## 🔑 Key JavaScript Concepts Used

- `fetch()` + Promises — loading questions from the Express API
- `setInterval` / `clearInterval` — countdown timer
- DOM manipulation — `querySelector`, `innerHTML`, `classList`, `createElement`
- Event listeners — click delegation on dynamically created buttons
- State management — `currentQuestionIndex`, `score`, `timeLeft` as module-level variables
- CSS animations injected via JavaScript — staggered answer button entrance

---

## 🛠️ Adding Questions

Open `data/questions.json` and add a new object to the array:

```json
{
  "id": 6,
  "question": "Which method removes the last element of an array?",
  "answers": [
    { "text": "pop()", "correct": true },
    { "text": "push()", "correct": false },
    { "text": "shift()", "correct": false },
    { "text": "splice()", "correct": false }
  ]
}
```

Save the file — nodemon will restart the server automatically.

---

## 🚫 .gitignore

Make sure your `.gitignore` contains at minimum:

```
node_modules/
```
