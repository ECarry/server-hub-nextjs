import { currentUser } from "@/lib/auth"

const ServerPage = async () => {
  const user = await currentUser()
  
  return (
    <div>
      <h1>ServerPage</h1>
      {JSON.stringify(user)}
    </div>
  )
}

export default ServerPage
