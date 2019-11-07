import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/grapql';
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { Grid, TransitionGroup } from 'semantic-ui-react';

function Home() {
  const { user } = useContext(AuthContext);
  let posts;
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  if (data) {
    posts = { data: data.getPosts };
  }
  return (
    <Grid>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>

      {user ? (
        <Grid.Row>
          <Grid.Column width={4}>
            <PostForm />
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid columns={2}>
              <Grid.Row>
                {loading ? (
                  <h1>Loading posts..</h1>
                ) : (
                  <TransitionGroup>
                    {posts.data &&
                      posts.data.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} />
                        </Grid.Column>
                      ))}
                  </TransitionGroup>
                )}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      ) : (
        <Grid.Row>
          <Grid.Column>
            <Grid columns={3}>
              <Grid.Row>
                {loading ? (
                  <h1>Loading posts..</h1>
                ) : (
                  <TransitionGroup>
                    {posts.data &&
                      posts.data.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} />
                        </Grid.Column>
                      ))}
                  </TransitionGroup>
                )}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
}

export default Home;
