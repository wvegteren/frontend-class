import {Component, OnInit} from '@angular/core';
import {Account} from '../account/account';
import {AccountService} from '../account/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];
  selectedAccount: Account;
  nameChangeCount = 0;

  constructor(private service: AccountService) { }

  ngOnInit() {
    this.service.getAccounts().subscribe(
      (data) => this.accounts = data
    );
  }

  onSelectAccount(account: Account) {
    this.selectedAccount = account;
  }

  onNameChange(nameChanged: boolean) {
    if (nameChanged) {
      this.nameChangeCount++;
    }
  }
}
