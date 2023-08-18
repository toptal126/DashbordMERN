import React, { useState } from 'react';
import { Button, Flex, Text, TextField, SelectField, TextAreaField } from '@aws-amplify/ui-react';
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
    console.log('submit new request:', values);
    axios
      .post(`${configData.lambda.addRequest}`, values, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        console.log(response);
        alert('Success!, Please check on Feature Dashboard');
      })
      .catch(function (error) {
        console.log(error);
        alert('Sorry', +error.message);
      });
  };

  return (
    <>
      <Flex as="form" direction="column" width="100%" onSubmit={handleSubmit}>
        <SelectField name="service" label="Product" onChange={handleInputChange} style={{ width: '100%' }}>
          {servicelist.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </SelectField>
        <TextField
          value={values.feature}
          onChange={handleInputChange}
          name="feature"
          label={<Text>Feature Name</Text>}
          type="text"
          isRequired="true"
          style={{ width: '100%', outline: 'none' }}
        />
        <TextAreaField
          label="Feature Detail"
          value={values.note}
          onChange={handleInputChange}
          name="note"
          rows={5}
          isRequired="true"
          style={{ display: 'grid', width: '100%', outline: 'none' }}
        />
        <Button type="submit" variation="primary" width={{ base: '100%', large: '100%' }} style={{ marginTop: '10px' }}>
          Request New Feature
        </Button>
      </Flex>
    </>
  );
}

export default BasicForm;
