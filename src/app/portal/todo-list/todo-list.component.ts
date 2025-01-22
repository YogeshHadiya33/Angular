import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../../business_logic/services/todo.service';
import { TodoList, CreateTodo, UpdateTodo } from '../../business_logic/models/todo.model';
import { NotificationService } from '../../business_logic/services/notification.service';
import { TodoFormComponent } from './todo-form/todo-form.component';
import Swal from 'sweetalert2';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, 
    RouterModule, 
    NgbModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService,NotificationService]
})
export class TodoListComponent implements OnInit {

  todos=signal<TodoList[]>([]);

  // todos: TodoList[] = [];

  constructor(
    private todoService: TodoService,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getAllTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
      },
      error: (error) => {
        this.notificationService.showError('Error fetching todos');
        console.error('Error fetching todos:', error);
      }
    });
  }

  openTodoForm(todo: TodoList | null): void {
    const modalRef = this.modalService.open(TodoFormComponent);
    modalRef.componentInstance.todo = todo;
    modalRef.componentInstance.save.subscribe((formData: CreateTodo | UpdateTodo) => {
      if (todo && todo.id !== undefined) {
        this.updateTodo(todo.id, formData as UpdateTodo, modalRef);
      } else {
        this.createTodo(formData as CreateTodo, modalRef);
      }
    });
  }

  createTodo(todo: CreateTodo, modalRef: any): void {
    this.todoService.createTodo(todo).subscribe({
      next: () => {
        modalRef.close();
        this.notificationService.showSuccess('Todo created successfully');
        this.fetchTodos(); // Refresh the list
      },
      error: (error) => {
        this.notificationService.showError('Error creating todo');
        console.error('Error creating todo:', error);
      }
    });
  }

  updateTodo(id: number, todo: UpdateTodo, modalRef: any): void {
    this.todoService.updateTodo(id, todo).subscribe({
      next: () => {
        modalRef.close();
        this.notificationService.showSuccess('Todo updated successfully');
        this.fetchTodos(); // Refresh the list
      },
      error: (error) => {
        this.notificationService.showError('Error updating todo');
        console.error('Error updating todo:', error);
      }
    });
  }

  onAdd(): void {
    this.openTodoForm(null);
  }

  onEdit(todo: TodoList): void {
    this.openTodoForm(todo);
  }

  onDelete(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.todoService.deleteTodo(id).subscribe({
            next: () => {
              this.notificationService.showSuccess('Todo deleted successfully');
              this.fetchTodos(); // Refresh the list
            },
            error: (error) => {
              this.notificationService.showError('Error deleting todo');
              console.error('Error deleting todo:', error);
            }
          });
        }
      });
    }
  }

  onToggleComplete(todo: TodoList): void {
    const updatedTodo: UpdateTodo = {
      title: todo.title,
      description: todo.description,
      isCompleted: !todo.isCompleted
    };

    if (todo.id !== undefined) {
      this.todoService.updateTodo(todo.id, updatedTodo).subscribe({
        next: () => {
          this.notificationService.showSuccess('Todo status updated successfully');
          this.fetchTodos(); // Refresh the list
        },
        error: (error) => {
          this.notificationService.showError('Error updating todo status');
          console.error('Error updating todo:', error);
        }
      });
    }
  }
}