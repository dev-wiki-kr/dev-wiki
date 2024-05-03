import { ClientTest } from './_components/client-test'
import { ServerTest } from './_components/server-test'

export default function Test() {
  return (
    <ClientTest>
      <ServerTest />
    </ClientTest>
  )
}
