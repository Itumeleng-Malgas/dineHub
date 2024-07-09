import AddMenu from '@/components/admin/AddMenu'
import WithSuspense from '@/components/WithSuspense'
import React from 'react'

const AddMenuPage = () => {
  return (
    <WithSuspense>
        <AddMenu />
    </WithSuspense>
  )
}

export default AddMenuPage