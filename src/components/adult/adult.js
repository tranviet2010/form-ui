import { useState } from 'react';
import React from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { DateToDay } from '../utils';

const ChildStyle = styled.div`
  background-color: #fff;
  border:1px solid #d9d9d9;
  padding:2rem 5rem;
  margin-bottom:1rem
`

function Adult() {
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const onFinish = (value) => {
        navigate('result', {
            state: { data: value },
        })
    };
    return (
        <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: '100vh', padding: '1rem' }}
        >
            <Col xs={24} sm={16} md={12} lg={8} xl={8}>

                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                >
                    <ChildStyle>
                        <h4>Thông tin người bảo trợ</h4>
                        <Form.Item
                            label="Họ tên người bảo trợ"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập thông tin người bảo trợ' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <Input />
                        </Form.Item>
                    </ChildStyle>

                    <ChildStyle>
                        <h4>Thông tin đối tượng</h4>
                        <Form.Item
                            label="Họ tên"
                            name="sponsor"
                            rules={[{ required: true, message: 'Vui lòng nhập số tuần thai nhi' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="date" label="Ngày tháng năm sinh">
                            <DatePicker />
                        </Form.Item>

                        <Form.Item label="Giới tính" name="male">
                            <Select>
                                <Select.Option value="0">Nam</Select.Option>
                                <Select.Option value="1">Nữ</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Chiều cao hiện tại"
                            name="height"
                            rules={[{ message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Cân nặng hiện tại"
                            name="weight"
                            rules={[{ message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Bệnh lý nếu có" name="phatho">
                            <TextArea rows={7} placeholder="Ghi chú " maxLength={244} />
                        </Form.Item>
                    </ChildStyle>

                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" style={{ marginRight: "2rem" }} htmlType="submit" onClick={() => navigate('/')}>
                            Quay lại
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Phân tích kết quả
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Adult;
