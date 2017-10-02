import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImageStorageService } from '../../../../service/http/image-storage.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

  @Input('src') src: string;
  @Input('alt') alt: string;
  @Input('srcFormControl') srcFormControl: FormControl;

  progress = 0;
  error = '';
  uploaded = false;
  fileName: string;

  constructor(private imageService: ImageStorageService) { }

  ngOnInit() {
  }

  onDelete() {
    if (confirm('Are you sure to delete photo?')) {
      this.srcFormControl.setValue({});
      this.uploaded = false;
      this.src = '';
      this.error = '';
      this.progress = 0;
      this.imageService.deleteFile(this.src).then(() => {
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  onUploadPhoto(event: Event) {
    const fileList: FileList = (<HTMLInputElement>event.target).files;

    const filesCount = fileList.length;
    for (let i = 0; i < filesCount; i++) {
      this.fileName = (<File>fileList[i]).name;
      this.imageService.uploadFile(fileList[i], (downloadURL) => {
        this.srcFormControl.setValue(downloadURL);
        this.src = downloadURL;
        this.progress = 0;
        this.uploaded = true;
      }, (error) => {
        this.error = error;
        this.progress = 0;
      }, (progress, state) => {
        this.progress = progress;
      });
    }
  }
}
