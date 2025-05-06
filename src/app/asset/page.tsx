'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'

export default function AssetPage() {
  const { user, connectRealTime, disconnectRealTime } = useUserStore()

  useEffect(() => {
    connectRealTime()
    return () => disconnectRealTime()
  }, [connectRealTime, disconnectRealTime])

  return (
    <div className="p-4">
      <h1>Asset Page</h1>
      <div className="mt-4 p-4 border rounded-md">
        <h2>User Updates:</h2>
        <p>Current user name: {user?.email || 'Loading...'}</p>
      </div>
    </div>
  )
}
