import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee(); //Create new object in typescript

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    
  }

  // saveEmployee(){
  //   this.employeeService.createEmployee(this.employee).subscribe(data =>{
  //     console.log(data);
  //     this.goToEmployeeList();
  //   },
  //   error => console.log(error)); //Log the error
  // } -->NOTE!! Outdated approach

  async saveEmployee() {
    try {
      const data = await this.employeeService.createEmployee(this.employee).toPromise();
      console.log(data);
      this.goToEmployeeList();
    } catch (error) {
      console.log(error);
    }
  }

  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }

  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }

}
