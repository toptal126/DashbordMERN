import React from 'react';
import { View, Heading } from '@aws-amplify/ui-react';
import BasicForm from './BasicForm';

function Form() {
  return (
    <>
      <div className="sub-header2">
        <Heading level={4} backgroundColor="transparent" color="rgb(255, 255, 255)">
          Request a Feature
        </Heading>
      </div>
      <View
        backgroundColor="#F8F8F8"
        borderRadius="6px"
        maxWidth={{ base: '100%', large: '90%' }}
        padding="3rem"
        margin="10px"
        minHeight="auto"
      >
        <BasicForm />
      </View>
    </>
  );
}

export default Form;
