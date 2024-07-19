'use client'

import Link from 'next/link'
import { styled } from 'styled-components'
import { H2 } from '../_shared/heading'

const StyledContainer = styled.div`
  max-width: 768px;
  height: calc(100dvh - 60px); // 전체화면 높이 - 헤더 높이
  margin: auto;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 29px;

  height: 80%;
`

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const StyledText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[900]};

  text-align: center;
`

const StyledLink = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.blue[600]};
  border-radius: 100px;
  padding: 8px 24px;

  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.neutral[900]};

  & > em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.blue[600]};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[50]};
  }

  transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
`

export function Notfound() {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitle>
          <img src="/icons/not-found-logo.svg" />
          <H2>원하시는 페이지를 찾을 수 없습니다.</H2>
        </StyledTitle>
        <StyledText>
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
        </StyledText>
        <StyledLink href="/">
          <em>DevWiki</em> 홈으로 가기
        </StyledLink>
      </StyledWrapper>
    </StyledContainer>
  )
}
