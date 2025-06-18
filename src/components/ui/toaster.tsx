"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  Bell 
} from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Select the appropriate icon based on the variant
        let Icon = Bell;
        let iconColor = "text-purple-600";
        
        if (variant === "success") {
          Icon = CheckCircle;
          iconColor = "text-green-500";
        } else if (variant === "destructive") {
          Icon = AlertCircle;
          iconColor = "text-red-500";
        } else if (variant === "warning") {
          Icon = AlertTriangle;
          iconColor = "text-yellow-500";
        } else if (variant === "info") {
          Icon = Info;
          iconColor = "text-blue-500";
        }

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3">
              <Icon className={`h-5 w-5 ${iconColor} mt-0.5 flex-shrink-0`} />
              <div className="grid gap-1">
                {title && <ToastTitle className="text-sm font-medium">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-xs text-gray-500">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
