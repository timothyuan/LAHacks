import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {
  symptomForm: FormGroup;
  symptoms = [
    { id: 1, symptom: 'rashes' },
    { id: 2, symptom: 'itching' },
    { id: 3, symptom: 'headache' }
  ];
  external_text = "Please upload a picture of external symptoms."
  external_desc = "Optional: describe the uploaded picture";
  internal_text = "Which symptoms apply to you:";
  app_name = "skine";

  constructor(private fb: FormBuilder, private httpService: HttpService) {
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
    const pic = (<HTMLInputElement>document.getElementById('image')).files[0];
    // console.log(3)
    // console.log(pic)
    //console.log(pic.files[0])
    this.httpService.uploadImg(pic).subscribe(
      result => {
        //console.log("success1")
        console.log(result);
      },
      error => {
        //console.log(typeof(pic));
        console.log('error');
      }
    );
    this.httpService.classify(selectedPreferences).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('error');
        //console.log(error.status);
      }
    );
  }

  get formData() { return <FormArray>this.symptomForm.get('symptoms'); }

}
