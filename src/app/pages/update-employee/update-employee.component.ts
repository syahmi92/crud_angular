import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number; //Initialize id to be used in the activated route

  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { } //Activated route used to get information from routing

  // ngOnInit(): void {
  //   this.id = this.route.snapshot.params['id']; //Get id from routing and set the id=id(from route)
  //   this.employeeService.getEmployeeById(this.id).subscribe(data =>{
  //     this.employee = data;
  //   }, error => console.log(error));
  // } --> NOTE!! Outdated approach - new approach below

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id)
      .subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }

  // onSubmit(){
  //   this.employeeService.updateEmployee(this.id, this.employee).subscribe(data=>{
  //     this.goToEmployeeList();
  //   }, error => console.log(error));
  // } --> NOTE!! Outdated approach - new approach below

  async onSubmit(): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.employeeService.updateEmployee(this.id, this.employee)
          .subscribe({
            next: () => {
              this.goToEmployeeList();
              resolve();
            },
            error: (error) => {
              console.log(error);
              reject(error);
            }
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

}
