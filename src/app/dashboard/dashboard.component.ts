import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any

  acno:any
  psw:any
  amnt:any

  acno1:any
  psw1:any
  amnt1:any

  constructor(private ds:DataService) { 
    this.user=this.ds.currentuser
  }

  ngOnInit(): void {

  }

  deposit(){
    var acno=this.acno
    var psw=this.psw
    var amnt=this.amnt

    const result=this.ds.deposit(acno,psw,amnt)
    if(result){
    alert(`${amnt} is credited in your ac and the available balance is${result}`)
    }

    //alert('deposit work)
  }

  withdraw(){
    var acno1=this.acno1
    var psw1=this.psw1
    var amnt1=this.amnt1
    //alert('withdraw work')

    const result=this.ds.withdraw(acno1,psw1,amnt1)
    if(result){
    alert(`${amnt1} is debited in your ac and the available balance is${result}`)
    }
  }

}
