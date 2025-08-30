import { Observable } from 'rxjs';

export abstract class Usecase<T, R> {
  abstract execute(param: T): Observable<R>;
}
