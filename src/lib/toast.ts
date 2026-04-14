"use client";

import { toast } from "sonner";

type ToastMessage = string;

export function showSuccessToast(message: ToastMessage) {
  toast.success(message);
}

export function showErrorToast(message: ToastMessage) {
  toast.error(message);
}

export function showInfoToast(message: ToastMessage) {
  toast(message);
}

export function showWarningToast(message: ToastMessage) {
  toast.warning(message);
}

export function showLoadingToast(message: ToastMessage, id?: string) {
  return toast.loading(message, { id });
}
