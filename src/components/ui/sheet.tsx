import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = ({ 
  shouldScaleBackground = true, 
  ...props 
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root 
    shouldScaleBackground={shouldScaleBackground} 
    {...props} 
  />
);
Sheet.displayName = "Sheet";

const SheetTrigger = DrawerPrimitive.Trigger;

const SheetPortal = DrawerPrimitive.Portal;

const SheetClose = DrawerPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay 
    ref={ref} 
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      className
    )} 
    {...props} 
  />
));
SheetOverlay.displayName = "SheetOverlay";

const sheetVariants = cva(
  "fixed z-50 flex flex-col bg-background shadow-xl outline-none",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 rounded-b-[20px] border-b",
        bottom: "inset-x-0 bottom-0 rounded-t-[20px] border-t",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm rounded-r-[20px] border-r",
        right: "inset-y-0 right-0 h-full w-3/4 max-w-sm rounded-l-[20px] border-l",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  showHandle?: boolean;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>, 
  SheetContentProps
>(({ side = "bottom", className, children, showHandle = true, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DrawerPrimitive.Content 
      ref={ref} 
      className={cn(sheetVariants({ side }), className)} 
      {...props}
    >
      {/* Handle for bottom drawer */}
      {(side === "bottom" || side === "top") && showHandle && (
        <div className={cn(
          "flex w-full justify-center py-3",
          side === "top" && "order-last"
        )}>
          <DrawerPrimitive.Handle className="h-1.5 w-12 rounded-full bg-muted-foreground/30 transition-colors hover:bg-muted-foreground/50" />
        </div>
      )}
      
      {/* Close button for side drawers */}
      {(side === "left" || side === "right") && (
        <SheetClose className={cn(
          "absolute top-4 rounded-full p-2 opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
          side === "left" ? "right-4" : "left-4"
        )}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      )}
      
      {children}
    </DrawerPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn(
      "flex flex-col gap-1.5 px-6 pb-4 text-center sm:text-left",
      className
    )} 
    {...props} 
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn(
      "mt-auto flex flex-col gap-2 px-6 pb-6",
      className
    )} 
    {...props} 
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description 
    ref={ref} 
    className={cn("text-sm text-muted-foreground", className)} 
    {...props} 
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
