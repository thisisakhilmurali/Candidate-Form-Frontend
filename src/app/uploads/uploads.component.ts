import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent {

  candidateName!: string;
  aadharNumber!: string;
  panNumber!: string;
  experience!: number;
  skills!: string;
  role!: string;
  availableDate!: Date;
  availableTime!: string;

  resumeFile: File | null = null;
  profileFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(type: string, event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (type === 'resume') {
        this.resumeFile = file;
        // console.log('Resume uploaded successfully');
      } else if (type === 'profile') {
        this.profileFile = file;
        // console.log('Profile picture uploaded successfully');
      }
    }
  }

  uploadFiles() {

    // details uploads
    const candidateData = {

      candidateName: this.candidateName,
      aadharNumber: this.aadharNumber,
      panNumber: this.panNumber,
      experience: this.experience,
      skills: this.skills,
      role: this.role,
      availableTime: this.availableTime,
      availableDate: this.availableDate
    }




    this.http.post('http://localhost:8080/interview/candidates', candidateData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });



    // resume uploads
    if (this.resumeFile) {
      const resumeFormData = new FormData();
      resumeFormData.append('pdf', this.resumeFile, this.resumeFile.name);
      this.http.post('http://localhost:8080/interview/resume', resumeFormData)
        .subscribe(
          response => console.log('Resume uploaded successfully'),
          error => console.log('Error uploading resume:', error)
        );
    }


    // profile picture uploads
    if (this.profileFile) {
      const profileFormData = new FormData();
      profileFormData.append('image', this.profileFile, this.profileFile.name);
      this.http.post('http://localhost:8080/interview/picture', profileFormData)
        .subscribe(
          response => console.log('Profile picture uploaded successfully'),
          error => console.log('Error uploading profile picture:', error)
        );
    }
  }

}

