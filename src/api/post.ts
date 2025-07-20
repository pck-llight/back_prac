type User = {
  id: number;
  username: string;
  profileImage: string | null;
}

type Post = {
  id: number,
  title: string,
  content: string,
  thumbnail?: string,
  views: number,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
  user: User
}

type PostResponse = {
  posts: Post[],
  totalPages: number,
  currentPage: string,
  totalPosts: number
}

type Upload = {
  title: string,
  content: string,
  thumbnail?: string
}

type SortBy = 'views' | 'latest'

export async function getPost(page: number, limit: number, sortBy: SortBy, search?: string,):Promise<PostResponse>{
  const res = await instance.get<PostResponse>('',{
    params: {
      search: search,
      page: page,
      limit: limit,
      sortBy: sortBy,
    }
  })

  return res.data;
}

export async function postUpload(title: string, content: string, thumbnail?: File):Promise<Upload> {
  // return instance.post('')

  // )
}