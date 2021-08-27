import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Tenant } from '../../models/tenant';
import { TenantService } from '../../services/tenants.service';
import { CognitoCallback } from 'src/app/stores/cognito-utils';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements CognitoCallback {
  username: string;
  email: string;
  password: string;
  phone: string;
  step2: boolean;
  tenantId: string;
  tenant: Tenant;
  form: FormGroup;
  private _prevSelected: any;
  existingTenant: any;
  submitted = false;
  nonexistingTenant: boolean;
  constructor(public tenantService: TenantService, public toastr: ToastrService, public router: Router, public userService: UsersService) {
    this.tenant = new Tenant();
    this.existingTenant = "1";
    this.tenant.name = "";
    this.createFormGroup();
    this.clear();
    this.step2 = false;
  }

  clear() {
    this.submitted = false;
    
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.reset();
  }

  signUp() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (!this.step2) {
      this.step2 = true;
    } else {
      if (this.existingTenant == '1') {
        this.tenant.email = this.email;
        this.tenantService.save(this.tenant).subscribe(
          data => {
            if(data.tenantId) this.tenantId = data.tenantId;
            var user = new User();
            // user.Email = this.email;
            // user.username = this.username;
            // user.password = this.password;
            // user.phone = this.phone;
            // user.tenantId = this.tenantId;
            //this.userService.register(user, this);
          }
        );
      } else {
        this.tenantService.getById(this.tenantId).subscribe(
          data => {
            if (data.tenantId != null && this.tenantId == data.tenantId) {
              this.tenantId = data.tenantId;
              var user = new User();
              // user.Email = this.email;
              // user.username = this.username;
              // user.password = this.password;
              // user.phone = this.phone;
              // user.tenantId = this.tenantId;
              //this.userService.register(user, this);
            }
            else {
              return this.toastr.error("Tenant doesn't exists.");
            }
          }
        );
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }     
}

  createFormGroup() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      confirmPassword: new FormControl('')
    });
    this.form.validator = this.checkPasswords;
  }

  back(){
    this.step2 = false;
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { //error
      this.toastr.error(message);
    } else { //success
      //move to the next step
      this.toastr.success("Please Confirm your Account!, Confirmation link sent your email.")
      this.router.navigate(['/authentication/sign-in']);
    }
  }
}
