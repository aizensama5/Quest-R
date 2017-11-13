import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ImageStorageService } from '../../service/http/image-storage.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  fileInfo = {
    filename: '',
    src: '',
    progress: 0,
    uploaded: false,
    error: ''
  };
  @Input() companyLogo: string;
  @Input() isMultiple = false;
  @Input() withStyling = false;
  @Output() onImageUploaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() onImagesUploaded: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  constructor(private imageService: ImageStorageService) {
  }

  onDelete() {
    this.fileInfo.uploaded = false;
    this.fileInfo.src = '';
    this.fileInfo.error = '';
    this.fileInfo.progress = 0;
    this.imageService.deleteFile(this.fileInfo.src).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }

  onUploadPhoto(event: Event) {
    const fileList: FileList = (<HTMLInputElement>event.target).files;
    for (let i = 0; i < fileList.length; i++) {
      this.fileInfo.filename = window.btoa((<File>fileList[i]).name).split('=')[0];
      console.log(this.fileInfo.filename);
      this.imageService.uploadFile(this.fileInfo.filename, fileList[i], (downloadURL) => {
        this.fileInfo.src = downloadURL;
        this.fileInfo.progress = 0;
        this.fileInfo.uploaded = true;
        if (!this.isMultiple) {
          this.onImageUploaded.emit(this.fileInfo);
        } else {
          this.onImagesUploaded.emit(this.fileInfo);
        }
      }, (error) => {
        this.fileInfo.error = error;
        this.fileInfo.progress = 0;
        this.onImageUploaded.emit(this.fileInfo);
      }, (progress) => {
        this.fileInfo.progress = progress;
      });
    }
  }
}
