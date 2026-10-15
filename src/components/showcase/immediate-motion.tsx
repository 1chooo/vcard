"use client";

import { createContext, useContext, type ReactNode } from "react";

const ImmediateMotionContext = createContext(false);

function ImmediateMotion({ children }: { children: ReactNode }) {
  return (
    <ImmediateMotionContext.Provider value={true}>
      {children}
    </ImmediateMotionContext.Provider>
  );
}

function useImmediateMotion() {
  return useContext(ImmediateMotionContext);
}

export { ImmediateMotion, useImmediateMotion };
