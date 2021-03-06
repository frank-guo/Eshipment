import { Component, Input, SimpleChanges, forwardRef, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Order } from '../model/order';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { UserService } from '../service/user.service';
import { NgForm, FormArray } from '@angular/forms'

@Component({
  selector: 'orderModal',
  templateUrl: './orderModal.component.html',
  styles: ['p-dropdown {width: 269px !important;} p-dropdown /deep/ div:first-child {width: 269px !important;} p-calendar {width: 245px !important;} p-calendar /deep/ input {width: 245px !important;}'],
  providers: [UserService]
})
export class OrderModalComponent implements OnInit {
  @Input() public order: Order;
  @Input() public userId: string;
  @Input() public showModal: boolean
  @Input() public closeModal: Function
  @Input() public saveOrder: Function
  @Input() public userOptions: [any]
  @Input() public title: string;
  @Input() public isAdmin: boolean;
  //ViewChild only works with children but not grandchildren
  @ViewChild('orderForm') orderForm: NgForm
  private displayValue: string;
  private windowHeight: number;

  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private cdRef: ChangeDetectorRef, private userService: UserService) {
  }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
  }

  ngOnChanges(changes: SimpleChanges) {
    let userId = changes.userId;
    if (userId && userId.currentValue && this.isAdmin) {
      this.userService.getUser(userId.currentValue).subscribe(resp => {
        if (this.order != null) {
          this.order.companyName = resp.companyName
        }
      });
    }
    if (userId && !userId.currentValue) {
      if (this.order != null) {
        this.order.companyName = null
      }
    }
  }

  ngAfterContentChecked() {   
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
  }

  setStyle() {
    let styles = {
      'max-height': window.innerHeight,
      'overflow': 'auto',
      'display': this.showModal ? 'block' : 'none'
    };
    return styles;
  }
}
