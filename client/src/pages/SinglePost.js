import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  let getPost, likePostObj;
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });
  if (data) {
    getPost = data.getPost;
    likePostObj = {
      id: getPost.id,
      likeCount: getPost.likeCount,
      likes: getPost.likes
    };
  }

  function deletePostCallback() {
    props.history.push('/');
  }

  return (
    <Grid>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{getPost.username}</Card.Header>
                <Card.Meta>{moment(getPost.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{getPost.body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={likePostObj} />
                <Button as="div" labelPosition="right" onClick={() => console.log('Comment on post')}>
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {getPost.commentCount}
                  </Label>
                </Button>
                {user && user.username === getPost.username && <DeleteButton postId={getPost.id} callback={deletePostCallback} />}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
