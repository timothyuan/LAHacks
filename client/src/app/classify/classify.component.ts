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
  symptoms = [];
  external_text = "Please upload a picture of external symptoms."
  external_desc = "Describe the uploaded picture";
  internal_text = "Which symptoms apply to you:";
  app_name = "skine";
  possibleSymptoms = ['Spoon-Shaped Fingernails (Koilonychia)', 'Squamous Cell Cancer (Skin Cancer Symptoms and Signs)', 'Squamous Cell Carcinoma (Skin Cancer Symptoms and Signs)', 'Sternutation (Sneezing)', 'Stiff Neck', 'Stomach Cramps', 'Stomach Ulcer (Peptic Ulcer) Symptoms and Signs', 'Stool Color & Texture Changes', 'Strange Behavior (Unusual Behavior)', 'Strep Throat Symptoms and Signs', 'Stroke Symptoms and Signs', 'Sty Symptoms and Signs', 'Subconjunctival Hemorrhage Symptoms and Signs', 'Suicide', 'Swimmers Ear (Otitis Externa) Symptoms and Signs', 'Swine Flu Symptoms and Signs', 'Swollen Ankles and/or Swollen Feet', 'Swollen Breast', 'Swollen Eyes', 'Swollen Gums (Pericoronitis Symptoms and Signs)', 'Swollen Joints', 'Swollen Knee', 'Swollen Lip', 'Swollen Lymph Nodes', 'Swollen Testicles', 'Swollen Tongue', 'Swollen Tonsils', 'Tachycardia', 'Tension Pneumothorax', 'Testicular Pain', 'Testicular Swelling (Swollen Testicles)', 'Thirst', 'Throat Cancer Symptoms and Signs', 'Thrush (Oral Candidiasis) Symptoms and Signs', 'Tic', 'Tightness in Chest', 'Tingling in Hands and Feet', 'Toe Pain', 'Toothache', 'Traumatic Brain Injury (Concussion Symptoms and Signs)', 'Tremor', 'Tuberculosis (TB)', 'Tunnel Vision', 'Vaginal Bleeding', 'Vaginal Discharge', 'Vaginal Dryness', 'Vaginal Itching', 'Vaginal Odor', 'Vaginal Pain', 'Vaginal Yeast Infection Symptoms and Signs', 'Vertical Ridges on the Fingernails', 'Vertigo', 'Vision Loss', 'Vitamin B12 Deficiency Symptoms and Signs', 'Vocal Outbursts', 'Vocal Tics (Tic)', 'Vomiting', 'Vomiting Blood', 'Watery Eye', 'Weakness', 'Weight Gain', 'Weight Loss', 'West Nile Virus Symptoms and Signs', 'Wet AMD (Macular Degeneration Symptoms and Signs)', 'Wheezing', 'White Tongue', 'Wrist Pain', 'Yawning', 'Zika Virus Infection Symptoms and Signs'];


  constructor(private fb: FormBuilder, private httpService: HttpService) {
    // const formControls = this.symptoms.map(control => new FormControl(false));
    // this.symptomForm = this.fb.group({
    //   symptoms: new FormArray(formControls)
    // });
  }

  ngOnInit() {
  }

  submitInt(){
    const selectedPreferences = this.symptomForm.value.symptoms
    .map((checked, index) => checked ? this.symptoms[index].id : null)
    .filter(value => value !== null);
    this.httpService.classify(selectedPreferences).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('error');
      }
    );
  }

  submitImg(){
    const pic = (<HTMLInputElement>document.getElementById('image')).files[0];
    this.httpService.uploadImg(pic).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('error');
      }
    );
}

  add(value : string){
    if(this.symptoms.indexOf(value)==-1){
      this.symptoms.push(value);
    }
  }

  get formData() { return <FormArray>this.symptomForm.get('symptoms'); }

}
