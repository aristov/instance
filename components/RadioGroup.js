import Instance from './Instance';
import Radio from './Radio';

export default class RadioGroup extends Instance {
    constructor(element) {
        super(element);
        this.input = element.querySelector('input') || document.createElement('input');
    }
    get radios() {
        return this.findAll(Radio);
    }
    get disabled() {
        return super.disabled;
    }
    set disabled(value) {
        const element = this.element;
        const radios = this.radios;
        const disabled = String(value);

        if(this.input.disabled = disabled === 'true') {
            element.setAttribute('aria-disabled', 'true');
            radios.forEach(({ element }) => element.removeAttribute('tabindex'));
        } else {
            element.removeAttribute('aria-disabled');
            let checked;
            radios.forEach(radio => {
                radio.element.tabIndex = -1;
                if(radio.checked === 'true') checked = radio;
            });
            if(checked) checked.element.tabIndex = 0;
            else radios[0].element.tabIndex = 0;
        }
    }
    get value() {
        return this.input.value;
    }
    set value(value) {
        this.input.value = value;
    }
    uncheck() {
        this.radios.forEach(radio => radio.checked = 'false');
    }
    static attachTo(node) {
        Radio.attachTo(node);
    }
}
