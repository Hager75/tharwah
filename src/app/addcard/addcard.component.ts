import { AuthService } from './../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddcardService } from './../addcard.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
// import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css'],
})
export class AddcardComponent implements OnInit, OnDestroy {
  error: string = '';
  largeFile: boolean = false;
  imagePath: string = '';
  type: string = '';
  id: string = '';
  isSubmitted: boolean = false;
  isToushed: boolean = false;
  orginalChoosenLanguage: boolean = true;
  subtitleChoosenLanguage: boolean = true;
  addCard: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    video_url: new FormControl(null, [Validators.required]),
    production_year: new FormControl(null, [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    Original_language: new FormControl('الانجليزية', [Validators.required]),
    subtitle_language: new FormControl('العربية', [Validators.required]),
    director: new FormControl(null, [Validators.required]),
    evaluation: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]+([.][0-9]+)?$'),
    ]),
    long_description: new FormControl(null, [Validators.required]),
  });
  // this.addCard.controls['Original_language'].setValue(this.default, {onlySelf: true});
  constructor(
    public _AddcardService: AddcardService,
    public _Router: Router,
    public _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private toastr: ToastrService
  ) {
    this.type = _ActivatedRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (this._ActivatedRoute.snapshot.params.id) {
      this.id = this._ActivatedRoute.snapshot.params.id;
      this._AddcardService
        .getDetails(this._ActivatedRoute.snapshot.params.id, this.type)
        .subscribe(
          (res) => {
            this.addCard.controls['title'].setValue(res.data.title);
            this.addCard.controls['image'].setValue(res.data.image);
            this.imagePath = this.addCard.controls['image'].value;
            this.addCard.controls['video_url'].setValue(res.data.video_url);
            this.addCard.controls['production_year'].setValue(
              res.data.production_year
            );
            this.addCard.controls['duration'].setValue(res.data.duration);
            this.addCard.controls['category'].setValue(res.data.category);
            this.addCard.controls['Original_language'].setValue(
              res.data.Original_language
            );
            if (this.addCard.controls['Original_language'].value == 'العربية') {
              this.orginalChoosenLanguage = false;
            }
            this.addCard.controls['subtitle_language'].setValue(
              res.data.subtitle_language
            );
            if (this.addCard.controls['subtitle_language'].value == 'الانجليزية') {
              this.subtitleChoosenLanguage = true;
            }
            this.addCard.controls['director'].setValue(res.data.director);
            this.addCard.controls['evaluation'].setValue(res.data.evaluation);
            this.addCard.controls['long_description'].setValue(
              res.data.long_description
            );
          },
          (error) => {
            // this.toastr.error('لم تتم العملية', '', {timeOut:3000, closeButton: true, progressBar: true});
          }
        );
    }
  }
  changeOriginal_language($event: any) {
    this.addCard.controls['Original_language'].setValue($event.target.value);
  }
  changesubtitle_language($event: any) {
    this.addCard.controls['subtitle_language'].setValue($event.target.value);
  }

  onFileChange(event: any) {
    this.imagePath = event.target.files[0].name;
    if (event.target.files.length > 0) {
      this.isToushed = true;
      const file = event.target.files[0];
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > 8) {
        this.largeFile = true;
        this.imagePath = '';
      } else {
        this.largeFile = false;
        this.addCard.get('image')?.setValue(file, { onlySelf: true });
      }
    }
  }
  submitForm(addCard: FormGroup) {
    this.largeFile = false;
    const formData = new FormData();
    formData.append('image', this.addCard.get('image')?.value);
    this.addCard.controls['image'].setValue(this.addCard.get('image')?.value);

    this.isSubmitted = true;
    if (addCard.valid && !this._ActivatedRoute.snapshot.params.id) {
      let formData = this.addDataToFormData();

      this._AddcardService.addFilmOrProgram(formData, this.type).subscribe(
        (response) => {
          this.toastr.success('تمت العملية بنجاح', '', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
          this.addCard.reset();
          this.isSubmitted = false;
          this._Router.navigate([this.type]);
        },
        (error) => {
          this.toastr.error('لم تتم العملية', '', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
        }
      );
    } else if (
      addCard.valid &&
      this._ActivatedRoute.snapshot.params.id &&
      this._ActivatedRoute.snapshot.params.type
    ) {
      let formData = this.addDataToFormData();
      this._AddcardService
        .updateMovieOrProgram(this.id, this.type, formData)
        .subscribe(
          (response) => {
            this.toastr.success('تمت العملية بنجاح', '', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            });
            this.addCard.reset();
            this.isSubmitted = false;
            this._Router.navigate([this.type]);
          },
          (error) => {
            this.toastr.error('لم تتم العملية', '', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            });
          }
        );
    }
  }
  ngOnDestroy() {
    this._AuthService.formDataShow = null;
  }
  addDataToFormData() {
    const formData = new FormData();
    if (this.isToushed == true) {
      formData.append('image', this.addCard.get('image')?.value);
    }
    formData.append('title', this.addCard.controls['title'].value);
    formData.append('video_url', this.addCard.controls['video_url'].value);
    formData.append(
      'production_year',
      this.addCard.controls['production_year'].value
    );
    formData.append('duration', this.addCard.controls['duration'].value);
    formData.append('category', this.addCard.controls['category'].value);
    formData.append(
      'Original_language',
      this.addCard.controls['Original_language'].value
    );
    formData.append(
      'subtitle_language',
      this.addCard.controls['subtitle_language'].value
    );
    formData.append('director', this.addCard.controls['director'].value);
    formData.append('evaluation', this.addCard.controls['evaluation'].value);
    formData.append(
      'long_description',
      this.addCard.controls['long_description'].value
    );

    return formData;
  }
}
