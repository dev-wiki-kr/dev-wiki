'use client'

import styled from 'styled-components'

const Container = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const UserId = styled.p`
  font-size: 16px;
  margin: 0px 12px;
`

const AuthorTag = styled.div`
  width: 70px;
  height: 25px;
  border-radius: 80px;
  background-color: #007cee;
  font-size: 12px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`
interface AuthorInfoInterface {
  src: string
  username: string
}

export function AuthorInfo({ src, username }: AuthorInfoInterface) {
  return (
    <Container>
      <UserImage src={`${src}`} />
      <UserId>{username}</UserId>
      <AuthorTag>최초 작성자</AuthorTag>
    </Container>
  )
}
