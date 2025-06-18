import { toast } from "@/hooks/use-toast"

type ToastVariant = "default" | "success" | "destructive" | "warning" | "info"

/**
 * Helper function to show toast notifications that appear from the top right
 * @param title - The title of the toast
 * @param message - The message/description to display
 * @param variant - The type of toast (default, success, destructive, warning, info)
 */
export const showToast = (
  title: string,
  message: string,
  variant: ToastVariant = "default"
) => {
  toast({
    title,
    description: message,
    variant,
  })
}

/**
 * Show a success toast notification
 */
export const showSuccessToast = (title: string, message: string) => {
  showToast(title, message, "success")
}

/**
 * Show an error toast notification
 */
export const showErrorToast = (title: string, message: string) => {
  showToast(title, message, "destructive")
}

/**
 * Show a warning toast notification
 */
export const showWarningToast = (title: string, message: string) => {
  showToast(title, message, "warning")
}

/**
 * Show an info toast notification
 */
export const showInfoToast = (title: string, message: string) => {
  showToast(title, message, "info")
}