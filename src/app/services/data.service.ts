import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentuser:any
  currentacno:any

  //redundant data

  userDetails:any={
    1000:{acno:1000,username:"amal",password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:"anu",password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:"arun",password:123,balance:0,transaction:[]},
    1003:{acno:1003,username:"mega",password:123,balance:0,transaction:[]}
  }
  constructor() { 
    this.getData()
  }

  saveData(){   //to store all data  in a single method
    if(this.userDetails){
      localStorage.setItem('database',JSON.stringify(this.userDetails))
    }
    if(this.currentuser){
      localStorage.setItem('currerntUser',JSON.stringify(this.currentuser))
    }
    if(this.currentacno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentacno))
    }
  }

  getData(){
    if(localStorage.getItem('database')){
      this.userDetails=JSON.parse(localStorage.getItem('database') || '')
    }
    if(localStorage.getItem('currentUser')){
      this.currentuser=JSON.parse(localStorage.getItem('currentUser') || '')
    }
    if(localStorage.getItem('currentAcno')){
      this.currentacno=JSON.parse(localStorage.getItem('currentAcno') || '')
    }
  }

  register(acno:any,username:any,password:any){

    var userDetails=this.userDetails
    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno]={acno,username,password,balance:0,transaction:[]}
      this.saveData()
      //console.log(userDetails);       //data check cheyyan
      return true
    }
  }

  login(acno:any,psw:any){        
    
    var userDetails=this.userDetails

    this.currentuser=userDetails[acno]['username']

    if(acno in userDetails){
      
      if(psw==userDetails[acno]['password']){
        this.currentuser=acno
        this.saveData()
        return true
      }
      else{
        alert('incorrect password')
        return false
      }
    }
    else{
      alert('user not exist')
      return false
    }
  }

  deposit(acno:any,psw:any,amnt:any){
    let userDetails=this.userDetails
    //to convert amount data type from str to int
    var amount=parseInt(amnt)
    if(acno in userDetails){
      if(psw==userDetails[acno]['password']){
        userDetails[acno]['balance']+=amount

        //add deposit details in transaction array
        userDetails[acno]['transaction'].push({type:'CREDIT',amount})
        this.saveData()
        return userDetails[acno]['balance']
      }
      else{
        alert('incorrect password')
        return false
      }
    }
    else{
      alert('incorrect username')
      return false
    }
  }


  withdraw(acno:any,psw:any,amnt:any){
    let userDetails=this.userDetails
    //to convert amount data type from str to int
    var amount=parseInt(amnt)
    if(acno in userDetails){
      if(psw==userDetails[acno]['password']){
        if(amount<=userDetails[acno]['balance']){
          userDetails[acno]['balance']-=amount

        //add withdraw details in transaction array
        userDetails[acno]['transaction'].push({type:'DEBIT',amount})
        this.saveData()
        return userDetails[acno]['balance']
      }
      else{
        alert('insufficent balance')
        return false
      }
    }
    else{
      alert('incorrect password')
      return false
    }
  }
  else{
    alert('incorrect username')
    return false
  }

}

getTransaction(acno:any){
  return this.userDetails[acno]['transaction']
}

}



