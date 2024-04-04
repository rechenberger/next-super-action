'use server'

import { ActionButtonAction } from './ActionButton'

export const tryAction = async (action: ActionButtonAction) => {
  try {
    const result = await action()
    return [result, null] as const
  } catch (error: any) {
    return [null, error?.message || 'An error occurred'] as const
  }
}
