import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: any;

  constructor(private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getDoctors().subscribe(
      res => {
        this.doctors = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  detailsUser(index: number){
    this.router.navigate(['/dashboard/doctors/details'], {queryParams: {'id': this.doctors[index].id}});
  }

}
