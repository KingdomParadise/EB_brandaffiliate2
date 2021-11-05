import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-dealer-registration',
  templateUrl: './dealer-registration.component.html',
  styleUrls: ['./dealer-registration.component.css']
})
export class DealerRegistrationComponent implements OnInit, AfterViewInit {
  regForm1: FormGroup;
  regForm3: FormGroup;
  regForm2: FormGroup;
  isCompleted1:boolean = true;
  isCompleted2:boolean = true;
  isCompleted3:boolean = true;
  isEditable = true;
  industries = [];
  countries = [];
  states = [];
  isLinear = true;
  currentStepperImage= 'assets/images/main-image.png';
  stepperImages = [
    {
      url: 'assets/images/main-image.png'
    },
    {
      url: 'assets/images/stepper2image.png'
    },
    {
      url: 'assets/images/stepper3image.png'
    }
  ];
  selectedCompanyLogo: File;
  selectedCompanyLogoPath: any;
  selectedUserImgPath: any;
  selectedUserImg: File;
  alertMsg: any = {
    type: '',
    message: ''
  };
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder:any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  map: google.maps.Map;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    this.dataService.getIndustries().subscribe(data => {
      this.industries = data.response.industryList;
    });
    this.dataService.getCountries().subscribe(data => {
      this.countries = data.response.countryList;
    });
    this.regForm1 = this._formBuilder.group({
      companyName: [null, [Validators.required,Validators.maxLength(124)]],
      industryId: [null, Validators.required],
      //companyEmail: ['', [Validators.required, Validators.email]],
      //companyPhone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [null, Validators.required],
      personalEmail:  ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      personalPhone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.regForm2 = this._formBuilder.group({
      companyLogo: [null, Validators.required],
      userLogo: [null, Validators.required],
    });
    this.regForm3 = this._formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      zipCode: ['', Validators.required],
      mapLocations: [null]
    });

    
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    // const mapProperties = {
    //   center: new google.maps.LatLng(35.2271, -80.8431),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
  get f1(){  
    return this.regForm1.controls;  
  }  
  get f3(){  
    return this.regForm3.controls;  
  } 
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getAddress(latitude:number, longitude:number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }
  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'none';
  }

  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
    this.currentStepperImage= this.stepperImages[event.selectedIndex].url;
    if(event.selectedIndex == 2){
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
    
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
    
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }
  }

  onFileChanged(event: any, type: string) {
    const reader = new FileReader();
    if (type == 'company') {
      this.selectedCompanyLogo = event.target.files[0];
      reader.readAsDataURL(this.selectedCompanyLogo);
      reader.onload = (_event) => {
        this.selectedCompanyLogoPath = reader.result;
      }
    } else if (type == 'user') {
      this.selectedUserImg = event.target.files[0];
      reader.readAsDataURL(this.selectedUserImg);
      reader.onload = (_event) => {
        this.selectedUserImgPath = reader.result;
      }
    }
  }

  onCountrySelect(country:any){
    console.log(country);
    if(country){
      this.dataService.getStates(country.countryId).subscribe(data =>{
        this.states = data.response.stateList;
      })
    }
    console.log(this.regForm3);
  }
  close() {
    this.alertMsg.message = ''
  }
  submit(){
    localStorage.setItem('personalPhone', this.regForm1.value.personalPhone);
    let formObj = {...this.regForm1.value, ...this.regForm3.value};
    formObj.companyEmail = this.regForm1.value.personalEmail;
    formObj.companyPhone = this.regForm1.value.personalPhone;
    formObj.mapLocations = [{lat: this.latitude,lng: this.longitude}];
    if(this.regForm3.valid){
      let formData = new FormData();
      formData.append('data', JSON.stringify(formObj));
      formData.append('userPhoto', this.selectedUserImg);
      formData.append('companyLogo', this.selectedCompanyLogo);
      this.dataService.registerDealer(formData).subscribe(res =>{
        console.log(res);
        if (res.responseCode == 0) {
          this.router.navigateByUrl("/verify");
        }
        else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      });
    }
  }
}
