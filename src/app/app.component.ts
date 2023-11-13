import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo';

  myForm: FormGroup;
  isEdit:boolean = false;
  updateId: any;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      task: ['', [Validators.required]],
    });
  }

  todos:any[] =[];
  completedTask:any[]=[];
  progressTask:any[]=[];

  onAdd() {
    this.todos.push({
      title: this.myForm.value.task,
      done:false
    })
    this.myForm.reset();
  }

  onUpdate() {
    this.todos[this.updateId].title = this.myForm.value.task;
    //this.todos[this.updateId].done = false;
    this.myForm.reset();
    this.updateId = undefined;
    this.isEdit= false
  }

  onEdit(item:any, i:number) {
    this.myForm.controls['task'].setValue(item.title);
    //item.done = true;
    this.updateId = i;
    this.isEdit= true
  }

  todoDelete(i:number) {
    this.todos.splice(i,1);
  }

  progressDelete(i:number) {
    this.progressTask.splice(i,1)
  }

  onComplete(item:any, i:number) {
    item.done = true;
    this.completedTask.push(item);
    this.progressTask.splice(i,1)
  }

  onProgress(item:any, i:number) {
    this.progressTask.push(item);
    this.todos.splice(i,1)
  }
}
