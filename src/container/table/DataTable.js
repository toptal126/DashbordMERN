/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';
import { configData } from '../../config/index';

function DataTables() {
  const [featureData, setFeatureData] = useState([]);
  useEffect(() => {
    axios.get(`${configData.lambda.endpoint}/customers`).then(function (response) {
      const temp = [];
      let cnt = 9;
      response.data.features.map((feature) => {
        if (feature.allowed !== true) {
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

  const dataTableColumn = [
    {
      title: 'PRODUCT',
      dataIndex: 'service',
      align: 'center',
      key: 'service',
      width: '10%',
      render: (e) => <div className="custom-cell">{e}</div>,
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
      width: '25%',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'TIMELINE',
      dataIndex: 'timeline',
      key: 'timeline',
      align: 'center',
      render: (e) => <div className="custom-cell">{e}</div>,
    },
    {
      title: 'CUSTOMER COUNT',
      dataIndex: 'customer_count',
      key: 'customer_count',
      width: '3%',
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
              <Cards title="Feature Table">
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={featureData}
                  setFeatureData={setFeatureData}
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

export default DataTables;
