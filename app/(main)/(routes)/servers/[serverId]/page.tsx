'use client'

import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  return <p>Welcome to Server {params.serverId} </p>
}
export default Page
