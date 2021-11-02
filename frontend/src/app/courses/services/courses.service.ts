import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from './../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = '/assets/courses.json';

  constructor(private httpClient: HttpClient,
    private _snackBar: MatSnackBar
    ) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(2000),
      tap(courses => console.log(courses),
      )
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
      this._snackBar.open(msg, "X", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ["msg-error"] : ["msg-success"],
      });

  }
  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

}
