import Sale from "../model/sales.js";
import axios from "axios";
import monthApi from "../api/monthApi.js";
import priceApi from "../api/priceApi.js";

export const fetchDetail = async (req, res) => {
  try {
    const URL = `https://s3.amazonaws.com/roxiler.com/product_transaction.json`;
    
    //fetching value from the json file
    const salesdata = await axios.get(`${URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const salesData = salesdata.data;

    const posts = salesData.map((sale) => ({
      id: sale.id,
      title: sale.title,
      description: sale.description,
      price: sale.price,
      sold: sale.sold,
      dateOfSale: sale.dateOfSale,
      category: sale.category,
      image: sale.image,
    }));

     //inserting into the database
    await Sale.insertMany(posts);
    res.status(201).send(posts);
    
  } catch (error) {
    res.status(401).send(error);
  }
};

export const getStatistics = async (req, res) => {
  try {
    const month = req.params.month;
    let value;

    //getting value of month in number
    monthApi.map((val)=>{
       if(month==val.month){
          value = val.value;
       }
    })

    let saleAmount=0,itemsSold=0,itemsNotSold=0;

   //fetching data from database
    const salesData = await Sale.find();

    //finding the required data
    salesData.map((obj)=>{
      const monthInObj = obj.dateOfSale.getMonth() +1;
      if(monthInObj==value){ 
        if(obj.sold==true){
          saleAmount+=obj.price;
          itemsSold++;
        }else{
          itemsNotSold++;
        }
      }
    })
    // console.log(saleAmount + " " + itemsSold + " "+ itemsNotSold);
    const resObj  = {
      saleAmount,
      itemsSold,
      itemsNotSold
    }
    res.status(201).send(resObj);
    
  } catch (error) {
    res.status(401).send(error);
  }
};

export const getBarChart = async (req, res) => {
  try {
    const month = req.params.month;
    let value;
    monthApi.map((val)=>{
       if(month==val.month){
          value = val.value;
       }
    })

   //fetching data from database
    const salesData = await Sale.find();

    salesData.map((obj)=>{
      const monthInObj = obj.dateOfSale.getMonth() +1;
      if(monthInObj==value){ 
          priceApi.map((price)=>{
            if(obj.price<901 && obj.price>=price.priceRangeStart && obj.price<=price.priceRangeEnd){
              price.itemNumber = price.itemNumber+1;
            }else if(obj.price>=901){
              price.itemNumber = price.itemNumber+1;
            }
          })
      }
    })
    const answerData = [];
    priceApi.map((val)=>{
      let obj = {
        "price-range":`${val.priceRangeStart} - ${val.priceRangeEnd}`,
        "NumberOfItems":val.itemNumber
      }
      answerData.push(obj);
    })
    res.status(201).send(answerData);
    
  } catch (error) {
    res.status(401).send(error);
  }
};



export const getPiechart = async (req, res) => {
  try {
    const month = req.params.month;
    let value;
    monthApi.map((val)=>{
       if(month==val.month){
          value = val.value;
       }
    })

    const salesData = await Sale.find();
    let answerData = [];

    //inserting unique values
    salesData.map((val)=>{
      const exists = answerData.includes(val.category);
      if (!exists) {
          answerData.push(val.category);
      }
    })

    let responseObj = [];
    answerData.map((val)=>{
      let obj = {
        "category":val,
        "NumberOfItems":0
      }
      responseObj.push(obj);
    })
    salesData.map((obj)=>{
      const monthInObj = obj.dateOfSale.getMonth() +1;
      if(monthInObj==value){ 
          responseObj.map((resObj)=>{
            if(obj.category === resObj.category){
              resObj.NumberOfItems = resObj.NumberOfItems +1;
            }
          })
      }
    })

    res.status(201).send(responseObj);
    
  } catch (error) {
    res.status(401).send(error);
  }
};


export const getAllDetails = async (req, res) => {
  try {
    const month = req.params.month;
  
    const statisticsData = await axios.get(`http://sales-task.up.railway.app/api/statistics/${month}`);

    const barChartData = await axios.get(`http://sales-task.up.railway.app/api/barchart/${month}`);

    const pieChartData = await axios.get(`http://sales-task.up.railway.app/api/piechart/${month}`);
    const finalResponseData={
      "statisticsData":statisticsData.data,
      "barChartData":barChartData.data,
      "pieChartData":pieChartData.data,

    } 
    res.status(201).send(finalResponseData);
    
  } catch (error) {
    res.status(401).send(error);
  }
};