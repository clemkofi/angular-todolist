import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

// http headers with the json option
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // property for the url
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '?_limit=5';

  constructor(private http: HttpClient) {}

  // getTodos() {
  //   return [
  //     {
  //       id: 1,
  //       title: 'First Todo',
  //       completed: false,
  //     },
  //     {
  //       id: 2,
  //       title: 'Second Todo',
  //       completed: true,
  //     },
  //     {
  //       id: 3,
  //       title: 'Third Todo',
  //       completed: false,
  //     },
  //   ];
  // }

  // method to fetch the data from api
  // since it is fetching data we would make it of type observable which makes
  // it a stream which can be subscribed to
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // method to toggle the todo on server with put request
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  // method to add a todo on server with post request
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // method to delete a todo on server with delete request
  deleteTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
}
