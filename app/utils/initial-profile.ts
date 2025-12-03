import { prisma } from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'

export const IntialProfile = async () => {
  const { isAuthenticated, redirectToSignIn } = await auth()
  if (!isAuthenticated) return redirectToSignIn()
  const user = await currentUser()
  if (!user) {
    return redirectToSignIn()
  }
  //Profile Exits
  const ProfileExits = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  })
  if (!ProfileExits) {
    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User',
        email: user.emailAddresses[0]?.emailAddress || '',
        imageUrl: user.imageUrl || '',
      },
    })
    return newProfile
  }

  return ProfileExits
}
