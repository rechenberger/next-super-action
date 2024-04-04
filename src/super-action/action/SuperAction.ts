export type SuperAction = () => Promise<void | {
  toastTitle?: string
  toastDescription?: string
}>
