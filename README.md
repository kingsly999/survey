# Newsletter Readiness Survey

A dynamic Next.js application designed to assess readiness for starting a newsletter. This interactive survey guides users through a series of questions, tracks their progress, and provides personalized results and insights.

## Features

- **Dynamic Question Engine**: Adapts questions based on user responses (e.g., Student vs. Professional).
- **Progress Tracking**: Visual progress bar to keep users engaged.
- **State Management**: Persists survey state to allow resumption.
- **Interactive UI**: Built with Framer Motion for smooth transitions and Lucide React for icons.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.
- **Result Analysis**: detailed breakdown of readiness score and recommendations.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

The application relies on a backend for saving progress and fetching results. Ensure the `BACKEND_URL` is correctly configured in `src/app/utils/config.js`.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
