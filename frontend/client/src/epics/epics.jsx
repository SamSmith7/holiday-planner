import { combineEpics } from 'redux-observable'
import graphQlEpic from './graph-ql'


export default combineEpics(
    graphQlEpic
)
