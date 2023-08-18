/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import DataTable from '../../components/table/DataTable';
import { Main, BorderLessHeading } from '../styled';
import { configData } from '../../config/index';

function CustomerTable() {
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
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    axios.get(`${configData.lambda.endpoint}/customers`).then(function (response) {
      setCustomerData(response.data.customers);
    });
  }, []);
  const customerTableColumn = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'PRODUCT',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'SUB SERVICE',
      dataIndex: 'sub_service',
      key: 'sub_service',
    },
    {
      title: 'FEATURE NAME',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'USE CASE',
      dataIndex: 'use_case',
      key: 'use_case',
    },
    {
      title: 'PRIORITY',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Accept',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Deny',
      dataIndex: 'use_case',
      key: 'use_case',
    },
  ];
  const featureTableColumn = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Feature Name',
      dataIndex: 'sub_service',
      key: 'sub_service',
    },
    {
      title: 'Feature Details',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Accept',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Deny',
      dataIndex: 'use_case',
      key: 'use_case',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Table" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <BorderLessHeading>
              <Cards title="Feature Table">
                <DataTable
                  filterOption
                  filterOnchange
                  tableData={customerData}
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

export default CustomerTable;
