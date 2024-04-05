# Super Action

### 💡 Idea

```tsx
export default function Page() {

  const blogPost = await getBlogPost()

  return (<>
    <h1>My Blog Post</h1>
    <SuperActionButton action={async ({showCommands}) => {
      'use server'
      const canSendEmail = await checkEmail()
      return showCommands([
        {
          title: 'Share via Email',

          action: async ({showDialog}) => {
            const defaultEmail = await getDefaultEmail()
            const sendEmail = async (email: string) => superAction(async ({showToast, showProgress}) => {
              'use server'
              showProgress({
                title: 'Sending Email',
                percentage: 20
              })
              await sendEmail({
                email,
                blogPost // Deeply nested 🤓
              })
              showToast({
                  title: 'Email Sent',
                },
              })
            })
            if(defaultEmail) {
              return sendEmail(defaultEmail)
            } else {
              return showDialog(() => {
                return (<>
                  <h2>Where do you want to send the email?</h2>
                  <SuperActionForm action={({formData}) => {
                    'use server'
                    return sendEmail(formData.get('email'))
                  }}>
                    <input name="email" />
                    <button type="submit">Send</submit>
                  </SuperActionForm>
                <>)
              })
            }

        }
      ])
    }}>
      Share
    </SuperActionButton>
  <>)

}
```
