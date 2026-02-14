import React from 'react';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10" role="contentinfo">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-white/60 mb-4 md:mb-0">
            © 2026 Fidel Fúnez C. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/fidelfunez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/fidelfunez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              X
            </a>
            <a href="mailto:fidelfunezf@gmail.com" className="text-white/60 hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
        <div className="text-sm text-white/40">Built with Next.js, TypeScript, and Tailwind CSS</div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
