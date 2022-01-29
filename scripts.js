var lineBreak = "<br>";

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
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var image = document.getElementById("image").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var person = new Person(name, description, image, price, quantity);

    // Convert the person object to a string using formatPerson function
    // and update the label using updateLabel function
    //updateLabel(document.getElementById("inputtedPerson"), formatPerson(person));
    updateLabel(document.getElementById("inputtedPerson"), serializePerson(person));
    addPerson(person);
}

// Function that adds a person object to the table
function addPerson(person)
{
    var table = document.getElementById("table");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = person.name;
    cell2.innerHTML = person.description;
    cell3.innerHTML = person.image;
    cell4.innerHTML = person.price;
    cell5.innerHTML = person.quantity;
}

// Function that serializes a person object to a json string
function serializePerson(person)
{
    var json = JSON.stringify(person);
    return json;
}

// Function that takes in a person object and format it as a string
function formatPerson(person)
{
    var str = "";
    str += "Name: " + person.name + lineBreak;
    str += "Description: " + person.description + lineBreak;
    str += "Image: " + person.image + lineBreak;
    str += "Price: " + person.price + lineBreak;
    str += "Quantity: " + person.quantity + lineBreak;
    return str;
}

// Function that updates a label
function updateLabel(label, text)
{
    label.innerHTML = text;
}