import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoList } from '../../../business_logic/models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoFormComponent implements OnInit {
  @Input() todo: TodoList | null = null;
  @Output() save = new EventEmitter<TodoList>();
  todoForm: FormGroup;

  isSubmitted = false;

  constructor(private fb: FormBuilder,
    public modal: NgbActiveModal) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isSubmitted=false;
    if (this.todo) {
      this.todoForm.patchValue(this.todo);
    }
  }

  onSubmit(): void {
    this.isSubmitted =true;
    if (this.todoForm.valid) {
      this.save.emit(this.todoForm.value);
      this.isSubmitted=false;
      this.modal.close();
    }
  }
}