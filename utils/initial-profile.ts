import { cacheSet } from '@/lib/cache'
import { getProfileCached } from '@/lib/get-profile'
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
  const ProfileExits = await getProfileCached(user.id)
  if (!ProfileExits) {
    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User',
        email: user.emailAddresses[0]?.emailAddress || '',
        imageUrl: user.imageUrl || '',
      },
    })
    // Cache newly created profile
    await cacheSet(
      `profile:${user.id}`,
      JSON.stringify({
        id: newProfile.id,
        userId: newProfile.userId,
        name: newProfile.name,
        email: newProfile.email,
        imageUrl: newProfile.imageUrl,
      }),
      3600
    )
    //60 minutes

    return newProfile
  }

  return ProfileExits
}
