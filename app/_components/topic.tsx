'use client'

import styled from 'styled-components'
import { Accordion, AccordionDescription, AccordionTitle } from '../_shared/accordion'
import { H1, H2, H3 } from '../_shared/heading'

interface TopicInterface {
  topic: string
}

const Container = styled.div`
  width: 768px;
  margin: 100px auto;
`

const Image = styled.img`
  margin: 40px 0;
  width: 100%;
  height: 530px;
`

export function TopicClient({ topic }: TopicInterface) {
  return (
    <Container>
      <H1>Three.js 장단점</H1>

      <Image src="/images/three-js.png" />

      <Accordion>
        <AccordionTitle>
          <H2>1. 개요</H2>
        </AccordionTitle>
        <AccordionDescription>
          Three.js의 주요 장점과 단점을 객관적으로 분석하여, 개발자가 이를 활용하여 효과적인 3D 웹
          애플리케이션을 개발할 수 있도록 안내한다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H2>2. Three.js의 장점</H2>
        </AccordionTitle>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>2.1. 간편한 사용법</H3>
        </AccordionTitle>
        <AccordionDescription>
          Three.js는 복잡한 WebGL API를 추상화하여, 3D 그래픽을 쉽게 구현할 수 있도록 도와준다. 이로
          인해 개발자들이 저수준의 세부 사항을 깊이 이해하지 않고도 빠르게 3D 환경을 구축할 수 있다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>2.2. 활발한 커뮤니티</H3>
        </AccordionTitle>
        <AccordionDescription>
          강력한 커뮤니티를 보유하고 있으며, 많은 개발자와 아티스트가 사용하고 있다. 커뮤니티 내에서
          다양한 튜토리얼, 도구, 플러그인, 예제 코드가 지속적으로 개발되고 공유되고 있다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>2.3. 플랫폼 호환성</H3>
        </AccordionTitle>
        <AccordionDescription>
          다양한 웹 브라우저와 모바일 장치에서 호환이 가능하다. 이는 WebGL이 지원되는 모든
          플랫폼에서 Three.js 애플리케이션을 실행할 수 있다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>2.4. 확장성</H3>
        </AccordionTitle>
        <AccordionDescription>
          다양한 플러그인과 확장 기능을 지원하여, 특정 기능을 필요로 하는 복잡한 3D 애플리케이션
          개발이 가능하다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H2>2. Three.js의 단점</H2>
        </AccordionTitle>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>3.1. 성능 이슈</H3>
        </AccordionTitle>
        <AccordionDescription>
          Three.js는 WebGL을 기반으로 하지만, 때때로 복잡한 3D 그래픽을 렌더링할 때 원시 WebGL
          코드에 비해 성능이 떨어질 수 있다. 이는 추가적인 추상화 계층 때문에 발생할 수 있는
          문제이다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>3.2. 학습 곡선</H3>
        </AccordionTitle>
        <AccordionDescription>
          Three.js는 비교적 쉬운 라이브러리이긴 하지만, 3D 그래픽 자체의 복잡성 때문에 초보자가
          학습하기에는 어려울 수 있다. 특히, 3D 모델링, 조명, 텍스처링 등의 기술을 이해해야 할
          필요가 있다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>3.2. 학습 곡선</H3>
        </AccordionTitle>
        <AccordionDescription>
          Three.js는 비교적 쉬운 라이브러리이긴 하지만, 3D 그래픽 자체의 복잡성 때문에 초보자가
          학습하기에는 어려울 수 있다. 특히, 3D 모델링, 조명, 텍스처링 등의 기술을 이해해야 할
          필요가 있다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>3.3. 문서화와 지원</H3>
        </AccordionTitle>
        <AccordionDescription>
          커뮤니티가 활발하지만, 공식 문서나 지원이 불충분할 수 있다. 특히, 새로운 기능이나 복잡한
          이슈에 대한 상세한 설명이 부족할 수 있다.
        </AccordionDescription>
      </Accordion>

      <Accordion>
        <AccordionTitle>
          <H3>3.4. 브라우저 의존성</H3>
        </AccordionTitle>
        <AccordionDescription>
          Three.js는 웹 기술에 크게 의존하기 때문에, 웹 브라우저의 성능과 WebGL 구현에 따라
          애플리케이션의 성능이 크게 달라질 수 있다.
        </AccordionDescription>
      </Accordion>
    </Container>
  )
}
