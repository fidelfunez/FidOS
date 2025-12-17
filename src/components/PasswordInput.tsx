import React, { useRef, useEffect, useState } from 'react';

interface PasswordInputProps {
  value?: string;
  onSubmit?: () => void;
}

// Estimated colors from the image
const GRADIENT = 'linear-gradient(90deg, #e2c15b 0%, #e2b85b 100%)';
const DOT_COLOR = '#fff9c7';
const BG_COLOR = 'rgba(226, 193, 91, 0.85)';
const BUTTON_BG = 'rgba(255, 249, 199, 0.18)';
const BUTTON_BORDER = '#fff9c7';
const ARROW_COLOR = '#fff9c7';
const BUTTON_GLOW = '0 0 0 4px rgba(255,249,199,0.18), 0 0 8px 2px #fff9c7';

const PasswordInput: React.FC<PasswordInputProps> = ({ value = '', onSubmit }) => {
  // Always show 6 dots for now
  const dots = Array(6).fill(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipFading, setTooltipFading] = useState(false);
  const [caretVisible, setCaretVisible] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle fade-out animation
  useEffect(() => {
    if (showTooltip) {
      setTooltipVisible(true);
      setTooltipFading(false);
    } else if (tooltipVisible) {
      setTooltipFading(true);
      const timeout = setTimeout(() => {
        setTooltipVisible(false);
        setTooltipFading(false);
      }, 220);
      return () => clearTimeout(timeout);
    }
  }, [showTooltip]);

  // Blinking caret effect
  useEffect(() => {
    const interval = setInterval(() => setCaretVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center items-center" style={{ position: 'relative' }}>
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <form
          className="flex items-center px-2 py-1"
          style={{
            background: GRADIENT,
            borderRadius: '1rem',
            minWidth: 120,
            maxWidth: 160,
            height: 23,
            boxShadow: '0 0.5px 2px 0 rgba(0,0,0,0.07)',
            position: 'relative',
            gap: 0,
          }}
          onSubmit={e => {
            e.preventDefault();
            onSubmit && onSubmit();
          }}
          tabIndex={-1}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Hidden input for keyboard events */}
          <input
            ref={inputRef}
            type="password"
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
            tabIndex={0}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') {
                onSubmit && onSubmit();
              }
            }}
          />
          {/* Dots */}
          <div className="flex-1 flex items-center" style={{ gap: 5, marginLeft: 2 }}>
            {dots.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: DOT_COLOR,
                  boxShadow: '0 0.5px 1.5px 0 rgba(0,0,0,0.04)',
                  opacity: 1,
                  transition: 'background 0.2s',
                }}
              />
            ))}
            {/* Blinking caret */}
            <span
              style={{
                display: 'inline-block',
                width: 2.5,
                height: 13,
                marginLeft: 4,
                borderRadius: 1,
                background: caretVisible ? 'rgba(255,255,255,0.85)' : 'transparent',
                transition: 'background 0.18s',
                alignSelf: 'center',
              }}
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            aria-label="Submit password"
            tabIndex={-1}
            style={{
              marginLeft: 7,
              width: 17,
              height: 17,
              borderRadius: '50%',
              border: `1.5px solid ${BUTTON_BORDER}`,
              background: BUTTON_BG,
              boxShadow: '0 0 4px 0.5px #fff9c7, 0 0 0.5px 0.5px #fff9c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              cursor: 'pointer',
              transition: 'box-shadow 0.18s',
              verticalAlign: 'middle',
            }}
          >
            {/* Arrow icon */}
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="0" fill="none" />
              <path d="M7 14h14" stroke={ARROW_COLOR} strokeWidth="2.6" strokeLinecap="round" />
              <path d="M15.5 10L20.5 14l-5 4" stroke={ARROW_COLOR} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
        {/* Absolutely positioned question mark icon */}
        <div style={{ position: 'absolute', top: '50%', left: '100%', transform: 'translate(4px, -50%)', display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            aria-label="Show instructions"
            tabIndex={0}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'transparent',
              border: '2px solid #e5e5e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)',
              cursor: 'pointer',
              outline: 'none',
              padding: 0,
              transition: 'box-shadow 0.18s',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8.5" stroke="#e5e5e5" strokeWidth="2" fill="none" />
              <text x="10" y="15" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#fff" fontFamily="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif">?</text>
            </svg>
          </button>
          {tooltipVisible && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '-48px',
                background: 'rgba(30, 28, 26, 0.97)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 500,
                borderRadius: 12,
                padding: '9px 18px 13px 18px',
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
                whiteSpace: 'nowrap',
                zIndex: 10,
                pointerEvents: 'none',
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
                opacity: tooltipFading ? 0 : 0.97,
                transition: 'opacity 0.22s cubic-bezier(.4,0,.2,1), transform 0.22s cubic-bezier(.4,0,.2,1)',
                transform: tooltipFading ? 'translateX(-50%) translateY(8px) scale(0.98)' : 'translateX(-50%)',
              }}
            >
              Click arrow button or press Enter to continue
              {/* Tooltip tail */}
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -8,
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderTop: '8px solid rgba(30, 28, 26, 0.97)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))',
                  zIndex: 11,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput; 