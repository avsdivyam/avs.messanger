"use client"

import { useToast } from "@/hooks/use-toast"

export function useCustomToast() {
  const { toast } = useToast()

  const showToast = {
    success: (title: string, description?: string) => {
      toast({
        variant: "success",
        title,
        description,
      })
    },
    error: (title: string, description?: string) => {
      toast({
        variant: "destructive",
        title,
        description,
      })
    },
    warning: (title: string, description?: string) => {
      toast({
        variant: "warning",
        title,
        description,
      })
    },
    info: (title: string, description?: string) => {
      toast({
        variant: "info",
        title,
        description,
      })
    },
    default: (title: string, description?: string) => {
      toast({
        title,
        description,
      })
    },
  }

  return showToast
}