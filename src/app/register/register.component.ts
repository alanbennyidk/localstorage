import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname:any
  acno:any
  psw:any

  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    var uname=this.uname     //ingane eduthillel this vech call cheyyande varum,this.uname(nirbanthanmilla)
    var acno=this.acno
    var psw=this.psw

    const result=this.ds.register(acno,uname,psw)

    if(result){
      alert('successfully registered')
      this.router.navigateByUrl('')
    }
    else{
      alert('user already exist')
    }

  }

}
