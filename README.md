# 🚀 EduFlow: Student Dashboard

A high-fidelity, hardware-accelerated learning dashboard built with Next.js 16, Supabase, and Framer Motion. Designed for zero layout shifts, buttery-smooth animations, and premium user experience.

## 📊 Project Overview

EduFlow is a modern student dashboard that fetches live course data from Supabase and displays it in a responsive Bento grid layout. The application emphasizes performance, accessibility, and beautiful animations powered by spring physics.

**Live Demo:** [Deploy to Vercel](#deployment)

## 🏗️ Architecture & Tech Stack

### Frontend Framework
- **Next.js 16** (App Router): Server-side rendering for optimal data fetching and performance
- **React 19**: Leveraging latest hooks and concurrent rendering
- **TypeScript**: Full type safety across the application

### Styling & Animations
- **Tailwind CSS v4**: Utility-first CSS framework for responsive design
- **Framer Motion 12**: Hardware-accelerated animations with spring physics
- **Lucide React**: Beautiful, customizable SVG icon library

### Database & Backend
- **Supabase**: PostgreSQL database with real-time capabilities
- **@supabase/supabase-js**: Secure client-side database queries

## 🎨 Design System

### Color Palette
- **Background**: Deep blacks and dark grays (`#000000`, `#0a0a0a`, `#1a1a2e`)
- **Accents**: Blue (`#3b82f6`), Purple (`#a855f7`), Emerald (`#10b981`), Cyan (`#06b6d4`)
- **Text**: White with zinc gradients for hierarchy

### Responsive Breakpoints
- **Mobile** (`< 768px`): Single column layout with hamburger menu
- **Tablet** (`768px - 1024px`): 2-column grid with collapsible sidebar
- **Desktop** (`> 1024px`): 4-column Bento grid with full sidebar

## 📁 Project Structure

```
student-dashboard/
├── app/
│   ├── page.tsx              # Main dashboard page with Suspense boundaries
│   ├── layout.tsx            # Root layout with global styles
│   └── globals.css           # Global Tailwind styles
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar with layout animations
│   ├── HeroTile.tsx          # Hero greeting section with micro-interactions
│   ├── CourseCard.tsx        # Dynamic course tiles with progress bars
│   ├── ActivityTile.tsx      # Activity graph with staggered animations
│   └── Skeletons.tsx         # Loading skeleton components with pulsing
├── lib/
│   └── supabase.ts           # Supabase client configuration
├── types/
│   └── index.ts              # TypeScript interfaces and types
├── public/                   # Static assets
├── .env.local                # Environment variables (DO NOT COMMIT)
├── .env.example              # Environment template
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── next.config.ts            # Next.js configuration
```

## 🗄️ Database Schema

### Courses Table

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Seed Data

```sql
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Code'),
  ('TypeScript Mastery', 90, 'Cpu'),
  ('Next.js & SSR', 60, 'Rocket'),
  ('Database Design', 45, 'Database');
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd student-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a free account at [supabase.com](https://supabase.com)
   - Create a new project
   - Create the `courses` table using the schema above
   - Insert seed data
   - Copy your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎬 Component Architecture

### Server vs Client Components

```
page.tsx (Server Component)
├── Sidebar (Client Component)
│   ├── Motion animations
│   ├── State (menu open/active nav)
│   └── Event handlers
├── CoursesList (Server Component)
│   ├── Supabase data fetching
│   └── CourseCard (Client Component)
│       ├── Dynamic icon rendering
│       └── Framer Motion animations
├── HeroTile (Client Component)
│   ├── Greeting animation
│   └── Pulsing indicator
└── ActivityTile (Client Component)
    └── Staggered bar animations
```

### Key Design Decisions

**1. Server Components for Data**
- Course data is fetched in a server component (`CoursesList`)
- Eliminates waterfall requests and reduces JS bundle
- Suspense boundaries enable streaming and progressive rendering

**2. Client Components for Interaction**
- Animation state is kept client-side (Sidebar, HeroTile, etc.)
- Allows smooth, responsive interactions without server latency
- Framer Motion animations run on 60fps without server overhead

**3. Suspense + Skeleton Loaders**
- Each section has a Suspense boundary with matching skeleton
- Skeletons use pulsing animations for visual feedback
- Improves perceived performance during data fetching

**4. Dynamic Icon Rendering**
- Icon names are stored in Supabase (e.g., "Code", "Rocket")
- Icons are dynamically imported from lucide-react using a map
- Enables customization without code changes

## ✨ Animation Details

### Spring Physics Configuration
All animations use spring physics for natural, non-linear motion:
```typescript
transition: {
  type: "spring",
  stiffness: 300,
  damping: 20
}
```

### Staggered Entry Animation
Tiles fade in and slide up with staggered delays:
- Hero Tile: Delay 0ms
- Course Cards: Delay 100ms, 200ms, 300ms, etc.
- Activity Tile: Delay 400ms+

### Hover States
- **Scale**: 1.02 to 1.05 depending on tile size
- **Border Glow**: Subtle blue glow on group-hover
- **Background**: Gradient shift from transparent to colored
- **All animations**: Use `transform` and `opacity` only (no layout shifts)

### Progress Bar Animation
- Animates from 0% to the fetched percentage value
- Spring physics for natural acceleration/deceleration
- Staggered with course card entrance

## 📱 Responsive Behavior

### Mobile (< 768px)
- Sidebar converted to hamburger menu with overlay
- Single-column grid layout
- Touch-optimized padding and tap targets
- Full-width tiles for better readability

### Tablet (768px - 1024px)
- Sidebar collapses to icon-only mode (optional)
- 2-column grid layout
- Medium padding and gap values

### Desktop (> 1024px)
- Full-width sidebar with labels
- 4-column Bento grid
- Large gaps and padding for spacious layout

## 🔒 Security Practices

1. **Environment Variables**: Supabase keys stored in `.env.local` (never committed)
2. **Public vs Secret Keys**: Only anonymous key in `.env.local`
3. **RLS Policies**: Implement Row-Level Security in Supabase for production
4. **SSR Benefits**: Sensitive operations can be done server-side

## 🧪 Testing & Quality

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration from Next.js
- Semantic HTML structure (no div soup)

### Performance Metrics
- Zero Cumulative Layout Shift (CLS)
- Smooth 60fps animations
- Server-side rendering for fast First Contentful Paint (FCP)

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → "Import Git Repository"
   - Select your repository

3. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click Deploy

4. **Your app is live!** 🎉

### Alternative: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance Optimization

1. **Next.js Image Optimization**: Use next/image for responsive images
2. **Code Splitting**: Components are automatically split with dynamic imports
3. **Suspense Streaming**: Progressive rendering with Server Components
4. **CSS-in-JS Avoidance**: Tailwind CSS for zero runtime overhead
5. **Animation Optimization**: Transform and opacity only (GPU-accelerated)

## 🐛 Troubleshooting

### "supabaseUrl is required"
- Check `.env.local` file exists with correct variable names
- Restart dev server after env changes
- Ensure variables are named exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Courses not showing
- Verify courses table exists in Supabase
- Check that table has data (seed data inserted)
- Look for errors in browser console and server logs
- Verify table permissions allow anonymous read access

### Animations feel sluggish
- Check browser DevTools Performance tab
- Ensure GPU acceleration is enabled
- Verify stiffness/damping values (lower stiffness = slower)

### Sidebar animation issues on mobile
- Clear browser cache
- Check for CSS conflicts
- Ensure Framer Motion is properly installed

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

## 📝 Challenges Faced & Solutions

### Challenge 1: Layout Shifts During Animation
**Problem**: Hover effects were causing layout repaints
**Solution**: Used Framer Motion with `transform` and `opacity` exclusively, avoiding `width`, `height`, `margin` changes

### Challenge 2: Dynamic Icon Rendering
**Problem**: Storing icon strings in database but rendering as React components
**Solution**: Created an icon map object that maps strings to lucide-react exports

### Challenge 3: Server/Client Data Fetching
**Problem**: Needed to fetch server-side but animate client-side
**Solution**: Server component fetches data, passes to Client component for animations with Suspense boundaries

### Challenge 4: Responsive Sidebar
**Problem**: Fixed sidebar breaks mobile layout
**Solution**: Used Framer Motion variants and CSS media queries for responsive positioning

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

## 👨‍💻 Author

Built with ❤️ as a Frontend Intern Challenge submission.

---

**Happy coding! 🚀**

For questions or issues, please open a GitHub issue or contact the maintainers.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
