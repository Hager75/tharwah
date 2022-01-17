import { AuthService } from './../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddcardService } from './../addcard.service';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css'],
})
export class AddcardComponent implements OnInit , OnDestroy {
  error: string = '';
  imagePath: string = '';
  type:string='';
  isSubmitted: boolean = false;
  addCard: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    image: new FormControl('hhh', [Validators.required]),
    video_url: new FormControl(null, [Validators.required]),
    production_year: new FormControl(null, [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    Original_language: new FormControl('english', [Validators.required]),
    subtitle_language: new FormControl('arabic', [Validators.required]),
    director: new FormControl(null, [Validators.required]),
    evaluation: new FormControl(null, [Validators.required]),
    long_description: new FormControl(null, [Validators.required]),
  });
  // this.addCard.controls['Original_language'].setValue(this.default, {onlySelf: true});
  constructor(public _AddcardService: AddcardService, public _Router: Router, public _ActivatedRoute:ActivatedRoute, private _AuthService:AuthService
    ) {
   this.type = _ActivatedRoute.snapshot.params.type;
   console.log(this.type);
   
  }

  ngOnInit(): void {
    if(this._AuthService.formDataShow != null){
      console.log(this._AuthService.formDataShow);
      this.addCard.controls['title'].setValue(this._AuthService.formDataShow.title);
      this.addCard.controls['image'].setValue(this._AuthService.formDataShow.image);
      this.addCard.controls['video_url'].setValue(this._AuthService.formDataShow.video_url);
      this.addCard.controls['production_year'].setValue(this._AuthService.formDataShow.production_year);
      this.addCard.controls['duration'].setValue(this._AuthService.formDataShow.duration);
      this.addCard.controls['category'].setValue(this._AuthService.formDataShow.category);
      this.addCard.controls['Original_language'].setValue(this._AuthService.formDataShow.Original_language);
      this.addCard.controls['subtitle_language'].setValue(this._AuthService.formDataShow.subtitle_language);
      this.addCard.controls['director'].setValue(this._AuthService.formDataShow.director);
      this.addCard.controls['evaluation'].setValue(this._AuthService.formDataShow.evaluation);
      this.addCard.controls['long_description'].setValue(this._AuthService.formDataShow.long_description);
    }
  }
  changeOriginal_language($event: any) {
    console.log($event.target.value);
    this.addCard.controls['Original_language'].setValue($event.target.value);
  }
  changesubtitle_language($event: any) {
    console.log($event.target.value);
    this.addCard.controls['subtitle_language'].setValue($event.target.value);
  }
  getFileName($event: any) {
    this.imagePath = $event.target.value;
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addCard.get('image')?.setValue(file , {onlySelf: true});
    }
  }
  submitForm(addCard: FormGroup) {
    console.log(addCard.valid);

    // if (addCard.valid) {
    //   // this._AddcardService.addFilmOrProgram(addCard.value).subscribe((response)=>{
    //   //   if(response.message == "success"){
    //   this._Router.navigate(['login']);
    // }
    // else{
    //   this.error = response.errors.message;
    // }
    //   })
    // }
    const formData = new FormData();
    formData.append('image', this.addCard.get('image')?.value);
    console.log(formData);
    console.log(addCard.value);

    this.isSubmitted = true;
    if (addCard.valid) {
      const formData = new FormData();
      // formData.append('image', this.addCard.get('image')?.value);
      formData.append('image', "اااا");
      formData.append('title', this.addCard.controls['title'].value);
      formData.append('video_url', this.addCard.controls['video_url'].value);
      formData.append('production_year', this.addCard.controls['production_year'].value);
      formData.append('duration', this.addCard.controls['duration'].value);
      formData.append('category', this.addCard.controls['category'].value);
      formData.append('Original_language', this.addCard.controls['Original_language'].value);
      formData.append('subtitle_language', this.addCard.controls['subtitle_language'].value);
      formData.append('director', this.addCard.controls['director'].value);
      formData.append('evaluation', this.addCard.controls['evaluation'].value);
      formData.append('Original_language', this.addCard.controls['long_description'].value);
      console.log(this.addCard.get('image')?.value);
      console.log(addCard.value);

      this._AddcardService.addFilmOrProgram(formData , 'movies').subscribe(
        (response) => {
          alert('success');
          this.addCard.reset();
          this.isSubmitted = false;
          // this._Router.navigate(['films']);
        },
        (error) => {
          alert('error');
        }
      );
    }
  }
  ngOnDestroy() {
    this._AuthService.formDataShow = null ;
  }


}
