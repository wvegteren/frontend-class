import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from './account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account: Account;
  @Output() nameChanged = new EventEmitter<boolean>();
  nameChangeAllowed = true;

  constructor() { }

  ngOnInit() {
  }

  onNameChange() {
    this.account.registrationName = 'New Name';
    this.nameChangeAllowed = false;

    this.nameChanged.emit(true);
  }
}
