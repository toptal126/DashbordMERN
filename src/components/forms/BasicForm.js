import React, { useState } from 'react';
import { Button, Flex, Text, TextAreaField } from '@aws-amplify/ui-react';
import { Select, Input } from 'antd';
import axios from 'axios';
import { configData } from '../../config/index';

function BasicForm() {
  const servicelist = ['Product A', 'Product B', 'Product C', 'Product D'];
  const prioritylist = ['P1-Critical', 'P2-Important', 'P3-Nice to Have'];
  const timelinelist = ['N/A', '0-3 Months', '4-12 Months', '12+ Months'];
  const initialValues = {
    allowed: false,
    service: servicelist[0],
    customer: '',
    subservice: '',
    feature: '',
    usecase: '',
    option: 'Normal',
    subscribe: false,
    status: 'In Progress',
    customercount: 0,
    note: '',
    priority: prioritylist[0],
    timeline: timelinelist[0],
  };
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${configData.lambda.addRequest}`, values, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .catch(function (error) {
        alert('Sorry', +error.message);
      });
  };

  return (
    <>
      <Flex as="form" direction="column" width="100%" onSubmit={handleSubmit}>
        <Text>Product</Text>
        <Select
          showSearch
          defaultValue={servicelist[0]}
          type="text"
          name="product"
          style={{ width: '100%', padding: '0px', margin: '0px 0px 10px 0px', border: '1px solid grey' }}
        >
          {servicelist.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Select>
        <Text>Feature Name</Text>
        <Input
          value={values.feature}
          onChange={handleInputChange}
          name="feature"
          type="text"
          isRequired="true"
          style={{ width: '100%', padding: '8px', margin: '-3px 0px 10px 0px', border: '1px solid grey' }}
        />
        <TextAreaField
          label={<Text>Feature Detail</Text>}
          value={values.note}
          onChange={handleInputChange}
          name="note"
          rows={8}
          isRequired="true"
          style={{ display: 'grid', width: '100%', outline: 'none' }}
        />
        <Button
          type="submit"
          variation="primary"
          width={{ base: '100%', large: '100%' }}
          style={{ padding: '8px', marginTop: '20px' }}
        >
          Request New Feature
        </Button>
      </Flex>
    </>
  );
}

export default BasicForm;
