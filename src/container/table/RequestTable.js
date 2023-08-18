/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
// import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import Form from '../../components/forms';

function RequestTable() {
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

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Request a Feature" routes={PageRoutes} />
      <Main>
        {/* <Row gutter={15}>
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
        </Row> */}
        <Form />
      </Main>
    </>
  );
}

export default RequestTable;
