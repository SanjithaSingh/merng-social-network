import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://st2.depositphotos.com/3355331/9679/v/380/depositphotos_96792018-stock-illustration-open-head-head-of-man.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Popup
          inverted
          content="Comment on Post"
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
