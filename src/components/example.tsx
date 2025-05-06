import { useUserStore } from '../stores/userStore'
import { useEffect } from 'react'

export function ExampleComponent() {
  const { user, connectRealTime, disconnectRealTime } = useUserStore()

  useEffect(() => {
    connectRealTime()
    return () => disconnectRealTime()
  }, [connectRealTime, disconnectRealTime])

  return (
    <div>
      {user && <div>User ID: {user.id}</div>}
      <div>Other content here...</div>
      {/* Add more content or components as needed */}
    </div>
  )
}
