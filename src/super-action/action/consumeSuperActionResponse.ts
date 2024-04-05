import { SuperActionResponse, SuperActionToast } from './createSuperAction'

export const consumeSuperActionResponse = async <T>({
  response,
  onToast,
}: {
  response: Promise<SuperActionResponse<T>>
  onToast?: (toast: SuperActionToast) => void
}): Promise<T | undefined> => {
  const r = await response
  if (r.toast && onToast) {
    onToast(r.toast)
  }
  if (r.next) {
    return await consumeSuperActionResponse({ response: r.next, onToast })
  }
  return r.result
}
