import React from 'react'

import { Card } from '@/components/auth/Card'

const ErrorPage = () => {
  return (
    <Card
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Oops! Something went Wrong!"
    >
      <p />
    </Card>
  )
}

export default ErrorPage
