import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentuser:any
  //redundant data

  userDetails:any={
    1000:{acno:1000,username:"amal",password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:"anu",password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:"arun",password:123,balance:0,transaction:[]},
    1003:{acno:1003,username:"mega",password:123,balance:0,transaction:[]}
  }
  constructor() { }

  register(acno:any,username:any,password:any){

    var userDetails=this.userDetails
    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno]={acno,username,password,balance:0,transaction:[]}
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



