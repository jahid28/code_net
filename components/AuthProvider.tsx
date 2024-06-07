// 'use client'
import { Session } from 'inspector'
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children, session }: { children: React.ReactNode, session: Session & { expires: string } }) => {
  return (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )
}

export default AuthProvider
