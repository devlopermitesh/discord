interface sidebarProps {
  className?: string | undefined
}
const Sidebar = ({ className }: sidebarProps) => {
  return <div className={`z-30  fixed inset-y-0 ${className}`}></div>
}
export default Sidebar
