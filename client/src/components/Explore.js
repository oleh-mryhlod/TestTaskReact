import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {InputGroup, Button, FormControl, Form} from 'react-bootstrap'

export default class Explore extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value)
    }
  }

  getInputValue = () => {
    return this.input.value
  }

  setInputValue = (val) => {
    this.input.value = val
  }

  handleSearchClick = (e) => {
    e.preventDefault()
    this.props.handleChange(this.getInputValue())
  }

  render() {
    const {isFetching} = this.props
    return (
      <div>
        <Form>
          <InputGroup>
            <FormControl type="text"
                         bsSize='large'
                         inputRef={ref => {
                           this.input = ref;
                         }}
                         defaultValue={this.props.value}/>
            <InputGroup.Button>
              <Button
                bsStyle="primary"
                bsSize='large'
                disabled={isFetching}
                onClick={!isFetching ? this.handleSearchClick : null}
                type='submit'
              >
                {isFetching ? 'Searching...' : 'Search'}
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </Form>

      </div>
    )
  }
}
