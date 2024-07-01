import WithSuspense from '@/components/WithSuspense'
import RestaurantProfileComponent from '@/components/adminPanel/RestaurantProfile'
import React from 'react'

const Profile = () => {
  return (
    <WithSuspense>
      <RestaurantProfileComponent />
    </WithSuspense>
  )
}

export default Profile