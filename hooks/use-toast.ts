"use client";
import * as React from "react";

type ToastVariant = "default" | "destructive" | "success";
interface Toast { id: string; title?: string; description?: string; variant?: ToastVariant; }

const listeners: Array<(state: { toasts: Toast[] }) => void> = [];
let state: { toasts: Toast[] } = { toasts: [] };

function dispatch(toast: Toast) {
  state = { toasts: [toast, ...state.toasts].slice(0, 4) };
  listeners.forEach((l) => l(state));
  setTimeout(() => {
    state = { toasts: state.toasts.filter((t) => t.id !== toast.id) };
    listeners.forEach((l) => l(state));
  }, 4000);
}

export function toast(props: Omit<Toast, "id">) {
  dispatch({ ...props, id: Math.random().toString(36).slice(2) });
}

export function useToast() {
  const [s, setS] = React.useState(state);
  React.useEffect(() => {
    listeners.push(setS);
    return () => { const i = listeners.indexOf(setS); if (i > -1) listeners.splice(i, 1); };
  }, []);
  return { toasts: s.toasts, toast };
}
