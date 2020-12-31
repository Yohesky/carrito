import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormArray, FormControl, Validators, FormControlName} from '@angular/forms';
@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  testingForm: FormGroup

  constructor(private formBuilder: FormBuilder) { 

    this.testingForm = this.formBuilder.group({
      nombre: new FormControl(['yohesky']),
      apellido: new FormControl(['pimentel'])
    })

  }


  get nombre(){
    return this.testingForm.get('nombre')
  }

  get apellido(){
    return this.testingForm.get('apellido')
  }

  ngOnInit() {
  }

  resetForm(){
    this.nombre.setValue("")
  }

}
