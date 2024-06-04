'use client'

import { toast } from 'react-toastify'

import { RoleGate } from '@/components/auth/RoleGate'
import { FormSuccess } from '@/components/FormSuccess'
import { UserRole } from '@prisma/client'
import { admin } from '@/actions/admin'

import classes from './Admin.module.sass'

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('Allowed API Route!')
      } else {
        toast.error('Forbidden API Route!')
      }
    })
  }

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error)
      }

      if (data.success) {
        toast.success(data.success)
      }
    })
  }

  return (
    <div>
      <h2 className={classes.title}>Admin</h2>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="You are allowed to see this content" />
      </RoleGate>

      <div className={classes.container}>
        <p>Admin-only API Route</p>
        <button onClick={onApiRouteClick} className={classes.btn}>
          Click to test
        </button>

        <p>Admin-only Server Action</p>
        <button onClick={onServerActionClick} className={classes.btn}>
          Click to test
        </button>
      </div>
    </div>
  )
}

export default AdminPage
