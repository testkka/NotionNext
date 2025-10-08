import { NotionAPI } from 'notion-client'
import BLOG from '@/blog.config'

export const getNotionAPI = () => {
  return new NotionAPI({
    activeUser: BLOG.NOTION_ACTIVE_USER || null,
    authToken: BLOG.NOTION_TOKEN_V2 || null,
    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    kyOptions: {
      hooks: {
        beforeRequest: [
          request => {
            if (request.url.includes('/api/v3/syncRecordValues')) {
              request.url = request.url.replace(
                '/api/v3/syncRecordValues',
                '/api/v3/syncRecordValuesMain'
              )
            }
          }
        ]
      }
    }
  })
}

const notionAPI = getNotionAPI()
export default notionAPI
