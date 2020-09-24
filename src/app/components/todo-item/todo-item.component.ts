import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // method to set css classes dynamically for todo-item component
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed,
    };

    return classes;
  }

  // method to handle the toggle of checkbox
  onToggle(todo: Todo) {
    // toggle in the UI
    todo.completed = !todo.completed;
    // toggle with HTTP request
    this.todoService.toggleCompleted(todo).subscribe((todo) => {
      console.log(todo);
    });
  }

  // method to handle the click event
  onDelete(todo: Todo) {
    // emit an event back to the higher component so that todo is deleted from todo list
    this.deleteTodo.emit(todo);
  }
}
