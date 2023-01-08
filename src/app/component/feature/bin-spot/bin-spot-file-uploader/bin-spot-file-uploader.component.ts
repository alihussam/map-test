import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WebConstants } from 'src/app/util/web.constants';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpBackend, HttpEvent, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { GeofenceService } from 'src/app/services/geofence.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/util/token.storage';
import { Lookup } from 'src/app/model/lookup';

//const URL = '';

@Component({
  selector: 'app-bin-spot-file-uploader',
  templateUrl: './bin-spot-file-uploader.component.html',
  styleUrls: ['./bin-spot-file-uploader.component.scss']
})

export class BinSpotFileUploaderComponent implements OnInit {

  // public fileName: string = "No file Chosen";
  // public fileSize: any = "";
  //public fileType: any = ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  // public uploader: FileUploader = new FileUploader({ 
  //   url: URL,
  //   itemAlias: 'attachment',
  //   disableMultipart : false,
  //   method: 'post',
  //   allowedFileType: ['csv', 'xls','xlsx'],
  // });

  public fileData: File = null;
  //public uploadedurl = environment.BaseServiceUrl+"/api/parkingspot/upload";
  public uploadedurl = environment.BaseServiceUrl+WebConstants.API_URL.PARKING_SPOT.FILE_UPLOADER_PARKING_SPOT;
  public allGeofences: Lookup[] = [];
  public form: any;
  public fileName: string = "No file Chosen";
  public fileSize: any = "";
  public AllowedfileTypes: any = ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  
  public progress: number = -1;

  constructor(
    public dialogRef: MatDialogRef<BinSpotFileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private geofenceService: GeofenceService,
    public toastrService: ToastrService,
    private tokenStorage: TokenStorage,
    handler: HttpBackend,
    ) {
      this.http = new HttpClient(handler);
      this.getAllGeofence();
      this.initlizeForm();
    }

  // ngOnInit() {
  //   this.uploader.onAfterAddingFile = (file) => { 
  //     if(this.uploader.queue.length > 1){
  //       this.uploader.queue.shift(); 
  //     }
  //     if(this.uploader.queue != undefined){
  //       this.fileName = this.uploader.queue[0].file.name;
  //       this.fileSize = this.uploader.queue[0].file.size;
  //     }
  //     file.withCredentials = false;
  //   };

  //   this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //     if(status === WebConstants.STATUS.CODE_NOTFOUND){
  //       alert("File Not Uploaded"); 
  //     }else
  //     if(status === WebConstants.STATUS.CODE_SUCCESS){
  //       alert("File is Uploaded");
  //     }
  //   };

  //   this.uploader.onWhenAddingFileFailed = () =>{
  //     alert("File Upload Failed ,Please Choose File of Right Format : xls, xlxs or csv");
  //   }
  // }

  // chooseFile(){
  //   let fileInput = document.getElementById("fileInput"); 
  //   fileInput.click();
  // }

  ngOnInit(){}

  initlizeForm() {
    this.form = new FormGroup({
      geofenceId: new FormControl("",Validators.required),
    });
  }

  getAllGeofence() {
    this.geofenceService.getAll()
  .pipe(first())
  .subscribe(response => {
      if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
        let data = response.data;
        for (var x = 0; x < data.length; x++) {
          var obj = {
            id: data[x].id,
            name: data[x].geofenceName,
          }
          this.allGeofences[x] = obj;
        }
      } else {
        alert(response.value);
      }
    });
  }


  fileProgress(fileInput: any) {
    let fileData = <File>fileInput.target.files[0];
    console.log("fileData ",fileData);
    if(this.AllowedfileTypes.includes(fileData.type)){
      this.fileData = fileData;
      this.fileName = fileData.name;
      this.fileSize = fileData.size;
      this.toastrService.info("File : "+this.fileName+" ; Size: "+this.fileSize,"File Selected");
    }else{
      this.fileData = null;
      this.fileName = "No file Chosen";
      this.fileSize = "";
      this.toastrService.warning("Please select Correct file","Wrong File Type Error");
    }
  } 

  onSubmit(){
    this.progress = 0;
    //localStorage.setItem('fileUpload','true');
    const formData = new FormData();
    console.log("fileData ",this.fileData);
    formData.append('file', this.fileData);
    
    if(this.form.getRawValue().geofenceid != ""){
      formData.append('geofenceId',this.form.getRawValue().geofenceid+"");
      console.log("geofence Id ",this.form.getRawValue());
    }else{
      formData.append('geofenceid','0');
    }
    let headers = {'Authorization': `Bearer ${this.tokenStorage.getToken()}`};
    this.http.post(this.uploadedurl, formData, {'responseType': 'text',headers: headers,reportProgress: true,observe: 'events'})  
    .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.toastrService.success("success","File Uploaded Successfully");
            setTimeout(() => {
              this.progress = -1;
              this.closeDialog();
            }, 1000);
          }
        },(error: any) => {
          console.log("error in upload ",error);
          if(error?.status === 0){
            this.toastrService.error("Please verify file's data format and size",error?.name);
            this.closeDialog();
          }
        })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  chooseFile(){
    let myInput = document.getElementById("myInput"); 
    myInput.click();
  }
}
