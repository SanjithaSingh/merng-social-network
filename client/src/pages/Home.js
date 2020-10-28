import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/AuthContext";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  if (loading) {
    return <h1>Loading Posts</h1>;
  }
  const posts = data.getPosts;
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent ThoughtPosts</h1>
      </Grid.Row>
      <Grid.Row>
        {user ? (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        ) : (
          <span></span>
        )}
        {loading ? (
          <h1>Loading Posts</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column style={{ marginBottom: 20 }} key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
