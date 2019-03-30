import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {
  symptomForm: FormGroup;
  symptoms = [
    { id: 1, symptom: 'rash' },
    { id: 2, symptom: 'itch' },
    { id: 3, symptom: 'headache' }
  ];

  constructor(private fb: FormBuilder) {
    const formControls = this.symptoms.map(control => new FormControl(false));
    this.symptomForm = this.fb.group({
      symptoms: new FormArray(formControls)
    });
  }

  ngOnInit() {
  }

  submit(){
    const selectedPreferences = this.symptomForm.value.symptoms
    .map((checked, index) => checked ? this.symptoms[index].id : null)
    .filter(value => value !== null);
    console.log(selectedPreferences);
  }

}
