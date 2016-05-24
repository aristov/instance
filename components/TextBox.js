export default class TextBox {
    constructor(element) {
        element.instance = this;
        this.element = element;

        this.input = element.querySelector('input,textarea');
        this.input.addEventListener('blur', this.onBlur.bind(this));
    }
    get disabled() {
        return String(this.input.disabled);
    }
    set disabled(value) {
        let disabled = String(value);

        (this.input.disabled = disabled === 'true')?
            this.element.classList.add('disabled') :
            this.element.classList.remove('disabled');
    }
    get value() {
        return this.input.value;
    }
    set value(value) {
        this.input.value = value;
    }
    onFocus(event) {
        this.element.classList.add('focus');
    }
    onBlur(event) {
        this.element.classList.remove('focus');
    }
    static getInstance(element) {
        return element.dataset && element.dataset.instance === 'textbox'?
            element.instance || new this(element) :
            null;
    }
    static attachToDocument() {
        document.addEventListener('focus', function(event) {
            let target = event.target,
                tagName = target.tagName;
            if(tagName === 'INPUT' || tagName === 'TEXTAREA') {
                let element = target.closest('[data-instance=textbox]'),
                    textBox = element && this.getInstance(element);
                if(textBox) textBox.onFocus(event);
            }
        }.bind(this), true);
    }
}