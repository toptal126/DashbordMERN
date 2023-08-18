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
        backgroundColor="#f1f1f1"
        borderRadius="6px"
        maxWidth={{ base: '100%', large: '80%' }}
        padding="1rem"
        margin="auto"
        minHeight="100vh"
      >
        <BasicForm />
      </View>
    </>
  );
}

export default Form;
