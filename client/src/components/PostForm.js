import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../util/grapql';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import { Form, Button } from 'semantic-ui-react';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      const new_post = result.data.createPost;
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [new_post, ...data.getPosts] }
      });
      values.body = '';
    }
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input placeholder="Write anything you'd like" name="body" onChange={onChange} value={values.body} error={error ? true : false} />
          <Button type="submit" color="red">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </Fragment>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        id
        username
        createdAt
      }
      commentCount
      comments {
        id
        username
        createdAt
      }
    }
  }
`;

export default PostForm;
