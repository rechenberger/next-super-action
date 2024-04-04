'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { isArray } from 'lodash-es'
import { ArrowRight, Loader2 } from 'lucide-react'
import { ReactNode, useCallback, useState } from 'react'
import { ActionCommand } from '../command/ActionCommand'
import { type ActionCommandConfig } from '../command/ActionCommandProvider'
import { tryAction } from './tryAction'

export type ActionButtonAction = () => Promise<void | {
  toastTitle?: string
  toastDescription?: string
}>

export type ActionButtonProps = {
  action: ActionButtonAction
  disabled?: boolean
  children?: React.ReactNode
  component?: React.ElementType | typeof Button
  hideIcon?: boolean
  hideButton?: boolean
  tryToast?: boolean
  askForConfirmation?: boolean
  stopPropagation?: boolean
  command?: Omit<
    ActionCommandConfig,
    'action' | 'children' | 'askForConfirmation'
  > & {
    label?: ReactNode
  }
} & ButtonProps

export const ActionButton = ({
  action,
  disabled,
  children,
  component: Component = Button,
  hideIcon,
  hideButton,
  tryToast,
  askForConfirmation,
  stopPropagation,
  command,
  ...props
}: ActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const Icon = isLoading ? Loader2 : ArrowRight

  const onClick = useCallback(
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
      const resultArray = await tryAction(action)
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
      action,
      askForConfirmation,
      disabled,
      isLoading,
      stopPropagation,
      tryToast,
    ],
  )

  return (
    <>
      {!hideButton && (
        <Component
          type="button"
          disabled={isLoading || disabled}
          {...props}
          onClick={onClick}
        >
          {children}
          {!hideIcon && (
            <Icon className={cn('w-4 h-4 ml-2', isLoading && 'animate-spin')} />
          )}
        </Component>
      )}
      {command && (
        <ActionCommand
          icon={hideIcon ? undefined : Icon}
          {...command}
          action={onClick as any}
        >
          {command.label ?? children}
        </ActionCommand>
      )}
    </>
  )
}
