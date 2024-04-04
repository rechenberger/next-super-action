export const createSuperAction = (action: () => Promise<any>) => {
  return async () => {
    'use server'
    return action()
  }
}
