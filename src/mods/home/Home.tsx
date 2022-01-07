import { signOut } from 'next-auth/react'

import type { AppPage } from '@/@types'
import { Button, Card, Input } from '@/ui'

import { useLoggedIn } from '../auth'

export const Home: AppPage = () => {
  const { session } = useLoggedIn()

  return (
    <div>
      <Card style={{ width: '450px' }} title={`${session?.user?.name}`}>
        <Input label="Endpoint" value={session?.endpoint} copy />
        <br />
        <Input label="Access Key Id" value={session?.user?.accessKeyId} copy />
        <br />
        <Input
          label="Access Key Secret"
          value={session?.user?.accessKeySecret}
          reveal
          copy
        />
        <br />
        <Button onClick={() => signOut()}>Logout</Button>{' '}
      </Card>
    </div>
  )
}

Home.isProtected = true
