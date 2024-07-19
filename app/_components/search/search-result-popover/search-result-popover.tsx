'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { SearchAutocompleteResponse, getSearchAutocomplete } from '../../../_service/search'
import { Modal } from '../../../_shared/modal/modal'
import { useSearchContainerPosition } from '../context'
import React, { useEffect, useState } from 'react'
import { useIsMobileQuery } from '../../../hooks/use-media-query'
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
} from '../../../_shared/bottom-sheet'

const DocumentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

const StyledSearchResultContainer = styled.div<{ $hasBorder: boolean }>`
  width: 420px;
  height: fit-content;
  max-height: 240px;
  padding: 12px;
  background: white;
  border-top: none;
  border-radius: 0px 0px 8px 8px;
  overflow-x: hidden;
  overflow-y: auto;

  ${({ $hasBorder, theme }) =>
    $hasBorder
      ? css`
          border: 1px ${theme.colors.neutral[300]} solid;
          border-width: 1px;
          border-style: none solid solid;
          border-right-color: ${theme.colors.neutral[300]};
          border-bottom-color: ${theme.colors.neutral[300]};
          border-left-color: ${theme.colors.neutral[300]};
          border-image: initial;
          border-top-color: initial;
        `
      : ''}

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[500]};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[700]};
  }
`

const StyledResultContainer = styled(Link)`
  width: 396px;
  height: 36px;
  padding: 6px 4px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.typo.body2_16};
  color: ${({ theme }) => theme.colors.neutral[900]};
  background: ${({ theme }) => theme.colors.neutral[0]};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};
    border-radius: 6px;
  }
`
const StyledNotFound = styled.div`
  width: 392px;
  height: 36px;
  padding: 6px 4px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.typo.body2_16};
  color: ${({ theme }) => theme.colors.neutral[500]};
  background: ${({ theme }) => theme.colors.neutral[0]};
`

interface SearchResultProps {
  isOpen: boolean
  handleModal: () => void
  children: React.ReactNode
  keyword: string
  onChangeKeyword: (keyword: string) => void
}

const SearchContainer = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  z-index: 1;
  align-items: center;
  display: flex;
`

const Input = styled.input`
  width: 100%;
  height: 24px;
  margin: 8px 0px;
  margin-right: 16px;
  border: none;
  &:focus {
    outline: none;
  }

  ${({ theme }) => theme.typo.body2_16};
  color: ${({ theme }) => theme.colors.neutral[900]};
`

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 8px 12px;
`

const XIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  z-index: 1;
`

export function SearchResult({
  isOpen,
  handleModal,
  children,
  keyword,
  onChangeKeyword,
}: SearchResultProps) {
  const { position } = useSearchContainerPosition()
  const { isMobile } = useIsMobileQuery()

  if (isMobile) {
    return (
      <BottomSheet open={isOpen} onOpenChange={handleModal} css={{ height: '522px' }}>
        <BottomSheetContent>
          <BottomSheetHeader>
            <SearchContainer onClick={handleModal}>
              <SearchIcon src="/images/search-icon.svg" />
              <Input
                value={keyword}
                onChange={(e) => {
                  onChangeKeyword(e.target.value)
                }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                placeholder="검색어를 입력해 주세요."
              />
              {keyword && (
                <XIcon
                  src="images/X-mark.svg"
                  onClick={(e) => {
                    e.stopPropagation()
                    onChangeKeyword('')
                  }}
                />
              )}
            </SearchContainer>
          </BottomSheetHeader>
          <BottomSheetBody>
            <BottomSheetDescription>{children}</BottomSheetDescription>
          </BottomSheetBody>
        </BottomSheetContent>
      </BottomSheet>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      handleModal={handleModal}
      dimColor="rgba(255, 255, 255, 0.8)"
      position={position}
    >
      {children}
    </Modal>
  )
}

interface SearchResultPopoverProps extends Omit<SearchResultProps, 'children'> {}

export function SearchResultPopover({
  handleModal,
  isOpen,
  keyword,
  onChangeKeyword,
}: SearchResultPopoverProps) {
  const [prevData, setPrevData] = useState<SearchAutocompleteResponse[]>([])
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['search-autocomplete', keyword],
    queryFn: () => getSearchAutocomplete(keyword),
  })
  const { isMobile } = useIsMobileQuery()

  useEffect(() => {
    if (data && isSuccess) {
      setPrevData(data)
    }
  }, [data, isSuccess])

  return (
    <SearchResult
      handleModal={handleModal}
      isOpen={isOpen}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
    >
      <StyledSearchResultContainer $hasBorder={!isMobile}>
        <SearchResultByStatus data={data} prevData={prevData} isLoading={isLoading} />
      </StyledSearchResultContainer>
    </SearchResult>
  )
}

interface SearchResultByStatusProps {
  data?: SearchAutocompleteResponse[] | null
  prevData?: SearchAutocompleteResponse[] | null
  isLoading: boolean
}

export function SearchResultByStatus({ data, isLoading, prevData }: SearchResultByStatusProps) {
  if (isLoading) {
    return (
      <>
        {prevData && prevData.length > 0 ? (
          prevData.map((datum) => (
            <StyledResultContainer href={`/post/${datum.shortTitle}`} key={datum.shortTitle}>
              <DocumentIcon src="images/document-icon.svg" />
              {datum.title}
            </StyledResultContainer>
          ))
        ) : (
          <StyledNotFound>검색결과가 없습니다.</StyledNotFound>
        )}
      </>
    )
  }

  if (data && data.length > 0) {
    return (
      <>
        {data.map((datum) => (
          <StyledResultContainer href={`/post/${datum.shortTitle}`} key={datum.shortTitle}>
            <DocumentIcon src="images/document-icon.svg" />
            {datum.title}
          </StyledResultContainer>
        ))}
      </>
    )
  }

  return <StyledNotFound>검색결과가 없습니다.</StyledNotFound>
}
