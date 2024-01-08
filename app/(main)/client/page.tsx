'use client'

import { useCurrentUser } from "@/hooks/use-current-user"

const ClientPage = () => {
  const user = useCurrentUser()

  return (
    <div>
      <h1>ClientPage</h1>
      {JSON.stringify(user)}
    </div>
  )
}

export default ClientPage
