import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Form } from 'semantic-ui-react';

function Register() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input label="Username" placeholder="Enter username" name="username" type="text" value={values.username} onChange={onChange} />
        <Form.Input label="Email" placeholder="Enter email" name="email" type="email" value={values.email} onChange={onChange} />
        <Form.Input label="Password" placeholder="Enter password" name="password" type="password" value={values.password} onChange={onChange} />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
