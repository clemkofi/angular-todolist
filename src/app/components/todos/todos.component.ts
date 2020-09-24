import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  // create a property which is a list to hold todos
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  // method to add a todo to the list and server
  addTodo(todo: Todo) {
    // add the todo to the todo list
    this.todoService.addTodo(todo).subscribe((todo) => {
      this.todos.push(todo);
    });
  }

  // method to delete a todo
  deleteTodo(todo: Todo) {
    // delete from todo list for the UI
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    // delete with HTTP request
    this.todoService.deleteTodo(todo).subscribe();

    this.todoService.getTodos().subscribe((todos) => {
      console.log(todos);
    });
  }
}
