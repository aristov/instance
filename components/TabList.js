import Instance from './Instance';
import Tab from './Tab';

export default class TabList extends Instance {
    get tabs() {
        return this.findAll(Tab);
    }
    get selectedTab() {
        return this.find(Tab, ({ selected }) => selected === 'true');
    }
    get controls() {
        return this.element.getAttribute('aria-controls') || '';
    }
    on(type, listener, context) {
        this.element.addEventListener(type, listener.bind(context || this));
    }
    select(tab) {
        this.selectedTab.selected = 'false';
        tab.selected = 'true';
    }
    prev() {
        const tabs = this.tabs;
        const index = tabs.indexOf(this.selectedTab) - 1;
        this.select(index < 0? tabs[tabs.length - 1] : tabs[index]);
        this.emit('change');
    }
    next() {
        const tabs = this.tabs;
        const index = tabs.indexOf(this.selectedTab) + 1;
        this.select(index === tabs.length? tabs[0] : tabs[index]);
        this.emit('change');
    }
    static attachTo(node) {
        Tab.attachTo(node);
    }
}
