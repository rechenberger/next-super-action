import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { showToast, superAction } from '@/super-action/action/createSuperAction'
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
              catchToast
              action={async () => {
                'use server'
                return superAction(async () => {
                  showToast({
                    title: 'Starting...',
                  })
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  showToast({
                    title: 'Loading...',
                  })
                  await new Promise((resolve) => setTimeout(resolve, 1000))

                  const value = Math.random()

                  showToast({
                    title: `Done: ${value}`,
                    description: (
                      <ActionButton
                        catchToast
                        action={async () => {
                          'use server'
                          const v = value // FIXME: Next.js bug
                          return superAction(async () => {
                            showToast({
                              title: 'Undoing...',
                            })
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1000),
                            )
                            throw new Error(`Could not undo: ${v}`)
                          })
                        }}
                      >
                        Undo
                      </ActionButton>
                    ),
                  })
                })
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
