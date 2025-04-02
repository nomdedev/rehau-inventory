import "next-auth"

declare module "next-auth" {
  interface User {
    username?: string
    role?: string
  }

  interface Session {
    user: {
      id?: string
      name?: string
      username?: string
      role?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string
    role?: string
  }
}

