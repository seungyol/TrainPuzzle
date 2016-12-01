import TestRunner from 'src/test-run';
import TrainRoute from 'src/train-route';
(function () {
    let models = [], reader = (() => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            return (new FileReader());
        } else {
            alert('The File APIs are not fully supported by your browser. Fallback required.');
            return null;
        }        
    })();
    
    /**
    * Change text data into TrainRoute instance array
    **/
    let loadData = (data) => {
        models = [];
        let routes = data.split(',');

        for(let i =0; i<routes.length; i++) {
            routes[i] = routes[i].trim();
            if(routes[i].length === 3){
                let tmp = routes[i].split("");
                if(isNaN(tmp[2])){
                    models = [];
                    return;                    
                }
                models.push(new TrainRoute(tmp[0],tmp[1],tmp[2]));    
            } else {
                models = [];
                return;
            }
        }
    };
    
    /**
    * Make the test button disabled
    **/
    let disableTestButton = () => {
        document.getElementById('btnRun').disabled = true;
    };
    
    /**
    * Clear the test result
    **/    
    let clearTestResult = () => {
        let results = document.getElementsByClassName('result');

        for(let result of results){
            result.innerHTML = "";
        }
    };
    let clearDataContent = () => {
        document.getElementById('content').innerHTML = "";
    };
    /**
     * read text file
     */
    let readText = (event) => {
        let output = "", filePath = event.target;
        if(filePath.files && filePath.files[0]) {  

            if(filePath.files[0].name.lastIndexOf(".txt") === -1) {
                alert('Only text file can be selected');
                clearDataContent();
                disableTestButton();
                clearTestResult();
                return;
            }
            reader.onload = function (e) {
                output = e.target.result;
                
                loadData(output);
                if(models.length > 0 && models[0] instanceof TrainRoute){
                    btnRun.disabled = false;
                    document.getElementById('content').innerHTML = output;
                } else {
                    alert('No valid train data');
                    clearDataContent();
                    disableTestButton();
                    clearTestResult();
                }
            };//end onload()
            reader.readAsText(filePath.files[0]);
        } else { //this is where you could fallback to Java Applet, Flash or similar
            return ;
        }       
        
    };
    let clearSuccessMsg = ()=> {
        document.getElementById("successMsg").className = "";
    };
    //Add change event to data file input
    document.getElementById('dataFile').addEventListener('change', (event) => {
        readText(event);      
        clearTestResult();
        clearSuccessMsg();
    });
    
    let showSuccessMsg = () => {
        document.getElementById("successMsg").style='visibility:visible';
        document.getElementById("successMsg").className = "active";
        setTimeout(()=>{
            document.getElementById("successMsg").style='visibility:hidden';
            document.getElementById("successMsg").className = "";
        },2000);
    };
    //Add click event to test button
    document.getElementById('btnRun').addEventListener('click', () => {
        clearTestResult();
        clearSuccessMsg();
        setTimeout(()=>{
            let testRunner = new TestRunner();
        
            document.getElementById('test1').getElementsByClassName('result')[0].innerHTML = testRunner.getTest1Result(models);
            document.getElementById('test2').getElementsByClassName('result')[0].innerHTML = testRunner.getTest2Result(models);
            document.getElementById('test3').getElementsByClassName('result')[0].innerHTML = testRunner.getTest3Result(models);
            document.getElementById('test4').getElementsByClassName('result')[0].innerHTML = testRunner.getTest4Result(models);
            document.getElementById('test5').getElementsByClassName('result')[0].innerHTML = testRunner.getTest5Result(models);
            document.getElementById('test6').getElementsByClassName('result')[0].innerHTML = testRunner.getTest6Result(models);
            document.getElementById('test7').getElementsByClassName('result')[0].innerHTML = testRunner.getTest7Result(models);
            document.getElementById('test8').getElementsByClassName('result')[0].innerHTML = testRunner.getTest8Result(models);
            document.getElementById('test9').getElementsByClassName('result')[0].innerHTML = testRunner.getTest9Result(models);
            document.getElementById('test10').getElementsByClassName('result')[0].innerHTML = testRunner.getTest10Result(models);

            showSuccessMsg();

        },100);
    });
})();
