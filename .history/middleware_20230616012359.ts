export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        "/lists/:path*",
        "/admin/:path*",
    ]
}