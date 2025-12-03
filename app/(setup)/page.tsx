import { prisma } from '@/lib/prisma'
import { IntialProfile } from '../utils/initial-profile'
import { redirect } from 'next/navigation'
import InitialModal from '@/components/organisms/modals/IntialModal'

const SetupPage = async () => {
  const Userprofile = await IntialProfile()
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: Userprofile.id,
        },
      },
    },
  })
  //if user is member of any profile redirect to that server
  if (server) {
    redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}
export default SetupPage
