import {Inject} from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {FileItem} from 'ng2-file-upload';

export class ImageStorageService {
  private storage;
  private storageRef;
  private imagesRef;

  constructor(@Inject(FirebaseApp) private fireBase: any) {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    this.storage = this.fireBase.storage();
    // Create a storage reference from our storage service
    this.storageRef = this.storage.ref();
    // Create a child reference
    // imagesRef now points to 'images'
    this.imagesRef = this.storageRef.child('images');
  }

  deleteFile(fileUrl: string): Promise<void> {
    // Create a reference to the file to delete
    const deleteRef = this.storage.refFromURL(fileUrl);

    // Delete the file
    return deleteRef.delete();
  }

  uploadFile(fileName: string, file: File, onSuccess?, onError?, onStateChange?) {
    const imageRef = this.imagesRef.child(fileName + '_' + (+Date.now()));
    const uploadTask = imageRef.put(file);

    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (onStateChange) {
          onStateChange(progress, snapshot.state, snapshot);
        }
      },
      onError,
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        if (onSuccess) {
          onSuccess(uploadTask.snapshot.downloadURL, uploadTask.snapshot);
        }
      });
  }
}
