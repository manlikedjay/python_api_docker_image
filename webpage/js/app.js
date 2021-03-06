document.addEventListener('DOMContentLoaded',()=>{
    // declaration of variables
    const url= "http://127.0.0.1:5000/";
    const res = document.getElementById('result');
    const displayBtn = document.getElementById('displaybtn');
    const deleteBtn = document.getElementById('deletebtn');
    const newBtn = document.getElementById('newbtn');
    const allBtn = document.getElementById('allbtn');
    const updateBtn = document.getElementById('updatebtn');
    const userBox = document.getElementById('user');
    // const newTitle = document.getElementById('newTitle');
    const newSubmitBtn = document.getElementById('newSubmitBtn');
    const newName = document.getElementById('newName');
    const newAge = document.getElementById('newAge');
    const newJob = document.getElementById('newJob');
    const updateSubmitBtn = document.getElementById('updateSubmitBtn');
    const updateName = document.getElementById('updateName');
    const updateAge = document.getElementById('updateAge');
    const updateJob = document.getElementById('updateJob');
    let user;

    displayBtn.addEventListener('click',()=>{
        if(userBox.value){
            user = userBox.value;
            clear(res);
            userBox.value = '';
            fetch(url+"user/"+user)
                .then(response => checkErrors(response))
                .then(response => response.json())
                .then(data =>{
                        printRes(data);
                })
                .catch(error =>{
                    console.error(error);
                })
        }else{
            alert('Please enter a user');
        }
    });

    deleteBtn.addEventListener('click',()=>{
        if(userBox.value){
            user = userBox.value;
            clear(res);
            userBox.value= '';
            fetch(url+"delete/"+user,{
                method: 'DELETE'
            })
                .then(response => checkErrors(response))
                .then(response => response.json())
                .then(data =>{
                    alert('Success:' + JSON.stringify(data));
                })
        }else{
            alert('Please enter a user')
        }
    });
    
    newBtn.addEventListener('click',()=>{
        $('#newModal').modal('show');
        // newTitle.innerHTML = 'New User';
        newSubmitBtn.addEventListener('click',()=>{
            if(newName.value == ''){
                alert('Please enter a Name for the new user')
            }else if (newAge.value == ''){
                alert('Please enter an Age for the new user')
            }else if(newJob.value == ''){
                alert('Please enter a Job for the new user')
            }else{
                let userJson = newModalToJson();
                modalClear();
                $('#newModal').modal('hide');
                clear(res);
                fetch(url+"new",{
                    method: 'POST',
                    body: userJson,
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => checkErrors(response))
                .then(response => response.json())
                .then(data => alert('Success:' + JSON.stringify(data)))
                .catch(error => console.error('Error:',error))
                
            }
        });
    });

    allBtn.addEventListener('click',()=>{
        clear(res);
        fetch(url+"users")
            .then(response => checkErrors(response))
            .then(response => response.json())
            .then(data =>{
                data.forEach(element => {
                    printRes(element);
                });
            })
            .catch(error => 
                console.error(error)
            );
    })

    updateBtn.addEventListener('click',()=>{
        if(userBox.value){
            user = userBox.value;
            clear(res);
            $('#updateModal').modal('show');
            // modalTitle.innerHTML = 'New User';
            userBox.value = '';
            fetch(url+"user/"+user)
                .then(response => checkErrors(response))
                .then(response => response.json())
                .then(data =>{
                        updateName.value = data.name;
                        updateAge.value = data.age;
                        updateJob.value = data.job;
                })
                .catch(error =>{
                    console.error(error)
                })
            
            updateSubmitBtn.addEventListener('click',()=>{
                if(updateName.value == ''){
                    alert('Please enter a Name for the new user')
                }else if (updateAge.value == '' ){
                    alert('Please enter an Age for the new user')
                }else if(updateJob.value == ''){
                    alert('Please enter a Job for the new user')
                }else{
                    let userJson = updateModalToJson();
                    modalClear();
                    $('#updateModal').modal('hide');       
                    clear(res);
                    fetch(url+"update/"+user,{
                        method: 'PUT',
                        body: userJson,
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => checkErrors(response))
                    .then(response => response.json())
                    .then(data => alert('Success:' + JSON.stringify(data)))
                    .catch(error => console.error('Error:',error));
                }
            });
        }else{
            alert('Please enter a user');
        }
    });

    function newElement(element){
        return document.createElement(element);
    };

    function append(parent,element){
        return parent.appendChild(element);
    };

    function clear(parent){
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };

    function modalClear(){
        newName.value = '';
        newAge.value = '';
        newJob.value = '';
        updateName.value = '';
        updateAge.value = '';
        updateJob.value = '';  
    }

    function printRes(element){
        let name = newElement('p');
        name.innerHTML = "Name: " + element.name;
        append(res,name);
        
        let age = newElement('p');
        age.innerHTML = "Age: " + element.age;
        append(res,age);

        let job = newElement('p');
        job.innerHTML = "Job: " + element.job;
        append(res,job);

        let line = newElement('hr');
        append (res,line);
    };
    function updateModalToJson(){
        let Obj = { "name":"","age":"","job":""};
        Obj.name = updateName.value;
        Obj.age = updateAge.value;
        Obj.job = updateJob.value;
        let Json = JSON.stringify(Obj);
        return Json
    };
    function newModalToJson(){
        let Obj = { "name":"","age":"","job":""};
        Obj.name = newName.value;
        Obj.age = newAge.value;
        Obj.job = newJob.value;
        let Json = JSON.stringify(Obj);
        return Json
    };
    // checks if response contains any errors. if it does returns true, otherwise returns false
    function checkErrors(response) {
        if(!response.ok){
            alert('ERROR: ' + response.statusText);
            throw Error(response.statusText);
        }else{
            return response;
        }
    };
});