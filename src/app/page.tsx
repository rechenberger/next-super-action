import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { showToast } from '@/super-action/action/createSuperAction'
import { ActionButtonServer } from '@/super-action/button/ActionButtonServer'

export default function Page() {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardTitle>
            <CardHeader>My First Action</CardHeader>
          </CardTitle>
          <CardContent>
            <ActionButtonServer
              catchToast
              action={async () => {
                'use server'
                showToast({
                  title: 'Starting...',
                })
                await new Promise((resolve) => setTimeout(resolve, 1000))
                showToast({
                  title: 'Loading...',
                })
                await new Promise((resolve) => setTimeout(resolve, 1000))
                throw new Error('Such Fail')
              }}
              command={{
                shortcut: {
                  key: 'f',
                  shift: true,
                },
              }}
            >
              My First Action
            </ActionButtonServer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
