// toastManager.tsx
import React, { useState, useCallback, useEffect } from 'react';
import ToastDefault, { ToastProps, ToastPosition } from './ToastDefault';

interface ToastItem extends ToastProps {
  id: number;
}

let toastCounter = 0;
let toastSubscribers: ((props: ToastProps) => void)[] = [];

const DEFAULT_POSITION: ToastPosition = 'top';
const DEFAULT_DISTANCE = 16;

export const ToastContext = React.createContext<{
  showToast: (
    props: Omit<ToastProps, 'position' | 'distance'> & {
      position?: ToastPosition;
      distance?: number;
    },
  ) => void;
}>({
  showToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (
      props: Omit<ToastProps, 'position' | 'distance'> & {
        position?: ToastPosition;
        distance?: number;
      },
    ) => {
      const id = toastCounter++;
      const position = props!.position || DEFAULT_POSITION;
      const distance = props!.distance ?? DEFAULT_DISTANCE;
      const newToast: ToastItem = { ...props, position, distance, id } as ToastItem;
      setToasts((prevToasts) => [...prevToasts, newToast]);

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, 3000);
    },
    [],
  );

  useEffect(() => {
    const subscriber = (
      props: Omit<ToastProps, 'position' | 'distance'> & {
        position?: ToastPosition;
        distance?: number;
      },
    ) => {
      showToast(props);
    };
    toastSubscribers.push(subscriber);
    return () => {
      toastSubscribers = toastSubscribers.filter((sub) => sub !== subscriber);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <ToastDefault key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);

export const showToast = (
  props: Omit<ToastProps, 'position' | 'distance'> & {
    position?: ToastPosition;
    distance?: number;
  },
) => {
  if (toastSubscribers.length === 0) {
    console.warn('Toast provider is not mounted. Toast will not be displayed.');
    return;
  }
  const fullProps = {
    ...props,
    position: props.position || DEFAULT_POSITION,
    distance: props.distance ?? DEFAULT_DISTANCE,
  } as ToastProps;
  toastSubscribers.forEach((subscriber) => subscriber(fullProps));
};
