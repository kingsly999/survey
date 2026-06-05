# Project Architecture

This document provides a high-level overview of the Newsletter Readiness Survey application architecture.

## Directory Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── LoadingScreen.js
│   │   ├── NavigationButtons.js
│   │   ├── ProgressBar.js
│   │   ├── QuestionRenderer.js
│   │   └── ResultsDisplay.js
│   ├── utils/              # Helper functions and configuration
│   │   ├── config.js       # App configuration (API URLs)
│   │   └── questionSets.js # Question logic and data
│   ├── layout.js           # Root layout
│   ├── page.js             # Main application entry point (Survey Engine)
│   └── globals.css         # Global styles
```

## Core Components

### Survey Engine (`src/app/page.js`)
The central component that manages the entire survey state. It handles:
- **State Management**: Tracks current question, answers, user details, and completion status.
- **Data Persistence**: Syncs progress with the backend API.
- **Routing Logic**: Determines the next question based on user answers (branching logic).
- **Initialization**: Restores previous sessions if a user returns.

### Question Renderer (`src/app/components/QuestionRenderer.js`)
Responsible for rendering the appropriate input interface for the current question. It supports various question types:
- Single choice
- Multiple choice
- Text input
- Custom input (e.g., "Other")

### Results Display (`src/app/components/ResultsDisplay.js`)
Renders the final analysis after survey completion. It displays:
- Readiness Score
- Readiness Level
- Personalized Insights
- Recommended Tools

## Data Flow

The application follows a unidirectional data flow for state updates, with side effects for API synchronization.

```mermaid
graph TD
    User[User Action] -->|Selects Answer| Page[Survey Engine (page.js)]
    Page -->|Updates State| State[Local State]
    Page -->|POST /create-nl-survey| API[Backend API]
    State -->|Props| Renderer[Question Renderer]
    State -->|Props| Nav[Navigation Buttons]
    State -->|Props| Progress[Progress Bar]
    
    subgraph Initialization
        URL[URL Params] -->|Email & ID| Page
        Page -->|GET /survey/:email/:id| API
        API -->|Restores Answers| State
    end

    subgraph Completion
        Page -->|All Questions Answered| Submit[Submit Survey]
        Submit -->|POST /readiness-survey| API
        API -->|Analysis Results| Results[Results Display]
    end
```

## Key Interactions

1.  **Initialization**: On load, the app checks URL parameters for `email` and `id`. It queries the backend to see if a session exists and restores it.
2.  **Answering**: When a user answers, the state is updated locally for immediate UI feedback, and an async call saves the progress to the database.
3.  **Branching**: The `questionSets.js` utility defines the logic for which question comes next, allowing for dynamic paths based on previous answers (e.g., different questions for Students vs. Professionals).
