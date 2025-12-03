import Sidebar from '@/components/organisms/Sidebar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar className="hidden md:flex w-[72px] h-full flex-col" />
      <main className="md:pl-[72px]">{children}</main>
    </div>
  )
}
export default MainLayout
