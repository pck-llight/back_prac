import { instance } from "../../shared/instance"

export async function searchPosts(search: string, page: number, limit: number, sortBy: string) {
  return instance.get('',{
    params:{
      search: search,
      page: page,
      limit: limit,
      sortBy: sortBy
    }
  })
}