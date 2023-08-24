/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';
import { configData } from '../../config/index';

function CustomerTable() {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    axios.get(`${configData.lambda.endpoint}/customers`).then(function (response) {
      const filteredCustomers = response.data.customers.filter((item) => item.allowed === true);
      const temp = [];
      filteredCustomers.map((user) => {
        return response.data.features.map((feature) => {
          if (user.feature === feature.id) {
            temp.push({
              ...user,
              product: feature.service,
              featurename: feature.feature,
              status: feature.status,
              timeline: feature.timeline,
            });
          }
          return null;
        });
      });
      setCustomerData(temp);
    });
  }, []);
  const dataTableColumn = [
    {
      title: 'CUSTOMER',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'SUB SERVICE',
      dataIndex: 'sub_service',
      key: 'sub_service',
      width: '5%',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'PRODUCT',
      dataIndex: 'product',
      key: 'product',
      width: '15%',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'FEATURE NAME',
      dataIndex: 'featurename',
      key: 'featurename',
      width: '25%',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'USE CASE',
      dataIndex: 'use_case',
      key: 'use_case',
      width: '25%',
      align: 'center',
      render: (e) => (
        <div className="custom-cell">
          <p>{e}</p>
        </div>
      ),
    },
    {
      title: 'PRIORITY',
      dataIndex: 'priority',
      key: 'priority',
      width: '15%',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '15%',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'TIMELINE',
      dataIndex: 'timeline',
      key: 'timeline',
      width: '15%',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
  ];

  return (
    <>
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="Customer Table">
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={customerData}
                  columns={dataTableColumn}
                  rowSelection={false}
                />
              </Cards>
            </BorderLessHeading>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default CustomerTable;
