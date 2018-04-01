import { combineEpics } from 'redux-observable'
import apiRequestEpic from './api-request'
import graphQlEpic from './graph-ql'
import initEpic from './init'
import saveTrip from './save-trip'


export default combineEpics(
    apiRequestEpic,
    graphQlEpic,
    initEpic,
    saveTrip
)
