import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { getInfoFeNo, postInfo } from '../../api/request';
import html2canvas from 'html2canvas';

const ChildStyle = styled.div`
  background-color: #fff;
  border:1px solid #d9d9d9;
  padding:1rem 5rem;
  margin-bottom:1rem
`

function ResultChild() {
    const [data, setData] = useState([])
    const { state } = useLocation()
    const navigate = useNavigate();
    const textRef = useRef();
    const dataInfoNavigate = state?.data
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
            const imgData = canvas.toDataURL('image/png')
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
        let url = `nose-femur/finByQuery?age=${dataInfoNavigate?.age}&averageNose=${dataInfoNavigate.averageNose}&averageFemur=${dataInfoNavigate.averageFemur}`
        getInfoFeNo(url).then((res) => {
            let dataRespon = res?.data?.data
            setData(dataRespon)

            let resultCaculNo = `Ngưỡng giới hạn dự đoán xương mũi là: Từ ` + dataRespon[1]?.newStartNose + `(mm)` + ` đến ` + dataRespon[1]?.newEndNose + `(mm) `
            let resultCaculFe = `Ngưỡng giới hạn dự đoán xương đùi là: Từ ` + dataRespon[0]?.newStartFemur + `(mm)` + ` đến ` + dataRespon[0]?.newEndFemur + `(mm) `

            const dataResult = {
                type_result: "C",
                name: dataInfoNavigate?.name,
                phone: dataInfoNavigate?.phone,
                number_child: dataInfoNavigate?.age,
                height_femur: dataInfoNavigate?.averageFemur,
                height_nose: dataInfoNavigate?.averageNose,
                result: resultCaculNo + resultCaculFe,
                address: dataInfoNavigate?.address,
                email: dataInfoNavigate?.email,
                note: dataInfoNavigate?.note,
    
            }

            postInfo('result', dataResult).then((res) => {})
        })

        

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
                    <h5>Thông tin thai kỳ</h5>
                    <p>Kết quả phân tích vào ngày: {getFormattedDate()}</p>
                    <br />
                    <p>Số tuần thai nhi: {dataInfoNavigate.age}</p>
                    <p>Giới tính: {dataInfoNavigate?.male == 0 ? "Nam" : "Nữ"}</p>
                    {dataInfoNavigate?.averageFemur ? <p>Chiều dài xương đùi: {dataInfoNavigate?.averageFemur}</p> : ""}
                    {dataInfoNavigate?.averageNose ? <p>Chiều dài xương mũi: {dataInfoNavigate?.averageNose}</p> : ""}
                    <p>Bệnh lý nếu có: {dataInfoNavigate?.phatho}</p>
                    <br />
                    {dataInfoNavigate.averageNose ?
                        <><p>Chiều dài xương mũi: {Number(data[1]?.sumNose) > 0 ? `Đang dài hơn so với chuẩn là ${data[1]?.sumNose} (mm)` : `Đang ngắn hơn so với chuẩn là ${data[1]?.sumNose} (mm)`}</p>
                            <p>Ngưỡng giới hạn dự đoán là: Từ {data[1]?.newStartNose} đến {data[1]?.newEndNose} </p></> : ""}
                    {dataInfoNavigate.averageFemur ?
                        <>
                            <p>Chiều dài xương đùi: {Number(data[0]?.sumFemur) > 0 ? `Đang dài hơn so với chuẩn là ${data[0]?.sumFemur} (mm)` : `Đang ngắn hơn so với chuẩn là ${data[0]?.sumFemur} (mm)`}</p>
                            <p>Ngưỡng giới hạn dự đoán là : Từ {data[0]?.newStartFemur} (mm) đến {data[0]?.newEndFemur} (mm)</p>
                        </>
                        : ""
                    }
                </ChildStyle>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={{ marginRight: "2rem" }} type="primary" onClick={handleConvert}>Tải ảnh xuống</Button>

                <Button type="primary" onClick={() => { navigate('/child') }}>Đóng</Button>
            </Col>
        </Row>
    );
}

export default ResultChild;
