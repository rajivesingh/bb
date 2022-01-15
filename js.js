const  acc1={

    owner:'Mohit Singh',
    mov:[100,200,300,4000,-344,80,500000.89,78,-9000],
    intrestRate:1.2,
    pin:1111,
};

const  acc2={

    owner:'Rajive Singh',
    mov:[1050,25400,3300,400430,-34674,80,500000],
    intrestRate:1.2,
    pin:2222,
};

const  acc3={

    owner:'Lucky Singh',
    mov:[1000,20450,32300,40400,-377844,80990,500000],
    intrestRate:1.2,
    pin:3333,
};

let accounts=[acc1,acc2,acc3]

let mainnmove=document.querySelector('.MMain');




let dismov = function(mov){
    mainnmove.innerHTML='';
mov.forEach(function(no,i){


   

    let type = no > 0 ? 'deposit' : 'withdraw';

    

   const html = `


<div class="movments_row">
   <div class="type_${type} d-inline  text-drak divinfo">
     ${i+1} ${type}
   </div>

   <div class="mov_value d-inline text-dark divinfo ">
    ${Math.abs(no)} ₹
   </div>
</div>

   `;
   
   mainnmove.insertAdjacentHTML('afterbegin',html);



});

};

// dismov(acc1.mov)



const createUsenames=function(accsounts){

    
    accsounts.forEach(function(no){
        no.nickname=no.owner
        .toLowerCase()
        .split(' ')
        .map(function(names){
            return names[0]
        })
        .join('');
    });
};

//creates the nick name
createUsenames(accounts);

// console.log(accounts)
let moves= acc1.mov;


//selectons
let lable_balance=document.querySelector('.card-text');


let deposits = moves.filter(function(value){
    return value>0
})

let withdrawl = moves.filter(function(value){
    return value<0;
})


// console.log(deposits);
// console.log(withdrawl)



let totalbal=function(acc){

    /* here insted of passing the movments we are directly pass the account to which we want to cal the total so 
    account name . movements then we are apply the reduce method */

  let  totalamount=acc.mov.reduce(function(sum,value){
        return sum+value
    },0)

    acc.balance = totalamount;

    lable_balance.textContent=`Your current balnce is ${totalamount} ₹`
}

// totalbal(moves);

//  array1=[1,12,3,664,5,6];

//  let biggestno=function(array){

//      bigno=array.reduce(function(ac,va){
//          if(ac>va){
//              return ac
//          }
//          else{
//              return va
//          }
//      })



//  }

//  biggestno(array1)
//  console.log(bigno)

//  let newarr=array1.filter(function(no,i){
     
//     return no>4
     
//  })
//  console.log(newarr)



/*                                           INPUT FIELD                          */

let accountinfo;

//secltions

let inputuser = document.querySelector('.login__input--user');
let inputpin = document.querySelector('.login__input--pin');
let loginbtn = document.querySelector('.login__btn');
let loginmessage= document.querySelector('.message')
let outermostdiv = document.querySelector('.Outerdiv');


loginbtn.addEventListener('click',function(e){
    // prevets the form from submitinmg;
    e.preventDefault();
    //------------------------

    //here the vlue is been taken from the user input field
   accountinfo=accounts.find(function(value){
       // here nickname is one of the values of the object
        return value.nickname===inputuser.value;
    });

    console.log(accountinfo)

    if(accountinfo.pin===Number(inputpin.value)){
   // the first line of if else checks the pin 
        loginmessage.textContent=` Welcome ${accountinfo.owner.split(' ')[0]}`

          // we are seeting the opacity to 100 again ( opacty hides the data )
    outermostdiv.style.opacity=100;
    // paticular account info

    dismov(accountinfo.mov)

    // total balance of the partiular account

    totalbal(accountinfo );


       
    }
       
})


/*                                           TRANFER FIELD                         */

// seletions 


let tranferto=  document.querySelector('.input_tranfer');

let tranferamount =  document.querySelector('.input_amount');

let tranferbutton = document.querySelector('.transferbtn');

tranferbutton.addEventListener('click',function(e){

    e.preventDefault();

    const amount = Number(tranferamount.value);
    const reciveracc = accounts.find(function(acc){
        return  acc.nickname === document.querySelector('.input_tranfer').value;
        // remember the return staemnt is nesessary or it will not return the value;

    });
 
    // this is to clear the cursor from the inputs 
    tranferto.value=" ";
    tranferamount.value=" ";


    if(amount>0 && accountinfo.balance>=amount && reciveracc?.nickname !== accountinfo.nickname  ){

        // this is where the transfer of money takes place

        accountinfo.mov.push(-amount);
        reciveracc.mov.push(amount);

        // updating the user interface 

        dismov(accountinfo.mov)

        totalbal(accountinfo );






    }

})




/*                                           CLODE ACCOUNT                        */

// seletions 

let cuser= document.querySelector('.Cuser');

let pin = document.querySelector('.Cpin');

let closebtn = document.querySelector('.Closebt');

closebtn.addEventListener('click',function(e){

    e.preventDefault();

    console.log(' account closed');

    if(cuser.value===accountinfo.owner && Number(pin.value)===accountinfo.pin){
        let index = accounts.findIndex(function(acc){
            // here we triversing over accounts owner name
            return acc.owner ===  accountinfo.owner
        })
        console.log(index)

        accounts.splice(index,1);

        //for account to vanish 

        outermostdiv.style.opacity=0;
      

    }
      
})




/*                  lonan                       */

// seletions 

let loam = document.querySelector('.loanamount')

let lobt = document.querySelector('.loanbt');

lobt.addEventListener('click',function(e){
    e.preventDefault();

    let loam1 = Number(loam.value)
    if(loam1 > 0 && accountinfo.mov.some(function(money){
        return money >= loam1 * 0.1;
    })){

        accountinfo.mov.push(loam1);


        // adding the amount in the users account 

        alert(`The loan for ₹${loam1} has been aproved`);

        
        dismov(accountinfo.mov)

        totalbal(accountinfo );



    }
    else{
        alert(`your request for loan of ₹${loam1} has been declined`);
    }

    loam.value=' '
})



































