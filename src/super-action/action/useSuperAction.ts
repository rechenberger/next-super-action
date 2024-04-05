'use client'

import { toast } from '@/components/ui/use-toast'
import { useCallback, useState } from 'react'
import { consumeSuperActionResponse } from './consumeSuperActionResponse'
import { SuperAction } from './createSuperAction'

export type UseSuperActionOptions = {
  action: SuperAction
  disabled?: boolean
  tryToast?: boolean
  askForConfirmation?: boolean
  stopPropagation?: boolean
}

export const useSuperAction = (options: UseSuperActionOptions) => {
  const [isLoading, setIsLoading] = useState(false)

  const { action, disabled, tryToast, askForConfirmation, stopPropagation } =
    options

  const trigger = useCallback(
    async (evt: MouseEvent) => {
      if (isLoading) return
      if (disabled) return
      if (stopPropagation) {
        evt.stopPropagation()
        evt.preventDefault()
      }
      if (askForConfirmation) {
        if (!confirm('Are you sure?')) return
      }
      setIsLoading(true)
      if (!tryToast) {
        await action()
        setIsLoading(false)
        return
      }

      await consumeSuperActionResponse({
        response: action(),
        onToast: (t) => {
          toast({
            title: t.title,
            description: t.description,
          })
        },
      })

      // const resultArray = await tryAction(action)
      // if (isArray(resultArray)) {
      //   const [result, error] = resultArray
      //   if (error) {
      //     toast({
      //       variant: 'destructive',
      //       title: error,
      //     })
      //   }
      //   if (result?.toastTitle || result?.toastDescription) {
      //     toast({
      //       title: result.toastTitle,
      //       description: result.toastDescription,
      //     })
      //   }
      // }
      setIsLoading(false)
    },
    [
      action,
      askForConfirmation,
      disabled,
      isLoading,
      stopPropagation,
      tryToast,
    ],
  )

  return {
    trigger,
    isLoading,
  }
}
