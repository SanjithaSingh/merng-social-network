import React, { useEffect, useState } from "react";
import { Icon, Label, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    console.log(likes);
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Popup
        inverted
        content={liked ? "Unlike" : "Like"}
        trigger={likeButton}
      />

      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
