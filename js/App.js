var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '4191',
    'X-Auth-Token': '14dd3f89adf48badf8e81f0e073c5c8f'
};

fetch(baseUrl + '/board', { headers: myHeaders })
    .then(function(resp) {
        return resp.json();
    })
    .then(function(resp) {
        setupColumns(resp.columns);
    });

//Create columns
function setupColumns(columns) {
    columns.forEach(function(column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);        
        setupCards(col, column.cards);
    });
}

//Cards in columns
function setupCards(col, cards) {
    cards.forEach(function(card) {
        var cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    });
}


// OGÓLNA FUNKCJA
// function randomString() {
// 	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
// 	var str = '', i;
// 	for (i = 0; i < 10; i++) {
// 	  str += chars[Math.floor(Math.random() * chars.length)];
// 	}
// 	return str;
// }

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}

// TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
// var todoColumn = new Column('Do zrobienia');
// var doingColumn = new Column('W trakcie');
// var doneColumn = new Column('Skończone');

// // DODAWANIE KOLUMN DO TABLICY
// board.createColumn(todoColumn);
// board.createColumn(doingColumn);
// board.createColumn(doneColumn);

// // TWORZENIE NOWYCH EGZEMPLARZY KART
// var card1 = new Card('Nowe zadanie');
// var card2 = new Card('stworzyc tablice kanban');
// var card3 = new Card('Done task');

// // DODAWANIE KART DO KOLUMN
// todoColumn.createCard(card1);
// doingColumn.createCard(card2);
// doneColumn.addCard(card3);