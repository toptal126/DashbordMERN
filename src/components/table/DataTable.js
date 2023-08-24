import UilSearch from '@iconscout/react-unicons/icons/uil-search';
import { Input, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';
import { DataTableStyleWrap } from './Style';
import { TableWrapper } from '../../container/styled';
import { dataLiveFilter, filterWithSubmit } from '../../redux/data-filter/actionCreator';
import { Button } from '../buttons/buttons';

function DataTable({ filterOption, filterOnchange, rowSelection, tableData, columns }) {
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const onResize = (event, ui) => {
    const h = ui.size.height - 50;
    ui.element.find('.custom-cell').css('height', `${h}px`);
  };
  useEffect(() => {
    const init = () => {
      $('.ant-table-row').resizable({
        minWidth: 50,
        maxWidth: screenSize.width - 80,
        maxHeight: screenSize.height * 0.35,
        handles: 'e, s',
        resize: onResize,
      });
    };

    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
      init();
    };
    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('resize', updateDimension);
      window.addEventListener('load', init);

      return () => {
        window.removeEventListener('resize', 550);
        window.addEventListener('load', init);
      };
    }
  }, [screenSize, tableData]);

  const dispatch = useDispatch();

  const handleStatusSearch = (value) => {
    dispatch(dataLiveFilter(value, 'status'));
  };

  const handleDataUser = (e) => {
    const { value } = e.currentTarget;
    dispatch(dataLiveFilter(value, 'name'));
  };

  const handleSearch = () => {
    const id = document.querySelector('.ninjadash-data-id').value;
    const status = document.querySelector('.ninjadash-data-status .ant-select-selection-item').title;
    dispatch(filterWithSubmit(id, status));
  };
  const prefix = <UilSearch />;
  return (
    <DataTableStyleWrap>
      {filterOption ? (
        <div className="ninjadash-datatable-filter">
          {!filterOnchange ? (
            <div className="ninjadash-datatable-filter__left">
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Status:</span>
                <Select style={{ width: 200 }} className="ninjadash-data-status" defaultValue="active">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactiveted">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
              <div className="ninjadash-datatable-filter__action">
                <Button type="primary" size="small" onClick={handleSearch} transparented>
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            <div className="ninjadash-datatable-filter__left">
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Status:</span>
                <Select onChange={handleStatusSearch} style={{ width: 200 }} defaultValue="active">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactiveted">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
            </div>
          )}
          <div className="ninjadash-datatable-filter__right">
            <Input onChange={handleDataUser} size="default" placeholder="Search" prefix={prefix} />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="ninjadasj-datatable">
        <TableWrapper className="table-data-view">
          {rowSelection ? (
            <Table
              rowSelection={{
                // type: state.selectionType,
                ...rowSelection,
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              dataSource={tableData}
              columns={columns}
            />
          ) : (
            <Table pagination={{ pageSize: 10, showSizeChanger: true }} dataSource={tableData} columns={columns} />
          )}
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
}

DataTable.propTypes = {
  filterOption: PropTypes.bool,
  filterOnchange: PropTypes.bool,
  rowSelection: PropTypes.bool,
  tableData: PropTypes.array,
  columns: PropTypes.array,
};
export default DataTable;
