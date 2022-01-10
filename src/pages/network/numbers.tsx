export { Home as default } from '@/mods/home'

// import { NextPageContext } from 'next'
// import { getSession } from 'next-auth/react'

// import { getProjects } from '@/helpers/api'

// export async function getServerSideProps({ req }: NextPageContext) {
//   const session = await getSession({ req })

//   if (!session?.user) {
//     return {
//       props: {},
//     }
//   }

//   const res = await getProjects({ ...session.user })
//   const data = res.projects

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       data,
//     },
//   }
// }
