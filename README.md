# sales-task


The backend is hosted at :  https://sales-task.up.railway.app/

GET APIS

1st Get API : Create API to initialize the database from given json file
Link : https://sales-task.up.railway.app/api/fetch

2nd Get API : Create an API for STATISTICS
Link : http://sales-task.up.railway.app/api/statistics/:month  
Here month is the input. we are taking month as the params . 
Eg: to get Statistics of Month January : https://sales-task.up.railway.app/api/statistics/january

3rd Get API : Create an API for BARCHART
Link : http://sales-task.up.railway.app/api/barchart/:month  
Here month is the input. we are taking month as the params . 
Eg: to get BARCHART of Month January : https://sales-task.up.railway.app/api/barchart/january

4th Get API : Create an API for PIECHART
Link : http://sales-task.up.railway.app/api/piechart/:month  
Here month is the input. we are taking month as the params . 
Eg: to get PIECHART of Month January : https://sales-task.up.railway.app/api/piechart/january

5th Get API : Create an API which fetches the data from all the 3 APIs mentioned above, combines the response and sends a final response of the combined JSON.
Link : http://sales-task.up.railway.app/api/getalldetails/:month  
Here month is the input. we are taking month as the params . 
Eg: to get PIECHART of Month January : https://sales-task.up.railway.app/api/getalldetails/january

