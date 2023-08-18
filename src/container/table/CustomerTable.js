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
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SUB SERVICE',
      dataIndex: 'sub_service',
      key: 'sub_service',
    },
    {
      title: 'PRODUCT',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'FEATURE NAME',
      dataIndex: 'featurename',
      key: 'featurename',
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
      title: 'TIMELINE',
      dataIndex: 'timeline',
      key: 'timeline',
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
