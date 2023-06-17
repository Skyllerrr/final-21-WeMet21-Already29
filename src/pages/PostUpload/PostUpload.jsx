import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderMenu/HeaderMenu";
import { Upload, Form, UploadInput, Img, Label, Textarea } from "./PostUploadStyle";
import profileImg from "../../assets/images/profileImg.svg";
import uploadFile from "../../assets/images/uploadFile.svg";

export default function PostUpload() {
  const [imagePost, setImagePost] = useState("");
  const [postContent, setPostContent] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // const [imageURL, setImageURL] = useState("");

  // useEffect(() => {
  //   if (imagePost) {
  //     setImageURL(imagePost);
  //   }
  //   console.log("Image URL:", imageURL);
  // }, [imagePost, imageURL]);

  const handleImageInput = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setImagePost("https://api.mandarin.weniv.co.kr/" + data.filename);

      setPreviewImage(URL.createObjectURL(event.target.files[0])); // 미리보기 이미지 URL 설정
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostUpload = async (event) => {
    if (!postContent || !imagePost) {
      console.log("내용 또는 이미지를 입력해주세요.");
      return;
    }

    // const formData = JSON.stringify({
    //   post: {
    //     content: postContent,
    //     image: imagePost,
    //   },
    // });

    const formData = new FormData();
    formData.append("file", imagePost);

    const token = localStorage.getItem("token");

    console.log(token);
    try {
      const response = await fetch("https://api.mandarin.weniv.co.kr/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGQ2ZWYzYjJjYjIwNTY2MzM4MGNkNCIsImV4cCI6MTY5MjE3NDY3MCwiaWF0IjoxNjg2OTkwNjcwfQ.b3lsoIO_deSjwV_rWEmxq4-xI4iCT9S4pNV_uvzBvMA`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  return (
    <>
      <Header handlePostUpload={handlePostUpload} />
      <Upload>
        <h2 className="a11y-hidden">게시글 작성</h2>
        <Img src={profileImg} alt="profileImg" />
        <Form method="post">
          <label htmlFor="txt-sync" className="a11y-hidden">
            게시글 입력창입니다.
          </label>
          <Textarea id="txt-sync" cols="40" rows="10" maxLength="140" placeholder="게시글 입력하기..." className="upload-txt" value={postContent} onChange={handleContentChange}></Textarea>
          <Label htmlFor="file-sync" className="file-sync">
            <img src={uploadFile} alt="uploadFile" />
          </Label>
          <UploadInput type="file" id="file-sync" accept=".png, .jpg, .jpeg" multiple onChange={handleImageInput} hidden />
        </Form>
        <div className="img-container">
          {previewImage && <img src={previewImage} alt="Preview" />} 미리보기 이미지 렌더링
          {imagePost && <img src={imagePost} alt="Uploaded" />} 업로드된 이미지 렌더링
        </div>
      </Upload>
    </>
  );
}
