// Create a struct for the data
// struct contains the following:
// 		- name
// 		- description
// 		- image
// 		- price
// 		- quantity
class Person 
{
    constructor(name, description, image, price, quantity)
    {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }
}

// Function that converts json string and returns an array of Person objects
function jsonToArray(json)
{
    var array = [];
    var obj = JSON.parse(json);
    for (var i = 0; i < obj.length; i++)
    {
        var person = new Person(obj[i].name, obj[i].description, obj[i].image, obj[i].price, obj[i].quantity);
        array.push(person);
    }
    return array;
}

// Function that takes in inputs from multiple textbox and returns a person object
function UpdateText()
{
    var name = document.getElementsByTagName("name").value;
    var description = document.getElementsByTagName("description").value;
    var image = document.getElementsByTagName("image").value;
    var price = document.getElementsByTagName("price").value;
    var quantity = document.getElementsByTagName("quantity").value;
    var person = new Person(name, description, image, price, quantity);

    // display the person's name in a prompt
    alert(person.name);

    // Convert the person object to a string using formatPerson function
    // and update the label using updateLabel function
    updateLabel(document.getElementById("inputtedPerson"), formatPerson(person));
}

// Function that takes in a person object and format it as a string
function formatPerson(person)
{
    var str = "";
    str += "Name: " + person.name + "\n";
    str += "Description: " + person.description + "\n";
    str += "Image: " + person.image + "\n";
    str += "Price: " + person.price + "\n";
    str += "Quantity: " + person.quantity + "\n";
    return str;
}

// Function that updates a label
function updateLabel(label, text)
{
    label.innerHTML = text;
}