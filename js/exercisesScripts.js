

function exercisesInit()
{
    console.log("exercises");
    attachStylesheet();
    fetchRecordsForButtons();
}


function attachStylesheet()
{
    let loc='css/exercisesStyles.css';
    let el=document.createElement('link');
    el.type='text/css';
    el.rel='stylesheet';
    el.href=loc;
    document.body.appendChild(el);
}

function handleMetadataSubmit()
{
    console.log("Handle metadata submit");
    let outputMessage='';
    let ids=["figureInputMeta","title","description","picLocation"];
    let userInputs=[];
    for(let i=0;i<ids.length;i++)
    {
        let thisId=ids[i];
        let thisInput=document.getElementById(thisId).value;
        let unitArray={id:thisId,input:thisInput};
        userInputs.push(unitArray);
    }
    console.log(userInputs);
    for (const item in userInputs)
    {
       // console.log(userInputs[item]["input"]);
        if(userInputs[item]["id"]==="figureInputMeta" && userInputs[item]["input"]==='')
        {
            writeToStatusEx("Invalid input");
            return false;
        }
        if(userInputs[item]["id"]==="title" && userInputs[item]["input"]==='')
        {
            writeToStatusEx("Invalid input");
            return false;
        }      
    }
    //console.log(userInputs);
    writeToStatusEx("Input Accepted");
    transmitMetadataInputs(userInputs);
    for(let i=0;i<ids.length;i++)
    {
        let thisId=ids[i];
        document.getElementById(thisId).value='';      
    }
}

function fetchRecordsForButtons()
{
    callBackendEx("fetchRecordsList",'',printButtons);
}

function printButtons(data)
{
    console.log(data)
    let buttonContent='';
    for(let i=0;i<data.length;i++)
    {
        let figure=data[i]["figure"];
        let title=data[i]["title"];
        let button=
        `
            <button onClick="handleMetaButtons('${figure}')">${figure}${title?'|'+title:''}</button>
        `;
        buttonContent+=button;
    }
    document.getElementById("buttonOutputArea").innerHTML=buttonContent;
}


function handleMetaButtons(figure)
{
    console.log("Handle meta buttons figure",figure);
}

function writeToStatusEx(message)
{
    document.getElementById("metadataStatusIndicator").innerHTML=message;
    if(message!="Invalid Input")
    {
         fetchRecordsForButtons();

    }
}

function transmitMetadataInputs(userInputs)
{
   // console.log(userInputs);
    callBackendEx('submitMetadata',userInputs,writeToStatusEx);
    
}


function callBackendEx(functionName,params,callback)
{
    let fetchTarget='php/exercises_controller.php';
    let inputPackage={function:functionName,params:params};
    inputPackage=JSON.stringify(inputPackage);
    fetch(fetchTarget,
        {
            method:'POST',
            headers:{'Content-Type':'Application/json'},
            body:inputPackage
        }
    )
    .then(response=>response.json())
    .then(data=>callback(data));
}
exercisesInit();