'use client'

import { toast } from '@/components/ui/use-toast'
import { isArray } from 'lodash-es'
import { useCallback, useState } from 'react'
import { tryAction } from '../button/tryAction'
import { SuperAction } from './SuperAction'

export type UseSuperActionOptions = {
  action: SuperAction
  disabled?: boolean
  tryToast?: boolean
  askForConfirmation?: boolean
  stopPropagation?: boolean
}

export const useSuperAction = (options: UseSuperActionOptions) => {
  const [isLoading, setIsLoading] = useState(false)

  const trigger = useCallback(
    async (evt: MouseEvent) => {
      if (isLoading) return
      if (options.disabled) return
      if (options.stopPropagation) {
        evt.stopPropagation()
        evt.preventDefault()
      }
      if (options.askForConfirmation) {
        if (!confirm('Are you sure?')) return
      }
      setIsLoading(true)
      if (!options.tryToast) {
        await options.action()
        setIsLoading(false)
        return
      }
      const resultArray = await tryAction(options.action)
      if (isArray(resultArray)) {
        const [result, error] = resultArray
        if (error) {
          toast({
            variant: 'destructive',
            title: error,
          })
        }
        if (result?.toastTitle || result?.toastDescription) {
          toast({
            title: result.toastTitle,
            description: result.toastDescription,
          })
        }
      }
      setIsLoading(false)
    },
    [
      options.action,
      options.askForConfirmation,
      options.disabled,
      isLoading,
      options.stopPropagation,
      options.tryToast,
    ],
  )

  return {
    trigger,
    isLoading,
  }
}
