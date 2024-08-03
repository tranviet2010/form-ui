import React, { useState } from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';


const UploadFile = ({handleFile}) => {
    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log("fileList", fileList);
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await axios.post('http://localhost:198/api/v1/files/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // Xử lý dữ liệu trả về từ server
          console.log('Upload response:', response.data);
          handleFile(response?.data?.data?.path)
    
          // Đặt URL của file vào fileList
          const updatedFileList = fileList.map((item) =>
            item.uid === file.uid ? { ...item, url: response.data.url } : item
          );
          setFileList(updatedFileList);
    
          // Thông báo upload thành công
          message.success(`${file.name} file uploaded successfully`);
    
          // Gọi onSuccess để báo cho Ant Design rằng upload thành công
          onSuccess(response.data, file);
        } catch (error) {
          console.error('Error uploading file:', error);
          message.error(`${file.name} file upload failed.`);
          onError(error);
        }
      };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    return (
        <ImgCrop rotationSlider>
            <Upload
                customRequest={customRequest}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 1 && '+ Upload'}
            </Upload>
        </ImgCrop>
    );
};
export default UploadFile;