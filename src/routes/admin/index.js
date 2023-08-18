import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import withAdminLayout from '../../layout/withAdminLayout';

const DataTable = lazy(() => import('../../container/table/DataTable'));
const CustomerTable = lazy(() => import('../../container/table/CustomerTable'));
const RequestTable = lazy(() => import('../../container/table/RequestTable'));
const ApprovalTable = lazy(() => import('../../container/table/ApprovalTable'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="tables/feature-dashboard" element={<DataTable />} />
        <Route path="tables/customer-dashboard" element={<CustomerTable />} />
        <Route path="tables/request-feature" element={<RequestTable />} />
        <Route path="tables/approvals" element={<ApprovalTable />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
