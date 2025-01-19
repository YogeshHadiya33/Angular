import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TodoList, CreateTodo, UpdateTodo } from "../models/todo.model";
import { TODOS_BASE_URL } from "../../shared/constants";
import { CommonService } from "./common.service";

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    constructor(private http: HttpClient,
        private commonService: CommonService
    ) { }

    // Get all todos
    getAllTodos(): Observable<TodoList[]> {
        return this.http.get<TodoList[]>(TODOS_BASE_URL).pipe(
            catchError(this.commonService.handleError)
        );
    }

    // Get todo by id
    getTodoById(id: number): Observable<TodoList> {
        return this.http.get<TodoList>(`${TODOS_BASE_URL}/${id}`).pipe(
            catchError(this.commonService.handleError)
        );
    }

    // Create a new todo
    createTodo(todo: CreateTodo): Observable<TodoList> {
        return this.http.post<TodoList>(TODOS_BASE_URL, todo).pipe(
            catchError(this.commonService.handleError)
        );
    }

    // Update a todo
    updateTodo(id: number, todo: UpdateTodo): Observable<TodoList> {
        return this.http.patch<TodoList>(`${TODOS_BASE_URL}/${id}`, todo).pipe(
            catchError(this.commonService.handleError)
        );
    }

    // Delete a todo
    deleteTodo(id: number): Observable<void> {
        return this.http.delete<void>(`${TODOS_BASE_URL}/${id}`).pipe(
            catchError(this.commonService.handleError)
        );
    }

}