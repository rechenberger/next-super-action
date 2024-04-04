'use server'

import { type SuperAction } from '../action/superAction'

export const tryAction = async (action: SuperAction) => {
  try {
    const result = await action()
    return [result, null] as const
  } catch (error: any) {
    return [null, error?.message || 'An error occurred'] as const
  }
}
