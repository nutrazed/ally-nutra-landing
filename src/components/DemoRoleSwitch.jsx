import { useRef } from 'react';
import { useDemoRole } from '../contexts/DemoRoleContext.jsx';
import { VISITOR, CLIENT, ADMIN } from '../lib/demoRole.js';

const OPTIONS = [
  { value: VISITOR, label: 'Visitor' },
  { value: CLIENT, label: 'Client' },
  { value: ADMIN, label: 'Admin' },
];

// Deliberately styled as a dev tool, not a product feature — mono type,
// muted, dashed border, fixed bottom-left. Mounted once at the app root
// (see App.jsx) so it's present on every route. The three static pages
// (public/quote/, public/portal/, public/admin/) get a visually matching
// control from public/shared/demo-role.js, since they can't import this
// component.
//
// role="radiogroup" + roving tabindex (only the checked option is a Tab
// stop) is the standard WAI-ARIA keyboard pattern for a segmented control:
// Tab moves into/out of the group as one stop, ArrowLeft/ArrowRight move
// the checked option within it — same as a native radio group, without
// giving up the simple aria-checked button markup already used here.
export default function DemoRoleSwitch() {
  const { role, setRole } = useDemoRole();
  const buttonRefs = useRef([]);

  function onKeyDown(e, index) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + dir + OPTIONS.length) % OPTIONS.length;
    setRole(OPTIONS[nextIndex].value);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="demo-switch" role="radiogroup" aria-label="Demo role switch">
      <span className="demo-switch-label">DEMO &middot; viewing as</span>
      {OPTIONS.map((opt, i) => (
        <span key={opt.value} style={{ display: 'contents' }}>
          {i > 0 && (
            <span className="demo-switch-sep" aria-hidden="true">
              |
            </span>
          )}
          <button
            ref={(el) => (buttonRefs.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={role === opt.value}
            tabIndex={role === opt.value ? 0 : -1}
            onClick={() => setRole(opt.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  );
}
