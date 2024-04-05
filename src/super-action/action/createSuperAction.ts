import { ReactNode } from 'react'
import { createResolvablePromise } from './createResolvablePromise'

export type SuperActionToast = {
  title?: string
  description?: ReactNode
}

export type SuperActionError = {
  message?: string
}

export type SuperActionResponse<T> = {
  result?: T
  next?: Promise<SuperActionResponse<T>>
  toast?: SuperActionToast
  error?: SuperActionError
}

type SuperActionContext = {
  showToast: (toast: SuperActionToast) => void
}

export const superAction = <T>(
  action: (ctx: SuperActionContext) => Promise<T>,
) => {
  let next = createResolvablePromise<SuperActionResponse<T>>()
  const firstPromise = next.promise

  const chain = (val: SuperActionResponse<T>) => {
    const oldNext = next
    next = createResolvablePromise<SuperActionResponse<T>>()
    oldNext.resolve({ ...val, next: next.promise })
  }
  const complete = (val: SuperActionResponse<T>) => {
    next.resolve(val)
  }

  const showToast = (toast: SuperActionToast) => {
    chain({ toast })
  }

  const ctx: SuperActionContext = {
    showToast,
  }

  action(ctx)
    .then((result) => complete({ result }))
    .catch((error) => {
      // console.error('SOME ERROR', {
      //   message: error?.message,
      // })
      complete({
        error: {
          message: error?.message,
        },
      })
    })

  return firstPromise
}

export type SuperAction<T = any> = () => Promise<SuperActionResponse<T>>
