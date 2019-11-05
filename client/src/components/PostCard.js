import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  function likePost() {
    console.log('Post Liked');
  }

  function commentOnPost() {
    console.log('Post Comment');
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="red" basic>
            <Icon name="comments" />
            Comment
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}


export default PostCard;
