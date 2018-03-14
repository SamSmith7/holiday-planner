import fetch from 'cross-fetch'
import Rx from 'rxjs/Rx'
import { GRAPH_QL_QUERY } from '../actions/server'


export default actions$ => {

    return actions$.ofType(GRAPH_QL_QUERY)
        .mergeMap(({query, returnAction}) => {

            const options = {
                body: JSON.stringify({query}),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                mode: 'cors'
            }

            return Rx.Observable
                .fromPromise(fetch(`/api/graphql`, options))
                .switchMap(res => {

                    return res.statusText === 'OK'
                        ? Rx.Observable.fromPromise(res.json())
                        : Rx.Observable.of({error: true})
                })
                .map(res => ({res, type: returnAction}))
        })
}
