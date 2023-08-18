/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';
import { configData } from '../../config/index';

function DataTables() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Table',
    },
  ];
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

  console.log('featureData', featureData);

  const dataTableColumn = [
    {
      title: 'PRODUCT',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'FEATURE NAME',
      dataIndex: 'feature',
      key: 'feature',
    },
    {
      title: 'FEATURE DETAIL',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'TIMELINE',
      dataIndex: 'timeline',
      key: 'timeline',
    },
    {
      title: 'CUSTOMER COUNT',
      dataIndex: 'customer_count',
      key: 'customer_count',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Table" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="Data Table">
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
