import { createContext, useCallback, useContext, useState } from 'react';
import { CLIENT, readRoleFromLocation, writeRoleToLocation } from '../lib/demoRole.js';

const DemoRoleContext = createContext(null);

export function DemoRoleProvider({ children }) {
  const [role, setRoleState] = useState(() => readRoleFromLocation());

  const setRole = useCallback((next) => {
    writeRoleToLocation(next);
    setRoleState(next);
  }, []);

  return (
    <DemoRoleContext.Provider value={{ role, setRole, isClient: role === CLIENT }}>
      {children}
    </DemoRoleContext.Provider>
  );
}

export function useDemoRole() {
  const ctx = useContext(DemoRoleContext);
  if (!ctx) throw new Error('useDemoRole must be used within a DemoRoleProvider');
  return ctx;
}
