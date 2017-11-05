import React from 'react'
import PropTypes from 'prop-types'
import {Image, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'

const Tweets = ({items}) => (
  <ListGroup>
    {items.map((post, i) =>
      <ListGroupItem key={i}>
        <Row className="show-grid">
          <Col md={1}>
            <Image src={post.user.profile_image_url_https} circle/>
          </Col>
          <Col md={11}>
            <b>{post.user.name}</b> <i>@{post.user.screen_name}</i>
            <br/>
            {post.text}
            <br/>
            <span><Image src='/images/retweet.png'/> {post.retweet_count}</span>
            <span> <Image src='/images/like.png'/>{post.favorite_count}</span>
          </Col>
        </Row>
      </ListGroupItem>
    )}
  </ListGroup>
)

Tweets.propTypes = {
  items: PropTypes.array.isRequired
}
export default Tweets
