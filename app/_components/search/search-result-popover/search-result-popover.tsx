'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import styled from 'styled-components'
import { getSearchAutocomplete } from '../../../_service/search'
import { Modal } from '../../../_shared/modal/modal'
import { useSearchContainerPosition } from '../context'
import React from 'react'
import { useIsMobileQuery } from '../../../hooks/use-media-query'
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
} from '../../../_shared/bottom-sheet'

const DocumentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`

const StyledSearchResultContainer = styled.div`
  width: 420px;
  height: fit-content;
  max-height: 240px;
  padding: 12px;
  background: white;
  border: #b5b5b5 solid;
  border-top: none;
  border-radius: 0px 0px 8px 8px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const StyledResultContainer = styled(Link)`
  width: 396px;
  height: 36px;
  padding: 6px 4px;
  display: flex;
  font-size: 16px;
  align-items: center;
  background: white;
  &:hover {
    background: #f2f2f2;
    border-radius: 6px;
  }
`
const StyledNotFound = styled.div`
  width: 392px;
  height: 36px;
  padding: 6px 4px;
  display: flex;
  font-size: 16px;
  color: #777777;
  align-items: center;
  background: white;
`

interface SearchResultProps {
  isOpen: boolean
  handleModal: () => void
  children: React.ReactNode
}

export function SearchResult({ isOpen, handleModal, children }: SearchResultProps) {
  const { position } = useSearchContainerPosition()
  const { isMobile } = useIsMobileQuery()

  if (isMobile) {
    return (
      <BottomSheet open={isOpen} onOpenChange={handleModal}>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>바텀시트 제목</BottomSheetTitle>
            <BottomSheetClose>닫기</BottomSheetClose>
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

interface SearchResultPopoverProps extends Omit<SearchResultProps, 'children'> {
  keyword: string
}

export function SearchResultPopover({ handleModal, isOpen, keyword }: SearchResultPopoverProps) {
  const { data } = useQuery({
    queryKey: ['search-autocomplete', keyword],
    queryFn: () => getSearchAutocomplete(keyword),
  })

  return (
    <SearchResult handleModal={handleModal} isOpen={isOpen}>
      <StyledSearchResultContainer>
        {data && data.length > 0 ? (
          data.map((datum) => (
            <StyledResultContainer href={`/post/${datum._id}`} key={datum._id}>
              <DocumentIcon src="images/document-icon.svg" />
              {datum.text}
            </StyledResultContainer>
          ))
        ) : (
          <StyledNotFound>{keyword}에 대한 검색결과가 없습니다.</StyledNotFound>
        )}
      </StyledSearchResultContainer>
    </SearchResult>
  )
}
