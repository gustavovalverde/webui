import axios from 'axios'

import { getCurrentProject } from '@/mods/projects/components/current-project'
import { Notifier } from '@/mods/shared/components/Notification'

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

API.interceptors.response.use(
  res => res,
  async err => {
    const message = err.response?.data?.message

    /**
     * @todo Create an error handler based on the messages or codes thrown by the sdk
     */
    if (message) Notifier.error(message)

    return Promise.reject(err)
  }
)

export { API }
