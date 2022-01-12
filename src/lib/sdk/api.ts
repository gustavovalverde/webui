import axios from 'axios'

import { getCurrentProject } from '@/hooks/useCurrentProject'

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/sdk`,
})

API.interceptors.request.use(config => {
  const project = getCurrentProject()

  return project
    ? {
        ...config,
        headers: {
          ...config?.headers,
          'X-Project-Id': project.accessKeyId,
          'X-Project-Secret': project.accessKeySecret,
        },
      }
    : config
})

export { API }
