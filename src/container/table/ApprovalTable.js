/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';
import { configData } from '../../config/index';

function ApprovalTable() {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    axios.get(`${configData.lambda.endpoint}/customers`).then(function (response) {
      const filteredCustomers = response.data.customers.filter((item) => item.allowed !== true);
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
  const [featureData, setFeatureData] = useState([]);
  useEffect(() => {
    axios.get(`${configData.lambda.endpoint}/customers`).then(function (response) {
      const temp = [];
      let cnt = 9;
      response.data.features.map((feature) => {
        if (feature.allowed === true) {
          return null;
        }
        cnt = 0;
        response.data.customers.map((customer) => {
          if (feature.id === customer.feature) {
            cnt += 1;
          }
          return null;
        });
        feature.customer_count = cnt;
        temp.push(feature);
        return null;
      });
      setFeatureData(temp);
    });
  }, []);
  const customerTableColumn = [
    {
      title: 'CUSTOMER',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'PRODUCT',
      dataIndex: 'product',
      key: 'product',
      align: 'center',
    },
    {
      title: 'SUB SERVICE',
      dataIndex: 'sub_service',
      key: 'sub_service',
      align: 'center',
    },
    {
      title: 'FEATURE NAME',
      dataIndex: 'featurename',
      key: 'featurename',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'USE CASE',
      dataIndex: 'use_case',
      key: 'use_case',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'PRIORITY',
      dataIndex: 'priority',
      key: 'priority',
      align: 'center',
    },
    {
      title: 'SERVICE NOTE',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'ACCEPT',
      dataIndex: 'none',
      key: 'none',
      align: 'center',
      render: (e) => (
        <Button style={{ color: 'blue', border: '1px solid blue', backgroundColor: 'transparent' }}>Accept {e}</Button>
      ),
    },
    {
      title: 'DENY',
      dataIndex: 'none',
      key: 'none',
      width: '6%',
      align: 'center',
      render: (e) => (
        <Button style={{ color: 'red', border: '1px solid red', backgroundColor: 'transparent' }}>Deny {e}</Button>
      ),
    },
  ];
  const featureTableColumn = [
    {
      title: 'PRODUCT',
      dataIndex: 'service',
      key: 'service',
      align: 'center',
      width: '10%',
    },
    {
      title: 'FEATURE NAME',
      dataIndex: 'feature',
      key: 'feature',
      align: 'center',
      width: '25%',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'FEATURE DETAIL',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      width: '25%',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'ACCEPT',
      dataIndex: 'none',
      key: 'none',
      align: 'center',
      width: '10%',
      render: (e) => (
        <Button style={{ color: 'blue', border: '1px solid blue', backgroundColor: 'transparent' }}>Accept {e}</Button>
      ),
    },
    {
      title: 'DENY',
      dataIndex: 'none',
      key: 'none',
      align: 'center',
      width: '6%',
      render: (e) => (
        <Button style={{ color: 'red', border: '1px solid red', backgroundColor: 'transparent' }}>Deny {e}</Button>
      ),
    },
  ];
  return (
    <>
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="Feature Table">
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={featureData}
                  setFeatureData={setFeatureData}
                  columns={featureTableColumn}
                  rowSelection={false}
                />
              </Cards>
              <Cards title="Customer Table">
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={customerData}
                  columns={customerTableColumn}
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

export default ApprovalTable;
