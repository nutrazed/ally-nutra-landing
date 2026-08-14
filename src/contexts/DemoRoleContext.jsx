import { createContext, useCallback, useContext, useState } from 'react';
import { ADMIN, CLIENT, readRoleFromLocation, writeRoleToLocation } from '../lib/demoRole.js';

const DemoRoleContext = createContext(null);

export function DemoRoleProvider({ children }) {
  const [role, setRoleState] = useState(() => readRoleFromLocation());

  const setRole = useCallback((next) => {
    writeRoleToLocation(next);
    setRoleState(next);
  }, []);

  // admin is a superset of client (see demoRole.js) — isClient is true for
  // both, so the account menu/portal surface doesn't need a second,
  // near-duplicate gate. isAdmin is the separate, narrower flag for the
  // staff-only Admin entry.
  const isAdmin = role === ADMIN;
  const isClient = role === CLIENT || isAdmin;

  return (
    <DemoRoleContext.Provider value={{ role, setRole, isClient, isAdmin }}>
      {children}
    </DemoRoleContext.Provider>
  );
}

export function useDemoRole() {
  const ctx = useContext(DemoRoleContext);
  if (!ctx) throw new Error('useDemoRole must be used within a DemoRoleProvider');
  return ctx;
}
