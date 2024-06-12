interface UserInfo {
  id: number
  githubId: string
  username: string
  displayName: string
  profileUrl: string
  avartarUrl: string
}

interface UserInfoError {
  statusCode: number
  message: string
}

type UserInfoResponse = UserInfo | UserInfoError

function isAuthError(userInfoResponse: UserInfoResponse): userInfoResponse is UserInfoError {
  return 'statusCode' in userInfoResponse && userInfoResponse.statusCode !== 200
}

export async function getUserInfo() {
  try {
    //TODO: 추후에 환경설정 추가후 same-site로 변경예정
    const res = await fetch(`https://devwiki.co.kr/wiki-api/user`, {
      credentials: 'include',
    })

    const data = (await res.json()) as UserInfoResponse

    if (isAuthError(data)) {
      throw new Error('유저 인증에 실패했습니다.')
    }

    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getUserInfoByUserName(userName: string) {
  try {
    //TODO: 추후에 환경설정 추가후 same-site로 변경예정
    const res = await fetch(`https://devwiki.co.kr/wiki-api/user/${userName}`)

    const data = (await res.json()) as UserInfoResponse

    if (isAuthError(data)) {
      throw new Error('존재하지 않는 유저입니다.')
    }

    return data
  } catch (err) {
    console.log(err)
    return null
  }
}
