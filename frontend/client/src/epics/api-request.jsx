import fetch from 'cross-fetch'
import Rx from 'rxjs/Rx'
import { API_REQUEST } from '../actions/server'


export default actions$ => {

    return actions$.ofType(API_REQUEST)
        .mergeMap(({payload, returnAction, uri}) => {

            const options = {
                body: JSON.stringify(payload),
                headers: {
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
                .map(res => ({res, type: returnAction}))
        })
}
