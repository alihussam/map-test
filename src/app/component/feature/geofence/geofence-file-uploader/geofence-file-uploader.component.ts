import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'src/app/util/token.storage';
import { environment } from 'src/environments/environment';
import { WebConstants } from 'src/app/util/web.constants';

@Component({
  selector: 'app-geofence-file-uploader',
  templateUrl: './geofence-file-uploader.component.html',
  styleUrls: ['./geofence-file-uploader.component.scss']
})
export class GeofenceFileUploaderComponent implements OnInit {

  public fileData: File = null;
  public uploadedurl = environment.BaseServiceUrl+WebConstants.API_URL.GEOFENCE.FILE_UPLOADER_GEOFENCE;
  // public form: any;
  public fileName: string = "No file Chosen";
  public fileSize: any = "";
  public AllowedfileTypes: any = ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  
  constructor(
    public dialogRef: MatDialogRef<GeofenceFileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private toastrService: ToastrService,
    private tokenStorage: TokenStorage,
    handler: HttpBackend,
    ) {
      this.http = new HttpClient(handler);
      // this.initlizeForm();
    }

  ngOnInit(){}

  // initlizeForm() {
  //   this.form = new FormGroup({
  //     geofenceid: new FormControl("",Validators.required),
  //   });
  // }

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
    const formData = new FormData();
    console.log("fileData ",this.fileData);
    formData.append('file', this.fileData);
    
    // if(this.form.getRawValue().geofenceid != ""){
    //   formData.append('geofenceid',this.form.getRawValue().geofenceid+"");
    //   console.log("geofence Id ",this.form.getRawValue());
    // }else{
    //   formData.append('geofenceid','0');
    // }
    let headers = {'Authorization': `Bearer ${this.tokenStorage.getToken()}`};
    this.http.post(this.uploadedurl, formData,{'responseType': 'text',headers: headers},)
      .subscribe(res => {
        console.log(res);
        this.toastrService.success("success","File Uploaded Successfully");
        this.closeDialog();
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
