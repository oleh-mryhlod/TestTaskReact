import React from 'react'
import PropTypes from 'prop-types'
import Tweets from './Tweets'

const TweetsPage = ({items, isFetching, inputValue}) => (
  <div>
    {items.length === 0
      ? (isFetching ? <h2>Loading...</h2> : <h2>No results for {inputValue}.</h2>)
      : <div style={{opacity: isFetching ? 0.5 : 1}}>
        <Tweets items={items}/>
      </div>
    }
  </div>
)

TweetsPage.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired
}

export default TweetsPage
