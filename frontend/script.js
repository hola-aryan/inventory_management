var candyName = document.getElementById('candyName');
var description = document.getElementById('description');
var price = document.getElementById('price');
var quantity = document.getElementById('quantity');

var myForm = document.getElementById('my-form');
var localStorageDataList = document.getElementById("localStorageData");

myForm.addEventListener('submit', addTodo);

function addTodo(e) {
  e.preventDefault();

  // Get user input values
  const candyNames = candyName.value;
  const descriptions = description.value;
  const prices = price.value;
  const quantitys = quantity.value;


  // Simple client-side validation
  if (!candyNames || !descriptions || !prices || !quantitys) {
    alert('Please fill in all fields');
    return;
  }

  axios.post('http://localhost:3000/Expense/add-Expense', {
    candyNames: candyNames,
    descriptions: descriptions,
    prices: prices,
    quantitys: quantitys
  })
    .then(res => {
      console.log(res);
      displayData();
      // Optionally update UI or provide feedback to the user upon successful submission
    })
    .catch(err => {
      console.log(err);
      // Provide user-friendly error message or feedback
      alert('Error submitting data. Please try again.');
    })
    .finally(() => {
      // Reset form fields after request (whether success or failure)
      candyName.value = "";
      description.value = "";
      price.value = "";
      quantity.value = "";
    });
}


function displayData() {
      localStorageDataList.innerHTML = ""; // Clear previous data
      axios.get('http://localhost:3000/user/get-user')
      .then(res => {
        console.log(res.data.appointments);
          for (let i = 0; i < res.data.appointments.length; i++) {
            showAllUsers(res.data.appointments[i]);
          }
      })
      .catch(err => console.log("Error fetching user data in window add event listener"))
    }
    
    // window.addEventListener("DOMContentLoaded",()=>{
    //     localStorageDataList.innerHTML = ""; // Clear previous data
    //     axios.get('http://localhost:3000/user/get-user')
    //     .then(res => {
    //       console.log(res.data.appointments);
    //         for (let i = 0; i < res.data.appointments.length; i++) {
    //           showAllUsers(res.data.appointments[i]);
    //         }
    //     })
    //     .catch(err => console.log("Error fetching user data in window add event listener"))
    // })
    
    function showAllUsers(print){
        const listItem = document.createElement("li");
    
                const deleteItem = document.createElement("button");
                deleteItem.textContent = "Delete";
                deleteItem.addEventListener('click', () => deleteElement(print.id));
        
                listItem.textContent = `ID: ${print.id}, Name: ${print.name}, Time: ${print.Name}, Email: ${print.email}`;
        
                localStorageDataList.appendChild(listItem);
                listItem.appendChild(deleteItem);
    }