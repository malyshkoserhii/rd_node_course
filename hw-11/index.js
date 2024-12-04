import { of, interval } from 'rxjs';

import { mergeMap, take } from 'rxjs/operators';

const firstObservable = of('Перший потік');

const secondObservable = () => interval(1000).pipe(take(3));

firstObservable.pipe(
    mergeMap(data1 => {
        console.log('Received from firstObservable:', data1);
        return secondObservable();
    })
).subscribe(data2 => {
    console.log('Flattened output:', data2);
});