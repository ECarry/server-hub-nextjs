import { auth } from '@/auth'

const ProfilePage = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}

export default ProfilePage
