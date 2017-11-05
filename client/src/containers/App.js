import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Explore from '../components/Explore'
import TweetsPage from '../components/TweetsPage'
import {fetchPostsIfNeeded} from '../actions'
import queryString from 'query-string'

class App extends Component {
  static propTypes = {
    inputValue: PropTypes.string.isRequired,
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const {dispatch, inputValue} = this.props
    dispatch(fetchPostsIfNeeded(inputValue))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      const {dispatch, inputValue} = nextProps
      dispatch(fetchPostsIfNeeded(inputValue))
    }
  }

  handleChange = nextValue => {
    if (this.props.inputValue !== nextValue)
      nextValue ? this.props.history.push(`/search?q=${nextValue}`)
        : this.props.history.push('/')

  }


  render() {
    const {inputValue, isFetching, items} = this.props
    return (
      <div>
        <Explore value={inputValue}
                 handleChange={this.handleChange}
                 isFetching={isFetching}
        />
        <hr/>
        <TweetsPage inputValue={inputValue}
                    isFetching={isFetching}
                    items={items}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {items, isFetching} = state
  const parsed = queryString.parse(ownProps.location.search)
  const inputValue = parsed.q || 'javascript'
  return {
    inputValue,
    isFetching,
    items
  }
}

export default withRouter(connect(mapStateToProps)(App))
