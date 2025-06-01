import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export const SheetPortal = ({ children, ...props }) => (
  <Dialog.Portal {...props}>{children}</Dialog.Portal>
);

export const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-all duration-200 ${className}`}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

export const SheetContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Dialog.Content
      ref={ref}
      className={`fixed right-0 top-0 z-50 h-full w-72 bg-white dark:bg-zinc-900 p-4 shadow-lg transition-transform duration-300 ease-in-out ${className}`}
      {...props}
    >
      {children}
      <SheetClose className="absolute transition-opacity rounded-sm top-4 right-4 opacity-70 hover:opacity-100 focus:outline-none">
        <X className="w-5 h-5" />
      </SheetClose>
    </Dialog.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";
