import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { getInfoFeNo, postInfo } from '../../api/request';
import html2canvas from 'html2canvas';
import { AgeToDate, DateToDay, getInfoHeight, getSum } from '../utils';

const ChildStyle = styled.div`
  background-color: #fff;
  border:1px solid #d9d9d9;
  padding:1rem 5rem;
  margin-bottom:1rem
`

function ResultMature() {
    const [data, setData] = useState([])
    const { state } = useLocation()
    const navigate = useNavigate();
    const textRef = useRef();
    const dataInfoNavigate = state?.data ? state?.data : []

    const getFormattedDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleConvert = async () => {
        if (textRef.current) {
            const canvas = await html2canvas(textRef.current);
            const imgData = canvas.toDataURL('image/png');

            // Tạo một link để tải ảnh xuống
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'text-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    useEffect(() => {
        const dataResult = {
            type_result: "L",
            name: dataInfoNavigate?.name,
            phone: dataInfoNavigate?.phone,
            phatho: dataInfoNavigate?.phatho,
            address: dataInfoNavigate?.address,
            email: dataInfoNavigate?.email,
            male: dataInfoNavigate?.male,
            file: dataInfoNavigate?.url,
            sponsor: dataInfoNavigate?.sponsor,
            note: dataInfoNavigate?.note,

        }

        postInfo('result', dataResult).then((res) => { })
    }, [])

    return (
        <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: '80vh', padding: '1rem' }}
        >
            <Col xs={24} sm={16} md={12} lg={8} xl={10} ref={textRef}>
                <ChildStyle>
                    <h5>Thông tin người bảo trợ</h5>
                    <p>Họ và tên: {dataInfoNavigate?.name}</p>
                    <p>Số điện thoại: {dataInfoNavigate?.phone}</p>
                    <p>Địa chỉ: {dataInfoNavigate?.address}</p>
                </ChildStyle>

                <ChildStyle>
                    <h5>Thông tin lưu trữ</h5>
                    <p>Kết quả lưu trữ vào ngày: {getFormattedDate()}</p>
                    <br />
                    <p>Họ và tên: {dataInfoNavigate?.sponsor}</p>
                    <p>Ngày tháng năm sinh: {dataInfoNavigate?.date && dataInfoNavigate.date.format('DD/MM/YYYY')}</p>
                    <p>Giới tính: {dataInfoNavigate?.male == 0 ? "Nam" : "Nữ"}</p>
                    <p>Bệnh lý nếu có:  {dataInfoNavigate?.phatho}</p>

                </ChildStyle>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={{ marginRight: "2rem" }} type="primary" onClick={handleConvert}>Tải ảnh xuống</Button>

                <Button type="primary" onClick={() => { navigate('/adult') }}>Đóng</Button>
            </Col>
        </Row>
    );
}

export default ResultMature;
