import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  if (loading) {
    return <h1>Loading Posts</h1>;
  }
  const posts = data.getPosts;
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading Posts</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column style={{ marginBottom: 20 }}>
              <PostCard post={post} key={post.id} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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

export default Home;
