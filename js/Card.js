// KLASA KANBAN CARD
function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('card-template', { description: this.name }, 'li');
    this.cardElement = this.element.querySelector('.card');
    this.descriptionElement = this.element.querySelector('.card-description');
    this.input = null;

    this.cardElement.addEventListener('click', (function (event) {
      event.stopPropagation();
      console.log(this);
      if (event.target.classList.contains('btn-delete')) {
            self.removeCard();
      }
    })/*.bind(this)*/);

    this.descriptionElement.addEventListener('click', (event) => {
      if (!this.input) {
        this.input = document.createElement('input');
        this.input.value = this.descriptionElement.innerHTML;

        this.input.addEventListener('blur', () => {
          // this.changeCardName(this.input.value);
          this.descriptionElement.innerHTML = this.input.value;
          this.input.parentNode.replaceChild(this.descriptionElement, this.input);
        });
      }

      this.descriptionElement.parentNode.replaceChild(this.input, this.descriptionElement);
      this.input.focus();
    });
}
Card.prototype = {
  removeCard: function() {
    var self = this;

    fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(resp) {
            self.element.parentNode.removeChild(self.element);
        })
  },
  //Added
  changeCardName: function(newName) {
    var self = this;

    fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.name
      })
  }
}
