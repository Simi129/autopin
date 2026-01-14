'use client';

import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
}

const variantStyles = {
  success: {
    container: 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-950/30 dark:to-teal-950/30 dark:border-emerald-800/50',
    icon: 'text-emerald-600 dark:text-emerald-400',
    title: 'text-emerald-900 dark:text-emerald-100',
    message: 'text-emerald-700 dark:text-emerald-300',
    closeButton: 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:text-emerald-200 dark:hover:bg-emerald-900/50',
  },
  error: {
    container: 'bg-gradient-to-r from-rose-50 to-red-50 border-rose-200 dark:from-rose-950/30 dark:to-red-950/30 dark:border-rose-800/50',
    icon: 'text-rose-600 dark:text-rose-400',
    title: 'text-rose-900 dark:text-rose-100',
    message: 'text-rose-700 dark:text-rose-300',
    closeButton: 'text-rose-600 hover:text-rose-800 hover:bg-rose-100 dark:text-rose-400 dark:hover:text-rose-200 dark:hover:bg-rose-900/50',
  },
  warning: {
    container: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 dark:from-amber-950/30 dark:to-orange-950/30 dark:border-amber-800/50',
    icon: 'text-amber-600 dark:text-amber-400',
    title: 'text-amber-900 dark:text-amber-100',
    message: 'text-amber-700 dark:text-amber-300',
    closeButton: 'text-amber-600 hover:text-amber-800 hover:bg-amber-100 dark:text-amber-400 dark:hover:text-amber-200 dark:hover:bg-amber-900/50',
  },
  info: {
    container: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-950/30 dark:to-cyan-950/30 dark:border-blue-800/50',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100',
    message: 'text-blue-700 dark:text-blue-300',
    closeButton: 'text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-200 dark:hover:bg-blue-900/50',
  },
};

const iconComponents = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export default function Alert({
  variant = 'info',
  title,
  message,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  className = '',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const styles = variantStyles[variant];
  const IconComponent = iconComponents[variant];

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        relative flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm
        ${styles.container}
        ${isExiting ? 'animate-fade-out' : 'animate-slide-in'}
        ${className}
      `}
      role="alert"
    >
      {/* Icon */}
      <div className={`flex-shrink-0 ${styles.icon}`}>
        <IconComponent size={22} strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className={`text-sm font-semibold mb-1 ${styles.title}`}>
            {title}
          </h3>
        )}
        <p className={`text-sm ${styles.message} leading-relaxed`}>
          {message}
        </p>
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={handleClose}
          className={`
            flex-shrink-0 rounded-lg p-1 transition-all duration-200
            ${styles.closeButton}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
          `}
          aria-label="Close alert"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      )}

      {/* Progress bar for auto-close */}
      {autoClose && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 dark:bg-white/5 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-current opacity-30"
            style={{
              animation: `progress ${autoCloseDelay}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
}