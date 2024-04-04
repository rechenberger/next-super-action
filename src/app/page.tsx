import { ActionButton } from '@/super-action/button/ActionButton'

export default function Page() {
  return (
    <>
      <ActionButton
        tryToast
        action={async () => {
          'use server'
          return {
            toastTitle: 'Success',
            toastDescription: 'You did it!',
          }
        }}
        command={{}}
      >
        My First Action
      </ActionButton>
    </>
  )
}
