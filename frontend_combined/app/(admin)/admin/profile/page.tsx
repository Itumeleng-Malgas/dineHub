import WithSuspense from '@/components/WithSuspense'
import React from 'react'
import RestaurantProfile from '../../_component/RestaurantProfile'

const Profile = () => {
  return (
    <WithSuspense>
      <RestaurantProfile />
    </WithSuspense>
  )
}

export default Profile