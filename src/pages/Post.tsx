import { postUpload } from "../api/post";
import { Wrapper } from "./Home";
import { useState } from "react";



export default function Post() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  

  return (
    <Wrapper>
      <h1>Post Page</h1>
      <div>썸네일 추가: <input type="file" accept="image/png, image/jpeg, image/gif" onChange={(e) => {setThumbnail(e.target.files?.[0] ?? null)}} /></div>
      {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
      <div>제목: <input placeholder="Enter post Title" onChange={(e) => setTitle(e.target.value)} /></div>
      <textarea placeholder="Enter post Content" onChange={(e) => setContent(e.target.value)} style={{ width: '100%', height: '40dvh' }} />
      <button onClick={() => {
        postUpload(title, content, thumbnail ?? undefined)
          .then((res) => {
            console.log('Post uploaded successfully:', res);
            // Optionally, redirect or reset form
          })
          .catch((err) => {
            console.error('Error uploading post:', err);
          });
      }} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>업로드</button>
    </Wrapper>
  );
}