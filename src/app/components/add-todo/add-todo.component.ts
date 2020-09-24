import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  // output property to act as emitter for created todo
  @Output() addTodo: EventEmitter<any> = new EventEmitter();

  // property to hold the title of the todo created
  title: string;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    // object for the data for new todo
    const newTodo = {
      title: this.title,
      completed: false,
    };

    // event the value to the upper component = todos
    this.addTodo.emit(newTodo);

    // clear the title text field
    this.title = '';
  }
}
