import fetch from 'cross-fetch'
import fp from 'lodash/fp'
import Rx from 'rxjs/Rx'
import { API_REQUEST } from '../actions/server'


export default (actions$, store) => {

    return actions$.ofType(API_REQUEST)
        .mergeMap(({payload, returnAction, uri}) => {

            const currentStore = store.getState()
            const token = fp.get('user.token', currentStore)
            const parsedPayload = fp.isFunction(payload)
                ? payload(currentStore)
                : payload

            const options = {
                body: JSON.stringify(parsedPayload),
                headers: {
                    'authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                method: 'POST',
                mode: 'cors'
            }

            return Rx.Observable
                .fromPromise(fetch(uri, options))
                .switchMap(res => {

                    return res.statusText === 'OK'
                        ? Rx.Observable.fromPromise(res.json())
                        : Rx.Observable.of({error: true})
                })
                .map(res => ({
                    request: payload,
                    res,
                    type: returnAction
                }))
        })
}
