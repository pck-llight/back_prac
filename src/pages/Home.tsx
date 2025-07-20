import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getPost } from '../api/post';
import styled from 'styled-components';
import useDebounce from '../hooks/debounce';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 200);
  const { data: posts, isLoading } = useQuery(
    {
      queryKey: ['posts', debouncedSearchText],
      queryFn: () => getPost(1, 10, 'latest', debouncedSearchText)
    }
  );

  const navigate = useNavigate();
  
  return (
    <Wrapper>
      <div>
        검색: <input placeholder="Search posts..." onChange={(e)=>{setSearchText(e.target.value)}}/>
      </div>
      <button onClick={() => {navigate('/post')}}>게시하기</button>
      <h1>게시물 목록</h1>
      <PostList>
        {!isLoading && posts?.posts.map((post, idx) => (
          <PostItem key={idx}>
            {post.thumbnail && <img src={`http://localhost:3001${post.thumbnail}`} alt={post.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
            <h2>{post['title']}</h2>
            <p>{post['content']}</p>
            <p>작성자: {post.user.username}</p>
            <p>조회수: {post.views}</p>
            <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
          </PostItem>
        ))}
      </PostList>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  padding: 40px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;