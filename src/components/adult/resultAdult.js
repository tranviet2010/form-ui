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

function ResultAdult() {
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
        if (dataInfoNavigate?.date) {
            let url = `height/finByQuery?number_day=${DateToDay(dataInfoNavigate?.date)}&height=${dataInfoNavigate.height}&weight=${dataInfoNavigate.weight}&male=${dataInfoNavigate.male}`
            getInfoFeNo(url).then((res) => {
                let dataRespon = res?.data?.data
                setData(res?.data?.data)

                let resultHeight = `Chiều cao hiện tại đang ở mức ${getInfoHeight(dataRespon[0], dataInfoNavigate.height)} `
                let resultWeight = `Cân nặng hiện tại đang ở mức ${getInfoHeight(dataRespon[1], dataInfoNavigate.weight)} `
                let result20Height = `Dự đoán lúc 20 tuổi: Chiều cao ${getSum(dataRespon[0], dataInfoNavigate.height, dataRespon[2])} `
                let result20Weight = `Dự đoán lúc 20 tuổi: Cân nặng  ${getSum(dataRespon[1], dataInfoNavigate.weight, dataRespon[3])} `
                const data = {
                    type_result: "T",
                    name: dataInfoNavigate?.name,
                    sponsor: dataInfoNavigate?.sponsor,
                    dob: dataInfoNavigate?.date,
                    phone: dataInfoNavigate?.phone,
                    male: dataInfoNavigate?.male,
                    weight: dataInfoNavigate?.weight,
                    height: dataInfoNavigate?.height,
                    result: resultHeight + resultWeight + result20Height + result20Weight,
                    address: dataInfoNavigate?.address,
                    email: dataInfoNavigate?.email,
                    note: dataInfoNavigate?.note,

                }
                postInfo('result', data).then((res) => { })

            })
        } else {
            navigate('/adult')

        }




    }, [])
    console.log("dataInfoNavigate", dataInfoNavigate);
    console.log("dataInfoNavigate", data);

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
                    <p>Họ và tên người bảo trợ: {dataInfoNavigate?.name}</p>
                    <p>Số điện thoại: {dataInfoNavigate?.phone}</p>
                    <p>Địa chỉ: {dataInfoNavigate?.address}</p>
                </ChildStyle>

                <ChildStyle>
                    <h5>Thông tin phân tích</h5>
                    <p>Kết quả phân tích vào ngày: {getFormattedDate()}</p>
                    <br />
                    <p>Họ và tên: {dataInfoNavigate?.sponsor}</p>
                    {/* <p>Ngày tháng năm sinh: {dataInfoNavigate?.date && dataInfoNavigate.date.format('DD/MM/YYYY')}</p> */}
                    <p>Giới tính: {dataInfoNavigate?.male == 0 ? "Nam" : "Nữ"}</p>
                    <p>Độ tuổi: {dataInfoNavigate?.date && AgeToDate(dataInfoNavigate?.date?.format('YYYY-MM-DD'))}</p>
                    <p>Chiều cao hiện tại: {dataInfoNavigate?.height}</p>
                    <p>Cân nặng hiện tại: {dataInfoNavigate?.weight}</p>
                    <p>Bệnh lý nếu có: {dataInfoNavigate?.phatho}</p>
                    <br />
                    <p>Chiều cao hiện tại đang ở mức: {getInfoHeight(data[0], dataInfoNavigate.height)}</p>
                    <p>Cân nặng hiện tại đang ở mức:  {getInfoHeight(data[1], dataInfoNavigate.weight)}</p>
                    <p>Dự đoán lúc 20 tuổi: Chiều cao {getSum(data[0], dataInfoNavigate.height, data[2])} </p>
                    <p>Dự đoán lúc 20 tuổi: Cân nặng  {getSum(data[1], dataInfoNavigate.weight, data[3])}</p>

                </ChildStyle>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={{ marginRight: "2rem" }} type="primary" onClick={handleConvert}>Tải ảnh xuống</Button>

                <Button type="primary" onClick={() => { navigate('/adult') }}>Đóng</Button>
            </Col>
        </Row>
    );
}

export default ResultAdult;
