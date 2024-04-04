import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActionButton } from '@/super-action/button/ActionButton'

export default function Page() {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardTitle>
            <CardHeader>My First Action</CardHeader>
          </CardTitle>
          <CardContent>
            <ActionButton
              tryToast
              action={async () => {
                'use server'
                if (Math.random() < 0.5) {
                  throw new Error('Failed to do the thing')
                }
                return {
                  toastTitle: 'Success',
                  toastDescription: 'You did it!',
                }
              }}
              command={{
                shortcut: {
                  key: 'f',
                  shift: true,
                },
              }}
            >
              My First Action
            </ActionButton>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
