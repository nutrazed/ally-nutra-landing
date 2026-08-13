import { useDemoRole } from '../contexts/DemoRoleContext.jsx';

// Deliberately styled as a dev tool, not a product feature — mono type,
// muted, dashed border, fixed bottom-left. Mounted once at the app root
// (see App.jsx) so it's present on every route. The two static pages
// (public/quote/, public/portal/) get a visually matching control from
// public/shared/demo-role.js, since they can't import this component.
export default function DemoRoleSwitch() {
  const { role, setRole } = useDemoRole();
  return (
    <div className="demo-switch" role="group" aria-label="Demo role switch">
      <span className="demo-switch-label">DEMO &middot; viewing as</span>
      <button
        type="button"
        aria-pressed={role === 'visitor'}
        onClick={() => setRole('visitor')}
      >
        Visitor
      </button>
      <span className="demo-switch-sep" aria-hidden="true">|</span>
      <button
        type="button"
        aria-pressed={role === 'client'}
        onClick={() => setRole('client')}
      >
        Client
      </button>
    </div>
  );
}
