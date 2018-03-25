import { combineEpics } from 'redux-observable'
import apiRequestEpic from './api-request'
import graphQlEpic from './graph-ql'


export default combineEpics(
    apiRequestEpic,
    graphQlEpic
)
