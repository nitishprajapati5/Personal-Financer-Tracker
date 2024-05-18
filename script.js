const data = []

console.log(data)
const rowPerPage = 10;
let currentPage = 1;

function displayTable(page){
    const table = document.getElementById("expensesIncomeTable");
    const startIndex = (page - 1) * rowPerPage;
    const endIndex = startIndex + rowPerPage;
    const slicedData = data.slice(startIndex,endIndex);
    console.log(table)
    table.innerHTML = `<tr>
                        <th>Month</th>
                        <th>Income</th>
                        <th>Expenses</th>
                        <th>Description</th>
                        </tr>`


    slicedData.forEach(item => {
        const row = table.insertRow()
        const Month = row.insertCell(0)
        const Income = row.insertCell(1)
        const Expenses = row.insertCell(2)
        const Desc = row.insertCell(3)

        Month.innerHTML = item.monthDetail
        Income.innerHTML = item.income
        Expenses.innerHTML = item.expenses
        Desc.innerHTML = item.Description
        
    });


    updatePagination(page)
}


function updatePagination(currentPage){
    const pageCount = Math.ceil(data.length / rowPerPage)
    const paginationContainer = document.getElementById('pagination')
    paginationContainer.innerHTML = "";

    for(let i = 1;i <= pageCount;i++){
        const pageLink = document.createElement('a')
        pageLink.href = "#"
        pageLink.innerText = i;
        pageLink.onclick = function(){
            displayTable(i)
        };

        if (i == currentPage){
            pageLink.style.fontWeight = "bold"
        }

        paginationContainer.appendChild(pageLink)
        paginationContainer.appendChild(document.createTextNode(" "))
    }


}
//Inital Display
displayTable(currentPage)

//Section of Additing Income
const income = document.getElementById("incomeAdd").addEventListener('click',function(e){
    e.preventDefault();
    const desc = document.getElementById("Description").value
    let income = document.getElementById("AddYourIncome").value
    const month = new Date().getMonth()
    const monthDetail = monthInString(month)
    if(desc === null || desc === undefined || desc === ''){
        window.alert("Please Provide the Value of Income Description")
        return
    }

    if(income === null || income === undefined || income === ''){
        window.alert("Please Provide the Income Details")
        return
    }

    console.log(desc,month,monthDetail,income)

    income = parseInt(income)

    data.push({
        monthInNumber:month,
        monthDetail:monthDetail,
        income : income,
        expenses : "-",
        Description : desc
    })
    displayTable(currentPage)


 
    const changeIncome = document.getElementById('incomeBlock')
    changeIncome.innerText = calculateIncomes()

    const changeExpenses =  document.getElementById('expensesBlock')
    changeExpenses.innerText = calculateExpenses()

    document.getElementById("Description").value = ""
    document.getElementById("AddYourIncome").value = ""

})

//Section of Adding Expenses
const expenses = document.getElementById('expenseAdd').addEventListener('click',function(e){
    e.preventDefault()
    const desc = document.getElementById("expensesDescription").value
    let expenses = document.getElementById("AddYourExpense").value
    const month = new Date().getMonth()
    const monthDetail = monthInString(month)
    if(desc === null || desc === undefined || desc === ''){
        window.alert("Please Provide the Value of Income Description")
        return
    }

    if(expenses === null || expenses === undefined || expenses === ''){
        window.alert("Please Provide the Income Details")
        return
    }

    console.log(desc,month,monthDetail,expenses)

    expenses = parseInt(expenses)

    data.push({
        monthInNumber:month,
        monthDetail:monthDetail,
        income : "-",
        expenses :expenses ,
        Description : desc
    })
    displayTable(currentPage)

    const changeIncome = document.getElementById('incomeBlock')
    changeIncome.innerText = calculateIncomes()
    calculateIncomes()
    const changeExpenses =  document.getElementById('expensesBlock')
    changeExpenses.innerText = calculateExpenses()

    document.getElementById("expensesDescription").value = ""
    document.getElementById("AddYourExpense").value=""

})
function monthInString(index){
    const monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
    return monthArray[index];
}


function calculateExpenses(){
    let InitalValue = 0
    const result = data.reduce((acc,item) => {
        return item.expenses === '-' ? acc + 0 : acc + item.expenses
    },InitalValue)

    return result
}

function calculateIncomes(){
    let InitalValue = 0
    const result = data.reduce((acc,item) => {
        return item.income === '-' ? acc + 0 : acc + item.income 
    },InitalValue)
    //console.log(result)
    return result
}
