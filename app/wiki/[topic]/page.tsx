export default function Topic({ params: { topic }, searchParams }) {
  console.log({ topic, searchParams })

  return <div>{topic}</div>
}
