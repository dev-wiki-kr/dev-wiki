'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { getSearchAutocomplete } from '../../../_service/search'
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

  ${({ $hasBorder }) =>
    $hasBorder
      ? css`
          border: #b5b5b5 solid;
          border-width: initial;
          border-style: none solid solid;
          border-right-color: rgb(181, 181, 181);
          border-bottom-color: rgb(181, 181, 181);
          border-left-color: rgb(181, 181, 181);
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
  font-size: 16px;
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
  const { data } = useQuery({
    queryKey: ['search-autocomplete', keyword],
    queryFn: () => getSearchAutocomplete(keyword),
  })
  const { isMobile } = useIsMobileQuery()

  return (
    <SearchResult
      handleModal={handleModal}
      isOpen={isOpen}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
    >
      <StyledSearchResultContainer $hasBorder={!isMobile}>
        {data && data.length > 0 ? (
          data.map((datum) => (
            <StyledResultContainer href={`/post/${datum.shortTitle}`} key={datum.shortTitle}>
              <DocumentIcon src="images/document-icon.svg" />
              {datum.title}
            </StyledResultContainer>
          ))
        ) : (
          <StyledNotFound>{keyword}에 대한 검색결과가 없습니다.</StyledNotFound>
        )}
      </StyledSearchResultContainer>
    </SearchResult>
  )
}
