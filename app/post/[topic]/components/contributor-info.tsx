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

const ContributorTag = styled.div`
  width: 70px;
  height: 25px;
  border-radius: 80px;
  background-color: #05a728;
  font-size: 12px;
  color: #ffffff;
`
interface ContributorInfoInterface {
  src: string
  username: string
}

export function ContributorInfo({ src, username }: ContributorInfoInterface) {
  return (
    <Container>
      <UserImage src={`${src}`} />
      <UserId>{username}</UserId>
    </Container>
  )
}
