"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
          fontSize: "16px",
          padding: "16px",
        },
        success: {
          style: {
            background: "linear-gradient(to right, #ec4899, #a855f7)",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10b981",
          },
        },
      }}
    />
  )
}