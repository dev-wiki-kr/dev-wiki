'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../../_service/auth'
import { UserProfile } from './user-profile'
import { LoginLink } from './login-link'

export function UserAccountMenu() {
  const { data, isSuccess } = useQuery({ queryKey: ['user'], queryFn: getUserInfo })

  if (isSuccess && data) {
    return <UserProfile avartarUrl={data.avartarUrl} profileUrl={data.profileUrl} />
  }

  return <LoginLink />
}
