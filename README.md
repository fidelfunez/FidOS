# FidOS

A macOS-inspired portfolio website that's actually fun to use. Instead of the usual "here's my resume" approach, I built an interactive desktop experience where you can explore my work, projects, and background just like you'd navigate macOS.

[**Live Demo**](https://fidelfunez.netlify.app) • [**Simple View**](https://fidelfunez.netlify.app/simple)

## What is this?

FidOS is my portfolio, but it's also a fully functional macOS-style interface running in your browser. You can open folders, launch apps from the dock, drag windows around, and interact with everything just like you would on a Mac. It's part portfolio, part playground, and honestly, it was just fun to build.

The project has two views:
- **Desktop Version**: The full macOS experience (desktop only - mobile users get redirected)
- **Simple View**: A clean, fast portfolio site optimized for mobile and desktop

## Features

**Desktop Experience:**
- Lock screen with password authentication
- Fully interactive desktop with draggable windows
- Working apps: Finder, Safari, Mail, iMessage, Music, Calendar, Notes, and more
- System menus, dock, and all the macOS details you'd expect
- Launchpad with app management
- Trash that actually works (try emptying it!)

**Simple View:**
- Clean, fast portfolio pages
- Mobile-optimized experience
- All my projects, experience, and contact info
- Performance-focused (98/100 Lighthouse score)

**Technical Highlights:**
- All images optimized to WebP format
- Mobile detection that automatically serves the right experience
- Next.js Image component for automatic optimization
- Zero layout shift, smooth animations throughout
- Fully responsive and accessible

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Styling and responsive design
- **React 19** - UI library
- **Lucide React** - Icons

Everything is statically exported, so it's fast and can be hosted anywhere.

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/fidelfunez/FidOS.git
cd FidOS
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**First time?** You'll see a lock screen. The password is in the Notes app once you unlock (or just check the code, I'm not hiding it 😄).

## Building for Production

```bash
npm run build
```

This creates a static export in the `out` directory. You can deploy this anywhere - Netlify, Vercel, GitHub Pages, or any static host.

## Project Structure

```
FidOS/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── simple/      # Simple portfolio view
│   │   ├── dashboard/   # Desktop experience
│   │   └── lockscreen/  # Login screen
│   ├── components/      # React components (Finder, Safari, etc.)
│   └── utils/           # Utilities (mobile detection, etc.)
├── public/              # Static assets (all WebP optimized)
└── next.config.ts       # Next.js configuration
```

## Why Build This?

I wanted a portfolio that actually showed what I can do, not just told you about it. Building a functional macOS interface from scratch demonstrates:
- Complex state management
- Attention to detail in UI/UX
- Performance optimization
- Responsive design thinking
- And honestly, it's just more interesting than another Bootstrap template

Plus, it's been a great conversation starter. People remember it.

## Performance

The simple view scores **98/100** on Lighthouse:
- First Contentful Paint: 1.8s
- Largest Contentful Paint: 1.8s
- Total Blocking Time: 0ms
- Cumulative Layout Shift: 0.000

All images are WebP format, and the desktop version lazy-loads components to keep things snappy.

## Mobile Experience

Mobile users automatically get the simple view. The desktop experience is built for... well, desktops. Trying to use it on a phone would be frustrating, so I redirect mobile users to the optimized simple version instead.

## What's Next?

I'm always tweaking things. Currently thinking about:
- Adding more interactive apps
- Improving animations
- Maybe a dark/light mode toggle
- Performance optimizations (always)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Website**: [fidelfunez.netlify.app](https://fidelfunez.netlify.app)
- **Email**: fidelfunezf@gmail.com
- **GitHub**: [@fidelfunez](https://github.com/fidelfunez)
- **X**: [@fidelfunez](https://x.com/fidelfunez)

---

Built with ❤️ (and probably too much coffee) by Fidel Fúnez C.
