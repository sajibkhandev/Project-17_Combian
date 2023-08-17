let input=document.querySelector(".input")
let postButton=document.querySelector(".postButton")
let updateButton=document.querySelector(".updateButton")
let heading=document.querySelector(".heading")
let search=document.querySelector(".search")
let allPost=document.querySelector(".allPost")
let editButton=document.querySelector(".editButton")
let typeheading=document.querySelector(".typeheading")


let overly=document.querySelector(".overly")
let inputpara=document.querySelector(".inputpara")

 

let arr=[]
let indexStore;
heading.innerHTML="Tatal: 0"






postButton.addEventListener("click",function(){
    if(!input.value){
        inputpara.style.display="inline-block"
    }else{
        arr.push({
            input:input.value
        })
        allPost.innerHTML=""
        input.value=""
        overly.style.height="350px"
        heading.style.paddingTop="170px"
        inputpara.style.display="none"
        inputpara.style.top="153px"
        display()
        counter()
        type()  
    }
})






updateButton.addEventListener("click",function(){
    arr[indexStore]={
        input:input.value
    }
    allPost.innerHTML=""
    input.value=""
    updateButton.style.display="none"
    postButton.style.display="flex"
    display()
    type()  
})






function display(){
    arr.map(item=>{
        allPost.innerHTML+=` <div class="card ${(isNaN(item.input))?"editColor":"playColor"} mt-4 " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title typeheading">${item.input}</h5>
          <button class="btn btn-danger editButton">${(isNaN(item.input))?"Edit":"Play"}</button>
          <button class="btn btn-primary dltButton">Delete</button>
        </div>
      </div>`
    })
    deletePortion()
    editPortion()   
}






function counter(){
    heading.innerHTML="Tatal: 0"
    let count=0
    function counterJs(){
        count++
        heading.innerHTML=`Total: ${count}`
        if(count==arr.length){
            clearInterval(stop)
        }  
    }
    let stop=setInterval(() => {
        counterJs()
    }, 100);
    if(arr.length==0){
        clearInterval(stop)
    }
}






function type(){
    let typeheading=document.querySelectorAll(".typeheading")
    let converttypeheading=Array.from(typeheading)
    converttypeheading.map(item7=>{
        let text5=item7.innerHTML
        let count2=0
        item7.innerHTML=""    //////  ager value blank rakhe
        function typeJs(){
            item7.innerHTML+=text5.charAt(count2)
            count2++
        }
        setInterval(() => {
            typeJs()
            
        }, 500);
    })
}







search.oninput=function(){
    allPost.innerHTML="" 
    arr.map(item=>{
        let textAdd=""
        let color1=""
        let discolor1=""
        for(let i=0;i<search.value.length;i++){
            textAdd+=item.input.split("")[i]
        }
        if(textAdd==search.value){
            for(let i=0;i<search.value.length;i++){
                color1+=item.input.split("")[i]
            }
            let newArr1=item.input.split("")
            item.input.split("").splice(0,search.value.length).map(item1=>{
                newArr1.shift()
                discolor1=newArr1.join("")
            })
            allPost.innerHTML+=` <div class="card ${(isNaN(item.input))?"editColor":"playColor"} mt-4 " style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title typeheading"><span>${color1}</span>${discolor1}</h5>
              <button class="btn btn-danger editButton">${(isNaN(item.input))?"Edit":"Play"}</button>
              <button class="btn btn-primary dltButton">Delete</button>
            </div>
          </div>`
          editPortion()
        //   deletePortion()

          let dltButton=document.querySelectorAll(".dltButton")
          let convertdltButton=Array.from(dltButton)
          convertdltButton.map((item9,index)=>{
            item9.addEventListener("click",function(){
                arr.splice(index,1)     ///// 1/problem  *index change korte hobe
                allPost.innerHTML=""
                search.value=""          
                display()
                counter()
            })
          })
        }
    })
}







function editPortion(){
    let editButton=document.querySelectorAll(".editButton")
    let convertEditButton=Array.from(editButton)
    convertEditButton.map((item3,index)=>{
        item3.addEventListener("click",function(){
            indexStore=index
            if(item3.innerHTML=="Edit"){
                input.value=arr[index].input
                updateButton.style.display="flex"
                postButton.style.display="none"
            }else{
                console.log("Play");
                let utterance = new SpeechSynthesisUtterance("You have clicked play button");
                speechSynthesis.speak(utterance);
            }
        })
    })
}


  




function deletePortion(){
    let dltButton=document.querySelectorAll(".dltButton")
    let convertDltButton=Array.from(dltButton)
    convertDltButton.map((item2,index)=>{
        item2.addEventListener("click",function(){
            arr.splice(index,1)
            if(arr.length==0){
                overly.style.height="500px"
              heading.style.paddingTop="210px"
              inputpara.style.top="194px"
            }
            allPost.innerHTML=""
            search.value=""  
            display()
            counter()
        })
    })
}






