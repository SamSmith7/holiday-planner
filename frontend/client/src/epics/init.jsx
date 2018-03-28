import fetch from 'cross-fetch'
import Rx from 'rxjs/Rx'
import { INIT, INIT_SUCCESS } from '../actions/root'


export default actions$ => {

    return actions$.ofType(INIT)
        .switchMap(() => {

            return Rx.Observable
                .fromPromise(fetch('/auth/authenticated'))
                .catch(err => Rx.Observable.of({error: true, err}))
                .switchMap(res => {

                    return res.error
                        ? Rx.Observable.of(res)
                        : Rx.Observable.fromPromise(res.json())
                })
                .map(res => ({res, type: INIT_SUCCESS}))
        })
}
