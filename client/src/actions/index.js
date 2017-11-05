export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const requestPosts = value => ({
  type: REQUEST_POSTS,
  value
})

export const receivePosts = (value, json = {}) => ({
  type: RECEIVE_POSTS,
  value,
  posts: json.statuses ? json.statuses : []
})

const fetchPosts = value => dispatch => {
  dispatch(requestPosts(value))
  return fetch(`api/search?q=${value}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(value, json)))
}

const shouldFetchPosts = (state, value) => {
  if (state.isFetching) {
    return false
  }
  return true
}

export const fetchPostsIfNeeded = value => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), value)) {
    return dispatch(fetchPosts(value))
  }
}
