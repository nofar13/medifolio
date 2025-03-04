
import { Fragment, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TransitionProps {
  as?: React.ElementType;
  show: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  children: React.ReactNode;
  className?: string;
  appear?: boolean;
}

export function Transition({
  as: Component = Fragment,
  show,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  children,
  className,
  appear = false,
}: TransitionProps) {
  const [state, setState] = useState(show ? "entered" : "exited");
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (show && (state === "exited" || state === "exiting")) {
      setState("entering");
      
      timeoutId = setTimeout(() => {
        setState("entered");
      }, 300);
    } else if (!show && (state === "entered" || state === "entering")) {
      setState("exiting");
      
      timeoutId = setTimeout(() => {
        setState("exited");
      }, 300);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [show, state]);
  
  if (state === "exited" && !show) {
    return null;
  }
  
  const isEntering = state === "entering";
  const isExiting = state === "exiting";
  
  const classes = cn(
    className,
    isEntering && enter,
    isEntering && enterFrom,
    state === "entered" && enterTo,
    isExiting && leave,
    isExiting && leaveFrom,
    state === "exited" && leaveTo
  );
  
  return (
    <Component>
      <div ref={nodeRef} className={classes}>
        {children}
      </div>
    </Component>
  );
}
