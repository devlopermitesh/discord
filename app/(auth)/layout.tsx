const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="  h-auto w-full flex flex-row items-center justify-center ">{children}</div>
  )
}

export default Layout
